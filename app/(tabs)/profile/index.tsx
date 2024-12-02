import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'

const Profile = () => {
  return (
    <SafeAreaView style={{ backgroundColor: '#fff', minHeight: '100%' }}>
      <ScrollView style={{ padding: 20 }}>
        <Text style={{ color: '#000', fontSize: 24, fontWeight: 'bold', }}>Profile</Text>
        {/* <Text style={{ color: "#7C82A1", fontSize: 16, textAlign: "justify", marginTop: 20 }}></Text> */}

        <View >
          <Text> User name</Text>
          <Text> User email</Text>

        </View>
        <View>
          <TouchableOpacity> My Family</TouchableOpacity>
          <TouchableOpacity> Sign out</TouchableOpacity>
          <TouchableOpacity> Terms and conditions</TouchableOpacity>
          <TouchableOpacity> Privacy</TouchableOpacity>
          <TouchableOpacity> My Family</TouchableOpacity>
          <TouchableOpacity> My Family</TouchableOpacity>
          <TouchableOpacity> My Family</TouchableOpacity>

        </View>


      </ScrollView>
    </SafeAreaView>

  )
}


const styles = StyleSheet.create({

})

export default Profile;