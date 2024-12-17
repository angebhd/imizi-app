import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Modal,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';
import quiz from '@/services/quiz';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Option = {
  text: string;
  isCorrect: boolean;
};

type Question = {
  questionText: string;
  options: Option[];
  points: number;
};

type FormattedAnswer = {
  questionText: string;
  userSelectedOption: string | null;
  correctOption: string;
  isCorrect: boolean;
  options: Array<{
    text: string;
    isCorrect: boolean;
  }>;
  points: number;
};

const DailyAttempt: React.FC = () => {
  const route = useRoute();
  const { quizId } = route.params as { quizId: string };
  const navigation = useNavigation();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState<string>();
  const [userResponses, setUserResponses] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(true);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [score, setScore] = useState(0);
  const [formattedAnswers, setFormattedAnswers] = useState<FormattedAnswer[]>([]);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);


  // Animated values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await quiz.getQuiz(quizId);
        setTitle(response.quiz.title);
        setQuestions(response.quiz.questions);

        // Animate in questions
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 4,
            useNativeDriver: true,
          })
        ]).start();
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
        Alert.alert('Error', 'Failed to load quiz questions.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [quizId]);

  const handleOptionSelect = (questionIndex: number, selectedOption: string) => {
    if (!resultsVisible) {
      setUserResponses((prevResponses) => ({
        ...prevResponses,
        [questionIndex]: selectedOption,
      }));

      // Animate option selection
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const showConfirmationModal = () => {
    const allQuestionsAnswered = questions.every((_, index) => userResponses[index]);

    if (!allQuestionsAnswered) {
      Alert.alert(
        'Incomplete Quiz',
        'Please answer all questions before submitting.',
        [{ text: 'OK' }]
      );
      return;
    }

    setIsConfirmationModalVisible(true);
  };

  const handleSubmit = async () => {
    try {
      let totalScore = 0;
      const totalPossiblePoints = questions.reduce((sum, q) => sum + q.points, 0);

      const answers = questions.map((question, index) => {
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

      const payload = {
        quizId,
        answers,
      };
      await quiz.submitDaily(payload);

      const scorePercentage = Math.round((totalScore / totalPossiblePoints) * 100);
      setScore(scorePercentage);
      setFormattedAnswers(answers);
      setResultsVisible(true);
      setIsConfirmationModalVisible(false);

      // Animate results
      Animated.spring(scaleAnim, {
        toValue: 1.2,
        friction: 2,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      console.error('Error submitting answers:', error);
      Alert.alert('Error', 'Failed to submit answers.');
    }
  };

  const renderOption = (questionIndex: number, option: Option, answeredQuestion?: FormattedAnswer) => {
    const isSelected = userResponses[questionIndex] === option.text;
    const isCorrect = answeredQuestion
      ? option.isCorrect
      : false;
    const isIncorrect = answeredQuestion
      ? (isSelected && !option.isCorrect)
      : false;

    return (
      <Animated.View
        style={[
          styles.optionContainer,
          {
            transform: [
              {
                scale: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.9, 1]
                })
              }
            ]
          }
        ]}
        key={option.text}
      >
        <TouchableOpacity
          style={[
            styles.optionItem,
            !resultsVisible && isSelected && styles.selectedOption,
            resultsVisible && isCorrect && styles.correctOption,
            resultsVisible && isIncorrect && styles.incorrectOption,
          ]}
          onPress={() => handleOptionSelect(questionIndex, option.text)}
          disabled={resultsVisible}
        >
          <Text style={styles.optionText}>{option.text}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const ScoreCircle = ({ score }: { score: number }) => {
    const radius = 100;
    const strokeWidth = 15;
    const circumference = 2 * Math.PI * radius;
    const progress = (score / 100) * circumference;

    return (
      <Svg width={radius * 2} height={radius * 2}>
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          stroke="#00B98E"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
        />
        <Text
          x={radius}
          y={radius}
          textAnchor="middle"
          fontSize="24"
          fontWeight="bold"
          fill="#00B98E"
        >
          {score}%
        </Text>
      </Svg>
    );
  };

  const renderQuizContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#007bff" />;
    }

    if (resultsVisible) {
      return (
        <Animated.View
          style={[
            styles.resultsContainer,
            {
              transform: [
                {
                  scale: scaleAnim.interpolate({
                    inputRange: [0, 1, 1.2],
                    outputRange: [0.5, 1, 1.2]
                  })
                }
              ]
            }
          ]}
        >
          <ScoreCircle score={score} />
          <Text style={styles.resultTitle}>
            {score >= 70 ? 'Great Job!' : 'Keep Practicing'}
          </Text>
          <TouchableOpacity
            style={styles.goBackButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.goBackText}>Back to Quizzes</Text>
          </TouchableOpacity>
        </Animated.View>
      );
    }

    return (
      <Animated.View
        style={[
          styles.quizContainer,
          {
            opacity: fadeAnim,
            transform: [
              {
                scale: scaleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1]
                })
              }
            ],
            paddingTop: 40
          }
        ]}
      >
        <LinearGradient
          colors={['#f8f9fa', '#e9ecef']}
          style={styles.gradientBackground}
        >
          <Text style={styles.title}>{title}</Text>
          <View style={styles.progressIndicator}>
            <Text style={styles.progressText}>
              {`Question ${currentQuestionIndex + 1} of ${questions.length}`}
            </Text>
          </View>

          <View style={styles.questionItem}>
            <Text style={styles.questionText}>
              {questions[currentQuestionIndex].questionText}
            </Text>
            {questions[currentQuestionIndex].options.map((option, optionIndex) =>
              renderOption(
                currentQuestionIndex,
                option,
                resultsVisible ? formattedAnswers[currentQuestionIndex] : undefined
              )
            )}
          </View>

          <View style={styles.navigationButtons}>
            {currentQuestionIndex > 0 && (
              <TouchableOpacity
                style={styles.navButton}
                onPress={() => setCurrentQuestionIndex(prev => prev - 1)}
              >
                <Text style={styles.navButtonText}>Previous</Text>
              </TouchableOpacity>
            )}
            {currentQuestionIndex < questions.length - 1 ? (
              <TouchableOpacity
                style={styles.navButton}
                onPress={() => setCurrentQuestionIndex(prev => prev + 1)}
              >
                <Text style={styles.navButtonText}>Next</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.submitButton}
                onPress={showConfirmationModal}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {renderQuizContent()}
      {/* Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isConfirmationModalVisible}
        onRequestClose={() => setIsConfirmationModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Submission</Text>
            <Text style={styles.modalText}>Are you sure you want to submit your answers?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsConfirmationModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleSubmit}
              >
                <Text style={styles.modalButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ... (previous styles with some modifications)
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  quizContainer: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  progressIndicator: {
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'rgba(0,185,142,0.1)',
    padding: 10,
    borderRadius: 10,
  },
  progressText: {
    fontSize: 16,
    color: '#00B98E',
    fontWeight: '600',
  },
  questionItem: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  optionContainer: {
    marginBottom: 10,
  },
  optionItem: {
    backgroundColor: '#f1f3f5',
    borderRadius: 10,
    padding: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: 'rgba(0,185,142,0.2)',
    borderColor: '#00B98E',
  },
  correctOption: {
    backgroundColor: 'rgba(0,185,142,0.7)',
    borderColor: '#1e7e34',
  },
  incorrectOption: {
    backgroundColor: 'rgba(220,53,69,0.7)',
    borderColor: '#c82333',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navButton: {
    backgroundColor: '#00B98E',
    padding: 15,
    borderRadius: 10,
    flex: 0.48,
    alignItems: 'center',
  },
  navButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  // (Previous code remains the same, adding the following styles at the end of the StyleSheet)

  submitButton: {
    backgroundColor: '#00B98E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  resultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 20,
    color: '#00B98E',
  },
  goBackButton: {
    marginTop: 20,
    backgroundColor: '#f1f3f5',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  goBackText: {
    color: '#00B98E',
    fontWeight: '600',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f1f3f5',
  },
  confirmButton: {
    backgroundColor: '#00B98E',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default DailyAttempt;