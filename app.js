const express = require('express')
const app = express()
require('./database/dbConnection')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const userRouter = require('./routes/userRouter')

app.use("/api/user/",userRouter)


app.listen(3000,()=>{console.log("Server 3000 Portuyla Açık")})