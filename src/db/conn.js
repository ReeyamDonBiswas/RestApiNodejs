const mongoose= require("mongoose");

// require("./db/conn")
mongoose.connect("mongodb://localhost:27017/students-api",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log("connection is succesful");
}).catch((e)=>{
    console.log("no connection");
})