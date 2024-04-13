let express = require("express");
let cors = require("cors");
let app = express();
const dotenv = require('dotenv')
dotenv.config();
app.use(cors());
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"))
app.use(cors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, PATCH',
    allowedHeaders: 'Content-Type',
}));

let sendToBackend = require('./src/Router/DBRouter.js')

app.get('/', async (req, res) => {
    res.send("Server is Running clearly")
})

app.use('/api', sendToBackend)

app.listen(4000);