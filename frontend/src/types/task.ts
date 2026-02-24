export type Status = "PENDING" | "IN_PROGRESS" | "COMPLETED";
export type Priority = "LOW" | "MODERATE" | "HIGH";

export interface Task {
    id:string,
    title:string,
    description:string,
    status:Status,
    priority:Priority,
    created_at:string,
    updated_at:string,
}