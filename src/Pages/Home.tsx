import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { useAuth } from "../Context/AuthContext";
import { useEffect, useState } from "react";
import TaskItem from "../Components/Task";


interface Task {
    id: string; 
}

const HomePage = () => {
    const navigate = useNavigate();
    const { user, token } = useAuth();
    const [tasks, setTasks] = useState<string[]>([]); // tasks contains id of all tasks


    useEffect(() => {
        if (!user && !token) {
            console.log("User is not logged in");
            navigate("/login");
        }
        const fetchTasks = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/all`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data: Task[] = await res.json(); // Explicitly type the response as Task[]

                const idsArray = data.map((task: Task) => task.id); // Type of 'task' is now inferred
                setTasks(idsArray);


            } catch (error) {
                console.error("Failed to fetch tasks:", error);
                alert("Failed to fetch tasks: " + error);
            }
        };

        if (token) {
            fetchTasks();
        }
    }, [token]);

    return (
        
        <>
        <Header />
        
        <div>
            {tasks.map((taskId) => (
                <TaskItem taskId={Number(taskId)} />
            ))}
        </div>
        
        </>
    );
};

export default HomePage;
