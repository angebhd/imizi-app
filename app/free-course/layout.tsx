import { Tabs, Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';


export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style='dark' backgroundColor='#fff' />
      <Tabs screenOptions={{ headerShown: false, }} />
    </SafeAreaView>
  );
}
