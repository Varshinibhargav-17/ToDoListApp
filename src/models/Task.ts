export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
    id: string;
    title: string;
    description: string;
    createdAt: number;   // timestamp
    deadline: number;    // timestamp
    priority: Priority;
    completed: boolean;
}
