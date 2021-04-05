const express = require ("express");

require("./db/conn");

const Student= require("./models/students"); 

const app= express();

const port=process.env.PORT || 8000;
app.use(express.json());
//create a new student
// app.get("/",(req,res)=>{
//     res.send("hello world");
// })
// app.post("/students",(req,res)=>{
//     console.log(req.body);
//     const user = new Student(req.body);
//     user.save().then(()=>{
//         res.status(201).send(user);
//     }).catch((e)=>{
//         res.status(400).send(e);
//         })
//     //res.send("hello world");
// })

//async await
app.post("/students",async(req,res)=>{
    try{
        const user = new Student(req.body);
    const createUser =await user.save();
    res.status(201).send(user);
    }catch(e){
        res.status(400).send(e);
    }
    
})


//read the data get

app.get("/students",async(req,res)=>{
    try{
        
    const studentsData=await Student.find();
    res.status(201).send(studentsData);
    }catch(e){
        res.status(400).send(e);
    }
    
})

//to get indivisual data
app.get("/students/:id",async(req,res)=>{
    try{
        
    const _id=req.params.id;
    //console.log(studentData);
    //res.status(201).send(_id.id);
    const sData=await Student.findById(_id);
    //console.log(studentData);
    if(!sData){
        return res.status(404).send(sData);}
        else{
            res.send(sData)
        }
        console.log(sData);
    }catch(e){
        res.send(e);
    }
    
})


//delete the record by its id
app.delete("/students/:id",async(req,res)=>{
    try{
        
    const _id=req.params.id;
    
    const DelStudent=await Student.findByIdAndDelete(_id);
    
    if(!_id){
        return res.status(400).send();}
        else{
            res.send(DelStudent)
        }
        console.log(DelStudent);
    }catch(e){
        res.status(500).send(e);
    }
    
})

//update the data using Id (patch)
app.patch("/students/:id",async(req,res)=>{
    try{
        
    const _id=req.params.id;
    
    const updateStudent=await Student.findByIdAndUpdate(_id,req.body,{
        new:true
    });
    res.send(updateStudent);
   
    }catch(e){
        res.status(500).send(e);
    }
    
})


//update the data using Id (put)
app.put("/students/:id",async(req,res)=>{
    try{
        
    const _id=req.params.id;
    
    const updateStudents=await Student.findByIdAndUpdate(_id,req.body,{
        new:true
    });
    res.send(updateStudents);
   
    }catch(e){
        res.status(500).send(e);
    }
    
})




app.listen(port,()=>{
    console.log(`connection is set up at ${port}`)
})