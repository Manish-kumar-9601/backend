﻿import express from 'express'
import cors from "cors";
// import cookieParser from 'cookie-parser';
const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.get('/', (req, res) =>
{
    res.send("home")

})

app.use(express.json({ limit: "16kb" }));
// app.use(express.static("public"))
// app.use(cookieParser({}))
//routes import

import userRouter from './routes/user.routes.js'
app.use('/api/v1/users',userRouter)
//http://localhost:4000/api/v1/users/register

export { app }
