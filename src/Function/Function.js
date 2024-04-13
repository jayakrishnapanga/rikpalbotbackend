
// let customers = "Table: customers Columns: customerNumber int PK customerName varchar(50) ,contactLastName varchar(50) ,contactFirstName varchar(50) ,phone varchar(50) ,addressLine1 varchar(50) ,addressLine2 varchar(50) ,city varchar(50) ,state varchar(50) ,postalCode varchar(15) ,country varchar(50) ,salesRepEmployeeNumber int ,creditLimit decimal(10,2)."
// let employees = "Table: employees Columns:employeeNumber int PK ,lastName varchar(50) ,firstName varchar(50) ,extension varchar(10) ,email varchar(100) ,officeCode varchar(10) ,reportsTo int ,jobTitle varchar(50)."
// let offices = "Table: offices Columns:officeCode varchar(10) PK ,city varchar(50) ,phone varchar(50) ,addressLine1 varchar(50) ,addressLine2 varchar(50) ,state varchar(50) ,country varchar(50) ,postalCode varchar(15) ,territory varchar(10)."
// let orderdetails = "Table: orderdetails Columns: orderNumber int PK ,productCode varchar(15) PK ,quantityOrdered int ,priceEach decimal(10,2) ,orderLineNumber smallint."
// let orders = "Table: orders Columns:orderNumber int PK ,orderDate date ,requiredDate date ,shippedDate date ,status varchar(15) ,comments text ,customerNumber int.The Sixth Table: payments Columns:customerNumber int PK ,checkNumber varchar(50) PK ,paymentDate date ,amount decimal(10,2)."
// let productlines = "Table: productlines Columns: productLine varchar(50) PK ,textDescription varchar(4000) ,htmlDescription mediumtext ,image mediumblob."
// let products = "Table: products Columns : productCode varchar(15) PK ,productName varchar(70) ,productLine varchar(50) ,productScale varchar(10) ,productVendor varchar(50) ,productDescription text ,quantityInStock smallint ,buyPrice decimal(10,2) ,MSRP decimal(10,2)."

let DatabaseName = "classicmodels"
let customers = "Table: Customers Columns: customerNumber (PK), customerName, contactLastName, contactFirstName, phone, address, city, state, postalCode, country, salesRepEmployeeNumber, creditLimit."
let employees = "Table: employees Columns: employeeNumber (PK), lastName, firstName, extension, email, officeCode, reportsTo, jobTitle."
let offices = "Table: offices Columns: officeCode (PK), city, phone, address, state, country, postalCode, territory."
let orderdetails = "Table: orderdetails Columns: orderNumber(PK), productCode (Foreign key of Products Table), quantityOrdered, priceEach, orderLineNumber."
let orders = "Table: orders Columns: orderNumber (PK), orderDate, requiredDate, shippedDate, status, comments, customerNumber."
let productlines = "Table: productlines Columns: productLine(PK), textDescription, htmlDescription, image."
let products = "Table: products Columns : productCode (PK), productName, productLine, productScale, productVendor, productDescription, quantityInStock, buyPrice, MSRP."
let Payments = "Table: Payments Columns :  customerNumber (PK), checkNumber (Foreign key of Customers Table), paymentDate, amount"

