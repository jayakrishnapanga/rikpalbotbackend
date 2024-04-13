let express = require("express");
let cors = require("cors");
let app = express();
const dotenv = require('dotenv');
dotenv.config();

// Properly configure CORS
app.use(cors({
    origin: ['https://rikpalbot-riktam.vercel.app'], // List of domains you want to allow
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true  // if your front end needs to send cookies to the backend
}));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

let sendToBackend = require('./src/Router/DBRouter.js');
app.use('/api', sendToBackend);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
