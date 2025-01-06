import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Todo() {
    const { id } = useParams();
    const [todo, setTodo] = useState(null);

    useEffect(() => {
      const fetchTodo = async () => {
        const res = await axios.get(`http://localhost:3000/todos/${id}`);
        setTodo(res.data);
      }
      fetchTodo();
    }, [id]);

  return (
    <div style={{ 'padding': '1rem' }}>
      {todo && <h2>{todo.title}</h2>}
    </div>
  )
}
