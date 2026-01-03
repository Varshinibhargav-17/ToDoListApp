import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useTasks } from '../context/TaskContext';
import TaskItem from '../components/TaskItem';
import { Task } from '../models/Task';

const TaskListScreen = ({ navigation }: any) => {
    const { tasks } = useTasks();

    const handleLogout = async () => {
        await auth().signOut();
    };

    const renderItem = ({ item }: { item: Task }) => (
        <TaskItem task={item} />
    );

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.heading}>My Tasks</Text>
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

            {/* TASK LIST */}
            {tasks.length === 0 ? (
                <Text style={styles.emptyText}>
                    No tasks yet. Add one!
                </Text>
            ) : (
                <FlatList
                    data={tasks}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            )}

            {/* ADD TASK BUTTON */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddTask')}
            >
                <Text style={styles.addText}>＋ Add Task</Text>
            </TouchableOpacity>
        </View>
    );
};

export default TaskListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
        padding: 20,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },

    heading: {
        fontSize: 26,
        fontWeight: '700',
        color: '#F8FAFC',
    },

    logoutText: {
        color: '#F87171',
        fontWeight: '600',
    },

    emptyText: {
        color: '#94A3B8',
        marginTop: 40,
        textAlign: 'center',
        fontSize: 14,
    },

    addButton: {
        backgroundColor: '#38BDF8',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 30,
        position: 'absolute',
        bottom: 30,
        right: 30,
    },

    addText: {
        color: '#020617',
        fontWeight: '700',
    },
});
