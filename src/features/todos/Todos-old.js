import { Link, useNavigate } from 'react-router-dom';
import './Todos.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Todos() {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTodos = async () => {
            setIsLoading(true);
            try{
                const res = await axios.get("http://localhost:3000/todos");
                setIsLoading(false);
                setTodos(res.data);
                setError(null);
            }
            catch(err){
                setIsLoading(false);
                console.log(err);
                setError(err.message);
            }
        }
        fetchTodos();
    }, []);

    const markDone = async (e, todo) => {
        e.stopPropagation();
        const res = await axios.patch(`http://localhost:3000/todos/${todo.id}`, {
            ...todo,
            completed: !todo.completed
        });
        setTodos(todos.map(
            t => {
                if(todo.id === t.id){
                    return res.data;
                }
                return t;
            }
        ))
    }
    const deleteTodo = async (e, todoId) => {
        e.stopPropagation();
        const confirm = window.confirm("Are you sure, you want to delete this todo?");
        if (confirm){
            await axios.delete(`http://localhost:3000/todos/${todoId}`);
            setTodos(todos.filter(t => t.id != todoId));
        }
    } 

  return (
    <div style={{ 'display': 'flex', 'flexDirection': 'column', 'alignItems': 'center' }}>
        <h2>Todos</h2>

        <div style={{ 'margin': '0 0 1rem' }}>
        <Link to='/add-todo' className="btn">Add Todo</Link>
        </div>
        
        {error && <div>{error}</div>}

        {isLoading && 'Loading todos...'}

        <section className="todos-list">
                {todos && todos.map(todo => (
                    <article key={todo.id} onClick={() => navigate(`/todos/${todo.id}`)}>
                        {
                            todo.completed ? 
                            <h2><strike>{todo.title}</strike></h2> : 
                            <h2>{todo.title}</h2>
                        }
                        <button className="btn" onClick={(e) => markDone(e, todo)}>
                            {todo.completed ? 'Mark Not Done' : 'Mark Done'}
                        </button>

                        <span
                            className="close"
                            title="Delete Todo"
                            onClick={(e) => deleteTodo(e, todo.id)}
                        >
                            &times;
                        </span>
                    </article>
                ))}
            </section>
    </div>
  )
}
