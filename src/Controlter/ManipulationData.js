
const SolveForTwoField = (data, GraphType) => {
    if (Object.keys(GraphType)?.length <= 0) return []
    let totalLength = data?.length;
    let xAxisArrays = [];
    let yAxisArrays = [];
    let seriesArrays = []
    let xAxisKey = "";
    let yAxisKey = "";
    let seriesKey = "";
    for (let ind = 0; ind < totalLength; ind++) {
        for (let key in data[ind]) {
            if (key == GraphType?.xAxis) {
                xAxisKey = key;
                if (xAxisArrays.includes(data[ind][key]) == false) {
                    xAxisArrays.push(data[ind][key])
                }
            }
            else if (key == GraphType?.yAxis) {
                yAxisKey = key;
                yAxisArrays.push(data[ind][key])
            }
            else {
                seriesKey = key;
                seriesArrays.push(data[ind][key])
            }
        }
    }
    if (xAxisKey.length == 0 || (yAxisKey.length == 0 && seriesKey.length == 0) || xAxisArrays.length == 0 || (yAxisArrays.length == 0 && seriesArrays.length == 0)) {
        return []
    }
    let result = [];
    result.push(xAxisKey);
    result.push(xAxisArrays);

    if (yAxisKey) result.push(yAxisKey);
    else result.push(seriesKey);
    if (yAxisKey) result.push({ [yAxisKey]: yAxisArrays });
    else result.push({ [seriesKey]: seriesArrays })

    return result
}

//solve for three field only 

const solveDataforThreeWhenGraphTypexAxisseries = (data, GraphType) => {
    let totalLength = data?.length;
    let xAxisArrays = [];
    let yAxisArrays = [];
    let seriesArrays = [];
    let frequencySeries = {};
    let xAxisKey = "";
    let yAxisKey = "";
    let seriesKey = "";
    for (let ind = 0; ind < totalLength; ind++) {
        for (let key in data[ind]) {
            if (key == GraphType?.xAxis) {
                xAxisKey = key;
                if (xAxisArrays.includes(data[ind][key]) == false) {
                    xAxisArrays.push(data[ind][key])
                }
            }
            else if (key == GraphType?.series) {
                seriesKey = key;
                seriesArrays.push(data[ind][key])
            }
            else {
                yAxisKey = key;
                yAxisArrays.push(data[ind][key])
            }
        }
        if (seriesKey.length != 0 && yAxisKey.length != 0) {
            let series = data[ind][seriesKey]
            let yAxis = data[ind][yAxisKey]
            if (frequencySeries[series]) {
                frequencySeries[series].push(yAxis)
            } else {
                frequencySeries[series] = [yAxis]
            }
        }
    }

    if (xAxisKey.length == 0 || yAxisKey.length == 0 || seriesKey.length == 0 || xAxisArrays.length == 0 || Object.keys(frequencySeries)?.length == 0) {
        return []
    }

    let result = [];
    result.push(xAxisKey);
    result.push(xAxisArrays);
    result.push(yAxisKey);
    result.push(frequencySeries);
    ;
    return result
}

const solveDataforThreeWhenGraphTypeLengthTwo = (data, GraphType) => {
    if (GraphType.xAxis && GraphType.series) return solveDataforThreeWhenGraphTypexAxisseries(data, GraphType);
    let totalLength = data?.length;
    let xAxisArrays = [];
    let yAxisArrays = [];
    let seriesArrays = [];
    let frequencySeries = {};
    let xAxisKey = "";
    let yAxisKey = "";
    let seriesKey = "";
    for (let ind = 0; ind < totalLength; ind++) {
        for (let key in data[ind]) {
            if (key == GraphType?.xAxis) {
                xAxisKey = key;
                if (xAxisArrays.includes(data[ind][key]) == false) {
                    xAxisArrays.push(data[ind][key])
                }
            }
            else if (key == GraphType?.yAxis) {
                yAxisKey = key;
                yAxisArrays.push(data[ind][key])
            }
            else {
                seriesKey = key;
                seriesArrays.push(data[ind][key])
            }
        }
        if (seriesKey.length != 0 && yAxisKey.length != 0) {
            let series = data[ind][seriesKey]
            let yAxis = data[ind][yAxisKey]
            if (frequencySeries[series]) {
                frequencySeries[series].push(yAxis)
            } else {
                frequencySeries[series] = [yAxis]
            }
        }
    }

    if (xAxisKey.length == 0 || yAxisKey.length == 0 || seriesKey.length == 0 || xAxisArrays.length == 0 || Object.keys(frequencySeries)?.length == 0) {
        return []
    }

    let result = [];
    result.push(xAxisKey);
    result.push(xAxisArrays);
    result.push(yAxisKey);
    result.push(frequencySeries);

    return result
}

