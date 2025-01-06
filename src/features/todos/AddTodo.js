import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddTodo() {
  const [todoForm, setTodoForm] = useState({
      title: '',
      completed: false
    });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setTodoForm({
      ...todoForm,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/todos", todoForm);
    navigate("/todos");
  }

    return (
        <div>
            <form className="add-form" onSubmit={handleSubmit}>
                <h2 style={{ 'textAlign': 'center' }}>Add New Todo</h2>
                <div className="form-control">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" value={todoForm.title} onChange={handleChange} name="title" />
                </div>
                <input type="hidden" name="completed" value={todoForm.completed} />
                <button className="btn">Add Todo</button>
            </form>
        </div>
    );
}
