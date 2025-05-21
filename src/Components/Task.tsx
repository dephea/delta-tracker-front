import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";

type Task = {
    id: number;
    title: string;
    description?: string;
    isCompleted: boolean;
    dueDate?: string;
    createdAt?: string;
    updatedAt?: string;
  };



export default function TaskItem({taskId}: {taskId: number}) {
    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/find/${taskId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

                const data = await res.json();
                setTask(data);
            } catch (error) {
                console.error('Failed to fetch task:', error);
                alert('Failed to fetch task: ' + error);
            } finally {
                setLoading(false);
            }
        };

        if (token && taskId) {
            fetchTask();
        }

    }, [taskId, token]);


    if (loading) return <div>Loading...</div>;
    if (!task) return <div>Task not found</div>;
    
    return (
        <div>
          <h3>{task.title}</h3>
          <p>{task.description ?? "No description"}</p>
          <p>Status: {task.isCompleted ? "Completed" : "Pending"}</p>
          <p>Due: {task.dueDate ?? "No due date"}</p>
        </div>
      );
}