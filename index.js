require('dotenv').config();
const dbURL         = process.env.DB_URL; 
const express       = require('express');
const {v4: uuidv4}  = require('uuid');
const cors          = require('cors');
const bodyParser    = require('body-parser');
const app           = express();
const port          = 5000;
let   todos         = []; 

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/todo', (req, res)=>{
    res.json({data: todos});
});

app.post('/todo', (req, res)=>{
    let newTodo = {id: uuidv4(), data: req.body.data, isCompleted: false};
    todos.push(newTodo);
    res.json({timeStamp: Date.now()});
});

app.put('/todo', (req, res)=>{
    todos = todos.map(item => {
     if(item.id === req.body.data) {
       return {id: item.id, data: item.data, isCompleted: !item.isCompleted}; 
     }else{
       return item;
     }
  }); 
    res.json({timeStamp: Date.now()});
});

app.delete('/todo', (req, res)=>{
    todos = todos.filter(item => item.id !== req.body.data);
    res.json({timeStamp: Date.now()});
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});

