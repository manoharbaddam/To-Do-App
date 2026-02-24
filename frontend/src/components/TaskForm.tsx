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
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Title Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input 
                    type="text" 
                    required 
                    placeholder="e.g., Update database schema"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                />
            </div>

            {/* Description Textarea */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                    rows={3}
                    placeholder="Add details about this task..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 resize-none"
                />
            </div>

            {/* Status & Priority Side-by-Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select 
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 cursor-pointer"
                    >
                        <option value="PENDING">Pending</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select 
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 cursor-pointer"
                    >
                        <option value="LOW">Low</option>
                        <option value="MODERATE">Moderate</option>
                        <option value="HIGH">High</option>
                    </select>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 mt-2 border-t border-gray-100">
                {onCancel && (
                    <button 
                        type="button" 
                        onClick={onCancel}
                        className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                )}
                <button 
                    type="submit"
                    className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors shadow-sm"
                >
                    {initialData ? "Save Changes" : "Create Task"}
                </button>
            </div>
        </form>
    );
}