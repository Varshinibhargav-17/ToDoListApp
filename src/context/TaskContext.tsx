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

    const addTask = (task: Task) => {
        setTasks(prev => [task, ...prev]);
    };

    const toggleTask = (id: string) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    };

    const deleteTask = (id: string) => {
        setTasks(prev => prev.filter(task => task.id !== id));
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
