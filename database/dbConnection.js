const mongoose = require('mongoose')
const uri = "mongodb+srv://canererdem21:Xj9nac4f2112@testdatabase.vsdji.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, {useUnifiedTopology:true,useNewUrlParser:true}).then(()=>{console.log("Veri Tabanina Bağlanildi")}).catch((error)=>{console.log("Hatali bağlanti",error)})

