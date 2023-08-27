import mongoose from "mongoose"
const mongoURI = "mongodb://localhost:27017/bookstore";

const connectToDB = ()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(mongoURI)
        .then(()=>{
            console.log("Database connection success.")
            resolve()
        })
        .catch((err)=>{
            console.log("Database connection failed.")
            reject(err)
        })
    })
}

export default connectToDB;