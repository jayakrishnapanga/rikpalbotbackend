const OpenAI = require("openai");
const { FunctionForGraph } = require('../Function/FunctionForGraph')
const { FunctionForChart } = require('../Function/FunctionDescriptionForGraph')

async function getGraphData(question, message) {
    try {
        const openai = new OpenAI({ apiKey: process.env.ChatGptApiKey });
        const Function = FunctionForGraph
        let Question = [{ role: "user", content: question }];
        Question.push({ 'role': 'user', content: message })
        const response = await openai.chat.completions.create({
            model: "gpt-4-1106-preview",
            messages: Question,
            functions: Function,
            function_call: "auto"
        });
        console.log(Question, '\n')
        const responseMessage = response.choices[0].message;
        if (responseMessage.function_call) {
            const functionArgs = JSON.parse(responseMessage.function_call.arguments);
            return [functionArgs]
        }
        else {
            return []
        }
    } catch (error) {
        //console.log(error)
        return [];
    }
}

async function chartControl(jsonData, query) {
    try {
        let question = [{ role: "user", content: JSON.stringify(query) }]
        question.push({ role: "user", content: JSON.stringify(jsonData) });
        const openai = new OpenAI({ apiKey: process.env.ChatGptApiKey });
        const response = await openai.chat.completions.create({
            model: "gpt-4-1106-preview",
            messages: question,
            functions: FunctionForChart,
            function_call: "auto"
        });
        const responseMessage = response.choices[0].message;
        if (responseMessage.function_call) {
            const functionArgs = JSON.parse(responseMessage.function_call.arguments);
            console.log(functionArgs)
            // return await chartControl(jsondata)
        }
        console.log(responseMessage)
        return response
    } catch (error) {
        console.log(error)
        return []
    }
}

function solveForGraph(data, arg) {
    let argList = []
    for (let key in data[0]) {
        for (let j = 0; j < arg.length; j++) {
            if (key == arg[j]) {
                argList.push(key)
            }
        }
    }
    for (let i = 0; i < data.length; i++) {
        let jsondata = data[i];
    }
}

module.exports = { getGraphData };
