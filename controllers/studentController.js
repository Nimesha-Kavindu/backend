import Student from "../models/student.js";

export function getStudents(req, res) {
    Student.find().then(
        (data) => {
            res.json(data);
        }
    ).catch(
        () => {
            res.json({
                message: 'Error fetching students'
            });
        }
    );
}

export function addStudent(req,res){

    const student = new Student({
        name : req.body.name,
        age : req.body.age,
        possition : req.body.possition
    })

    student.save().then(
        ()=>{
            res.json({
                message: 'Student saved successfully',
            });
        }
    ).catch(
        ()=>{
            res.json({
                message: 'Error saving student',
            });
        }
    )
}