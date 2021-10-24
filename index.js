// ** NOTE ** "type": "module" in package.json maybe helps in doing these norml style import statements instead of the native node style imports
import express from "express";  //modern version of node allows this syntax istead of - {const express = require('express')} 
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import postRoutes from './routes/posts.js'

const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

//Global middleware(runs everytime a request comes in)
app.use((req, res, next) => {
    console.log(req.method + "--" + req.url)
    next()
})

//Base page for API
app.get('/', (req, res) => {
    res.send("Successfully loaded Memories API")
})

app.use('/posts', postRoutes)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true })
    .then(() => app.listen(PORT, () => console.log('Server running on port: ' + PORT)))
    .catch((error) => console.log("ERROR:" + error))

// mongoose.set('useFindAndModify', false);