const functiondata = [

    // {
    //     "name": "getAnyInformation",
    //     "description": `This function retrieves data from multiple database tables:
    //     - Products: productCode (PK), productName, productLine, productScale, productVendor, productDescription, quantityInStock, buyPrice, MSRP.
    //     - productlines: productLine(PK), textDescription, htmlDescription, image.
    //     - Customers: customerNumber (PK), customerName, contactLastName, contactFirstName, phone, address, city, state, postalCode, country, salesRepEmployeeNumber, creditLimit.
    //     - Employees: employeeNumber (PK), lastName, firstName, extension, email, officeCode, reportsTo, jobTitle.
    //     - Offices: officeCode (PK), city, phone, address, state, country, postalCode, territory.
    //     - Order details: orderNumber(PK), productCode (Foreign key of Products Table), quantityOrdered, priceEach, orderLineNumber.
    //     - Orders: orderNumber (PK), orderDate, requiredDate, shippedDate, status, comments, customerNumber.
    //     - Payments: customerNumber (PK), checkNumber (Foreign key of Customers Table), paymentDate, amount.
    //     `,
    //     "parameters": {
    //         "type": "object",
    //         "properties": {
    //             "query": {
    //                 "type": "string",
    //                 "description": "A valid SQL query to fetch information from the database."
    //             }
    //         },
    //         "required": ["query"]
    //     }
    // },
    {
        "name": "getAnyInformation",
        "description": `My db name -${DatabaseName} ${productlines}: If user asking about any Columns which is present into that then trigger it`,
        "parameters": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "A valid SQL query to fetch information from the database."
                },
                // "graph": {
                //     "type": "boolean",
                //     "description": "Indicates whether an accompanying chart would benefit."
                // }
            },
            "required": ["query"]
        }
    },
    {
        "name": "getAnyInformation",
        "description": `My db -${DatabaseName} ${customers}:   If user asking about any Columns which is present into that then trigger it`,
        "parameters": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "A valid SQL query to fetch information from the database."
                },
                // "graph": {
                //     "type": "boolean",
                //     "description": "Indicates whether an accompanying chart would benefit."
                // }
            },
            "required": ["query"]
        }
    },
    {
        "name": "getAnyInformation",
        "description": `My db -${DatabaseName} ${products}:   If user asking about any Columns which is present into that then trigger it`,
        "parameters": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "A valid SQL query to fetch information from the database."
                },
                // "graph": {
                //     "type": "boolean",
                //     "description": "Indicates whether an accompanying chart would benefit."
                // }
            },
            "required": ["query"]
        }
    },
    {
        "name": "getAnyInformation",
        "description": `My db -${DatabaseName} ${products} and ${orderdetails}:   If user asking about any Columns which is present into that then trigger it`,
        "parameters": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "A valid SQL query to fetch information from the database."
                },
                // "graph": {
                //     "type": "boolean",
                //     "description": "Indicates whether an accompanying chart would benefit."
                // }
            },
            "required": ["query"]
        }
    },
    {
        "name": "getAnyInformation",
        "description": `My db -${DatabaseName} ${employees}:   If user asking about any Columns which is present into that then trigger it`,
        "parameters": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "A valid SQL query to fetch information from the database."
                },
                // "graph": {
                //     "type": "boolean",
                //     "description": "Indicates whether an accompanying chart would benefit."
                // }
            },
            "required": ["query"]
        }
    },
    {
        "name": "getAnyInformation",
        "description": `My db -${DatabaseName} ${orders}:   If user asking about any Columns which is present into that then trigger it`,
        "parameters": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "A valid SQL query to fetch information from the database."
                },
                // "graph": {
                //     "type": "boolean",
                //     "description": "Indicates whether an accompanying chart would benefit."
                // }
            },
            "required": ["query"]
        }
    },
    {
        "name": "getAnyInformation",
        "description": `My db -${DatabaseName} ${offices}:   If user asking about any Columns which is present into that then trigger it`,
        "parameters": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "A valid SQL query to fetch information from the database."
                },
                // "graph": {
                //     "type": "boolean",
                //     "description": "Indicates whether an accompanying chart would benefit."
                // }
            },
            "required": ["query"]
        }
    },
    {
        "name": "getAnyInformation",
        "description": `My db -${DatabaseName} ${Payments} and ${customers}:   If user asking about any Columns which is present into that then trigger it`,
        "parameters": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "A valid SQL query to fetch information from the database."
                },
                // "graph": {
                //     "type": "boolean",
                //     "description": "Indicates whether an accompanying chart would benefit."
                // }
            },
            "required": ["query"]
        }
    },

];


module.exports = { functiondata }

