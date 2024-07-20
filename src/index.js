// import mongoose from 'mongoose'
//  require('dotenv').config({path:'./env'}) this is common js methos to import npm and we have define type as module 

// this is where we weite code in db folder and only import the function
import dotenv from 'dotenv'
// import {DB_NAME} from './constants.js'
import connectDB from './db/index.js'
import { app } from './app.js'

dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 ,()=>{
        console.log(`server is running on port ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("mongoDB connection is failed !!!",error);

})
// this is normal approach where we write the database connection code and express code in index file


// import express from 'express'
//  const app = express()
// ;(async ()=>{
//     try {
//         await mongoose.connect(`${process.env.DATABASE_URL}/${DB_NAME}`)
//         app.on("errror",(error)=>{

//             console.log("error",error)
//             throw error
//         })
//         app.listen(process.env.PORT,()=>{
//             console.log(`app is listening on port ${process.env.PORT}`);
//         })


        
//     } catch (error) {
//         console.log("error",error);
//         throw error
        
//     }
// })()

