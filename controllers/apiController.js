var Todos = require('../models/todoModel');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
module.exports = function(app){
    const storage = multer.diskStorage({
        destination: function(req,file,cb){
            cb(null,'./uploads/');
        },
        filename: function(req,file, cb){
            cb(null, new Date().toISOString()+ file.originalname);
        }
    })
    const fileFilter = (req,file,cb) =>{
        if(file.mimetype === 'image/jpeg' 
        || file.mimetype === 'image/png' 
        || file.mimetype === 'application/pdf'){
            cb(null,true)
        }else{
            cb(new Error("We don't accept those file types"),false)
        }   
    }

    const upload = multer({
        storage: storage, 
        limits: {
        fileSize: 1024 * 1024 * 5,
        },
        fileFilter: fileFilter
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/api/:id/attachment',upload.single('clientFile') ,  function(req,res){
        
           Todos.findByIdAndUpdate(req.params.id,{
            attachment: req.file.path
        },function(err){
            if(err) throw err;
          Todos.findById({_id: req.params.id}, function (err, todo){
                if(err) throw err;
               return res.send(todo);
            })
        })
    
    });
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
                hasAttachment: req.body.hasAttachment,
                attachment: req.body.attachment
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
                hasAttachment: req.body.hasAttachment,
                attachment: req.body.attachment
            });
            newTodo.save(function(err){
                if(err) throw err;
                Todos.find({username: req.user.googleID}, function(err, todos){
                    res.send(todos)                
                })
            })
            
        }
    });

    app.delete('/api/todo/delete/:id', function(req,res){
        Todos.findByIdAndRemove({_id:req.params.id}, function(err,todo){
            
                if(todo.attachment.indexOf('upload') !== -1){
                    fs.unlink(todo.attachment, (err) =>{
                        if(err) throw err;
                        console.log('file was deleted');
                    })
                }
            Todos.find({username: req.user.googleID}, function(err, todos){
                res.send(todos);
            })
        })        
    })

  

}