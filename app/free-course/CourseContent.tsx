import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Share,
  Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import YoutubePlayer from 'react-native-youtube-iframe';

const { width } = Dimensions.get('window');

const CourseContentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { course } = route.params;
  
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        title: course.title,
        message: `Check out this course: ${course.title}`,
      });
    } catch (error) {
      console.error('Sharing error:', error);
    }
  };

  const renderContent = () => {
    switch (course.type) {
      case 'text':
        return (
          <View style={styles.textContentContainer}>
            {course.content.map((paragraph, index) => (
              <Text key={index} style={styles.courseContent}>
                {paragraph}
              </Text>
            ))}
          </View>
        );
      
      case 'video':
        return (
          <View style={styles.videoContainer}>
            <YoutubePlayer
              height={200}
              width={width - 32}
              play={false}
              videoId={course.content}
              onFullScreenChange={(isFullScreen) => setIsFullScreen(isFullScreen)}
            />
          </View>
        );
      
      case 'audio':
        return (
          <View style={styles.placeholderContainer}>
            <Ionicons 
              name="musical-notes-outline" 
              size={50} 
              color="#00B98E" 
            />
            <Text style={styles.placeholderText}>
              Audio player coming soon...
            </Text>
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left', 'top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons 
              name="arrow-back" 
              size={24} 
              color="#333" 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={handleShare}
          >
            <Ionicons 
              name="share-social-outline" 
              size={24} 
              color="#333" 
            />
          </TouchableOpacity>
        </View>

        {/* Course Title */}
        <Text style={styles.courseTitle}>{course.title}</Text>

        {/* Course Type Badge */}
        <View style={[
          styles.typeBadge, 
          { backgroundColor: getTypeColor(course.type) + '20' }
        ]}>
          <Ionicons 
            name={getTypeIcon(course.type)} 
            size={16} 
            color={getTypeColor(course.type)} 
          />
          <Text style={[
            styles.typeBadgeText, 
            { color: getTypeColor(course.type) }
          ]}>
            {course.type.charAt(0).toUpperCase() + course.type.slice(1)} Course
          </Text>
        </View>

        {/* Content Renderer */}
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

// Utility functions for type-based styling
const getTypeColor = (type: string) => {
  switch (type) {
    case 'text': return '#4ECDC4';
    case 'video': return '#FF6B6B';
    case 'audio': return '#45B7D1';
    default: return '#6c757d';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'text': return 'document-text-outline';
    case 'video': return 'play-circle-outline';
    case 'audio': return 'musical-notes-outline';
    default: return 'information-circle-outline';
  }
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F9FB',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backButton: {
    padding: 10,
  },
  shareButton: {
    padding: 10,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  textContentContainer: {
    paddingHorizontal: 16,
  },
  courseContent: {
    fontSize: 16,
    lineHeight: 26,
    color: '#333',
    marginBottom: 16,
    textAlign: 'justify',
  },
  videoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: '#6c757d',
    marginTop: 16,
  },
});

export default CourseContentScreen;