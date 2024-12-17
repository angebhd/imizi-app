import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import users from '@/services/users';
import auth from '@/services/auth';

const Profile = () => {
  const router = useRouter();

  // User data state
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    familyName: 'No family yet'
  });

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await users.getData();
        setUserData({
          fullName: `${data.firstName} ${data.lastName}`,
          email: data.email,
          familyName: data.family?.name ? `${data.family.name} Family` : 'No family yet'
        });
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Navigation handler
  const handleNavigation = (route: string) => {
    router.navigate(route);
  };

  // Signout logic
  const signOut = async () => {
    try {
      const status = await auth.remove();
      if (status) {
        router.navigate('/(auth)/sign-in');
      } else {
        console.error("Logout failed");
        // Consider adding user-friendly error handling
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profileAvatar}>
          <Ionicons name="person-circle" size={80} color="#00B98E" />
        </View>
        <Text style={styles.nameText}>{userData.fullName}</Text>
        <Text style={styles.emailText}>{userData.email}</Text>
        <Text style={styles.familyText}>{userData.familyName}</Text>
      </View>

      {/* Profile Menu */}
      <View style={styles.menuContainer}>
        <ProfileMenuItem 
          icon="people-outline"
          text="My Family" 
          onPress={() => handleNavigation("/family")} 
        />
        <ProfileMenuItem 
          icon="document-text-outline"
          text="Terms and Conditions" 
          onPress={() => handleNavigation("/terms")} 
        />
        <ProfileMenuItem 
          icon="shield-outline"
          text="Privacy Policy" 
          onPress={() => handleNavigation("/privacy")} 
        />
        <ProfileMenuItem 
          icon="log-out-outline"
          text="Sign Out" 
          onPress={signOut}
          isLogout
        />
      </View>
    </SafeAreaView>
  );
};

// Reusable Menu Item Component
const ProfileMenuItem = ({ 
  icon, 
  text, 
  onPress, 
  isLogout = false 
}) => (
  <TouchableOpacity 
    style={[
      styles.menuItem, 
      isLogout && styles.logoutMenuItem
    ]}
    onPress={onPress}
  >
    <View style={styles.menuItemContent}>
      <Ionicons 
        name={icon} 
        size={24} 
        color={isLogout ? '#FF6B6B' : '#00B98E'} 
      />
      <Text style={[
        styles.menuItemText,
        isLogout && styles.logoutText
      ]}>
        {text}
      </Text>
    </View>
    <Ionicons 
      name="chevron-forward" 
      size={24} 
      color={isLogout ? '#FF6B6B' : '#00B98E'} 
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FB',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileAvatar: {
    marginBottom: 15,
  },
  nameText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  emailText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  familyText: {
    fontSize: 16,
    color: '#00B98E',
    fontWeight: '500',
  },
  menuContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  logoutMenuItem: {
    borderColor: '#FF6B6B',
    borderWidth: 1,
  },
  logoutText: {
    color: '#FF6B6B',
  },
});

export default Profile;