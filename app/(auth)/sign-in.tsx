import { Link } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleLogin = () => {
    const handleNavigateToLogin = () => {
      router.replace('/(tabs)'); // Navigate to the login screen
    };
    handleNavigateToLogin();
  };


  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 30 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 10 }}> Welcome Back 👋</Text>

        <Text style={{ fontSize: 16, color: "#7C82A1" }}>I am happy to see you again. You can continue where you left off by logging in</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Link href="/">
        <Text style={styles.link}>Forgot Password</Text>
      </Link>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
      <View style={styles.linkContainer}>
        <Text style={{ fontSize: 20, marginTop: 20 }}>Don't have an account? <Link href="./sign-up" style={styles.link}> sign up</Link></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#F3F4F6',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#00B98E',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  link: {
    color: '#00B98E',
    textAlign: 'right'
  },
});

export default LoginScreen;