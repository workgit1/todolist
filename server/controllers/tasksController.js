const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/tasks', {useNewUrlParser: true, useUnifiedTopology: true});
const tasksSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    IsConfirm: {
        type: Boolean,
        default: false
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    coordinate: {
        type: Array,
        required: true
    }
})
const task = mongoose.model('tasks', tasksSchema)

module.exports = app => {

    app.get('/task', (req, res) => {
        try {
            task.find({}, (err, data) => {
                res.send({'tasks': data})
            })
        }
        catch (err) {
            console.log(`Fail getting all tasks ${err.massage}`)
        }
        
    })

    app.post('/addTask', (req, res) => {
        try {
            task.find({content: req.body.content}, (err, data) => {
                if (err) throw err
                if (data.length == 1) {
                    res.send(false)
                } else {
                    task({
                        content: req.body.content, 
                        start: req.body.start, 
                        end: req.body.end,
                        coordinate: req.body.coordinate
                    }).save().then( task => {
                        res.send(task._id)
                    })
                }
            })
        }
        catch (err) {
            throw Error(`Fail add new task ${err.massage}`)
        }
    })

    app.delete('/deleteTask/:id', (req, res) => {
        try {
            const url = req.url.split('/')
            const id = url[url.length-1]
            task.deleteOne({'_id': id}, (err, data) => {                 if (err) throw err 
                if (data.deletedCount){
                    console.log(`delete ${id} successfuly`)
                    res.send(true)
                } else {
                    res.send(false)
                }
            })
        }
        catch (err) {
            throw Error(`Fail delete task ${err.massage}`)
        }
    })

    app.post('/deleteDoneTasks', (req, res) => {
        try{
            task.deleteMany({_id: { $in: req.body }}, (err, data) => {
                if (err) throw err 
                data.deletedCount ? res.send(true) : res.send(false)
            })
        }
        catch (err) {
            throw Error(`Fail delete all done tasks ${err.massage}`)
        }
    })

    app.put('/editTask', async (req, res) => {
        try {
            task.updateOne(
                { _id: req.body.id }, 
                { $set: {
                content: req.body.content,
                IsConfirm: req.body.IsConfirm,
                }
            }, (err, data) => {
                if (err) throw err
                data.ok ? res.send(true) : res.send(false)
            })
        }
        catch (err) {
            throw Error(`Fail edit task ${err.massage}`)
        }
    })

    app.put('/editDate', async (req, res) => {
        try {
            task.updateOne(
                { _id: req.body.id }, 
                { $set: {
                start: req.body.start,
                end: req.body.end,
                }
            }, (err, data) => {
                if (err) throw err
                data.ok ? res.send(true) : res.send(false)
            })
        }
        catch (err) {
            throw Error(`Fail edit task ${err.massage}`)
        }
    })
}   