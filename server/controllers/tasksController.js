const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/tasks', {useNewUrlParser: true, useUnifiedTopology: true});
const tasksSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    IsConfirm: {
        type: Boolean,
        default: false
    }
})
const task = mongoose.model('tasks', tasksSchema)

module.exports = (app) => {

    app.get('/task', (req, res) => {
        try {
            task.find({}, (err, data) => {
                res.send({'tasks': data})
            })
        }
        catch (err) {
            console.log("Fail getting all tasks " + err.massage)
        }
        
    })

    app.post('/addTask', async (req, res) => {
        try {
            task.find({task: await req.body.task}, (err, data) => {
                if (err) throw err
                console.log(data.length)
                if (data.length == 1) {
                    // task already exist
                    res.send(false)
                } else {
                    task({task: req.body.task}).save().then( task => {
                        res.send(task._id)
                    })
                }
            })
        }
        catch (err) {
            throw Error("Fail add new task " + err.massage)
        }
    })

    app.delete('/deleteTask/:id', (req, res) => {
        try {
            const url = req.url.split('/')
            const id = url[url.length-1]
            task.deleteOne({'_id': id}, (err, data) => {                 if (err) throw err 
                if (data.deletedCount){
                    console.log("delete " + id + " successfuly")
                    // delete success
                    res.send(true)
                } else {
                    res.send(false)
                }
            })
        }
        catch (err) {
            throw Error("Fail delete task " + err.massage)
        }
    })

    app.post('/deleteDoneTasks', (req, res) => {
        try{
            task.deleteMany({_id: { $in: req.body }}, (err, data) => {
                if (err) throw err 
                if (data.deletedCount){
                    // delete success
                    res.send(true)
                } else {
                    res.send(false)
                }
            })
        }
        catch (err) {
            throw Error("Fail delete all done tasks " + err.massage)
        }
    })

    app.put('/editTask', async (req, res) => {
        try {
            task.updateOne(
                { _id: req.body.id }, 
                { $set: {
                task: req.body.task,
                IsConfirm: req.body.IsConfirm,
                }
            }, (err, data) => {
                if (err) throw err
                if (data.ok) {
                    // task edited
                    res.send(true)
                } else {
                    res.send(false)
                }
            })
        }
        catch (err) {
            throw Error("Fail edit task " + err.massage)
        }
    })
}   