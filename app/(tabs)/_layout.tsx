import { Tabs, Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';


export default function TabLayout() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style='dark' backgroundColor='#fff' />
      <Tabs >
        <Tabs.Screen name='index' options={{ title: "Home", headerShown: false }} />
        <Tabs.Screen name='explore' options={{ title: "Explore", headerShown: false, }} />
        <Tabs.Screen name='chat' options={{ title: "Chat" }} />
        <Tabs.Screen name='profile/index' options={{ title: "Profile", headerShown:false}} />
      </Tabs>
    </SafeAreaView>
  );
}
