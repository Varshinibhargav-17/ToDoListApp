import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Priority, Task } from '../models/Task';

const AddTaskScreen = ({ navigation }: any) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<Priority>('MEDIUM');

    // ✅ get addTask from context
    const { addTask } = useTasks();

    const handleAddTask = () => {
        if (!title.trim()) return;

        const newTask: Task = {
            id: Date.now().toString(),
            title,
            description,
            createdAt: Date.now(),
            deadline: Date.now(), // will improve later
            priority,
            completed: false,
        };

        // ✅ STORE task globally
        addTask(newTask);

        // ✅ go back to task list
        navigation.navigate('TaskList');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Add New Task</Text>

            <TextInput
                placeholder="Task title"
                placeholderTextColor="#94A3B8"
                style={styles.input}
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                placeholder="Description"
                placeholderTextColor="#94A3B8"
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                multiline
            />

            <Text style={styles.label}>Priority</Text>

            <View style={styles.priorityRow}>
                {(['LOW', 'MEDIUM', 'HIGH'] as Priority[]).map(p => (
                    <TouchableOpacity
                        key={p}
                        style={[
                            styles.priorityButton,
                            priority === p && styles.selectedPriority,
                        ]}
                        onPress={() => setPriority(p)}
                    >
                        <Text style={styles.priorityText}>{p}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
                <Text style={styles.addText}>Add Task</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#0F172A',
    },
    heading: {
        fontSize: 24,
        fontWeight: '700',
        color: '#F8FAFC',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#1E293B',
        color: '#F8FAFC',
        padding: 14,
        borderRadius: 8,
        marginBottom: 12,
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    label: {
        color: '#CBD5E1',
        marginVertical: 10,
    },
    priorityRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    priorityButton: {
        flex: 1,
        marginHorizontal: 4,
        padding: 10,
        borderRadius: 6,
        backgroundColor: '#334155',
        alignItems: 'center',
    },
    selectedPriority: {
        backgroundColor: '#38BDF8',
    },
    priorityText: {
        color: '#F8FAFC',
        fontWeight: '600',
    },
    addButton: {
        backgroundColor: '#22C55E',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    addText: {
        color: '#022C22',
        fontWeight: '700',
    },
});
