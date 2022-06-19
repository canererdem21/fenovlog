const express = require('express')
const app = express()
const http = require('http')
require('./database/dbConnection')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const server = http.createServer(app)
const userRouter = require('./routes/userRouter')

app.use("/api/user/",userRouter)


app.listen(process.env.PORT || 5000,()=>{console.log("Server 3000 Portuyla Açık")})