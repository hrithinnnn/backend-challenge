const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');
const data = require('../backend/assets/schema/data');
const app = express();
const jsonParser = bodyParser.json();


const logger = (req, res, next) => {

    let current_datetime = new Date();

    let formatted_date =
        current_datetime.getFullYear() +
        "-" +
        (current_datetime.getMonth() + 1) +
        "-" +
        current_datetime.getDate() +
        " " +
        current_datetime.getHours() +
        ":" +
        current_datetime.getMinutes() +
        ":" +
        current_datetime.getSeconds();

    let method = req.method;

    let url = req.url;

    let log = `[${formatted_date}] ${method}:${url}`;

    console.log(log);

    next();
};

require('dotenv').config();

mongoose.connect(process.env.DB_URI)
app.use(cors())
app.use(jsonParser)
app.use(logger)
// app.get('/', (req, res) => {
//     res.status(200).json("server is running")
// })

app.get('/', (req, res) => {
    data.find().then((ans)=>{
        console.log(ans)
        res.status(200).json({ message: "success", data: ans})
    }).catch((err)=>{
        res.status(400).json(err);
    })
})
app.post('/', (req, res) => {
    const imgSrc=req.body.imgSrc;
    const title=req.body.title;
    const desc=req.body.desc;
    const link=req.body.link;
    data.insertMany({"img-src":imgSrc, title,desc,link}).then((ans)=>{
        console.log(ans)
        res.status(200).json({ message: "success", data: ans})
    }).catch((err)=>{
        res.status(400).json(err);
    })
})
app.listen(5000, () => console.log(`listening on port 5000`));
