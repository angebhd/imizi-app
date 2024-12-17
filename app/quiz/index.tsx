import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import quiz from '@/services/quiz';
import user from '@/services/users';

// ... (keep your existing type definitions)

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [userResults, setUserResults] = useState<Result[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loadingResults, setLoadingResults] = useState(true);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);

  useEffect(() => {
    const fetchUserResults = async () => {
      try {
        setLoadingResults(true);
        const response = await user.getData();
        const quizData: Result[] = response.dailyQuizScores.map((item) => ({
          quizId: item._id,
          title: item.quizId.title,
          score: item.score,
          submittedAt: item.timestamp
        }));

        setUserResults(quizData);
      } catch (error) {
        console.error('Error fetching user results:', error);
      } finally {
        setLoadingResults(false);
      }
    };

    const fetchLeaderboard = async () => {
      try {
        setLoadingLeaderboard(true);
        const response = await quiz.getSundayLeaderboard();
        setLeaderboard(response.leaderboard);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoadingLeaderboard(false);
      }
    };

    fetchUserResults();
    fetchLeaderboard();
  }, []);

  const renderResultItem = ({ item }: { item: Result }) => (
    <View style={styles.resultItem}>
      <View style={styles.resultHeader}>
        <Text style={styles.resultTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.resultScore}>{item.score}%</Text>
      </View>
      <Text style={styles.resultDate}>
        <Ionicons name="time-outline" size={14} color="#6c757d" /> 
        {new Date(item.submittedAt).toLocaleString()}
      </Text>
    </View>
  );

  const renderLeaderboardItem = ({ item, index }: { item: LeaderboardEntry; index: number }) => (
    <View style={styles.leaderboardItem}>
      <View style={styles.leaderboardRankContainer}>
        <Text style={styles.leaderboardRank}>{index + 1}</Text>
      </View>
      <Text style={styles.leaderboardName}>{item.familyName} Family</Text>
      <Text style={styles.leaderboardScore}>{item.averageScore}%</Text>
    </View>
  );

  return (
    <LinearGradient 
      colors={['#F7F9FC', '#E6F0FF']} 
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.container}>
        <FlatList
          data={[{ key: 'content' }]}
          renderItem={() => (
            <>
              {/* Welcome Section */}
              <View style={styles.welcomeSection}>
                <Text style={styles.greeting}>Welcome to the quiz section!</Text>
                <Text style={styles.subtitle}>
                  Strengthen your family bonds through engaging quizzes
                </Text>
                
                <View style={styles.quickActionContainer}>
                  <TouchableOpacity
                    style={styles.quickActionButton}
                    onPress={() => navigation.navigate('quiz/dailyList')}
                  >
                    <Ionicons name="calendar-outline" size={24} color="white" />
                    <Text style={styles.quickActionButtonText}>Daily Quizzes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.quickActionButton}
                    onPress={() => navigation.navigate('quiz/sundayAttempt')}
                  >
                    <Ionicons name="trophy-outline" size={24} color="white" />
                    <Text style={styles.quickActionButtonText}>Sunday Quiz</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Dashboard Section */}
              <View style={styles.dashboardSection}>
                <Text style={styles.sectionTitle}>Your Quiz Dashboard</Text>

                {/* Your Quiz Results */}
                <View style={styles.sectionContainer}>
                  <View style={styles.sectionHeader}>
                    <Ionicons name="document-text-outline" size={24} color="#00B98E" />
                    <Text style={styles.sectionHeaderText}>Your Results</Text>
                  </View>
                  {loadingResults ? (
                    <ActivityIndicator size="large" color="#00B98E" />
                  ) : userResults.length > 0 ? (
                    <FlatList
                      data={userResults}
                      keyExtractor={(item) => item.quizId}
                      renderItem={renderResultItem}
                      scrollEnabled={false}
                      contentContainerStyle={styles.resultsList}
                    />
                  ) : (
                    <View style={styles.emptyState}>
                      <Ionicons name="sad-outline" size={48} color="#6c757d" />
                      <Text style={styles.emptyStateText}>No quiz results yet</Text>
                    </View>
                  )}
                </View>

                {/* Leaderboard Section */}
                <View style={styles.sectionContainer}>
                  <View style={styles.sectionHeader}>
                    <Ionicons name="podium-outline" size={24} color="#00B98E" />
                    <Text style={styles.sectionHeaderText}>Sunday Leaderboard</Text>
                  </View>
                  {loadingLeaderboard ? (
                    <ActivityIndicator size="large" color="#00B98E" />
                  ) : leaderboard.length > 0 ? (
                    <FlatList
                      data={leaderboard}
                      keyExtractor={(item, index) => `${item.familyName}-${index}`}
                      renderItem={renderLeaderboardItem}
                      scrollEnabled={false}
                      contentContainerStyle={styles.leaderboardList}
                    />
                  ) : (
                    <View style={styles.emptyState}>
                      <Ionicons name="trophy-outline" size={48} color="#6c757d" />
                      <Text style={styles.emptyStateText}>No leaderboard data</Text>
                    </View>
                  )}
                </View>
              </View>
            </>
          )}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  welcomeSection: {
    padding: 20,
    paddingTop: 50,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  quickActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    backgroundColor: '#00B98E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: '48%',
    shadowColor: '#00B98E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  quickActionButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 10,
  },
  dashboardSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    color: '#333',
  },
  resultsList: {
    paddingBottom: 10,
  },
  resultItem: {
    backgroundColor: '#F7F9FC',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  resultScore: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00B98E',
  },
  resultDate: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 5,
  },
  leaderboardList: {
    paddingBottom: 10,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  leaderboardRankContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  leaderboardRank: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00B98E',
  },
  leaderboardName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  leaderboardScore: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00B98E',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyStateText: {
    marginTop: 10,
    color: '#6c757d',
    fontSize: 16,
  },
});

export default HomeScreen;