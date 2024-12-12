import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import React, { useState } from 'react';
import { useRouter } from 'expo-router'


import users from '@/services/users';
import auth from '@/services/auth';
import { Ionicons } from '@expo/vector-icons';

const Profile = () => {
  const router = useRouter();

  //getting user data from DB
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [familyName, setFamilyName] = useState('No family yet');

  const getUserData = async () => {
    const data = await users.getData();
    setUserName(data.firstName + " " + data.lastName);
    setEmail(data.email);
    setFamilyName(data.family.name + " family")
  }
  getUserData();
  // go to family
  const handlePress = (a:string) => {
    router.navigate(a);

  }
  // signout Logic
  const signOut = async () => {
    const status = await auth.remove();

    if (status) {
      console.log("Loug out success")
      router.navigate('/(auth)/sign-in')
    } else { console.log("logout failed") }

  }
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
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 5 }}>{userName} </Text>
            <Text style={{ color: '#00B98E', fontWeight: 'bold' }}> {familyName} </Text>
            {/* <Text> {email} </Text> */}
          </View>
        </View>
        <View style={{ marginTop: 30 }}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress("/family")}><Text style={styles.textButton}>My Family</Text><Ionicons name='arrow-forward-outline' size={24} /></TouchableOpacity>
          <TouchableOpacity style={styles.button} ><Text style={styles.textButton} >Terms and conditions</Text><Ionicons name='arrow-forward-outline' size={24} /></TouchableOpacity>
          <TouchableOpacity style={styles.button} ><Text style={styles.textButton} >Privacy</Text><Ionicons name='arrow-forward-outline' size={24} /></TouchableOpacity>

          <TouchableOpacity style={{
            backgroundColor: '#faa',
            marginTop: 30,
            paddingVertical: 8,
            paddingHorizontal: 5,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 10

          }} onPress={signOut}><Text style={styles.textButton} >Sign out </Text><Ionicons name='exit-outline' size={24} /></TouchableOpacity>
        </View>


      </ScrollView>
    </SafeAreaView>

  )
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#79C3C52B',
    marginVertical: 5,
    paddingVertical: 8,
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


})

export default Profile;