const SolveForThreeField = (data, GraphType) => {
    if (Object.keys(GraphType)?.length <= 1) return []

    if (Object.keys(GraphType)?.length == 2) return solveDataforThreeWhenGraphTypeLengthTwo(data, GraphType)

    let totalLength = data?.length;
    let xAxisArrays = [];
    let yAxisArrays = [];
    let seriesArrays = []
    let frequencySeries = {};
    let xAxisKey = "";
    let yAxisKey = "";
    let seriesKey = "";
    for (let ind = 0; ind < totalLength; ind++) {
        for (let key in data[ind]) {
            if (key == GraphType?.xAxis) {
                xAxisKey = key;
                if (xAxisArrays.includes(data[ind][key]) == false) {
                    xAxisArrays.push(data[ind][key])
                }
            }
            else if (key == GraphType?.yAxis) {
                yAxisKey = key;
                yAxisArrays.push(data[ind][key])
            }
            else {
                seriesKey = key;
                seriesArrays.push(data[ind][key])
            }
        }
        if (GraphType?.series && GraphType?.yAxis && data[ind][GraphType?.series] && data[ind][GraphType?.yAxis]) {
            let series = data[ind][GraphType?.series]
            let yAxis = data[ind][GraphType?.yAxis]
            if (frequencySeries[series]) {
                frequencySeries[series].push(yAxis)
            } else {
                frequencySeries[series] = [yAxis]
            }
        }
    }
    if (xAxisKey.length == 0 || yAxisKey.length == 0 || seriesKey.length == 0 || xAxisArrays.length == 0 || Object.keys(frequencySeries)?.length == 0) {
        return []
    }

    let result = [];
    result.push(xAxisKey);
    result.push(xAxisArrays);
    result.push(yAxisKey);
    result.push(frequencySeries);

    return result
}

//main calculation of data
const SolveForJsonDataIntoGraphData = (data, GraphType) => {

    let result = []
    if (Object.keys(data[0])?.length == 2) result = SolveForTwoField(data, GraphType)
    else if (Object.keys(data[0])?.length == 3) result = SolveForThreeField(data, GraphType)
    console.log(result)
    return result
}

module.exports = { SolveForJsonDataIntoGraphData }



// const SolveForLinePieBar = (data, GraphType) => {
//     console.log(GraphType)
//     let totalLength = data.length;
//     const lengthOfEachData = Object.keys(data[0]).length;
//     let integerArrays = []
//     let stringArrays = []
//     let result = []
//     if (lengthOfEachData == 2) {
//         if (totalLength >= 30) return []
//         let keys = Object.keys(data[0])
//         let key1 = keys[0]
//         let key2 = keys[1]
//         if (typeof (data[0][key1]) != "number") {
//             let temp = key1; key1 = key2; key2 = temp;
//         }
//         if ((typeof (data[0][key1]) == "number" && typeof (data[0][key2]) == "string") || (typeof (data[0][key1]) == "string" && typeof (data[0][key2]) == "number")) {
//             for (let i = 0; i < totalLength; i++) {
//                 if (typeof (data[0][key1]) == "string") stringArrays.push(data[i][key1])
//                 else integerArrays.push(parseInt(data[i][key1]))

//                 if (typeof (data[0][key2]) == "string")
//                     stringArrays.push(data[i][key2])
//                 else integerArrays.push(parseInt(data[i][key2]))
//             }

//             if (typeof (data[0][key1]) == "string") {
//                 result.push(key1)
//             } else {
//                 result.push(key2)
//             }
//             result.push(stringArrays)
//             if (typeof (data[0][key1]) == "number") {
//                 result.push(key1)
//             } else {
//                 result.push(key2)
//             }
//             result.push(integerArrays)
//             //   
//             return result
//         }
//         else if (typeof (data[0][key1]) == "number" && typeof (data[0][key2]) == "number") {
//             let maxi1 = data[0][key1];
//             let maxi2 = data[0][key2];
//             for (let i = 1; i < totalLength; i++) {
//                 maxi1 = Math.max(maxi1, data[i][key1])
//                 maxi2 = Math.max(maxi2, data[i][key2])
//             }
//             let maxi = Math.max(maxi1, maxi2)
//             for (let i = 0; i < totalLength; i++) {
//                 if (maxi1 == maxi) {
//                     integerArrays.push(data[i][key1])
//                 } else {
//                     stringArrays.push(data[i][key1])
//                 }
//                 if (maxi2 == maxi) {
//                     integerArrays.push(data[i][key2])
//                 }
//                 else {
//                     stringArrays.push(data[i][key2])
//                 }
//             }
//             if (typeof (data[0][key1]) == "string") {
//                 result.push(key1)
//             } else {
//                 result.push(key2)
//             }
//             result.push(stringArrays)
//             if (typeof (data[0][key1]) == "number") {
//                 result.push(key1)
//             } else {
//                 result.push(key2)
//             }
//             result.push(integerArrays)
//             //   
//             return result
//         }
//         else {
//             return []
//         }
//     }
//     else {
//         return []
//     }
// }

