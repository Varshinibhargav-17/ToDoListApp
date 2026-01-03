import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      {/* APP NAME */}
      <View style={styles.header}>
        <Text style={styles.appName}>Taskify</Text>
        <Text style={styles.tagline}>
          Organize your tasks. Own your time.
        </Text>
      </View>

      {/* MIDDLE CONTENT */}
      <View style={styles.middle}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Create tasks easily</Text>
          <Text style={styles.cardText}>
            Add tasks with titles, descriptions, priorities, and deadlines.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Plan with deadlines</Text>
          <Text style={styles.cardText}>
            Choose exact dates and times to stay on schedule.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Focus on what matters</Text>
          <Text style={styles.cardText}>
            Sort and filter tasks to work on the most important ones first.
          </Text>
        </View>
      </View>

      {/* REGISTER BUTTON */}
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.registerText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 20,
    justifyContent: 'space-between',
  },

  header: {
    marginTop: 40,
    alignItems: 'center',
  },

  appName: {
    fontSize: 34,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 6,
  },

  tagline: {
    fontSize: 14,
    color: '#CBD5E1',
    textAlign: 'center',
  },

  middle: {
    flex: 1,
    justifyContent: 'center',
  },

  card: {
    backgroundColor: '#1E293B',
    padding: 18,
    borderRadius: 12,
    marginBottom: 16,
  },

  cardTitle: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },

  cardText: {
    color: '#CBD5E1',
    fontSize: 13,
    lineHeight: 18,
  },

  registerButton: {
    backgroundColor: '#38BDF8',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },

  registerText: {
    color: '#020617',
    fontWeight: '700',
    fontSize: 16,
  },
});
