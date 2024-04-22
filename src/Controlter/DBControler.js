let { functiondata } = require('../Function/Function')
let OpenAI = require("openai");
let { getGraphData } = require('../Controlter/GraphControler')
let { getAnyInformation } = require('../Function/Getdata')
let { possibleGraph } = require('../Function/FunctionForGraph')
let { SolveForJsonDataIntoGraphData } = require('./ManipulationData')
// async function sendToBackend(req, res) {
//     try {
//         let question = req.body.question;
//         const openai = new OpenAI({ apiKey: process.env.ChatGptApiKey });
//         const response = await openai.chat.completions.create({
//             model: "gpt-4-1106-preview",
//             messages: question,
//             functions: functiondata,
//             function_call: "auto"
//         });
//         const responseMessage = response.choices[0].message;
//          console.log(responseMessage)
//         if (responseMessage.function_call) {
//             const availableFunctions = {
//                 "getAnyInformation": getAnyInformation,
//             };
//             const functionName = responseMessage.function_call.name;
//             const functionToCall = availableFunctions[functionName];
//             const functionArgs = JSON.parse(responseMessage.function_call.arguments);
//             const functionResponse = await functionToCall(functionArgs);
//             console.log(functionArgs, '\n')
//             console.log(functionResponse)

           
//                 return res.send({ "data": functionResponse });
            
            
//         } else {
//             return res.send({ "data": [responseMessage.content] })
//         }
//     } catch (error) {
//         console.log(error)
//         return res.send({ "data": ["Your maximum context is reached or your query is invalid. Please refresh this page and write your query again."] })
//     }
// }


// function determineGraphType(query, wantsGraph) {
//     if (!wantsGraph) {
//         return null;
//     }
//     let graphType = null;
//     let graphSubType = 'basic';

//     if (/ORDER BY/.test(query) && /TIME|DATE|YEAR|MONTH|DAY/.test(query)) {
//         graphType = 'line';
//     }
//     else if (/GROUP BY/.test(query)) {
//         if (/SUM|AVG|COUNT|MAX|MIN/.test(query)) {
//             if (/\sCOUNT\(\*\)\s/.test(query) && /WHERE/.test(query)) {
//                 graphType = 'pie';
//             } else if (/PARTITION BY/.test(query)) {
//                 graphType = 'Stacked Bar';
//             } else {
//                 graphType = 'bar';
//             }
//         }
//     }
//     if (graphType) {
//         return { graphType, graphSubType };
//     }
//     return null;
// }

function determineGraphType(query, wantsGraph) {
    if (!wantsGraph) return null;

    let graphType = null;
    let graphSubType = 'basic';

    const regexPatterns = {
        timeSeries: /GROUP BY.*\b(YEAR|MONTH|DAY|DATE)\b.*ORDER BY.*\b(YEAR|MONTH|DAY|DATE)\b/i,
        aggregatedCategory: /GROUP BY.*\b(SUM|AVG|COUNT|MAX|MIN)\b/i,
        countWhere: /\bCOUNT\(\*\)\s.*WHERE/i,
        partitionBy: /PARTITION BY/i,
        simpleRelationship: /\sWHERE.*SELECT\s+\w+,\s*\w+\s+FROM/i,
        groupBySimple: /GROUP BY/i,

    };
    if (regexPatterns.timeSeries.test(query)) {
        graphType = 'line';
    }
    else if (regexPatterns.aggregatedCategory.test(query)) {
        if (regexPatterns.countWhere.test(query)) {
            graphType = 'pie';
        } else if (regexPatterns.partitionBy.test(query)) {
            graphType = 'stackedBar';
        } else {
            graphType = 'bar'; // Default for SUM, AVG, etc., with GROUP BY
        }
    } else if (regexPatterns.groupBySimple.test(query)) {
        graphType = 'bar'; // Fallback for general GROUP BY cases not covered above
    } 

    console.log(`Determined graph type: ${graphType} for query: ${query}`);
    return graphType ? { graphType, graphSubType } : null;
}


