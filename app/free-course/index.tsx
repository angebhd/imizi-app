import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const courses = [
  { id: '1', type: 'text', title: 'Building Strong Relationships', content: ["Building strong relationships within families is essential for creating a supportive, loving, and healthy environment. The foundation of strong family bonds begins with understanding family dynamics, including roles, values, and the importance of communication. Effective communication—both verbal and non-verbal—is key to ensuring that family members feel heard and valued. Active listening, expressing feelings respectfully, and fostering empathy are essential tools for minimizing misunderstandings and building trust. Family members should also practice emotional support, validating each other's experiences, and providing encouragement, especially during challenging times.", "Conflicts are natural, but learning to resolve them respectfully and collaboratively strengthens family relationships. Healthy conflict resolution involves staying calm, listening to understand, and finding mutually agreeable solutions. In addition to communication skills, creating regular family rituals, traditions, and shared activities helps foster connection and strengthens bonds over time. These activities, whether through shared hobbies, family meals, or cooperative projects, build lasting memories and create a sense of unity. Ultimately, sustaining strong family relationships requires ongoing effort, including maintaining healthy boundaries, adapting to life changes together, and supporting each other’s growth while staying connected as a family unit."] },
  { id: '2', type: 'video', title: 'Overcoming Challenges', content: 'dQw4w9WgXcQ' },
  { id: '3', type: 'video', title: 'Family Cohesion & Communication', content: 'f_weTtRmTRk' },
  { id: '4', type: 'video', title: 'What is gender equality?', content: 'hklSpQl8hZo' },
  { id: '5', type: 'video', title: 'What is GBV?', content: '3AF9Rjki0DE' },
  { id: '6', type: 'video', title: 'Who Cares? The Gendered Burden of Unpaid Care Work | Aina Salleh | TEDxGoodenoughCollege ', content: '0zcC9M4QKlU' },
  { id: '7', type: 'video', title: 'ITETERO TV - Episode ya 6 - Ikiganiro cy\'Abana', content: 'g6xGBekJxLg' },
  { id: '8', type: 'video', title: 'URUNANA Episode 2682//Noneho byakomeye Anyesi ntagishaka kuvugana na Chris...', content: '0gloRdY2dEM' },
  // { id: '3', type: 'audio', title: 'Family Traditions', content: require('../assets/family_audio.mp3') },
];

const CourseListScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{backgroundColor: '#FFF9FA', minHeight: '100%', padding: 20 }}>

        <Text style={{ color: '#000', fontSize: 24, fontWeight: 'bold', padding: 10}}>Free courses</Text>

        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.courseItem}
              onPress={() => navigation.navigate('free-course/CourseContent', { course: item })}
            >
              <Text style={styles.courseTitle}>{item.title}</Text>
              <Text style={styles.courseType}>Type: <Text style={styles.courseTypee}>{item.type}</Text></Text>

            </TouchableOpacity>
          )}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  courseItem: {
    padding: 16,
    marginBottom: 18,
    backgroundColor: '#fff',
    borderRadius: 10
    
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  courseType:{
    fontStyle: 'italic',
  }, 
  courseTypee:{
    textTransform: 'capitalize',
    color: "#00B98E",
    fontWeight: 'bold',
  },
});

export default CourseListScreen;
