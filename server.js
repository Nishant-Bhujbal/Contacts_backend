const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');

// this is used to handle in .env files things
const dotenv = require('dotenv').config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

//acts as a middleware to send body from client to server or aise hi kuch toh
app.use(express.json());

const temp = "./routes/ContactRoutes";
app.use("/api/contacts", require(temp));

const temp2 = "./routes/usersRoutes";
app.use("/api/users", require(temp2));

//whenever we need to use a middleware we use this app.use thing
app.use(errorHandler);

app.listen(port,()=>
console.log(`server running on port ${port}`));