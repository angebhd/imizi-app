// App.tsx
import React, { useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Alert, StyleSheet, FlatList } from 'react-native';
import { Quiz, Question, Option } from './types';

const quizData: Quiz = {
  title: 'Understanding GBV - Basics',
  type: 'multiple-choice',
  questions: [
    {
      questionText: 'What does GBV stand for?',
      options: [
        { text: 'Gender-Based Violence', isCorrect: true },
        { text: 'Gender-Based Violence and Abuse', isCorrect: false },
        { text: 'Generalized Violence Behavior', isCorrect: false },
        { text: 'Global Beneficiary Violence', isCorrect: false },
      ],
      points: 1,
    },
    {
      questionText: 'Which of the following is a form of GBV?',
      options: [
        { text: 'Physical assault', isCorrect: true },
        { text: 'Watching TV', isCorrect: false },
        { text: 'Paying taxes', isCorrect: false },
        { text: 'Voting in elections', isCorrect: false },
      ],
      points: 1,
    },
    {
      questionText: 'GBV is most commonly perpetrated by:',
      options: [
        { text: 'Intimate partners or family members', isCorrect: true },
        { text: 'Strangers', isCorrect: false },
        { text: 'Government officials', isCorrect: false },
        { text: 'Teachers', isCorrect: false },
      ],
      points: 1,
    },
    {
      questionText: 'Which group is most at risk of experiencing GBV?',
      options: [
        { text: 'Women and girls', isCorrect: true },
        { text: 'Elderly men', isCorrect: false },
        { text: 'Boys aged 5-10', isCorrect: false },
        { text: 'Young boys', isCorrect: false },
      ],
      points: 1,
    },
    {
      questionText: 'What is the primary reason GBV occurs?',
      options: [
        { text: 'Power imbalance and inequality', isCorrect: true },
        { text: 'Cultural practices', isCorrect: false },
        { text: 'Economic status', isCorrect: false },
        { text: 'Physical appearance', isCorrect: false },
      ],
      points: 1,
    },
  ],
  status: 'active',
};

const QuizScreen: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<boolean[]>(new Array(quizData.questions.length).fill(false));

  const handleAnswerSelection = (isCorrect: boolean, index: number) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[index] = isCorrect;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const correctAnswers = selectedAnswers.filter(answer => answer).length;
      Alert.alert('Quiz Finished', `You got ${correctAnswers} out of ${quizData.questions.length} correct.`);
    }
  };

  const renderItem = ({ item, index }: { item: Question; index: number }) => {
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{item.questionText}</Text>
        {item.options.map((option, optionIndex) => (
          <TouchableOpacity
            key={optionIndex}
            style={styles.optionButton}
            onPress={() => handleAnswerSelection(option.isCorrect, index)}>
            <Text style={styles.optionText}>{option.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{quizData.title}</Text>
      <FlatList
        data={[quizData.questions[currentQuestionIndex]]}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: '#ddd',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '100%',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuizScreen;
