import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

import { signup } from '@/services/users';
import storeToken  from '@/services/auth'


const SignUpScreen = () => {
  const router = useRouter();

  const [firstName, setfName] = useState('');
  const [lastName, setlName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    const resp = await signup({ firstName, lastName, email, password })
    if (resp.status === 201) {
      const a = storeToken.store(resp.data.token);
      router.replace('/(tabs)');
    }else{
      setPassword('');
      setEmail('');
      setfName('');
      setlName('');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1, width: '100%' }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}      >
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}> Welcome to IMIZI! 👋</Text>
        <Text style={{ marginBottom: 20 }}> Create your free account</Text>

        <TextInput
          style={styles.input}
          placeholder="First Name"
          returnKeyType='next'
          value={firstName}
          onChangeText={setfName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          returnKeyType='next'

          value={lastName}
          onChangeText={setlName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          inputMode='email'
          autoCapitalize='none'
          returnKeyType='next'
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          returnKeyType='done'

          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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
    backgroundColor: '#79C3C52B'

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
});
export default SignUpScreen;