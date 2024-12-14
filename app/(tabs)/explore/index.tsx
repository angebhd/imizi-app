import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'


const Explore = () => {
  const router = useRouter();
  const handleClick = (a:string)=>{

    router.navigate(a);

  }

  return (
    <SafeAreaView style={{backgroundColor: '#fff', minHeight: '100%'}}>
      <ScrollView style={{ padding: 20 }}>
        <Text style={{ color: '#000', fontSize: 24, fontWeight: 'bold', }}>Enjoy the Family cohesion🌞</Text>
        <Text style={{ color: "#7C82A1", fontSize: 16, textAlign: "justify", marginTop: 20 }}>Here you serve yourself with all free services and tools that are well designed to help you and your family to thrive.</Text>

          <View style={{ flex: 2, flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'space-evenly', marginVertical: 20}}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.textButton}>⏳ TODO Activities</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleClick('/budgeting')}>
              <Text style={styles.textButton}>📊 Budgeting</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleClick('/free-course')}>
              <Text style={styles.textButton}>📚 Free
                Courses</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.textButton}>👫 Community
                Engagement</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.textButton}>⚖️ Government
                Programs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.textButton}>⛑️ GBV Information
                and Report</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=> handleClick("/quiz")}>
              <Text style={styles.textButton}>📝  Quiz
                Challenges</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.textButton}>🛡️ Sunday Special
                Challenges</Text>
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
    marginBottom:10,
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
export default Explore