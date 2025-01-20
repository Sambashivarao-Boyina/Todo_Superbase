import React, { useState } from 'react'
import supabase from '../../../helper/superbaseClient';
import { Todo } from '../../../model/Todo';

type AddTodoPopupProps ={
    userId: string
    addTaskPopup:boolean
    setAddTaskPopup: (value:boolean) => void
    setTodos:(todos: Todo[]) => void
}

const AddTodoPopup:React.FC<AddTodoPopupProps> = ({addTaskPopup,setAddTaskPopup}) => {
    const [newTask, setNewTask] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const addTodoHandler = async() => {
        
        if(newTask.length == 0) {
            return;
        }
        setIsLoading(true);
        const {  error } = await supabase
            .from("todos")
            .insert([{ task:newTask }])
            

        if(error) {
            alert(error.message);
        }
       

        setAddTaskPopup(false);
        setIsLoading(false)

  if (error) {
    throw new Error(error.message);
  }
    }

    return (
        <div className={`fixed z-20 drop-shadow-lg w-3/4 md:w-1/3 lg:w-1/2 p-4 pb-20 bg-white rounded-md  animate-fadeIn ${addTaskPopup ? "animate-fadeIn" :"animate-fadeOut"}`}>
            <button onClick={() => {setAddTaskPopup(false)}} className="bg-blue-600 px-4 py-1 text-white rounded-md absolute bottom-4 right-4">
                Close
            </button>

            <div>
                <textarea
                    placeholder="Enter the task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className='w-full border-2 border-gray-400 rounded-lg p-4'
                />
                <button disabled={isLoading} onClick={addTodoHandler} className={`w-full p-2 text-white font-semibold  rounded-lg mt-2 ${isLoading ? "bg-blue-300" :"bg-blue-600"}`}>ADD</button>
            </div>
        </div>
    )
}

export default AddTodoPopup
