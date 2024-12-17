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
import { useNavigation, useRoute } from '@react-navigation/native';
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
  // const { quizId } = route.params as { quizId: string };

  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState<string>();
  const [quizId, setQuizId] = useState<string>();
  const [userResponses, setUserResponses] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(true);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [score, setScore] = useState(0);
  ///
  const navigation = useNavigation();


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await quiz.getQuizSunday(); // Replace with your API call
        setTitle(response.quiz.title);
        setQuestions(response.quiz.questions);
        setQuizId(response.quiz._id);
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
    // }, [quizId]);
  }, []);

  const handleOptionSelect = (questionIndex: number, selectedOption: string) => {
    if (!resultsVisible) {
      setUserResponses((prevResponses) => ({
        ...prevResponses,
        [questionIndex]: selectedOption,
      }));
    }
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

      // Simulate API payload submission
      const payload = {
        quizId,
        answers: formattedAnswers,
      };
      await quiz.submitSunday(payload);

      setScore(totalScore);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setResultsVisible(true); // Show results immediately
    } catch (error) {
      console.error('Error submitting answers:', error);
      Alert.alert('Error', 'Failed to submit answers.');
    }
  };

  const renderOption = (questionIndex: number, option: Option, index: number) => {
    const isSelected = userResponses[questionIndex] === option.text;
    const isCorrect = resultsVisible && option.isCorrect;
    const isIncorrect = resultsVisible && isSelected && !option.isCorrect;

    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.optionItem,
          isSelected && styles.selectedOption,
          isCorrect && styles.correctOption,
          isIncorrect && styles.incorrectOption,
        ]}
        onPress={() => handleOptionSelect(questionIndex, option.text)}
        disabled={resultsVisible} // Disable selection post-submission
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
    <SafeAreaView style={{ backgroundColor: '#fff', minHeight: '100%', paddingTop: 40 }}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : (
          <>
            <Text style={{color: '#00B98E', textTransform: 'uppercase', textAlign: 'center', fontSize: 24, borderBottomWidth: 3, fontWeight: 'bold'}}>Special Sunday</Text>
            <Text style={styles.title}>{title}</Text>
            <FlatList
              data={questions}
              keyExtractor={(item, index) => `${item.questionText}-${index}`}
              renderItem={renderQuestionItem}
              contentContainerStyle={styles.questionList}
            />
            {!resultsVisible ? (
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit Answers</Text>
              </TouchableOpacity>
            ) : (
              <View>

                <Text style={styles.scoreText}>Your Score: {score}</Text>
                <TouchableOpacity style={{ backgroundColor: '#00B98E11' }} onPress={() => navigation.goBack()}><Text style={styles.goBack}> Go back to quizzes</Text></TouchableOpacity>
              </View>
            )}
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
  questionList: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 20,

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
    backgroundColor: '#dc3545',
    borderColor: '#c82333',
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
    margin: 20,
    textAlign: 'center',
  },
  goBack: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 10,
    textAlign: 'center',
  },
});

export default DailyAttempt;
