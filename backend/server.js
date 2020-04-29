const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
//so we have have environment variables in .env file
require('dotenv').config();
const app = express();
const port = process.env.PORT || 4000;
//middleware
app.use(cors());
//parse json in server so we dont need middleware like body-parser
app.use(express.json());

const uri = process.env.ATLAS_URI; 
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log("MongoDB database connection is established successfully")
})

const exercisesRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')

//route is first param, second is the file/directory to look in
// for the respective handeling of the api request
app.use('/exercises',exercisesRouter);
app.use('/users',usersRouter);



var server  = app.listen(port, () => {
    console.log("Server is lisenting to port " + port);
})

// 

// process.on('exit', () => {
//     console.log("exit")
//     server.close()
// })

// process.on('SIGTERM', () => {
//     console.log("sigterm")
//     server.close()
// })