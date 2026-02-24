import { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/taskService";
import type { Task } from "../types/task";
import TaskForm, { type TaskFormData } from "../components/TaskForm";
import { TaskCard } from "../components/TaskCard"; // Ensure this path matches where you saved it!

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
            setIsCreating(false);
            loadTasks(); 
        } catch (error) {
            console.error("Failed to create task", error);
        }
    };

    // --- UPDATE & DELETE ---
    const handleUpdate = async (formData: TaskFormData) => {
        if (!editingTask) return;
        await updateTask(editingTask.id, formData);
        setEditingTask(null);
        loadTasks();
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;
        await deleteTask(id);
        loadTasks();
    };

    // Helper to close whichever form is open
    const closeForm = () => {
        setIsCreating(false);
        setEditingTask(null);
    };

    // Loading State Styling
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-lg font-medium text-gray-600 flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading tasks...
                </div>
            </div>
        );
    }

    const isFormOpen = isCreating || editingTask !== null;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Tasks</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage your day-to-day work.</p>
                    </div>
                    
                    {!isFormOpen && (
                        <button 
                            onClick={() => setIsCreating(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                            Create New Task
                        </button>
                    )}
                </div>

                {/* Modal Form Rendering */}
                {isFormOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {isCreating ? 'Create New Task' : 'Edit Task'}
                                </h2>
                                <button onClick={closeForm} className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>
                            
                            <div className="p-6">
                                <TaskForm 
                                    initialData={editingTask || undefined} 
                                    onSubmit={isCreating ? handleCreate : handleUpdate} 
                                    onCancel={closeForm} 
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* CARD GRID DISPLAY */}
                {tasks.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-200 border-dashed p-12 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new task.</p>
                        <div className="mt-6">
                            <button onClick={() => setIsCreating(true)} className="text-blue-600 hover:text-blue-700 font-medium">
                                + Create New Task
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {tasks.map((task) => (
                            <TaskCard 
                                key={task.id} 
                                task={task} 
                                onEdit={() => setEditingTask(task)} 
                                onDelete={() => handleDelete(task.id)} 
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}