async function sendToBackend(req, res) {
    try {
        let question = req.body.question;  // Ensure this is correctly formatted as [{ role: 'user', content: 'Your question' }]

        if (!Array.isArray(question) || question.length === 0 || !question[0].hasOwnProperty('role') || !question[0].hasOwnProperty('content')) {
            return res.status(400).send({ "error": "Question format is invalid. It must be an array of message objects." });
        }

        const openai = new OpenAI({ apiKey: process.env.ChatGptApiKey });
        const response = await openai.chat.completions.create({
            model: "gpt-4-1106-preview",
            messages: question,
            functions: functiondata,
            function_call: "auto"
        });
        const responseMessage = response.choices[0].message;

        if (responseMessage.function_call) {
            const functionName = responseMessage.function_call.name;
            const functionArgs = JSON.parse(responseMessage.function_call.arguments);
            const functionResponse = await getAnyInformation(functionArgs);

            console.log("Function Arguments:", functionArgs);
            console.log("Function Response:", functionResponse);

            const graphInfo = determineGraphType(functionArgs.query, functionArgs.graph);
            if (graphInfo) {
                const graphData = generateChartData(functionResponse, graphInfo);
                console.log("related to -->", graphData)
                return res.send({"data": functionResponse,"Graph": graphData });
            } else {
                return res.send({ "data": functionResponse });
            }
        } else {
            return res.send({ "data": [responseMessage.content] });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send({ "Error": "An error occurred while processing your request." });
    }
}

function generateChartData(data, { graphType, graphSubType }) {
    if (!data || data.length <= 1) {
        return { error: "Insufficient data to generate chart." };
    }

    let categories = [];
    let seriesData = [];
    const keys = Object.keys(data[1]);

    if (keys.length < 2) {
        return { error: "Data format not suitable for graphing." };
    }

    switch (graphType) {
        case 'line':
        case 'bar':
            categories = data.map(item => item[keys[0]]);
            seriesData = [{
                name: keys[1],
                data: data.map(item => item[keys[1]])
            }];
            break;

        case 'pie':
            seriesData = data.map(item => ({
                name: item[keys[0]],
                y: item[keys[1]]
            }));
            break;
        default:
            return { error: `Unsupported graph type: ${graphType}` };
    }

    const chartConfig = {
        chart: {
            type: graphType,
            height: 'auto'
        },
        title: {
            text: `Chart Displaying ${keys[1]} by ${keys[0]}`
        },
        xaxis: {
            categories: categories,  // Ensure categories are used for scatter if labels are needed
            title: {
                text: keys[0]
            }
        },
        series: seriesData,
        yaxis: {
            title: {
                text: keys[1]
            }
        }
    };
    if (graphType === 'pie') {
        delete chartConfig.xaxis;  
    }
    return chartConfig;
}


// function generateChartData(data, { graphType, graphSubType }) {
//     if (!data || data.length <= 1) {
//         return { error: "Insufficient data to generate chart." };
//     }

//     // Initialize chart data structures
//     let categories = [];
//     let seriesData = [];

//     // Extract column names from the first data row assuming keys exist
//     const keys = Object.keys(data[1]);
//     if (keys.length < 2) {
//         return { error: "Data format not suitable for graphing." };
//     }

//     // Depending on the chart type, we process the data differently
//     switch (graphType) {
//         case 'line':
//         case 'bar':
//             // Typical case for Line or Bar charts where the first column is the category (x-axis) and the second is the value (y-axis)
//             categories = data.slice(1).map(item => item[keys[0]]); // Assuming the first key is the category
//             seriesData = [{
//                 name: keys[1], // Assuming the second key is the series name
//                 data: data.slice(1).map(item => item[keys[1]])
//             }];
//             break;

//         case 'pie':
//             // For Pie charts, each slice needs a name and a value
//             seriesData = data.slice(1).map(item => ({
//                 name: item[keys[0]], // Assuming the first key is the slice name
//                 y: item[keys[1]] // Assuming the second key is the slice value
//             }));
//             break;

//         default:
//             return { error: `Unsupported graph type: ${graphType}` };
//     }

//     const chartConfig = {
//         chart: {
//             type: graphType,
//             height: 'auto'
//         },
//         title: {
//             text: `Chart Displaying ${keys[1]} by ${keys[0]}`
//         },
//         xaxis: {
//             categories: categories,
//             title: {
//                 text: keys[0]
//             }
//         },
//         series: seriesData,
//         yaxis: {
//             title: {
//                 text: keys[1]
//             }
//         }
//     };
//     if (graphType === 'pie') {
//         delete chartConfig.xaxis; 
//     }

//     return chartConfig;
// }



module.exports = { sendToBackend }



// if (functionResponse.length == 1) {
            //     return res.send({ "Normal": functionResponse });
            // } n
            // let GraphType = await getGraphData(functionArgs.query, question[question.length - 1].content)
            // console.log(GraphType)
            // if (GraphType.length == 0) {
            //     return res.send({ "Normal": functionResponse });
            // } else {
            //     if (possibleGraph.includes(GraphType[0]?.chartName?.chartName)) {
            //         let result = []
            //         result = SolveForJsonDataIntoGraphData(functionResponse.slice(1, functionResponse.length - 1), GraphType[0]?.chartConfig)
            //         if (result == undefined || result.length == 0) {
            //             return res.send({ "Normal": functionResponse });
            //         }
            //         result.unshift({ "graphType": GraphType[0]?.chartName?.chartName, "subchartName": GraphType[0]?.chartName?.subchartName })
            //         result.unshift({ "Normal": functionResponse.slice(1, functionResponse.length - 1) })
            //         result.unshift(functionResponse[0])
            //         return res.send({ "Graph": result })
            //     }
            //     else {
            //         return res.send({ "Normal": functionResponse });
            //     }
            // }