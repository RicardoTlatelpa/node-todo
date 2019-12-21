var Todos = require('../models/todoModel');
var bodyParser = require('body-parser');

module.exports = function(app){


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));


    app.get('/api/todos/:username', function(req,res){

        Todos.find({ username: req.params.username }, function(err,todos){
            if(err) throw err;

            res.send(todos);
        });
    });
    app.get('/api/todo/:id', function(req,res){

        Todos.findById({_id: req.params.id}, function(err,todo){
            if(err) throw err;
            res.send(todo);
        });
    });
    app.post('/api/isDone', function(req,res){
        if(req.body.id){
            Todos.findByIdAndUpdate(req.body.id,{
                isDone: req.body.isDone
            },function(err){
                if(err) throw err;
                res.send('Success');
            })
        }
    })
    app.post('/api/todo', function(req,res){

        if(req.body.id){
            Todos.findByIdAndUpdate(req.body.id,{
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            },
            function(err,todo){
                if(err) throw err;
                
            })
        }
        else{
            var newTodo = Todos({
                username: req.body.username,
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            });
            newTodo.save(function(err){
                if(err) throw err;
                Todos.find({username: req.user.googleID}, function(err, todos){
                    res.send(todos)
                })
            })
            
        }
    });

    app.delete('/api/todo/:uname/delete/:id', function(req,res){

        Todos.findByIdAndRemove({_id:req.params.id}, function(err){
            if(err) throw err;
            Todos.find({username: req.user.googleID}, function(err, todos){
                res.send(todos);
            })
        })        
    })

  

}