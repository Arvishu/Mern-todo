// installser express

const express = require('express');
const dotenv = require('dotenv').config();

// créer une nouvelle instance d'express
const app = express();

// avoir accés au middleware bodyparser
const bodyParser = require('body-parser');
const path = require ('path');

// avoir accés au middleware cors
const cors = require('cors');

const mongoose = require('mongoose');
const todoRoutes = express.Router();

// définir une constante qui contient le n°de port de notre server
const PORT = process.env.PORT;

let Todo = require('./todo.model');

// avoir accés au middleware cors et bodyparser dans notre instance d'express invoqué à la ligne 5
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB||process.env.MONGO_DB, { useUnifiedTopology: true, useNewUrlParser: true, });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database established sucessfully");
})

todoRoutes.route('/').get(function (req, res) {
    Todo.find(function (err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });

});
todoRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Todo.findById(id, function (err, todo) {
        res.json(todo);
    });
});
todoRoutes.route('/add').post(function (req, res) {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({ 'todo': 'todo added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});
todoRoutes.route('/update/:id').post(function (req, res) {
    Todo.findById(req.params.id, function (err, todo) {
        if (!todo)
            res.status(404).send('data is not found');
        else
            todo.todo_description = req.body.todo_description;
        todo.todo_responsible = req.body.todo_responsible;
        todo.todo_priority = req.body.todo_priority;
        todo.todo_completed = req.body.todo_completed;

        todo.save().then(todo => {
            res.json('Todo updated');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});


app.use('/todos', todoRoutes);


if (process.env.NODE_ENV === 'production'){
    app.use(express.static('mern-todo-app/build'));

    app.get('*',(req,res)=> {
        res.sendFile(path.join(__dirname,'mern-todo-app','build','index.html'));
    });
}

// initialiser l'écoute du port 4000
app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);

});

// cette partie permet de commencer l'écoute des requetes entrantes sur le port 4000


