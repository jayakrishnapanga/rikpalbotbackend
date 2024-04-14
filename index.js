let express = require("express");
let cors = require("cors");
let app = express();
const dotenv = require('dotenv');
dotenv.config();
const allowedOrigins = ['http://43.205.177.169:3000', 'http://localhost:3000'];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

let sendToBackend = require('./src/Router/DBRouter.js');
app.use('/api', sendToBackend);
app.get('/', async (req, res) => { res.send("Server is Running clearly"); });
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
