
// let Mixed = ['Line Column', 'Multiple Y-Axis', 'Line & Area', 'Line Column Area', 'Line Scatter']
// let RangeArea = ['Basic', 'Combo']
// let Timeline = ['Basic', 'Distributed', 'Multi-series', 'Advanced', 'Multiple series – Group rows', 'Dumbbell Chart (Horizontal)']
// let Funnel = ['Funnel', 'Pyramid']
// let Candlestick = ['Basic', 'Combo', 'Category x-axis', 'Candlestick with line']
// let Box = ['Basic', 'Boxplot-Scatter', 'Horizontal BoxPlot']
// let Pie = ['Simple Pie', 'Simple Donut', 'Donut Update', 'Monochrome Pie', ' Gradient Donut', 'Semi Donut', 'Donut with Pattern', 'Pie with Image']
// let Radar = ['Basic', 'Radar - Multiple Series', 'Radar with Polygon-fill']
// let Polor = ['Basic', 'Monochrome']
// let Circle = ['Basic', 'Multiple', 'Custom Angle Circle', 'Gradient', 'Radialbars with Image', 'Stroked Gauge', 'Semi Circle Gauge']
// let Bubble = ['Simple', '3D Bubble']
// let Scatter = ['Basic', 'Scatter - Datetime', 'Scatter - Images']
// let Heatmap = ['Basic', 'Multiple Colors', ' Multiple Colors Flipped', 'Color Range', 'Rounded']
// let Treemap = ['Basic', 'Treemap Multiple Series', 'Color Range', 'Distributed']
// let Sparklines = ['Basic']

const possibleGraph = [
    'Line', 'Pie', 'Area', 'Bar', 'Stacked Bar', 'Column', 'Heatmap', 'Radar', 'Radial Bar', 'Bubble',
    'Scatter', 'Candlestick', 'BoxPlot', 'Histogram', 'Polar Area', 'Donut', 'RangeBar', 'RangeArea',
    'Treemap', 'Pyramid', 'Funnel', 'Gantt', 'Waterfall', 'ErrorBars', 'Mixed'
];

const Line = ['Basic', 'Line with Data Labels', 'Zoomable Timeseries', 'Line Chart with Annotations',
    'Syncing charts', 'Brush chart', 'Stepline', 'Gradient', 'Missing', 'Realtime', 'Dashed'];

const Area = ['Basic', 'Spline', 'Datetime X-Axis', 'Negative', 'Github Style', 'Stacked',
    'Irregular Timeseries', 'Missing'];

const Column = ['Basic', 'Column with Data Labels', 'Stacked Columns', 'Stacked Columns 100',
    'Grouped Stacked Columns', 'Dumbbell Chart', 'Column with Markers',
    'Column with Group Label', 'Column with Rotated Labels', 'Column with Negative Values',
    'Dynamic Loaded Chart', 'Distributed Columns'];

const Bar = ['Basic', 'Grouped', 'Stacked Bar', 'Stacked Bars 100', 'Grouped Stacked Bars',
    'Bar with Negative Values', 'Bar with Markers', 'Reversed Bar Chart',
    'Custom DataLabels Bar', 'Patterned', 'Bar with Images'];

// Define other subchart types here if needed

let chartConfig = {
    type: "object",
    properties: {
        xAxis: {
            type: "string",
            description: "Suggestions for the x-axis. Please provide the necessary information for the x-axis. x-axis contain only one field from SQL. Remember do not return two field or more"
        },
        yAxis: {
            type: "string",
            description: "Suggestions for the y-axis. The y-axis name should match the SQL query names. y-axis contain only one field from SQL. Remember do not return two field or more"
        },
        series: {
            type: "string",
            description: "Suggestions for the series (if applicable). The result object should contain the key x-axis, y-axis, series. series contain only one field from SQL. Remember do not return two field or more"
        }
    },
    required: ["xAxis", "yAxis"]
}

const FunctionForGraph = [
    {
        name: "getAnyGraph",
        description: `If the question can create ApexCharts chart type is Line. Then the possible subchart types are ${Line}. Note down Do not use any other name result should be exactly match to our output`,
        parameters: {
            type: "object",
            properties: {
                chartName: {
                    type: "object",
                    properties: {
                        chartName: {
                            type: "string",
                            description: "Give me one correct chart name Line",
                        },
                        subchartName: {
                            type: "string",
                            description: "Give me one correct sub chart name from the given description"
                        }
                    },
                    required: ["chartName", "subchartName"]
                },
                chartConfig: chartConfig
            },
            required: ["chartName", "chartConfig"]
        }
    },
    {
        name: "getAnyGraph",
        description: `If the question can create ApexCharts chart type is Line. Then the possible subchart types are ${Area}. Note down Do not use any other name result should be exactly match to our output`,
        parameters: {
            type: "object",
            properties: {
                chartName: {
                    type: "object",
                    properties: {
                        chartName: {
                            type: "string",
                            description: "Give me one correct chart name Area",
                        },
                        subchartName: {
                            type: "string",
                            description: "Give me one correct sub chart name from the given description"
                        }
                    },
                    required: ["chartName", "subchartName"]
                },
                chartConfig: chartConfig
            },
            required: ["chartName", "chartConfig"]
        }
    },
    {
        name: "getAnyGraph",
        description: `If the question can create ApexCharts chart type is Line. Then the possible subchart types are ${Column}. Note down Do not use any other name result should be exactly match to our output`,
        parameters: {
            type: "object",
            properties: {
                chartName: {
                    type: "object",
                    properties: {
                        chartName: {
                            type: "string",
                            description: "Give me one correct chart name Column",
                        },
                        subchartName: {
                            type: "string",
                            description: "Give me one correct sub chart name from the given description"
                        }
                    },
                    required: ["chartName", "subchartName"]
                },
                chartConfig: chartConfig
            },
            required: ["chartName", "chartConfig"]
        }
    },
    {
        name: "getAnyGraph",
        description: `If the question can create ApexCharts chart type is Line. Then the possible subchart types are ${Bar}. Note down Do not use any other name result should be exactly match to our output`,
        parameters: {
            type: "object",
            properties: {
                chartName: {
                    type: "object",
                    properties: {
                        chartName: {
                            type: "string",
                            description: "Give me one correct chart name Bar",
                        },
                        subchartName: {
                            type: "string",
                            description: "Give me one correct sub chart name from the given description"
                        }
                    },
                    required: ["chartName", "subchartName"]
                },
                chartConfig: chartConfig
            },
            required: ["chartName", "chartConfig"]
        }
    },
];

module.exports = { FunctionForGraph, possibleGraph };
