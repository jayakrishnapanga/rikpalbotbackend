// let express = require("express");
// let cors = require("cors");
// let app = express();
// const dotenv = require('dotenv')
// dotenv.config();
// app.use(cors());
// const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.static("public"))
// app.use(cors({
//     origin: '*',
//     methods: 'GET, POST, PUT, DELETE, PATCH',
//     allowedHeaders: 'Content-Type',
// }));

// let sendToBackend = require('./src/Router/DBRouter.js')

// app.get('/', async (req, res) => {
//     res.send("Server is Running clearly")
// })

// app.use('/api', sendToBackend)

// app.listen(4000);


let express = require("express");
let cors = require("cors");
let app = express();
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');

// Configure CORS correctly
app.use(cors({
    origin: '*',  // Allows all domains
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

let sendToBackend = require('./src/Router/DBRouter.js');

app.get('/', async (req, res) => {
    res.send("Server is Running clearly");
});

app.use('/api', sendToBackend);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
