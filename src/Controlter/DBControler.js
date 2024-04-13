let { functiondata } = require('../Function/Function')
let OpenAI = require("openai");
let { getGraphData } = require('../Controlter/GraphControler')
let { getAnyInformation } = require('../Function/Getdata')
let { possibleGraph } = require('../Function/FunctionForGraph')
let { SolveForJsonDataIntoGraphData } = require('./ManipulationData')
async function sendToBackend(req, res) {
    try {
        let question = req.body.question;
        const openai = new OpenAI({ apiKey: process.env.ChatGptApiKey });
        const response = await openai.chat.completions.create({
            model: "gpt-4-1106-preview",
            messages: question,
            functions: functiondata,
            function_call: "auto"
        });
        const responseMessage = response.choices[0].message;

        if (responseMessage.function_call) {
            const availableFunctions = {
                "getAnyInformation": getAnyInformation,
            };
            const functionName = responseMessage.function_call.name;
            const functionToCall = availableFunctions[functionName];
            const functionArgs = JSON.parse(responseMessage.function_call.arguments);
            const functionResponse = await functionToCall(functionArgs);
            console.log(functionArgs, '\n')

           
                return res.send({ "data": functionResponse });
            
            // if (functionResponse.length == 1) {
            //     return res.send({ "Normal": functionResponse });
            // }
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
        } else {
            return res.send({ "data": [responseMessage.content] })
        }
    } catch (error) {
        console.log(error)
        return res.send({ "data": ["Your maximum context is reached or your query is invalid. Please refresh this page and write your query again."] })
    }
}


module.exports = { sendToBackend }