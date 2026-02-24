import api from "./api"
import type { Task } from "../types/task"

export const getTasks = async (): Promise<Task[]> => {
    const response = await api.get("/tasks/"); 
    return response.data;
};

export const createTask = async (data: Partial<Task>): Promise<Task> => {
    const response = await api.post("/tasks/", data);
    return response.data;
}

export const updateTask = async (id: string, data: Partial<Task>): Promise<Task> => {
    const response = await api.patch(`/tasks/${id}/`, data);
    
    return response.data;
}

export const deleteTask = async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}/`);
};