// const SolveForArea = (data, GraphType) => {

//     const lengthOfEachData = Object.keys(data[0]).length;
//     let result = []
//     if (lengthOfEachData == 3) {
//         let keys = Object.keys(data[0]);
//         let key1 = keys[0];
//         let key2 = keys[1];
//         let key3 = keys[2];
//         let frequencyYear = {};
//         let frequencyData = {}

//         for (let i = 0; i < data.length; i++) {
//             let year = data[i][key1];
//             let month = data[i][key2];
//             let count = data[i][key3]
//             if (frequencyYear[year]) {
//                 frequencyYear[year].push(month);
//             } else {
//                 frequencyYear[year] = [month];
//             }
//             if (frequencyData[year]) {
//                 frequencyData[year].push(count);
//             } else {
//                 frequencyData[year] = [count];
//             }
//         }
//         let maxi = 0;
//         let monthArrays;
//         for (let k in frequencyYear) {
//             let len = frequencyYear[k].length
//             if (len > maxi) {
//                 maxi = len;
//                 monthArrays = frequencyYear[k]
//             }
//         }
//         // console.log(monthArrays)
//         // console.log(frequencyYear);
//         // console.log(frequencyData);

//         result.push(key1)
//         result.push(key2)
//         result.push(key3)
//         result.push(frequencyData)
//         result.push(monthArrays)
//         //   
//         return result
//     }
//     else {
//         return []
//     }
// }



// SolveForJsonDataIntoGraphData([
//     { month: 1, order_count: 8 },
//     { month: 2, order_count: 11 },
//     { month: 3, order_count: 8 },
//     { month: 4, order_count: 10 },
//     { month: 5, order_count: 8 },
//     { month: 6, order_count: 12 },
//     { month: 7, order_count: 11 },
//     { month: 8, order_count: 12 },
//     { month: 9, order_count: 12 },
//     { month: 10, order_count: 13 },
//     { month: 11, order_count: 33 },
//     { month: 12, order_count: 13 }], { xAxis: 'month', yAxis: 'order_count' }
// )

// let result = SolveForJsonDataIntoGraphData(
//     [
//         { OrderYear: 2003, OrderMonth: 1, ProductOrderCount: 39 },
//         { OrderYear: 2003, OrderMonth: 2, ProductOrderCount: 41 },
//         { OrderYear: 2003, OrderMonth: 3, ProductOrderCount: 50 },
//         { OrderYear: 2003, OrderMonth: 4, ProductOrderCount: 58 },
//         { OrderYear: 2003, OrderMonth: 5, ProductOrderCount: 58 },
//         { OrderYear: 2003, OrderMonth: 6, ProductOrderCount: 47 },
//         { OrderYear: 2004, OrderMonth: 5, ProductOrderCount: 74 },
//         { OrderYear: 2004, OrderMonth: 6, ProductOrderCount: 107 },
//         { OrderYear: 2004, OrderMonth: 7, ProductOrderCount: 101 },
//         { OrderYear: 2004, OrderMonth: 8, ProductOrderCount: 109 },
//         { OrderYear: 2004, OrderMonth: 9, ProductOrderCount: 95 },
//         { OrderYear: 2004, OrderMonth: 10, ProductOrderCount: 109 },
//         { OrderYear: 2004, OrderMonth: 11, ProductOrderCount: 109 },
//         { OrderYear: 2004, OrderMonth: 12, ProductOrderCount: 95 },
//         { OrderYear: 2005, OrderMonth: 1, ProductOrderCount: 98 },
//         { OrderYear: 2005, OrderMonth: 2, ProductOrderCount: 96 },
//         { OrderYear: 2005, OrderMonth: 3, ProductOrderCount: 95 },
//         { OrderYear: 2005, OrderMonth: 4, ProductOrderCount: 73 },
//         { OrderYear: 2005, OrderMonth: 5, ProductOrderCount: 109 }
//     ], { xAxis: 'OrderMonth', yAxis: 'ProductOrderCount', series: 'OrderYear' })

// console.log(result)


