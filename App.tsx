import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthContext, AuthProvider } from './src/context/AuthContext';
import { TaskProvider } from './src/context/TaskContext';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
} from 'react-native';

const RootNavigator = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.appTitle}>TaskFlow</Text>
        <Text style={styles.tagline}>
          Organize your work. Prioritize what matters.
        </Text>

        <ActivityIndicator size="large" color="#38BDF8" />

        <Text style={styles.loadingText}>
          Preparing your workspace…
        </Text>
      </View>
    );
  }

  return user ? (
    <TaskProvider>
      <AppNavigator />
    </TaskProvider>
  ) : (
    <AuthNavigator />
  );
};

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: '#CBD5E1',
    textAlign: 'center',
    marginBottom: 30,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 12,
    color: '#94A3B8',
  },
});
