import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {increment, incrementByNumber, selectCount} from '../features/todos/todoSlice';

export default function Counter() {
    const dispatch = useDispatch();
    const count = useSelector(selectCount);

  return (
    <div>
        {count} <br/>
        <button onClick={()=> dispatch(increment())}>+1</button>
        
        <button onClick={() => dispatch(incrementByNumber(3))}>+3</button>
        <button onClick={() => dispatch(incrementByNumber(10))}>+10</button>
        <button onClick={() => dispatch(incrementByNumber(-1))}>-1</button>
    </div>
  )
}
