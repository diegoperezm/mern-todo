const  mongoose    = require("mongoose");

const  todoSchema = mongoose.Schema({
    data: {
        type: String,
        required: true,
        trim: true
    }, 
    isCompleted: {
        type: Boolean,
        required: true
    }
});

const Todo = mongoose.model('Todo', todoSchema );

module.exports = Todo;

