import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import quiz from '@/services/quiz';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Option = {
  text: string;
  isCorrect: boolean;
};

type Question = {
  questionText: string;
  options: Option[];
  points: number;
};

const DailyAttempt: React.FC = () => {
  const route = useRoute();
  const { quizId } = route.params as { quizId: string };

  const [questions, setQuestions] = useState<Question[]>([]);
  const [userResponses, setUserResponses] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await quiz.getQuiz(quizId); // Replace with your API call
        setQuestions(response.quiz.questions);
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [quizId]);

  const handleOptionSelect = (questionIndex: number, selectedOption: string) => {
    setUserResponses((prevResponses) => ({
      ...prevResponses,
      [questionIndex]: selectedOption,
    }));
  };

  const handleSubmit = async () => {
    try {
      let totalScore = 0;

      const formattedAnswers = questions.map((question, index) => {
        const userAnswer = userResponses[index];
        const correctOption = question.options.find((option) => option.isCorrect);
        const isCorrect = userAnswer === correctOption?.text;

        if (isCorrect) {
          totalScore += question.points;
        }

        return {
          questionText: question.questionText,
          options: question.options.map((option) => ({
            text: option.text,
            isCorrect: option.isCorrect,
            choosen: userAnswer === option.text,
          })),
          points: question.points,
        };
      });

      // Mock API payload
      const payload = {
        quizId,
        answers: formattedAnswers,
        score: totalScore,
      };

      // Simulate API call
      await quiz.submitAnswers(payload);
      setScore(totalScore);

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setShowResults(true);
    } catch (error) {
      console.error('Error submitting answers:', error);
      Alert.alert('Error', 'Failed to submit answers.');
    }
  };

  const renderOption = (questionIndex: number, option: Option, index: number) => {
    const isSelected = userResponses[questionIndex] === option.text;
    const isCorrect = showResults && option.isCorrect;
    const isIncorrect = showResults && isSelected && !option.isCorrect;

    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.optionItem,
          isSelected && styles.selectedOption,
          isCorrect && styles.correctOption,
          isIncorrect && styles.incorrectOption,
        ]}
        onPress={() => !showResults && handleOptionSelect(questionIndex, option.text)}
        disabled={showResults}
      >
        <Text style={styles.optionText}>{option.text}</Text>
      </TouchableOpacity>
    );
  };

  const renderQuestionItem = ({ item, index }: { item: Question; index: number }) => (
    <View style={styles.questionItem}>
      <Text style={styles.questionText}>{item.questionText}</Text>
      {item.options.map((option, optionIndex) => renderOption(index, option, optionIndex))}
    </View>
  );

  return (
    <SafeAreaView style={{ backgroundColor: '#fff', minHeight: '100%' }}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : showResults ? (
          <View>
            <Text style={styles.header}>Results</Text>
            <Text style={styles.scoreText}>Your Score: {score}</Text>
          </View>
        ) : (
          <>
            <Text style={styles.header}>Quiz Questions</Text>
            <FlatList
              data={questions}
              keyExtractor={(item, index) => `${item.questionText}-${index}`}
              renderItem={renderQuestionItem}
              contentContainerStyle={styles.questionList}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit Answers</Text>
            </TouchableOpacity>
          </>
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
    marginBottom: 20,
    marginTop: 40,
  },
  questionList: {
    paddingBottom: 20,
  },
  questionItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  optionItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#6c757d',
    borderRadius: 6,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#00B98E80',
    borderColor: '#00B98E',
  },
  correctOption: {
    backgroundColor: '#00B98E',
    borderColor: '#1e7e34',
  },
  incorrectOption: {
    backgroundColor: '#ff5555',
    borderColor: '#ff0000',
  },
  optionText: {
    fontSize: 14,
    color: '#000',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#00B98E',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default DailyAttempt;
