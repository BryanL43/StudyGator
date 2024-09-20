const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors")
const path = require("path")
const multer = require('multer');
const cookieParser = require('cookie-parser');
const apiRouter = require('./routes/api');

require('dotenv').config({ path: '../.env' });

const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.use(cors({
    origin: ['http://localhost:3000, http://ec2-54-176-10-43.us-west-1.compute.amazonaws.com/'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    credentials: true,
}));


const PORT = process.env.SERVER_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", apiRouter);

// share images
app.use('/imgs', express.static(path.join(__dirname, 'public/imgs')));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});