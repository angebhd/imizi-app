import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'

const Profile = () => {
  return (
    <SafeAreaView style={{backgroundColor: '#fff', minHeight: '100%'}}>
      <ScrollView style={{ padding: 20 }}>
        <Text style={{ color: '#000', fontSize: 24, fontWeight: 'bold', }}>Profile</Text>
        <Text style={{ color: "#7C82A1", fontSize: 16, textAlign: "justify", marginTop: 20 }}>Here you serve yourself with all free services and tools that are well designed to help you and your family to thrive.</Text>

         
      </ScrollView>
    </SafeAreaView>

  )
}


const styles = StyleSheet.create({
  
})

export default Profile;