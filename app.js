const Todo      = require('./models/todo.js');
const mongoose  = require('mongoose');
const helmet    = require('helmet');
const cors      = require('cors');
const express   = require('express');
const app       = express();

/* Environment variables */

require('dotenv').config();
const DBURI         = process.env.DB_URI;
const PORT          = process.env.PORT || 5000;

/* Data Base */

mongoose.connect(DBURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

mongoose.connection.on('connected', () => {
    console.log('DB connected');
});

mongoose.connection.on('error', err => {
    console.log('DB connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('DB disconnected');
});

mongoose.connection.on('open',  () => {
    console.log('DB connection is open');
});

process.on('SIGINT', function() {
    mongoose.connection.close( () =>  {
      console.log('Mongoose disconnected on app termination');
      process.exit(0);
    });
});

/*  Middleware */

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(helmet());

/*  Routes */

app.get('/todo', (req, res) => {
    Todo.find().then(response => res.json({data: response}));
});

app.post('/todo', (req, res) => {
    let newTodo = new Todo({data: req.body.data, isCompleted: req.body.isCompleted});
    newTodo.save().then(() => res.sendStatus(204));
});

app.put('/todo', async (req, res) => {
     await Todo.updateOne({_id: req.body.id}, {isCompleted: !todo.isCompleted });
     await res.sendStatus(204);
    let todo = await Todo.findById({_id: req.body.id});
});

app.delete('/todo', async (req, res) => {
    await Todo.deleteOne({_id: req.body.id});
     await res.sendStatus(204);
});


app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
