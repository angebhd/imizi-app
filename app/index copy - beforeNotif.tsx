import { Link, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, Image, TouchableOpacity, Text, ActivityIndicator } from 'react-native';

import { getData } from '@/services/users'
import { getUserData, storeUserData } from '@/services/userData';
const LaunchingScreen = () => {
  const router = useRouter();

  const [data, setToken] = useState<object | null | undefined>(null);
  const [loading, setLoading] = useState<boolean>(true); // To track loading state


  useEffect(() => {
    const fetchToken = async () => {
      try {
        const data = await getData(); // Assuming getToken.get() is async
        setToken(data);

        if (data) {
          router.replace('/(tabs)');
        } else {
          setLoading(false); // Set loading to false once token is retrieved (even if it's null)
        }
      } catch (error) {
        console.error('Error fetching token:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchToken();
  }, [])

  if (loading) {
    return (
      <ImageBackground
        source={require('../assets/images/Landing/10.png')}
        style={styles.container}>
        <ActivityIndicator size="large" color="#00B98E" />
      </ImageBackground>
    );
  }


  return (
    <ImageBackground
      source={require('../assets/images/Landing/10.png')}
      style={styles.container}>
      <TouchableOpacity style={styles.button} >
        <Link href="/(auth)/sign-in" >
          <Text style={styles.buttonText}>Go to Login</Text>
        </Link>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: '#00B98E',
    alignItems: 'center',
    justifyContent: "flex-end",
  },

  button: {
    width: '60%',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,

  },
  buttonText: {
    color: '#00B98E',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
});

export default LaunchingScreen;

