import { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/taskService";
import type { Task } from "../types/task";
import TaskForm, { type TaskFormData } from "../components/TaskForm";

export default function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    
    // UI State
    const [isCreating, setIsCreating] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    // --- READ ---
    const loadTasks = async () => {
        try {
            setLoading(true);
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            console.error("Failed to load tasks", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    // --- CREATE ---
    const handleCreate = async (formData: TaskFormData) => {
        try {
            await createTask(formData);
            setIsCreating(false); // Hide form after creation
            loadTasks(); 
        } catch (error) {
            console.error("Failed to create task", error);
        }
    };

    // --- UPDATE & DELETE (Omitted for brevity, exact same as before) ---
    const handleUpdate = async (formData: TaskFormData) => {
        if (!editingTask) return;
        await updateTask(editingTask.id, formData);
        setEditingTask(null);
        loadTasks();
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Delete this task?")) return;
        await deleteTask(id);
        loadTasks();
    };

    if (loading) return <div>Loading tasks...</div>;

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>My Tasks</h1>
                
                {/* Toggle Create Form Button */}
                {!isCreating && !editingTask && (
                    <button onClick={() => setIsCreating(true)}>+ Create New Task</button>
                )}
            </div>

            <hr style={{ margin: "1rem 0" }} />

            {/* CONDITIONAL FORM RENDERING */}
            {isCreating && (
                <div style={{ marginBottom: "2rem", padding: "1rem", border: "1px dashed #666" }}>
                    <h2>Create Task</h2>
                    <TaskForm 
                        onSubmit={handleCreate} 
                        onCancel={() => setIsCreating(false)} // Let user cancel creation
                    />
                </div>
            )}

            {editingTask && (
                <div style={{ marginBottom: "2rem", padding: "1rem", border: "1px dashed #666" }}>
                    <h2>Edit Task</h2>
                    <TaskForm 
                        initialData={editingTask} 
                        onSubmit={handleUpdate} 
                        onCancel={() => setEditingTask(null)} 
                    />
                </div>
            )}

            {/* CARD GRID DISPLAY */}
            {tasks.length === 0 ? (
                <p>No tasks found. Create one above!</p>
            ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                    {tasks.map((task) => (
                        // Basic Card Structure
                        <div key={task.id} style={{ 
                            border: "1px solid #ccc", 
                            borderRadius: "8px", 
                            padding: "1rem", 
                            width: "300px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between"
                        }}>
                            <div>
                                <h3 style={{ margin: "0 0 0.5rem 0" }}>{task.title}</h3>
                                <p style={{ fontSize: "0.9rem", color: "#555" }}>{task.description}</p>
                                <div style={{ fontSize: "0.8rem", margin: "1rem 0" }}>
                                    <strong>Status:</strong> {task.status} <br/>
                                    <strong>Priority:</strong> {task.priority}
                                </div>
                            </div>
                            
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                                <button onClick={() => setEditingTask(task)}>Edit</button>
                                <button onClick={() => handleDelete(task.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}