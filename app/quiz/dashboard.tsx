import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';
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
  userName: string;
  score: number;
};

const Dashboard: React.FC = () => {
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
      <Text style={styles.leaderboardRank}>#{index + 1}</Text>
      <Text style={styles.leaderboardName}>{item.userName}</Text>
      <Text style={styles.leaderboardScore}>{item.score}%</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ backgroundColor: '#fff', minHeight: '100%' }}>
      <ScrollView style={styles.container}>
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
            keyExtractor={(item, index) => `${item.userName}-${index}`}
            renderItem={renderLeaderboardItem}
            contentContainerStyle={styles.leaderboardList}
          />
        ) : (
          <Text style={styles.noDataText}>No leaderboard data available yet.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
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
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
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
    color: '#28a745',
  },
  noDataText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default Dashboard;
