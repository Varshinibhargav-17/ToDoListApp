import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskListScreen from '../screens/TaskListScreen';
import AddTaskScreen from '../screens/AddTaskScreen';

export type AppStackParamList = {
    TaskList: undefined;
    AddTask: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="TaskList"
                component={TaskListScreen}
                options={{ title: 'My Tasks' }}
            />
            <Stack.Screen
                name="AddTask"
                component={AddTaskScreen}
                options={{ title: 'Add Task' }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;
