import React, { useState } from 'react'
import { Todo } from '../../../model/Todo'
import { TrashIcon } from '@heroicons/react/24/outline'
import supabase from '../../../helper/superbaseClient'

type TodoProps ={
    todo:Todo
}

const Task: React.FC<TodoProps> =({todo}) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const deleteTodoHandler = async( todoId: string) => {
        setIsLoading(true)
        const {  error } = await supabase
            .from('todos')
            .delete()
            .eq('id', todoId)

        if(error) {
            alert(error.message);
            return;
        }

        setIsLoading(false)
    }

    const updateTodoHandler = async( todoId: string, isComplete:boolean) => {
        setIsLoading(true);
        const { error } = await supabase
            .from('todos')
            .update({ is_complete: isComplete })
            .eq('id', todoId)

        if(error) {
            alert(error.message);
        }
        setIsLoading(false)
    }


    return (
        <div key={todo.id} className='flex flex-row items-center justify-between p-2 '>
            {
                isLoading ?
                    <p className='text-center'>Loading...</p>
                : <div className="flex items-center space-x-5">
                    <input type='checkbox' checked={todo.is_complete} onChange={(e)=> updateTodoHandler(todo.id, e.target.checked)} className='w-4 h-4'/>
                    <p className={`${todo.is_complete ? "line-through" : ""} `}>{ todo.task}</p>
                </div>
            }
            
            <button onClick={()=> deleteTodoHandler(todo.id)}><TrashIcon className='w-5 h-5 text-red-600' /></button>
        </div>
    )
}

export default Task
