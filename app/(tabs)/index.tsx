import React from 'react';
import { 
  StyleSheet, 
  View, 
  Image, 
  TouchableOpacity, 
  Text, 
  ScrollView, 
  ImageBackground,
  Dimensions, 
  Linking
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Home as HomeIcon, 
  Book, 
  Users, 
  Calendar, 
  Play, 
  User 
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const MENU_ITEMS = [
  { 
    icon: HomeIcon, 
    title: 'Home', 
    route: null,
    active: true 
  },
  { 
    icon: Play, 
    title: 'Quiz', 
    route: '/quiz',
    active: true 
  },
  { 
    icon: Users, 
    title: 'My Family', 
    route: '/family',
    active: true 
  },
  { 
    icon: Calendar, 
    title: 'Daily Quizzes', 
    route: '/quiz/dailyList',
    active: true 
  },
  { 
    icon: Book, 
    title: 'Courses', 
    route: '/free-course',
    active: true 
  },
  { 
    icon: User, 
    title: 'Profile', 
    route: '/(tabs)/profile',
    active: true 
  }
];

const BLOG_ITEMS = [
  {
    image: require('../../assets/images/Home/1.jpg'),
    type: 'Blog',
    title: 'Successful Stories in Family Engagement',
    link : 'https://www.migeprof.gov.rw'
  },
  {
    image: require('../../assets/images/Home/2.jpg'),
    type: 'Blog',
    title: 'Communication in Families',
    link : 'https://www.migeprof.gov.rw'
  },
  {
    image: require('../../assets/images/Home/3.jpg'),
    type: 'Art',
    title: 'Family Health and Nutrition',
    link : 'https://www.migeprof.gov.rw'
  },
  {
    image: require('../../assets/images/Home/4.jpeg'),
    type: 'Blog',
    title: 'Impact of Technology in Family Life',
    link : 'https://www.migeprof.gov.rw'
  },
  {
    image: require('../../assets/images/Home/4.jpg'),
    type: 'Blog',
    title: 'The Benefits of Family Sport',
    link : 'https://www.migeprof.gov.rw'
  },
  {
    image: require('../../assets/images/Home/5.jpg'),
    type: 'Art',
    title: 'Spending Quality Time Together',
    link : 'https://www.migeprof.gov.rw'
  }
];

const COURSE_ITEMS = Array(6).fill({
  image: require('@/assets/images/Home/rec1.png'),
  title: 'Little Scientists: Exploring the World',
  description: 'Young learners become scientists as they explore'
});

const HomeScreen = () => {
  const router = useRouter();

  const renderMenuItem = (item, index) => (
    <TouchableOpacity 
      key={index} 
      style={[
        styles.menuButton, 
        item.active ? {} : styles.menuButtonInactive
      ]}
      onPress={() => item.route && router.navigate(item.route)}
    >
      <item.icon 
        color={item.active ? '#4ECDC4' : '#A0AEC0'} 
        size={20} 
      />
      <Text style={[
        styles.menuButtonText, 
        item.active ? styles.activeMenuText : styles.inactiveMenuText
      ]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const renderBlogItem = (item, index) => (
    <TouchableOpacity key={index} style={styles.blogItemContainer} onPress={()=> Linking.openURL(item.link)}>
      <ImageBackground 
        source={item.image} 
        style={styles.blogImage}
        imageStyle={styles.blogImageStyle}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.blogGradient}
        >
          <View style={styles.blogContent}>
            <Text style={styles.blogType}>{item.type}</Text>
            <Text style={styles.blogTitle} numberOfLines={2}>
              {item.title}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );

  const renderCourseItem = (item, index) => (
    <View key={index} style={styles.courseItem}>
      <Image source={item.image} style={styles.courseImage} />
      <View style={styles.courseTextContainer}>
        <Text style={styles.courseTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.courseDescription} numberOfLines={1}>
          {item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#FF6B6B', '#4ECDC4']}
        style={styles.gradientHeader}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerTitleContainer}>
            <Image 
              source={require('../../assets/images/Home/Vector.png')} 
              style={styles.headerLogo} 
            />
            <Text style={styles.headerTitle}>Family Cohesion</Text>
          </View>
          <Image 
            source={require('../../assets/images/Home/Group 121.png')} 
            style={styles.headerImage}
          />
        </View>
      </LinearGradient>

      <View style={styles.contentContainer}>
        <Text style={styles.tagline}>
          Set aside regular time for open and honest communication.
        </Text>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.menuScrollView}
        >
          {MENU_ITEMS.map(renderMenuItem)}
        </ScrollView>

        <Text style={styles.sectionTitle}>Featured Blogs</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.blogScrollView}
        >
          {BLOG_ITEMS.map(renderBlogItem)}
        </ScrollView>

        <Text style={styles.sectionTitle}>Recommended Courses</Text>
        <View style={styles.courseGrid}>
          {COURSE_ITEMS.map(renderCourseItem)}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  gradientHeader: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
  headerImage: {
    width: 50,
    height: 50,
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  tagline: {
    color: '#4A5568',
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 20,
    lineHeight: 24,
  },
  menuScrollView: {
    marginBottom: 20,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginRight: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuButtonInactive: {
    opacity: 0.5,
  },
  menuButtonText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '600',
  },
  activeMenuText: {
    color: '#2D3748',
  },
  inactiveMenuText: {
    color: '#A0AEC0',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 15,
  },
  blogScrollView: {
    marginBottom: 20,
  },
  blogItemContainer: {
    marginRight: 15,
    width: width * 0.7,
    borderRadius: 15,
    overflow: 'hidden',
  },
  blogImage: {
    width: '100%',
    height: 250,
    justifyContent: 'flex-end',
  },
  blogImageStyle: {
    borderRadius: 15,
  },
  blogGradient: {
    height: '50%',
    justifyContent: 'flex-end',
    padding: 15,
  },
  blogType: {
    color: '#4ECDC4',
    fontSize: 14,
    marginBottom: 5,
  },
  blogTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  courseGrid: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  courseItem: {
    // width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  courseTextContainer: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 5,
  },
  courseDescription: {
    fontSize: 14,
    color: '#4A5568',
  },
});

export default HomeScreen;