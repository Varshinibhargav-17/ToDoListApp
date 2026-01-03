import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

type Props = {
  navigation: any;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Organize Your Life, One Task at a Time
        </Text>

        <Text style={styles.subtitle}>
          Plan tasks, set priorities, track deadlines, and stay productive
          with a simple and powerful to-do manager.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerText}>Create an Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // dark modern background
    padding: 24,
    justifyContent: 'space-between',
  },
  textContainer: {
    marginTop: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#CBD5E1',
    lineHeight: 24,
  },
  buttonContainer: {
    marginBottom: 60,
  },
  registerButton: {
    backgroundColor: '#38BDF8',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  registerText: {
    color: '#020617',
    fontSize: 16,
    fontWeight: '600',
  },
  loginText: {
    color: '#94A3B8',
    fontSize: 14,
    textAlign: 'center',
  },
});
