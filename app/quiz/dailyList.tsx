import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import quiz from '@/services/quiz';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
// Define quiz type
type Quiz = {
    _id: string;
    title: string;
    type: string;
    status: string;
    questions: { questionText: string; options: { text: string; isCorrect: boolean }[] }[];
};

type Score = {
    quizId: string;
    score: number;
    timestamp: string;
};

const DailyQuiz: React.FC = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [scores, setScores] = useState<Score[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();


    // Fetch quizzes and scores from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Replace with your backend endpoints
                const quizResponse = await quiz.getDailyAll();
                await quiz.getScores();
                // const scoresResponse = await axios.get('http://<your-backend-url>/api/scores');
                setQuizzes(quizResponse.quizzes);
                // setScores(scoresResponse.data.scores);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const renderQuizItem = ({ item }: { item: Quiz }) => (
        <TouchableOpacity style={styles.quizItem} onPress={() => navigation.navigate('quiz/dailyAttempt', { quizId: item._id })}>
            <Text style={styles.quizTitle}>{item.title}</Text>
            <Text style={styles.quizType}>Type: {item.type}</Text>
            <Text style={styles.quizStatus}>Status: {item.status}</Text>
        </TouchableOpacity>
    );
    return (
        <SafeAreaView style={{ backgroundColor: '#fff', minHeight: '100%' }}>
                <View style={styles.container}>
                    <Text style={styles.header}>Available Quizzes</Text>
                    {loading ? (
                        <ActivityIndicator size="large" color="#007bff" />
                    ) : (
                        <FlatList
                            data={quizzes}
                            keyExtractor={(item) => item._id}
                            renderItem={renderQuizItem}
                            contentContainerStyle={styles.quizList}
                        />
                    )}
                    <Text style={styles.header}>Your Scores</Text>
                    {scores.length > 0 ? (
                        scores.map((score) => (
                            <Text key={score.quizId} style={styles.scoreItem}>
                                Quiz ID: {score.quizId} - Score: {score.score}%
                            </Text>
                        ))
                    ) : (
                        <Text style={styles.noScores}>No scores available yet.</Text>
                    )}
                </View>
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
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    quizList: {
        paddingBottom: 20,
    },
    quizItem: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    quizTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    quizType: {
        fontSize: 14,
        color: '#6c757d',
    },
    quizStatus: {
        fontSize: 14,
        color: '#28a745',
    },
    scoreItem: {
        fontSize: 14,
        marginBottom: 8,
    },
    noScores: {
        fontSize: 14,
        color: '#6c757d',
    },
});

export default DailyQuiz;
