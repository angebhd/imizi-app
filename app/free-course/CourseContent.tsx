import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, } from 'react-native';
// import {  } from 'react-native-safe-area-context';
import YoutubePlayer from 'react-native-youtube-iframe';

const CourseContentScreen = () => {

  const route = useRoute();  // Get the route object using useRoute hook
  const { course } = route.params;

  return (
      <ScrollView style={{ backgroundColor: '#FFF9FA',  marginBottom: 10,padding: 0, marginTop: 30  }}>
      <Text style={{ color: '#000', fontSize: 24, fontWeight: 'bold', padding: 20 }}>Free courses</Text>

        <View style={styles.container}>

          <Text style={styles.courseTitle}>{course.title}</Text>
          {course.type === 'text' && <View> {course.content.map((el, key) =><Text key={key} style={styles.courseContent}>{el}</Text>)}</View>}
          {course.type === 'video' && (
            <YoutubePlayer
              height={200}
              play={false}
              videoId={course.content}
            />
          )}
          {course.type === 'audio' && <Text>Audio player implementation coming soon...</Text>}
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  courseContent: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    textAlign: 'justify'
  },
});

export default CourseContentScreen;
