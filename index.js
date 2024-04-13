let express = require("express");
let cors = require("cors");
let app = express();

const dotenv = require('dotenv');
dotenv.config();
app.use(cors())
app.use(cors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, PATCH',
    allowedHeaders: 'Content-Type',
  }));
const bodyParser = require('body-parser');

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
