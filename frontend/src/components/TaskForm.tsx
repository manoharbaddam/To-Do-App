import { useState, useEffect } from "react";
import type { Task } from "../types/task";

// 1. Create a local type for the form fields we actually want to submit
export type TaskFormData = Pick<Task, "title" | "description" | "status" | "priority">;

interface TaskFormProps {
    initialData?: Task; // If provided, we are in "Edit" mode
    onSubmit: (data: TaskFormData) => void;
    onCancel?: () => void;
}

export default function TaskForm({ initialData, onSubmit, onCancel }: TaskFormProps) {
    const [formData, setFormData] = useState<TaskFormData>({
        title: "",
        description: "",
        status: "PENDING",
        priority: "MODERATE"
    });

    // Populate form if editing an existing task
    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                description: initialData.description,
                status: initialData.status,
                priority: initialData.priority
            });
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
        
        // Reset form if it's a new task creation
        if (!initialData) {
            setFormData({ title: "", description: "", status: "PENDING", priority: "MODERATE" });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title: </label>
                <input 
                    type="text" 
                    required 
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
            </div>

            <div>
                <label>Description: </label>
                <textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
            </div>

            <div>
                <label>Status: </label>
                <select 
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
                >
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                </select>
            </div>

            <div>
                <label>Priority: </label>
                <select 
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
                >
                    <option value="LOW">Low</option>
                    <option value="MODERATE">Moderate</option>
                    <option value="HIGH">High</option>
                </select>
            </div>

            <button type="submit">{initialData ? "Update Task" : "Create Task"}</button>
            {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
        </form>
    );
}