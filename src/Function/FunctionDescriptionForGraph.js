const FunctionForChart = [
    {
        name: "generateBarChartData",
        description: "Generate Bar chart data from input data if possible. To create a bar chart, three arrays are required: the type of chart, an array with all elements as numbers, and an array with all elements as any type.",
        parameters: {
            type: "object",
            properties: {
                chartType: {
                    type: "array",
                    description: "Type of chart",
                    items: { type: "string" } // Assuming chart types are strings
                },
                numericData: {
                    type: "array",
                    description: "Data with all elements as numbers",
                    items: { type: "number" }
                },
                anyTypeData: {
                    type: "array",
                    description: "Data with all elements as any type"
                    // No restriction on item types
                }
            },
            required: ["chartType", "numericData", "anyTypeData"]
        }
    }
];

module.exports = { FunctionForChart };
