const express = require('express');
const routerOrder = require('./router/index');
require('dotenv').config()
const path = require('path');

//Cors
const cors = require("cors");

//Connect to mongodb Atlas
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI;

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to the database ')
    })
    .catch((err) => {
        console.error(`Fail to connect to the database ${err}`);
    })


const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

//API
app.use('/api/order', routerOrder);

//Static file
app.use(express.static(path.join(__dirname, '../frontend/build')))

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
})

const PORT = 5000 || process.env.PORT

app.get('/', (req, res) =>{
    res.status(202).json('ok cac ban')
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
