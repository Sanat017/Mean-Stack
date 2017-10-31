const express= require('express');
const bodyParser= require('body-parser');
const mongojs= require('mongojs');
const path= require('path');
const db=mongojs('user_information',['users']);
const port=3000;
const app= express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.get('/informationlist',function(req,res){
    db.users.find(function(err,info){
        if(err){
            console.log("Error in finding data");
        }else{
            res.json(info)
        }
    });

});

app.post('/informationlist',function(req,res){

    db.users.insert(req.body,function(err,info){
        if(err){
            console.log("Error in inserting data");
        }else{
            res.json(info)
        }
    });

});

app.delete('/informationlist/:id',function(req,res){
    var id = req.params.id;
    db.users.remove({_id:mongojs.ObjectId(id)},function(err,info){
        if(err){
            console.log("Error in inserting data");
        }else{
            res.json(info)
        }
    });

});
app.get('/informationlist/:id',function(req,res){
    var id = req.params.id;
    db.users.findOne({_id:mongojs.ObjectId(id)},function(err,info){
        if(err){
            console.log("Error in inserting data");
        }else{
            res.json(info)
        }
    });

});


app.put('/informationlist/:id',function(req,res){
    var id = req.params.id;
    db.users.findAndModify({query:{_id:mongojs.ObjectId(id)},
        update:{$set:{name:req.body.name,roll:req.body.roll,email:req.body.email,address:req.body.address,college:req.body.college,}},
        new:true},
        function(err,info){
        if(err){
            console.log("Error in inserting data");
        }else{
            res.json(info)
        }
    });

});

app.listen(port,function(){
    console.log("server running on localhost:"+port)
});