const express=require('express');
const cookieParser=require('cookie-parser')
const cors=require('cors')

const app=express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://prep-iq-tau.vercel.app",
        "https://prep-iq-git-main-sharma-2712s-projects.vercel.app"
    ],
    credentials: true
}))
// Require all the Routes
const authRouter=require("./routes/auth.routes")
const interviewRouter=require("./routes/interview.routes")

// using all the routes here
app.use("/api/auth",authRouter)
app.use("/api/interview",interviewRouter)



module.exports=app
