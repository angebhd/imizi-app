import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';


import { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import quiz from '@/services/quiz';

// Define types
type Result = {
  quizId: string;
  title: string;
  type: string;
  score: number;
  submittedAt: string;
};

type LeaderboardEntry = {
  familyName: string;
  averageScore: number;
};

// Define the type for navigation routes
type RootStackParamList = {
  DailyQuiz: undefined;
  SundayQuiz: undefined;
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  ////
  const [userResults, setUserResults] = useState<Result[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loadingResults, setLoadingResults] = useState(true);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);

  useEffect(() => {
    const fetchUserResults = async () => {
      try {
        setLoadingResults(true);
        const response = await quiz.getUserResults(); // API call for user results
        setUserResults(response.results);
      } catch (error) {
        console.error('Error fetching user results:', error);
      } finally {
        setLoadingResults(false);
      }
    };

    const fetchLeaderboard = async () => {
      try {
        setLoadingLeaderboard(true);
        const response = await quiz.getSundayLeaderboard(); // API call for leaderboard
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
      <Text style={styles.resultTitle}>{item.title}</Text>
      <Text style={styles.resultType}>Type: {item.type}</Text>
      <Text style={styles.resultScore}>Score: {item.score}%</Text>
      <Text style={styles.resultDate}>
        Submitted At: {new Date(item.submittedAt).toLocaleString()}
      </Text>
    </View>
  );

  const renderLeaderboardItem = ({ item, index }: { item: LeaderboardEntry; index: number }) => (
    <View style={styles.leaderboardItem}>
      <Text style={styles.leaderboardRank}>{index + 1}</Text>
      <Text style={styles.leaderboardName}>{item.familyName} family</Text>
      <Text style={styles.leaderboardScore}>{item.averageScore}%</Text>
    </View>
  );
  ///

  return (
    <SafeAreaView style={{ backgroundColor: '#fff', minHeight: '100%' }}>
      <ScrollView style={{ padding: 20, paddingTop: 60 }}>
          <View>
            <Text style={styles.title}>Welcome to the Quiz Section</Text>
            <Text>Challenge yourself by answering questions that will help you to strengthen the coesion of your family </Text>
            <ScrollView style={styles.containerButton} horizontal={true} showsHorizontalScrollIndicator={false} >
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('quiz/dailyList')}
              >
                <Text style={styles.buttonText}>Daily Quizzes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('quiz/sundayAttempt')}
              >
                <Text style={styles.buttonText}>Sunday Quiz</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Dashbord */}
          <View>
            <Text style={styles.header}>Dashboard</Text>

            {/* All Results Section */}
            <Text style={styles.subHeader}>Your Quiz Results</Text>
            {loadingResults ? (
              <ActivityIndicator size="large" color="#007bff" />
            ) : userResults.length > 0 ? (
              <FlatList
                data={userResults}
                keyExtractor={(item) => item.quizId}
                renderItem={renderResultItem}
                contentContainerStyle={styles.resultsList}
              />
            ) : (
              <Text style={styles.noDataText}>No results available yet.</Text>
            )}

            {/* Leaderboard Section */}
            <Text style={styles.subHeader}>Sunday Quiz Leaderboard</Text>
            {loadingLeaderboard ? (
              <ActivityIndicator size="large" color="#007bff" />
            ) : leaderboard.length > 0 ? (
              <FlatList
                data={leaderboard}
                keyExtractor={(item, index) => `${item.familyName}-${index}`}
                renderItem={renderLeaderboardItem}
                contentContainerStyle={styles.leaderboardList}
              />
            ) : (
              <Text style={styles.noDataText}>No leaderboard data available yet.</Text>
            )}
          </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerButton: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-around',
    // alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00B98E',
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginRight: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ///

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  resultsList: {
    paddingBottom: 20,
  },
  resultItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultType: {
    fontSize: 14,
    color: '#6c757d',
  },
  resultScore: {
    fontSize: 14,
    color: '#28a745',
  },
  resultDate: {
    fontSize: 12,
    color: '#6c757d',
  },
  leaderboardList: {
    paddingBottom: 20,
  },
  leaderboardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 1,
    marginBottom: 0,
    borderColor: 'black',
    borderBottomWidth: 1,
  },
  leaderboardRank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  leaderboardName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 10,
  },
  leaderboardScore: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00B98E',
  },
  noDataText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default HomeScreen;
