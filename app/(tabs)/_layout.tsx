import { Tabs, Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';


export default function TabLayout() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style='dark' backgroundColor='#fff' />
      <Tabs screenOptions={{
        tabBarActiveTintColor: '#00B98E',  // Active icon color
        tabBarInactiveTintColor: 'black',  // Inactive icon color
      }}>
        <Tabs.Screen name='index' options={{
          title: "Home", headerShown: false, tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          )
        }} />
        <Tabs.Screen name='explore/index' options={{
          title: "Explore", headerShown: false, tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass" size={size} color={color} />
          )
        }} />
        <Tabs.Screen name='chat' options={{
          title: "Chat", tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble" size={size} color={color} />
          )
        }} />
        <Tabs.Screen name='profile/index' options={{
          title: "Profile", headerShown: false, tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          )
        }} />
      </Tabs>
    </SafeAreaView>
  );
}
