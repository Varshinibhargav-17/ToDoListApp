import React, { createContext, useContext, useState } from 'react';
import { Task } from '../models/Task';

type TaskContextType = {
    tasks: Task[];
    addTask: (task: Task) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    // ✅ MIXED SORTING ALGORITHM
    const sortTasks = (taskList: Task[]) => {
        const priorityWeight: Record<string, number> = {
            HIGH: 3,
            MEDIUM: 2,
            LOW: 1,
        };

        return [...taskList].sort((a, b) => {
            // 1️⃣ Incomplete tasks first
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1;
            }

            // 2️⃣ Higher priority first
            const priorityDiff =
                priorityWeight[b.priority] - priorityWeight[a.priority];
            if (priorityDiff !== 0) return priorityDiff;

            // 3️⃣ Earlier deadline first
            const deadlineDiff = a.deadline - b.deadline;
            if (deadlineDiff !== 0) return deadlineDiff;

            // 4️⃣ Earlier created time first
            return a.createdAt - b.createdAt;
        });
    };

    const addTask = (task: Task) => {
        setTasks(prev => sortTasks([...prev, task]));
    };

    const toggleTask = (id: string) => {
        setTasks(prev =>
            sortTasks(
                prev.map(task =>
                    task.id === id
                        ? { ...task, completed: !task.completed }
                        : task
                )
            )
        );
    };

    const deleteTask = (id: string) => {
        setTasks(prev => sortTasks(prev.filter(task => task.id !== id)));
    };

    return (
        <TaskContext.Provider
            value={{ tasks, addTask, toggleTask, deleteTask }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used within TaskProvider');
    }
    return context;
};
