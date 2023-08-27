import express from "express";
import connectToDB from "../config/db.js";


const app = express()
const port = 8000
connectToDB()

app.get("/", (req, res)=>{
    res.send("working")
})

app.listen(port,async()=>{
    console.log(`website listening at http://localhost:${port}`)
})