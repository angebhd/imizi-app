import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  TextInput, 
  Linking
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  MessageCircle, 
  Plus, 
  Search, 
  UserPlus, 
  MoreVertical 
} from 'lucide-react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const FAMILY_MEMBERS = [
  { 
    id: 1, 
    name: 'Pierre', 
    role: 'Father', 
    // image: require('@/assets/images/family/father.jpg'),
    status: 'online'
  },
  { 
    id: 2, 
    name: 'Jane', 
    role: 'Mother', 
    // image: require('@/assets/images/family/mother.jpg'),
    status: 'online'
  },
  { 
    id: 3, 
    name: 'Emma', 
    role: 'Daughter', 
    // image: require('@/assets/images/family/daughter.jpg'),
    status: 'away'
  },
  { 
    id: 4, 
    name: 'Mike', 
    role: 'Son', 
    // image: require('@/assets/images/family/son.jpg'),
    status: 'offline'
  }
];

const RECENT_CHATS = [
  {
    id: 1,
    name: 'Family Group',
    lastMessage: 'Planning weekend activities...',
    time: '2h ago',
    unread: 3,
    // image: require('@/assets/images/family/family-group.jpg')
  },
  {
    id: 2,
    name: 'Pierre',
    lastMessage: 'Don\'t forget the groceries!',
    time: '1h ago',
    unread: 1,
    // image: require('@/assets/images/family/father.jpg')
  }
];

const FamilyChatScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const FamilyMemberCard = ({ member }) => (
    <TouchableOpacity style={styles.familyMemberCard}>
      <View style={styles.familyMemberImageContainer}>
        {/* <Image source={member.image} style={styles.familyMemberImage} /> */}
        <Ionicons name="person-circle" size={30} color="#00B98E" />

        <View 
          style={[
            styles.statusIndicator, 
            member.status === 'online' && styles.onlineStatus,
            member.status === 'away' && styles.awayStatus,
            member.status === 'offline' && styles.offlineStatus
          ]} 
        />
      </View>
      <View style={styles.familyMemberDetails}>
        <Text style={styles.familyMemberName}>{member.name}</Text>
        <Text style={styles.familyMemberRole}>{member.role}</Text>
      </View>
      <TouchableOpacity style={styles.addMemberButton}>
        <MessageCircle color="#4ECDC4" size={20} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const RecentChatItem = ({ chat }) => (
    <TouchableOpacity style={styles.recentChatItem}>
      <Image source={chat.image} style={styles.recentChatImage} />
      <View style={styles.recentChatDetails}>
        <View style={styles.recentChatHeader}>
          <Text style={styles.recentChatName}>{chat.name}</Text>
          <Text style={styles.recentChatTime}>{chat.time}</Text>
        </View>
        <View style={styles.recentChatFooter}>
          <Text style={styles.recentChatMessage} numberOfLines={1}>
            {chat.lastMessage}
          </Text>
          {chat.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{chat.unread}</Text>
            </View>
          )}
        </View>
      </View>
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
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Family Chat</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerActionButton}>
              <UserPlus color="white" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerActionButton}>
              <MoreVertical color="white" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.searchContainer}>
        <Search color="#A0AEC0" size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search family members or chats"
          placeholderTextColor="#A0AEC0"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Family Members</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.familyMembersScroll}
        >
          <TouchableOpacity style={styles.addFamilyButton} onPress={()=> router.navigate("/family/invite")}>
            <Plus color="#4ECDC4" size={24} />
            <Text style={styles.addFamilyButtonText}>Add</Text>
          </TouchableOpacity>
          {FAMILY_MEMBERS.map(member => (
            <FamilyMemberCard key={member.id} member={member} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Recent Chats</Text>
        <ScrollView style={styles.recentChatsScroll}>
          {RECENT_CHATS.map(chat => (
            <RecentChatItem key={chat.id} chat={chat} />
          ))}
        </ScrollView>
      </View>
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
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerActionButton: {
    marginLeft: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#2D3748',
  },
  sectionContainer: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 15,
    padding:5
  },
  familyMembersScroll: {
    flexGrow: 0,
    padding: 5
  },
  addFamilyButton: {
    width: 80,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addFamilyButtonText: {
    color: '#4ECDC4',
    fontWeight: '600',
    marginTop: 10,
  },
  familyMemberCard: {
    width: 80,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 15,
    marginRight: 15,
    alignItems: 'center',
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  familyMemberImageContainer: {
    position: 'relative',
  },
  familyMemberImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'white',
  },
  onlineStatus: {
    backgroundColor: '#4ECDC4',
  },
  awayStatus: {
    backgroundColor: '#F9D56E',
  },
  offlineStatus: {
    backgroundColor: '#FF6B6B',
  },
  familyMemberDetails: {
    marginTop: 10,
    alignItems: 'center',
  },
  familyMemberName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
  },
  familyMemberRole: {
    fontSize: 12,
    color: '#4A5568',
  },
  addMemberButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  recentChatsScroll: {
    marginTop: 10,
  },
  recentChatItem: {
    flexDirection: 'row',
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
  recentChatImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  recentChatDetails: {
    flex: 1,
  },
  recentChatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recentChatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  recentChatTime: {
    fontSize: 12,
    color: '#4A5568',
  },
  recentChatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  recentChatMessage: {
    fontSize: 14,
    color: '#4A5568',
    flex: 1,
    marginRight: 10,
  },
  unreadBadge: {
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default FamilyChatScreen;