const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectdb=require("./config/db");
dotenv.config();
const taskRouter = require("./routes/taskRouter");

connectdb();
const PORT = process.env.PORT || 5000;

const app=express();
app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRouter);

app.listen(PORT,()=>{
    console.log("server running");
})
