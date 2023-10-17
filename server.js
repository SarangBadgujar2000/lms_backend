const express= require("express");
const dotenv=require("dotenv").config()
const mongoConnection=require("./connection")
const cors=require("cors");
const router = require("./routes/routes");

const app=express();
mongoConnection(process.env.URI)
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send("Hello ji")
})

app.use(router)
app.listen(process.env.PORT);   