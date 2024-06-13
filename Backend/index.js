const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require("cors");
const pool = require('./db');

//middlewares
app.use(bodyParser.json());
app.use(cors())
app.use(express.json());

//Routes

//get
app.get('/', async(req,res)=>{
    try{
        const allTodo = await pool.query("SELECT * FROM tasks");
        res.json(allTodo.rows);

    }catch(error){console.log(error);}
})

//post
app.post('/',async (req,res)=>{
    try{
        const {title} =req.body;
        //const {completed} = req.body.completed;
       const newTodo = await pool.query(
        "INSERT INTO tasks (title) VALUES($1) RETURNING *",[title]);
        res.json(newTodo.rows[0])
       //console.log(req.body);
    }catch(error) {console.log(error);}
});

//put
app.put('/:id',async (req,res)=>{
    try{
        const {id} = req.params;
        const {completed}= req.body;
        const updateVal = await pool.query(
            "UPDATE tasks SET completed =$1 WHERE todo_id=$2 RETURNING *",[completed,id]);
        res.json(updateVal.rows[0])
        
    }catch(error){console.log(error);}
})

//delete
app.delete('/:id', async (req,res) => {
    try{
        const {id} = req.params;
        const deleteVal = await pool.query("DELETE FROM tasks WHERE todo_id=$1",[id]);
        //res.json(deleteVal);
        res.sendStatus(200)
       // alert("Deleted")

    }catch(error){
        console.log(error);
    }
})


app.listen(5000,()=>{
    console.log("server connected");
})