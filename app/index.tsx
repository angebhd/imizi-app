import { Link, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, Image, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';

import { getData } from '@/services/users';
import { getUserData, storeUserData } from '@/services/userData';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

import Constants from 'expo-constants';

import notification from '@/services/notifications'

const LaunchingScreen = () => {
  const router = useRouter();

  const [data, setToken] = useState<object | null | undefined>(null);
  const [loading, setLoading] = useState<boolean>(true); // To track loading state
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  // Set up notification handler
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Fetch user token and navigate accordingly
        const data = await getData(); // Assuming getToken.get() is async
        setToken(data);

        if (data) {
          router.replace('/(tabs)');
        } else {
          setLoading(false); // Set loading to false once token is retrieved (even if it's null)
        }

        // Register for push notifications
        const pushToken = await registerForPushNotificationsAsync();
        if (pushToken) {
          setExpoPushToken(pushToken);

          // Send the push token to your server
          await sendPushTokenToServer(pushToken);
        }
      } catch (error) {
        console.error('Error initializing app:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    initializeApp();
  }, []);

  // Function to register for push notifications
  const registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        Alert.alert('Error', 'Failed to get push token for notifications!');
        return null;
      }
      const token = (await Notifications.getExpoPushTokenAsync({projectId: "c0f66eed-f92b-4c45-a6ce-a41a26bd861c"})).data;
      console.log('Expo Push Token:', token);
      return token;
    } else {
      Alert.alert('Error', 'Push notifications are only supported on physical devices.');
      return null;
    }
  };

  // Function to send the push token to your backend
  const sendPushTokenToServer = async (token:string) => {
    try {
      const response = await notification.register(token);
      if (!response) {
        throw new Error('Failed to send push token to server');
      }
      console.log('Push token successfully sent to server');
    } catch (error) {
      console.error('Error sending push token to server:', error);
    }
  };
/// Asking permissions
  const checkPermissions = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      console.error('Notification permissions not granted');
    } else {
      await Notifications.requestPermissionsAsync();
      console.log('Notification permissions are granted');
    }
  };

  ///listener

  
  useEffect(() => {
    checkPermissions();

    ///listener
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Received notification:', notification);
    });
  
    return () => subscription.remove();
  }, []);

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
      <TouchableOpacity style={styles.button}>
        <Link href="/(auth)/sign-in">
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
    justifyContent: 'flex-end',
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
