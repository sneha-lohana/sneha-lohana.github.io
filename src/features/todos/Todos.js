import { Link, useNavigate } from 'react-router-dom';
import './Todos.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, markTodoDone, selectError, selectStatus, selectTodos } from './todoSlice';

export default function Todos() {
    const navigate = useNavigate();
    const todos = useSelector(selectTodos);
    const status = useSelector(selectStatus);
    const error = useSelector(selectError);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'idle')
        {
            dispatch(fetchTodos());
        }
    }, [dispatch, status]);

    const markDone = async (e, todo) => {
        e.stopPropagation();
        dispatch(markTodoDone(todo));
    }
    const deleteTodo = async (e, todoId) => {
        e.stopPropagation();
    } 

  return (
    <div style={{ 'display': 'flex', 'flexDirection': 'column', 'alignItems': 'center' }}>
        <h2>Todos</h2>

        <div style={{ 'margin': '0 0 1rem' }}>
        <Link to='/add-todo' className="btn">Add Todo</Link>
        </div>
        
        {error && <div>{error}</div>}

        {status === 'loading' && 'Loading todos...'}

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
