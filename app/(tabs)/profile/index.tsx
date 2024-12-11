import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import React, { useState } from 'react'

import users from '@/services/users';
import { Ionicons } from '@expo/vector-icons';

const Profile = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  const getUserData = async () => {
    const data = await users.getData();
    setUserName(data.firstName + " " + data.lastName);
    setEmail(data.email);
  }
  getUserData();
  return (
    <SafeAreaView style={{ backgroundColor: '#fff', minHeight: '100%' }}>
      <ScrollView style={{ padding: 20 }}>
        <Text style={{ color: '#000', fontSize: 24, fontWeight: 'bold', }}>Profile</Text>
        {/* <Text style={{ color: "#7C82A1", fontSize: 16, textAlign: "justify", marginTop: 20 }}></Text> */}

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name="person-circle-outline" // You can choose other icons from Ionicons
            size={80} // Adjust the size of the icon
            color="#00B98E" // You can change the color if you like
            style={{ marginRight: 10 }} // Adds spacing between the icon and text
          />
          <View>
            <Text style={{ fontSize: 32, fontWeight: 'bold' }}> {userName} </Text>
            <Text> {email} </Text>
          </View>
        </View>
        <View style={{ marginTop: 30 }}>
          <TouchableOpacity style={styles.button}><Text style={styles.textButton}>My Family</Text><Text style={styles.textButtonArrow}> &gt; </Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} ><Text style={styles.textButton} >Terms and conditions</Text><Text style={styles.textButtonArrow}> &gt; </Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} ><Text style={styles.textButton} >Privacy</Text><Text style={styles.textButtonArrow}> &gt; </Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} ><Text style={styles.textButton} >Sign out </Text><Text style={styles.textButtonArrow}> &gt; </Text></TouchableOpacity>
        </View>


      </ScrollView>
    </SafeAreaView>

  )
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#79C3C52B',
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10

  },
  textButton: {
    fontSize: 18,
  },
  textButtonArrow: {
    fontWeight: 'bold',
    fontSize: 24
  }

})

export default Profile;