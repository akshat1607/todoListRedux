export const addTodo=(content)=>(
    {
        type:'ADD_TODO',
        payload:content
    }
);

export const checkTodo=(id,isChecked)=>(
    {
        type:'CHECK_TODO',
        payload:{id:id,isChecked:isChecked}
    }
)

export const checkAllTodos=(id)=>(
    {
        type:'CHECK_ALL_TODOS',
        payload:id
    }
)
export const editTodo=(id,todo)=>(
    {
        type:'EDIT_TODO',
        payload:{id:id,todo:todo}
    }
)

export const deleteTodo=(id)=>(
    {
        type:'DELELTE_TODO',
        payload:id
    }
)

export const clearCompleted=(id)=>(
    {
        type:'CLEAR_COMPLETED',
        payload:id
    }
)