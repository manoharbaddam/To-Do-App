import React from 'react';
import type { Task } from '../types/task';

interface TaskCardProps {
    task: Task;
    onEdit: () => void;
    onDelete: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
    // Helper to style priority badges
    const getPriorityStyles = (priority: string) => {
        switch (priority) {
            case 'HIGH': return 'bg-red-100 text-red-700 border-red-200';
            case 'MODERATE': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'LOW': return 'bg-green-100 text-green-700 border-green-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    // Helper to style status indicators
    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'COMPLETED': return 'bg-emerald-500';
            case 'IN_PROGRESS': return 'bg-blue-500';
            case 'PENDING': return 'bg-gray-400';
            default: return 'bg-gray-400';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
            {/* Header: Title and Status Dot */}
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900 truncate pr-4">
                    {task.title}
                </h3>
                <div className="flex items-center space-x-2 shrink-0">
                    <span className="text-xs font-medium text-gray-500">{task.status.replace('_', ' ')}</span>
                    <span className={`h-2.5 w-2.5 rounded-full ${getStatusStyles(task.status)}`}></span>
                </div>
            </div>

            {/* Body: Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-row">
                {task.description}
            </p>

            {/* Footer: Priority Badge and Action Buttons */}
            <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getPriorityStyles(task.priority)}`}>
                    {task.priority}
                </span>
                
                <div className="flex space-x-2">
                    <button 
                        onClick={onEdit}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        aria-label="Edit Task"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                    <button 
                        onClick={onDelete}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        aria-label="Delete Task"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};