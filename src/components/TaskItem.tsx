import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Task } from '../models/Task';
import { useTasks } from '../context/TaskContext';

type Props = {
    task: Task;
};

const TaskItem: React.FC<Props> = ({ task }) => {
    const { toggleTask, deleteTask } = useTasks();

    return (
        <View
            style={[
                styles.container,
                task.completed && styles.completedContainer,
            ]}
        >
            {/* CHECKBOX */}
            <TouchableOpacity
                style={[
                    styles.checkbox,
                    task.completed && styles.checked,
                ]}
                onPress={() => toggleTask(task.id)}
            >
                {task.completed && (
                    <Text style={styles.checkmark}>✓</Text>
                )}
            </TouchableOpacity>

            {/* TASK INFO */}
            <View style={styles.info}>
                <Text
                    style={[
                        styles.title,
                        task.completed && styles.completedText,
                    ]}
                >
                    {task.title}
                </Text>

                <Text
                    style={[
                        styles.desc,
                        task.completed && styles.completedText,
                    ]}
                >
                    {task.description}
                </Text>

                <Text style={styles.meta}>
                    Priority: {task.priority}
                </Text>

                {/*  DEADLINE DISPLAY */}
                <Text style={styles.meta}>
                    Deadline: {new Date(task.deadline).toLocaleString()}
                </Text>

                {/* COMPLETED LABEL */}
                {task.completed && (
                    <Text style={styles.completedLabel}>
                        Completed
                    </Text>
                )}
            </View>

            {/* DELETE */}
            <TouchableOpacity onPress={() => deleteTask(task.id)}>
                <Text style={styles.delete}>✕</Text>
            </TouchableOpacity>
        </View>
    );
};

export default TaskItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#1E293B',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
        alignItems: 'center',
    },

    completedContainer: {
        opacity: 0.6,
    },

    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#38BDF8',
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },

    checked: {
        backgroundColor: '#38BDF8',
    },

    checkmark: {
        color: '#020617',
        fontWeight: '900',
    },

    info: {
        flex: 1,
    },

    title: {
        color: '#F8FAFC',
        fontSize: 16,
        fontWeight: '600',
    },

    desc: {
        color: '#CBD5E1',
        marginTop: 2,
    },

    meta: {
        color: '#94A3B8',
        fontSize: 12,
        marginTop: 4,
    },

    completedText: {
        textDecorationLine: 'line-through',
        color: '#94A3B8',
    },

    completedLabel: {
        marginTop: 6,
        fontSize: 12,
        color: '#22C55E',
        fontWeight: '600',
    },

    delete: {
        color: '#F87171',
        fontSize: 18,
        fontWeight: '700',
        paddingHorizontal: 6,
    },
});
