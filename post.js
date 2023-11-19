const express=require('express');
const bodyParser=require('body-parser');

const app=express();
const PORT=5000;

    app.use(bodyParser.json());

    const students=[
        {studentId:'101',student_name:'jhon doe',GPA:3.5},
        {studentId:'102',student_name:'caleb smith',GPA:4},
        {studentId:'103',student_name:'carle smith',GPA:4.7}
    ];

    app.post('/students',(req,res)=>{
        const { studentId,student_name,GPA}=req.body;

        if(students.some(student =>student.studentId===studentId)){
            return res.status(400).json({error:'studentId must be unique'});
        }
        

        students.push({message:'studentdetails added succesfully'});
    });
    

    app.get('/students/:id',(req,res)=>{
        const studentId =req.params.id;

        const student=students.find(student=>student.studentId===studentId);

        if(!student){
            return res.status(400),json({error:'student data not found'});
        }

        res.json({
            message:'STUDENT DETAILS!!',
            studentId:student.studentId,
            NAME:student.student_name,
            GPA:student.GPA
        });

        app.get('/topper',(req,res)=>{

            if(students.length===0){
                return res.status(404).json({error:'no students found'});
            }

            const topper=students.reduce((prev,current)=>
            prev.GPA > current.GPA? prev:current
            );

            res.json({
                message:'topper in the class',
                studentId:topper.studentId,
                name:topper.student_name,
                GPA:topper.GPA
            });
        });
    });

    app.listen(PORT,() =>{
        console.log('server is running ');
    });