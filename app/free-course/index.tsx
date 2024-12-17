import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const courses = [
  { 
    id: '1', 
    type: 'text', 
    title: 'Building Strong Relationships', 
    icon: 'heart-outline',
    color: '#FF6B6B',
    content: ["Building strong relationships within families is essential for creating a supportive, loving, and healthy environment. The foundation of strong family bonds begins with understanding family dynamics, including roles, values, and the importance of communication. Effective communication—both verbal and non-verbal—is key to ensuring that family members feel heard and valued. Active listening, expressing feelings respectfully, and fostering empathy are essential tools for minimizing misunderstandings and building trust. Family members should also practice emotional support, validating each other's experiences, and providing encouragement, especially during challenging times.", "Conflicts are natural, but learning to resolve them respectfully and collaboratively strengthens family relationships. Healthy conflict resolution involves staying calm, listening to understand, and finding mutually agreeable solutions. In addition to communication skills, creating regular family rituals, traditions, and shared activities helps foster connection and strengthens bonds over time. These activities, whether through shared hobbies, family meals, or cooperative projects, build lasting memories and create a sense of unity. Ultimately, sustaining strong family relationships requires ongoing effort, including maintaining healthy boundaries, adapting to life changes together, and supporting each other’s growth while staying connected as a family unit."]
  },
  { 
    id: '2', 
    type: 'video', 
    title: 'Overcoming Challenges', 
    icon: 'play-circle-outline',
    color: '#4ECDC4',
    content: 'dQw4w9WgXcQ'
  },
  { 
    id: '3', 
    type: 'video', 
    title: 'Family Cohesion & Communication', 
    icon: 'people-outline',
    color: '#45B7D1',
    content: 'f_weTtRmTRk'
  },
  { 
    id: '4', 
    type: 'video', 
    title: 'What is Gender Equality?', 
    icon: 'male-female-outline',
    color: '#F9D5E5',
    content: 'hklSpQl8hZo'
  },
  { 
    id: '5', 
    type: 'video', 
    title: 'Understanding Gender-Based Violence', 
    icon: 'shield-outline',
    color: '#FF6B6B',
    content: '3AF9Rjki0DE'
  },
  { 
    id: '6', 
    type: 'video', 
    title: 'Unpaid Care Work Insights', 
    icon: 'briefcase-outline',
    color: '#4ECDC4',
    content: '0zcC9M4QKlU'
  },
  { 
    id: '7', 
    type: 'video', 
    title: 'ITETERO TV - Special Episode', 
    icon: 'film-outline',
    color: '#45B7D1',
    content: 'g6xGBekJxLg'
  },
  { 
    id: '8', 
    type: 'video', 
    title: 'URUNANA - Episode Highlights', 
    icon: 'tv-outline',
    color: '#F9D5E5',
    content: '0gloRdY2dEM'
  },
];

const CourseListScreen = () => {
  const navigation = useNavigation();

  const renderCourseItem = ({ item }) => (
    <TouchableOpacity
      style={styles.courseItem}
      onPress={() => navigation.navigate('free-course/CourseContent', { course: item })}
    >
      <View style={styles.courseItemContent}>
        <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
          <Ionicons 
            name={item.icon} 
            size={24} 
            color={item.color} 
          />
        </View>
        <View style={styles.courseTextContainer}>
          <Text style={styles.courseTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.courseTypeContainer}>
            <Text style={styles.courseTypeLabel}>Type:</Text>
            <Text style={[styles.courseType, { color: item.color }]}>
              {item.type}
            </Text>
          </View>
        </View>
        <Ionicons 
          name="chevron-forward" 
          size={24} 
          color="#6c757d" 
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Free Courses</Text>
          <Ionicons 
            name="school-outline" 
            size={24} 
            color="#00B98E" 
          />
        </View>
        
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          renderItem={renderCourseItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.courseList}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F9FB',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  courseList: {
    paddingTop: 16,
    paddingBottom: 20,
  },
  courseItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  courseItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  courseTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  courseTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseTypeLabel: {
    fontSize: 12,
    color: '#6c757d',
    marginRight: 6,
  },
  courseType: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});

export default CourseListScreen;