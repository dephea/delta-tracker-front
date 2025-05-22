import { useState } from "react";
import { useAuth } from "../Context/AuthContext";


export default function CreateTask() {
    const { token } = useAuth();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
        alert('Title is required!');
        return;
        }

        setLoading(true);
        try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/create`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
            title,
            description,
            dueDate,
            }),
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        setTitle('');
        setDescription('');
        setDueDate('');
    } catch (error) {
        console.error('Failed to create task:', error);
        alert('Failed to create task.');
    } finally {
        setLoading(false);
        window.location.reload();
    }
    };


    return (
        <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '20px',
        maxWidth: '400px',
        margin: '0 auto',
        border: '1px solid #ccc',
        borderRadius: '8px',
        }}>
        <h2><center>Create Task</center></h2>
        <div style={{border: '1px solid #ccc', borderRadius: '8px', padding: '5px',}}>
        <input style={{width: '100%', height: '100%'}}
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
        /></div>

        <div style={{border: '1px solid #ccc', borderRadius: '8px', padding: '5px',}}>
        <textarea style={{width: '100%', height: '100%'}}
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
        /></div>

        <div style={{border: '1px solid #ccc', borderRadius: '8px', padding: '5px',}}>
        <input style={{width: '100%', height: '100%'}}
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
        /></div>
        <div style={{border: '1px solid #ccc', borderRadius: '8px', padding: '5px', backgroundColor: 'rgba(0, 128, 0, 0.4)'}}> 
        <button type="submit" disabled={loading} style={{
            width: '100%',
            height: '100%',
        }}>
            {loading ? 'Creating...' : 'Create'}
        </button></div>
        </form>
    );
}