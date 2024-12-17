import React from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Clock, 
  PiggyBank, 
  Book, 
  Users, 
  Shield, 
  FileText, 
  Star, 
  ChevronRight 
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

const MENU_ITEMS = [

  { 
    icon: Book, 
    title: 'Free Courses', 
    route: '/free-course',
    color: '#A78BFA' 
  },
 
  { 
    icon: Shield, 
    title: 'Government Programs', 
    route: '/governmentProgram',
    color: '#5D3FD3' 
  },
  { 
    icon: FileText, 
    title: 'GBV Information', 
    route: '/gbv',
    color: '#FF6B6B' 
  },
  { 
    icon: Star, 
    title: 'Quiz Challenges', 
    route: '/quiz',
    color: '#4ECDC4' 
  },
  { 
    icon: Star, 
    title: 'Sunday Special', 
    route: '/quiz/sundayAttempt',
    color: '#A78BFA' 
  },
  //   { 
  //   icon: Clock, 
  //   title: 'TODO Activities', 
  //   route: null,
  //   color: '#4ECDC4' 
  // },
  // { 
  //   icon: PiggyBank, 
  //   title: 'Budgeting', 
  //   route: '/budgeting',
  //   color: '#FF6B6B' 
  // },
  //  { 
  //   icon: Users, 
  //   title: 'Community Engagement', 
  //   route: null,
  //   color: '#F9D56E' 
  // },
];

const Explore = () => {
  const router = useRouter();

  const handleClick = (route: string | null) => {
    if (route) {
      router.navigate(route);
    }
  };

  const MenuButton = ({ icon: Icon, title, route, color }) => (
    <TouchableOpacity 
      style={styles.menuButton} 
      onPress={() => handleClick(route)}
      disabled={!route}
    >
      <View style={[styles.menuButtonIconContainer, { backgroundColor: color + '20' }]}>
        <Icon color={color} size={24} />
      </View>
      <View style={styles.menuButtonTextContainer}>
        <Text style={styles.menuButtonTitle}>{title}</Text>
      </View>
      {route && <ChevronRight color="#4A5568" size={20} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FF6B6B', '#4ECDC4']}
        style={styles.gradientHeader}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Family Cohesion Tools</Text>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Text style={styles.introText}>
          Empower your family with comprehensive tools and resources designed to support your growth, learning, and well-being.
        </Text>

        <View style={styles.menuGrid}>
          {MENU_ITEMS.map((item, index) => (
            <MenuButton 
              key={index}
              icon={item.icon}
              title={item.title}
              route={item.route}
              color={item.color}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  introText: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 24,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuButtonIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuButtonTextContainer: {
    flex: 1,
  },
  menuButtonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
});
export default Explore;