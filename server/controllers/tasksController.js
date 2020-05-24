const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/tasks', {useNewUrlParser: true, useUnifiedTopology: true});
const tasksSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    confirm: {
        type: Boolean,
        default: false
    }
})
const task = mongoose.model('tasks', tasksSchema)

// crate new tasks:
// task({task: 'eat', confirm: false},
//     {task: 'drink', confirm: false}, 
//     {task: 'sleep', confirm: false}).save()

module.exports = function(app){

    app.get('/task', function(req, res){
        console.log("connect" + req.url)
        task.find({}, function(err, data) {
            if (err) throw err
            res.send({'tasks': data})
        })
    })

    app.post('/addTask', async (req, res) => {
        task.find({task: await req.body.task}, function(err, data) {
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
    })

    app.delete('/deleteTask/:id', function(req, res){
        const url = req.url.split('/')
        const id = url[url.length-1]
        task.deleteOne({'_id': id}, function(err, data){
            if (err) throw err 
            if (data.deletedCount){
                console.log("delete " + id + " successfuly")
                // delete success
                res.send(true)
            } else {
                res.send(false)
            }
        })
    })

    app.post('/deleteDoneTasks', function(req, res){
        task.deleteMany({_id: { $in: req.body }}, function(err, data){
            if (err) throw err 
            if (data.deletedCount){
                // delete success
                res.send(true)
            } else {
                res.send(false)
            }
        })
    })

    app.put('/editTask', async (req, res) => {
        task.updateOne(
            { _id: req.body.id }, 
            { $set: {
              task: req.body.task,
              confirm: req.body.confirm,
            }
         }, function(err, data) {
            if (err) throw err
            if (data.ok) {
                // task edited
                res.send(true)
            } else {
                res.send(false)
            }
        })
    })
}   