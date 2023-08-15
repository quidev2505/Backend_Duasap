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

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(url, connectionParams);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

//API
app.use('/api/order', routerOrder);


app.get('/',(req, res)=>{
	res.send('ok')
})

const PORT = 5000 || process.env.PORT


connectDB().then(() => {
    app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
	})
})
