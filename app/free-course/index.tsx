import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

const FreeCourses = () => {
  const router = useRouter();
  const handleClick = (a: string) => {

    router.navigate(`/${a}`)

  }

  return (
    <SafeAreaView style={{backgroundColor: '#fff', minHeight: '100%'}}>
      <ScrollView style={{ padding: 20 }}>

        <Text style={{ color: '#000', fontSize: 24, fontWeight: 'bold', }}>Free courses</Text>
        <Text style={{ color: "#7C82A1", fontSize: 16, textAlign: "justify", marginTop: 20 }}>You have a full access to different courses to facilitate each family dynamics.</Text>

        <View style={{ flex: 2, flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'space-evenly', marginVertical: 20 }}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton}>📊 Educational
              Channels</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleClick('budgeting')}>
            <Text style={styles.textButton}>🎗️ Health
              & Wellness</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleClick('free-course')}>
            <Text style={styles.textButton}>🛡️ Parenting
              Courses</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton}>🧲 Children’s
              Learning</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton}>🛡️ Parenting
              Workshops</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton}>Communication</Text>
          </TouchableOpacity>
        </View>


      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    width: '40%',
    backgroundColor: '#79C3C52B',
    borderColor: '#00B98E',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',


  },
  textButton: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: '#666C8E'

  }
})
export default FreeCourses