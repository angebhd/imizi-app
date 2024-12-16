import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import YoutubePlayer from 'react-native-youtube-iframe';

const courses = [
  { id: '1', type: 'text', title: 'Building Strong Relationships', content: 'Family cohesion starts with communication...' },
  { id: '2', type: 'video', title: 'Overcoming Challenges', content: 'dQw4w9WgXcQ' }, // YouTube Video ID
  // { id: '3', type: 'audio', title: 'Family Traditions', content: require('./assets/family_audio.mp3') },
];

const CourseItem = ({ course }) => {
  switch (course.type) {
    case 'text':
      return (
        <View style={styles.courseContainer}>
          <Text style={styles.title}>{course.title}</Text>
          <Text style={styles.content}>{course.content}</Text>
        </View>
      );
    case 'video':
      return (
        <View style={styles.courseContainer}>
          <Text style={styles.title}>{course.title}</Text>
          <YoutubePlayer
            height={200}
            play={false}
            videoId={course.content}
          />
        </View>
      );
    case 'audio':
      return (
        <View style={styles.courseContainer}>
          <Text style={styles.title}>{course.title}</Text>
          <Text>Audio Player Coming Soon</Text> {/* Replace with your audio player */}
        </View>
      );
    default:
      return null;
  }
};

const FamilyCohesionApp = () => {
  return (
    <SafeAreaView style={{ backgroundColor: '#fff', minHeight: '100%' }}>
      <ScrollView style={{ padding: 20 }}>
        <Text style={{ color: '#000', fontSize: 24, fontWeight: 'bold', }}>Free courses</Text>
        <Text style={{ color: "#7C82A1", fontSize: 16, textAlign: "justify", marginTop: 20 }}>You have a full access to different courses to facilitate each family dynamics.</Text>

        <FlatList
          data={courses}
          renderItem={({ item }) => <CourseItem course={item} />}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  courseContainer: {
    padding: 16,
    margin: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default FamilyCohesionApp;
