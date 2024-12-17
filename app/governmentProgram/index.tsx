import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Linking } from 'react-native';

const { width } = Dimensions.get('window');

const courses = [
  { 
    id: '1', 
    org: 'MIGEPROF', 
    title: 'Minister urges cooperation to build GBV-free families', 
    date: 'Wednesday, 27 November, 2024', 
    img: "gp1.jpg", 
    link: "https://www.migeprof.gov.rw/news-detail/minister-urges-cooperation-to-build-gbv-free-families" 
  },
  { 
    id: '2', 
    org: 'MIGEPROF', 
    title: 'Minister Uwimana urges leaders to strengthen support for rural women', 
    date: 'Tuesday, 22 October, 2024', 
    img: "gp2.jpg", 
    link: "https://www.migeprof.gov.rw/news-detail/minister-uwimana-urges-leaders-to-strengthen-support-for-rural-women" 
  },
  { 
    id: '3', 
    org: 'MIGEPROF', 
    title: 'MIGEPROF and Partners Strengthen Family Cohesion and Combat GBV in Eastern Province', 
    date: 'Tuesday, 01 October, 2024', 
    img: "gp3.jpg", 
    link: "https://www.migeprof.gov.rw/news-detail/migeprof-and-partners-strengthen-family-cohesion-and-combat-gbv-in-eastern-province" 
  },
  { 
    id: '4', 
    org: 'MIGEPROF', 
    title: 'Strengthening Women\'s Roles for National Development', 
    date: 'Tuesday, 01 October, 2024', 
    img: "gp4.jpg", 
    link: "https://www.migeprof.gov.rw/news-detail/strengthening-womens-roles-for-national-development-highlights-from-the-23rd-general-assembly-of-the-national-womens-council" 
  },
  { 
    id: '5', 
    org: 'MIGEPROF', 
    title: 'Minister Uwimana urges women leaders in local government to build safe and resilient families', 
    date: 'Tuesday, 01 October, 2024', 
    img: "gp5.png", 
    link: "https://www.migeprof.gov.rw/news-detail/minister-uwimana-urges-women-leaders-in-local-government-to-build-safe-and-resilient-families" 
  },
];

const ImageSource = {
  "1": require(`@/assets/images/gouvernmentProjects/gp1.jpg`),
  "2": require(`@/assets/images/gouvernmentProjects/gp2.jpg`),
  "3": require(`@/assets/images/gouvernmentProjects/gp3.jpeg`),
  "4": require(`@/assets/images/gouvernmentProjects/gp4.jpeg`),
  "5": require(`@/assets/images/gouvernmentProjects/gp5.png`)
};

const CourseItem = ({ prog }) => {
  return (
    <TouchableOpacity 
      style={styles.courseContainer} 
      onPress={() => Linking.openURL(prog.link)}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={ImageSource[prog.id]} 
          style={styles.image} 
          resizeMode="cover"
        />
        <View style={styles.orgBadge}>
          <Text style={styles.orgBadgeText}>{prog.org}</Text>
        </View>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {prog.title}
        </Text>
        <View style={styles.metaContainer}>
          <Ionicons 
            name="calendar-outline" 
            size={14} 
            color="#6c757d" 
          />
          <Text style={styles.dateText}>
            {prog.date}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.readMoreButton}
          onPress={() => Linking.openURL(prog.link)}
        >
          <Text style={styles.readMoreText}>Read More</Text>
          <Ionicons 
            name="arrow-forward" 
            size={16} 
            color="#00B98E" 
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const GouvernmentProgram = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Government Programs</Text>
          <Ionicons 
            name="shield-outline" 
            size={24} 
            color="#00B98E" 
          />
        </View>
        
        <Text style={styles.subheader}>
          Explore comprehensive government initiatives to train and empower families.
        </Text>
        
        <FlatList
          data={courses}
          renderItem={({ item }) => <CourseItem prog={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
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
  subheader: {
    color: "#6c757d",
    fontSize: 16,
    textAlign: "justify",
    marginVertical: 16,
    lineHeight: 24,
  },
  listContainer: {
    paddingBottom: 20,
  },
  courseContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 220,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  orgBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0,185,142,0.8)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  orgBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#6c757d',
    marginLeft: 6,
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  readMoreText: {
    color: '#00B98E',
    fontWeight: '600',
    marginRight: 6,
  },
});

export default GouvernmentProgram;