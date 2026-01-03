import React, { useState } from 'react';
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
import { Task, Priority } from '../models/Task';

type StatusFilter = 'ALL' | 'ACTIVE' | 'COMPLETED';

const TaskListScreen = ({ navigation }: any) => {
    const { tasks } = useTasks();

    const [statusFilter, setStatusFilter] =
        useState<StatusFilter>('ALL');
    const [priorityFilter, setPriorityFilter] =
        useState<Priority | 'ALL'>('ALL');

    const handleLogout = async () => {
        await auth().signOut();
    };

    const filteredTasks = tasks.filter(task => {
        const statusOk =
            statusFilter === 'ALL' ||
            (statusFilter === 'ACTIVE' && !task.completed) ||
            (statusFilter === 'COMPLETED' && task.completed);

        const priorityOk =
            priorityFilter === 'ALL' ||
            task.priority === priorityFilter;

        return statusOk && priorityOk;
    });

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.heading}>My Tasks</Text>
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={styles.logout}>Logout</Text>
                </TouchableOpacity>
            </View>

            {/* FILTERS */}
            <View style={styles.filterContainer}>
                {/* STATUS */}
                <View style={styles.filterRow}>
                    {(['ALL', 'ACTIVE', 'COMPLETED'] as StatusFilter[]).map(
                        filter => (
                            <TouchableOpacity
                                key={filter}
                                onPress={() => setStatusFilter(filter)}
                            >
                                <Text
                                    style={[
                                        styles.filterText,
                                        statusFilter === filter &&
                                        styles.selectedFilter,
                                    ]}
                                >
                                    {filter}
                                </Text>
                            </TouchableOpacity>
                        )
                    )}
                </View>

                {/* PRIORITY */}
                <View style={styles.filterRow}>
                    {(['ALL', 'HIGH', 'MEDIUM', 'LOW'] as (Priority | 'ALL')[]).map(
                        filter => (
                            <TouchableOpacity
                                key={filter}
                                onPress={() => setPriorityFilter(filter)}
                            >
                                <Text
                                    style={[
                                        styles.filterText,
                                        priorityFilter === filter &&
                                        styles.selectedFilter,
                                    ]}
                                >
                                    {filter}
                                </Text>
                            </TouchableOpacity>
                        )
                    )}
                </View>
            </View>

            {/* TASK LIST */}
            {filteredTasks.length === 0 ? (
                <Text style={styles.emptyText}>
                    No tasks match filters
                </Text>
            ) : (
                <FlatList
                    data={filteredTasks}
                    keyExtractor={item => item.id}
                    renderItem={({ item }: { item: Task }) => (
                        <TaskItem task={item} />
                    )}
                />
            )}

            {/* ADD TASK */}
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
        marginBottom: 12,
    },

    heading: {
        fontSize: 26,
        fontWeight: '700',
        color: '#F8FAFC',
    },

    logout: {
        color: '#F87171',
        fontWeight: '600',
    },

    filterContainer: {
        marginBottom: 12,
    },

    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },

    filterText: {
        color: '#94A3B8',
        fontSize: 13,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },

    selectedFilter: {
        color: '#38BDF8',
        fontWeight: '700',
    },

    emptyText: {
        color: '#94A3B8',
        marginTop: 40,
        textAlign: 'center',
    },

    addButton: {
        backgroundColor: '#38BDF8',
        padding: 14,
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
