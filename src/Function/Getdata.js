const dbConfig = require('../Connection/dbConfig');
let errormess = "While processing your request, we are noticing that something is missing."

async function getAnyInformation(query) {
    try {
        query = query?.query
        console.log("query is printing---->",query)
        const connection = await dbConfig()
        console.log(connection)
        if (!connection) {
          
            return (["connction not established"])
        }
        let [result] = await connection.execute(query);
        console.log(result)
        if (typeof (result) == 'object' && result.length == 0) {
            return ([`We have not found any result with your query '${query}' .`])
        }
        else if (typeof (result) != "object") {
            return ([result])
        }
        result.push({ "output": getdata(result) })
        result.unshift({ 'Your query': query })
        return (result)
    } catch (error){
       console.log("i got the error in getData ",error)
        let result = [];
        result.push(errormess)
        return (result)
    }
}

// const getConnection = require('../Connection/dbConfig');
// let errormess = "While processing your request, we are noticing that something is missing."

// async function getAnyInformation(query) {
//     let connection;
//     try {
//         query = query?.query;
//         console.log("query is printing---->", query);
//         connection = await getConnection();
//         const [results] = await connection.execute(query);
//         connection.release();  // Release the connection back to the pool
//         console.log(results);

//         if (!results.length) {
//             return [`We have not found any result with your query '${query}'`];
//         }

//         results.push({ "output": getdata(results) });
//         results.unshift({ 'Your query': query });
//         return results;
//     } catch (error) {
//         console.error("Error in getAnyInformation: ", error);
//         return [errormess];
//     } finally {
//         if (connection) connection.release(); // Ensure connection is released even if an error occurs
//     }
// }

function getdata(result) {
    try {
        let output = "Here is Your output: \n"
        for (let i = 0; i < result.length; i++) {
            output += `${i + 1}. `
            for (let key in result[i]) {
                let keydata = key
                if (keydata[0] === keydata[0].toLowerCase()) {
                    keydata = keydata[0].toUpperCase() + keydata.slice(1);
                }
                let splittedArray = key.split('_');
                let data = "";
                for (let j = 0; j < splittedArray.length; j++) {
                    if (j == 0) {
                        let s = splittedArray[j];
                        if (s[0] === s[0].toLowerCase()) {
                            s = s[0].toUpperCase() + s.slice(1);
                        }
                        data += s
                    } else {
                        data += " ";
                        data += splittedArray[j];
                    }
                }
                output += ` ${data} - ${result[i][key]}  \n`
            }
            output += '\n'
        }
        return output
    } catch {
        return errormess
    }
}

async function getAnyGraph(data) {
    try {
        return "hello world";
    } catch {
        return "error"
    }
}

module.exports = { getAnyInformation, }