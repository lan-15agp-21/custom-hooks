import { useEffect, useReducer } from 'react';
import { todoReducer } from './todoReducer';

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodos = () => {

    const [ todos, dispatch ]= useReducer( todoReducer, [], init );

    useEffect( () => {
        localStorage.setItem('todos', JSON.stringify( todos ) );
    }, [todos])

    const hanleNewTodo = ( todo ) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }

        dispatch( action );
    }

    const hanleDeleteTodo = ( id ) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        });
    }
    
    const hanleToggleTodo = ( id ) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        });
        
    }

    return{
        todos,

        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo=> !todo.done).length,

        hanleNewTodo,
        hanleDeleteTodo,
        hanleToggleTodo,
    }

}
