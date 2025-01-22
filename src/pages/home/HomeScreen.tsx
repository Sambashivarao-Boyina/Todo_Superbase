import  { useEffect, useState } from 'react'
import Logout from '../components/Logout';
import Task from './componets/Task';
import supabase from '../../helper/superbaseClient';
import { Todo } from '../../model/Todo';
import AddTodoPopup from './componets/AddTodoPopup';

interface Task{
    task:String
}

const HomeScreen = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [userId, setUserId] = useState<string>("");
    const [addTaskPopup, setAddTaskPopup] = useState(false);

    const fetchTodos = async () => {
        if (!userId) return; // Prevent fetching if userId is not set
        setLoading(true);
        const { data, error } = await supabase
            .from("todos")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

        if (error) {
            alert(error.message);
        }

        if (data) {
            setTodos(data as Todo[]);
        }

        setLoading(false);
    };

    useEffect(() => {
        const loadUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                setUserId(user.id);
            }
        };
        loadUser();
    }, []);

    useEffect(() => {
        if (!userId) return;

        fetchTodos();

        
                 // Subscribe to realtime updates
        const subscription = supabase
            .channel("todos-realtime")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "todos" },
                async () => {
                    if(userId) {
                        await fetchTodos();
                    }
                }
            )
            .subscribe();

        // Cleanup subscription on component unmount
        return () => {
            supabase.removeChannel(subscription);
        };    

    }, [userId]); 

    return (
        <div className="w-full h-full flex flex-col items-center justify-center ">
            <div className="absolute top-12 right-2 z-0">
                <Logout />
            </div>

            <div className="flex flex-col p-4 rounded-lg border-2 shadow-sm w-3/4 md:w-1/2 lg:w-1/3 drop-shadow-sm">
                <div className="w-full">
                    <p className="font-semibold text-center text-lg">Tasks</p>
                    {loading && <p className="text-center p-2">Loading...</p>}
                    {todos && todos.length
                        ? todos.map((todo) => <Task key={todo.id} todo={todo} />)
                        : <p className="text-center p-2">No tasks found.</p>}
                </div>
                <button
                    onClick={() => setAddTaskPopup(true)}
                    className="bg-blue-600 p-2 rounded-md text-white font-semibold"
                >
                    Add Todo
                </button>
            </div>

            {addTaskPopup && userId ? (
                <AddTodoPopup
                    userId={userId}
                    addTaskPopup={addTaskPopup}
                    setTodos={setTodos}
                    setAddTaskPopup={setAddTaskPopup}
                />
            ) : null}
        </div>
    );
};

export default HomeScreen;
