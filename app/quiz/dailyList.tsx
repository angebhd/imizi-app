import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import quiz from '@/services/quiz';

// Define quiz type
type Quiz = {
    _id: string;
    title: string;
    type: string;
    status: string;
    questions: { 
        questionText: string; 
        options: { text: string; isCorrect: boolean }[] 
    }[];
};

const DailyQuizzes: React.FC = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation();

    // Fetch quizzes from the backend
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const quizResponse = await quiz.getDailyAll();
                setQuizzes(quizResponse.quizzes);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
                setError('Failed to load quizzes. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    // Render individual quiz item
    const renderQuizItem = ({ item }: { item: Quiz }) => (
        <TouchableOpacity 
            style={styles.quizItem} 
            onPress={() => navigation.navigate('quiz/dailyAttempt', { quizId: item._id })}
        >
            <View style={styles.quizItemContent}>
                <View style={styles.quizIconContainer}>
                    <Ionicons 
                        name="list-outline" 
                        size={24} 
                        color="#00B98E" 
                    />
                </View>
                <View style={styles.quizDetails}>
                    <Text style={styles.quizTitle} numberOfLines={1}>
                        {item.title}
                    </Text>
                    <View style={styles.quizMetaContainer}>
                        <Text style={styles.quizType}>
                            {item.type}
                        </Text>
                        <Text style={styles.quizStatus}>
                            {item.status}
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

    // Render content based on loading and data states
    const renderContent = () => {
        if (loading) {
            return (
                <View style={styles.centeredContainer}>
                    <ActivityIndicator size="large" color="#00B98E" />
                </View>
            );
        }

        if (error) {
            return (
                <View style={styles.centeredContainer}>
                    <Ionicons 
                        name="alert-circle-outline" 
                        size={50} 
                        color="#FF6B6B" 
                    />
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            );
        }

        if (quizzes.length === 0) {
            return (
                <View style={styles.centeredContainer}>
                    <Ionicons 
                        name="document-outline" 
                        size={50} 
                        color="#6c757d" 
                    />
                    <Text style={styles.noQuizzesText}>
                        No quizzes available at the moment
                    </Text>
                </View>
            );
        }

        return (
            <FlatList
                data={quizzes}
                keyExtractor={(item) => item._id}
                renderItem={renderQuizItem}
                contentContainerStyle={styles.quizList}
                showsVerticalScrollIndicator={false}
            />
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Daily Quizzes</Text>
                </View>
                {renderContent()}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    headerContainer: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
    },
    quizList: {
        paddingTop: 16,
        paddingBottom: 20,
    },
    quizItem: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    quizItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    quizIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#00B98E1A',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    quizDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    quizTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    quizMetaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quizType: {
        fontSize: 12,
        color: '#6c757d',
        marginRight: 10,
    },
    quizStatus: {
        fontSize: 12,
        color: '#28a745',
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    errorText: {
        fontSize: 16,
        color: '#FF6B6B',
        textAlign: 'center',
        marginTop: 16,
    },
    noQuizzesText: {
        fontSize: 16,
        color: '#6c757d',
        textAlign: 'center',
        marginTop: 16,
    },
});

export default DailyQuizzes;