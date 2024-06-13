import './style.css'
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [newItem,setNewItem] = useState(" ")
  const[task,setTask] = useState([])

  useEffect(()=>{
    getdata()
  },[])

  const getdata = async()=>{
  try{
    const res = await fetch("http://localhost:5000");
    if(!res.ok){
      throw new Error("failed to fetch data");
    }
    const data = await res.json()
    //console.log(data);
    setTask(data);
    //console.log(task);
  }catch (error) {console.log(error)}
  }

  function handleSubmit(e){
    e.preventDefault();
    const datapost = async()=>{
      try{
        const res = await fetch("http://localhost:5000",{method:"POST",headers:{'Content-Type': 'application/json'},body:JSON.stringify({title:newItem})});
        if(!res.ok){
          throw new Error("Failed to post data!");
        }
      }catch(error) {console.log(error)}
    }
    datapost()
    setTask(currentTodos =>{
      return [...currentTodos,{title:newItem}]
    })
    setNewItem("")
    
  }

  const toggleTodo = async(e,id,title,completed) =>{ 
    e.preventDefault()
    try{

      setTask(currentTodos=>{
        return currentTodos.map(todo=>{
          if(todo.todo_id===id){
            return {...todo,completed}
          }
          return todo
        })})
        const response = await fetch(`http://localhost:5000/${id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:title,completed:completed})})
       //window.location='/';
      //  setTask(currentTodos=>{
      //   return currentTodos;
      //  })
      console.log(response);
      if(!response.ok){
        throw new Error("Failed to put data!");
      }
      
    }catch(error){console.log(error);}
  }

  const deleteTodo = async(id)=>{
    try{
      console.log(id);
        const det = await fetch(`http://localhost:5000/${id}`,{
          method:"DELETE"
        });
        if(!det.ok){
          throw new Error("Failed to delete data!");
        }
        //det(id)
        setTask(currentTodos=>{
          return currentTodos.filter((todo)=> todo.todo_id!==id)
        })
    }catch(error){
      console.log(error);
    }
  }
  return (
    <>
      <form className='new-item-form' onSubmit={handleSubmit} >
        <div className='heading'>
          <h1>Task Management System</h1>
        </div>
      <div className='form-row'>
        <label htmlFor='item'>New item</label>
        <input value={newItem} onChange={e=> setNewItem(e.target.value)} type='text' id='item'></input>
      </div>
      <button className='btn'>Add</button>
    </form>
    <h1 className='header'>Todo List</h1>
    <ul className='list'>
      {task.length=== 0 && "No Todo"}
      {task.map(todo=>{
        return <li key={todo.id}>
        <label>
        <input type='checkbox' checked={todo.completed} onChange={e=>{toggleTodo(e,todo.todo_id,todo.title,!todo.completed)}}/>
          {todo.title}
        </label>
        <button onClick={()=>deleteTodo(todo.todo_id)} className='btn btn-danger'>Delete</button>
      </li>
      })}
    </ul>
  </>
    
  );
}

export default App;
