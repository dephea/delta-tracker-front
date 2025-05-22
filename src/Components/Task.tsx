import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { ImgComparisonSlider } from '@img-comparison-slider/react';

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
    const [sliderValue, setSliderValue] = useState(6);
    const [isDragging, setIsDragging] = useState(false);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

  const updateTaskCompletion = async (completed: boolean) => {
    console.log('Updating task completion:', completed);
        try {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/update`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              id: taskId,
              isCompleted: completed,
            }),
          });
          if (!res.ok) throw new Error(`HTTP error status: ${res.status}`);
          const data = await res.json();
          setTask(data);
          setSliderValue(completed ? 100 : 0);
        } catch (error) {
          console.error('Failed to update task:', error);
          alert('Failed to update task: ' + error);
        }
      };



    // fetching the task
    useEffect(() => {
      console.log('Fetching task with ID:', taskId);
        const fetchTask = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/find/${taskId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!res.ok) throw new Error(`HTTP error status: ${res.status}`);

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

    useEffect(() => {
      if (task) {
        setSliderValue(task.isCompleted ? 100 : 0);
      }
    }, [task]);


    // handle the slider value
    useEffect(() => {
        //if (isDragging) return;
        if (sliderValue >=95 && !task?.isCompleted) {
            updateTaskCompletion(true);
        } else if (sliderValue <= 5 && task?.isCompleted) {
            updateTaskCompletion(false);
        }
        
      }, [sliderValue, isDragging, task?.isCompleted]);


    if (loading) return <div>Loading...</div>;
    if (!task) return <div>Task not found</div>;
    
    const currentTask = (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '16px',
            boxSizing: 'border-box',
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '0.9rem',
            lineHeight: '1.4',
            color: '#222',
            backgroundColor: '#fff',
          }}
        >
          <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem' }}>{task.title}</h3>
      
          {task.description && (
            <p style={{ margin: '0 0 12px 0', color: '#555' }}>{task.description}</p>
          )}
      
          <p style={{ margin: '0 0 6px 0' }}>
            <strong>Status:</strong>{' '}
            <span style={{ color: task.isCompleted ? 'green' : '#d35400' }}>
              {task.isCompleted ? 'Completed' : 'Pending'}
            </span>
          </p>
      
          {task.dueDate && (
            <p style={{ margin: '0 0 6px 0' }}>
              <strong>Due:</strong> {new Date(task.dueDate).toLocaleString()}
            </p>
          )}
      
          {task.createdAt && (
            <p style={{ margin: '0 0 6px 0', fontSize: '0.8rem', color: '#777' }}>
              <strong>Created:</strong> {new Date(task.createdAt).toLocaleString()}
            </p>
          )}
        </div>
      );
      


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '300px',
            height: '200px',
            margin: '10px',
            border: '2px solid #ccc',
        }} 
        >
        <ImgComparisonSlider
          value={sliderValue}
          onSlide={(event => {
            setSliderValue(event.target.value);
          })}
          style={{
            width: '300px',
            height: '200px',
            '--divider-width': '4px',
            '--divider-color': '#333',
            '--default-handle-opacity': '0.5',
          } as React.CSSProperties}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
        >
          {/* LEFT SIDE */}
          <div
            slot="first"
            style={{
              backgroundColor: 'rgba(0, 128, 0, 0.4)',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: '#fff',
              textShadow: '0 0 4px rgba(0,0,0,0.5)',
              boxSizing: 'border-box',
            }}
          >
            Completed
          </div>
          <div slot="second" style={{}}>
            {/* RIGHT SIDE */}
            {currentTask}
          </div>
        </ImgComparisonSlider>
        </div>
      );         
}