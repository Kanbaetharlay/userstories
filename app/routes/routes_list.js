module.exports = function(app, db) {
    /*========================
        FOR REGISTRATION
        To register one or more students to a specified teacher.
    ==========================*/
    app.post('/api/register', (req, res) => {
        var Array = req.body.students;
        Array.forEach(student => {
            let addstudent = { teacher: req.body.teacher, student: student};
            let sql = 'INSERT INTO register SET ?';
            let query = db.query(sql, addstudent, (err, results) => {
                if(err) throw err;
            });
        });
      
        res.send({"status": "Register Successful!"});
    });

    /*========================
        RETRIEVE LIST OF STUDENTS
        Retrieve students who are registered to ALL of the given teachers.
    ==========================*/
    //convert url parameters to object
    function changeParametersToObject(teachers) {
        let result = {}
        for(let teacher of teachers) { 
          result[teacher[0]] = teacher[1];
        }
        return result;
      }
    
    app.get('/api/commonstudents', (req, res) => {
        let params = new URLSearchParams(req.query);
        let entries = params.entries(); 
        var teachers = changeParametersToObject(entries).teacher.split(',');
        lookForStudents(teachers);
        async function lookForStudents(teachers) {
            let foundStudents = [];
            for (let i = 0; i<teachers.length; i++) {
                try {
                    let sql = "SELECT student FROM register WHERE teacher = ?";
                   
                    let query = await db.query(sql, teachers[i], (err, results) => {
                        if(err) throw err;
                        results.forEach(student => {
                            foundStudents.push(student.student);
                        });
                        if(teachers.length-1 === i){
                            res.send( {students:foundStudents});
                           } 
                    });
                } catch(e) {
                    res.send({message: e.getMessage()});
                }
            }
        }
    })
    
    /*========================
        To suspend a specified student
    ==========================*/
    app.post('/api/suspend', (req, res) => {
        let student = req.body.student;
        let sql = "UPDATE register SET suspend = 'S' WHERE student = ?";
        let query = db.query(sql, student, (err, results) => {
            if(err) throw err;
            res.send({status: "Student suspended!"});
        })
    })
    /*========================
        NOTIFICATION STUDENTS
        Retrieve Notifications for students.
    ==========================*/
    app.post('/api/retrievefornotifications', (req, res) => {
        let teacher = req.body.teacher;
        let notification = req.body.notification;
        let split_notification = notification.split('@');
        var data = [];
        let sql = "SELECT student FROM register WHERE teacher = ? AND suspend = 'R';"
        let query = db.query(sql, teacher, (err, results) => {
            if(err) throw err;
            results.forEach(student => {
                data.push(student.student);
            })
            if(split_notification.length > 1 ) {
                for(let i = 1; i < split_notification.length; i += 2) {
                    data.push(split_notification[i] + "@" + split_notification[i+1]);
                }
            }
            res.send({recipients: data});
        })
    })
}