import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Modal,
  Dimensions,
  Platform,
  UIManager,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import quiz from '@/services/quiz';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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

const SundayAttempt: React.FC = () => {
  const navigation = useNavigation();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState<string>();
  const [quizId, setQuizId] = useState<string>();
  
  // Quiz state management
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(true);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);
  
  // Scoring
  const [score, setScore] = useState(0);
  const [totalPossibleScore, setTotalPossibleScore] = useState(0);
  
  // Timer management
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes = 600 seconds
  const [isStartModalVisible, setIsStartModalVisible] = useState(true);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Animation
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Fetch questions on component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await quiz.getQuizSunday();
        setTitle(response.quiz.title);
        setQuestions(response.quiz.questions);
        setQuizId(response.quiz._id);
        
        // Calculate total possible score
        const totalScore = response.quiz.questions.reduce((sum, q) => sum + q.points, 0);
        setTotalPossibleScore(totalScore);
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
        Alert.alert('Error', 'Failed to load quiz questions.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Timer logic
  useEffect(() => {
    if (isQuizStarted && timeRemaining > 0) {
      // Animate progress bar
      Animated.timing(progressAnim, {
        toValue: 1 - (timeRemaining / 600),
        duration: 1000,
        useNativeDriver: false,
      }).start();

      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [isQuizStarted]);

  // Start quiz handler
  const handleStartQuiz = () => {
    setIsStartModalVisible(false);
    setIsQuizStarted(true);
  };

  // Auto submit when time expires
  const handleAutoSubmit = () => {
    Alert.alert('Time\'s Up!', 'Your quiz time has expired.', [
      {
        text: 'OK',
        onPress: () => handleSubmitQuiz()
      }
    ]);
  };

  // Format time display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Handle option selection
  const handleOptionSelect = (selectedOption: string) => {
    // Store user's response for current question
    setUserResponses(prev => ({
      ...prev,
      [currentQuestionIndex]: selectedOption
    }));
  };

  // Navigate to previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Navigate to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  // Show submit modal
  const handleShowSubmitModal = () => {
    // Check if all questions have been answered
    const allAnswered = questions.every((_, index) => userResponses[index]);
    
    if (allAnswered) {
      setIsSubmitModalVisible(true);
    } else {
      Alert.alert(
        'Incomplete Quiz', 
        'Please answer all questions before submitting.'
      );
    }
  };

  // Submit entire quiz
  const handleSubmitQuiz = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsSubmitModalVisible(false);

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

      const payload = {
        quizId,
        answers: formattedAnswers,
        timeSpent: 600 - timeRemaining,
      };
      await quiz.submitSunday(payload);

      setScore(totalScore);
      setResultsVisible(true);
    } catch (error) {
      console.error('Error submitting answers:', error);
      Alert.alert('Error', 'Failed to submit answers.');
    }
  };

  // Calculate percentage score
  const calculatePercentage = () => {
    return Math.round((score / totalPossibleScore) * 100);
  };

  // Render start modal
  const renderStartModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isStartModalVisible}
      onRequestClose={() => {}}
    >
      <BlurView intensity={50} style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Special Sunday Quiz</Text>
          <Text style={styles.modalDescription}>
            Welcome to the Knowledge Challenge! 
            {'\n\n'}
            • 10 minutes to complete
            • Answer each question carefully
            • Points for each correct answer
            {'\n\n'}
            Ready to test your skills?
          </Text>
          <TouchableOpacity 
            style={styles.startButton} 
            onPress={handleStartQuiz}
          >
            <Text style={styles.startButtonText}>Begin Challenge</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Modal>
  );

  // Render submit confirmation modal
  const renderSubmitModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isSubmitModalVisible}
      onRequestClose={() => setIsSubmitModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Submit Quiz</Text>
          <Text style={styles.modalDescription}>
            Are you sure you want to submit the quiz?
            {'\n\n'}
            You cannot change your answers after submission.
          </Text>
          <View style={styles.submitModalButtonContainer}>
            <TouchableOpacity 
              style={styles.submitModalCancelButton} 
              onPress={() => setIsSubmitModalVisible(false)}
            >
              <Text style={styles.submitModalCancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.submitModalConfirmButton} 
              onPress={handleSubmitQuiz}
            >
              <Text style={styles.submitModalConfirmButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // Render results view
  const renderResultsView = () => (
    <View style={styles.resultsContainer}>
      <Text style={styles.resultTitle}>Your Performance</Text>
      
      <View style={styles.scoreCard}>
        <Text style={styles.scoreLabel}>Score</Text>
        <Text style={styles.scoreValue}>
          {score} / {totalPossibleScore}
        </Text>
      </View>
      
      <View style={styles.percentageCard}>
        <Text style={styles.percentageLabel}>Percentage</Text>
        <Text style={styles.percentageValue}>
          {calculatePercentage()}%
        </Text>
      </View>
      
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Return to Quizzes</Text>
      </TouchableOpacity>
    </View>
  );

  // Render current question
  const renderCurrentQuestion = () => {
    if (!questions.length || currentQuestionIndex >= questions.length) return null;

    const currentQuestion = questions[currentQuestionIndex];

    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionProgressText}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </Text>
        <Text style={styles.questionText}>{currentQuestion.questionText}</Text>
        
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              userResponses[currentQuestionIndex] === option.text && styles.selectedOption
            ]}
            onPress={() => handleOptionSelect(option.text)}
          >
            <Text style={styles.optionText}>{option.text}</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.navigationContainer}>
          <TouchableOpacity 
            style={[
              styles.navigationButton, 
              currentQuestionIndex === 0 && styles.disabledButton
            ]} 
            onPress={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <Text style={styles.navigationButtonText}>Previous</Text>
          </TouchableOpacity>

          {currentQuestionIndex < questions.length - 1 ? (
            <TouchableOpacity 
              style={styles.navigationButton} 
              onPress={handleNextQuestion}
            >
              <Text style={styles.navigationButtonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.submitQuizButton} 
              onPress={handleShowSubmitModal}
            >
              <Text style={styles.submitQuizButtonText}>Submit Quiz</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {renderStartModal()}
      {renderSubmitModal()}
      
      {isQuizStarted && !resultsVisible && (
        <View style={styles.quizContainer}>
          {/* Animated Timer Progress Bar */}
          <View style={styles.timerContainer}>
            <View style={styles.timerLabelContainer}>
              <Text style={styles.timerLabel}>Time Remaining</Text>
              <Text style={styles.timerValue}>
                {formatTime(timeRemaining)}
              </Text>
            </View>
            <View style={styles.progressBarBackground}>
              <Animated.View 
                style={[
                  styles.progressBarFill, 
                  { 
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%']
                    }) 
                  }
                ]} 
              />
            </View>
          </View>

          {/* Current Question */}
          {renderCurrentQuestion()}
        </View>
      )}

      {resultsVisible && renderResultsView()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop:60
  },
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00B98E',
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: '#00B98E',
    padding: 15,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  timerBanner: {
    backgroundColor: '#00B98E10',
    padding: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#00B98E30',
  },
  timerText: {
    fontSize: 18,
    color: '#00B98E',
    fontWeight: 'bold',
  },
  specialHeader: {
    color: '#00B98E', 
    textTransform: 'uppercase', 
    textAlign: 'center', 
    fontSize: 16, 
    fontWeight: 'bold',
    marginVertical: 10,
    letterSpacing: 1,
  },
  quizTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  questionCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  // questionText: {
  //   fontSize: 18,
  //   fontWeight: '600',
  //   marginBottom: 15,
  //   color: '#333',
  // },
  // optionButton: {
  //   backgroundColor: '#f1f3f5',
  //   borderRadius: 10,
  //   padding: 15,
  //   marginBottom: 10,
  //   borderWidth: 2,
  //   borderColor: 'transparent',
  // },
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
  // optionText: {
  //   fontSize: 16,
  //   color: '#333',
  //   textAlign: 'center',
  // },
  submitButton: {
    backgroundColor: '#00B98E',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00B98E',
    marginBottom: 30,
  },
  scoreCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '85%',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scoreLabel: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00B98E',
  },
  percentageCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '85%',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  percentageLabel: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  percentageValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#00B98E',
  },
  backButton: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    width: '85%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00B98E',
  },
  backButtonText: {
    fontSize: 18,
    color: '#00B98E',
    fontWeight: 'bold',
  },
  quizContainer: {
    flex: 1,
    padding: 20,
  },
  timerContainer: {
    marginBottom: 20,
  },
  timerLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  timerLabel: {
    fontSize: 16,
    color: '#00B98E',
    fontWeight: '600',
  },
  timerValue: {
    fontSize: 18,
    color: '#00B98E',
    fontWeight: 'bold',
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#00B98E20',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#00B98E',
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  questionProgressText: {
    fontSize: 16,
    color: '#00B98E',
    textAlign: 'center',
    marginBottom: 15,
  },
  questionText: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  optionButton: {
    backgroundColor: '#f1f3f5',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navigationButton: {
    backgroundColor: '#00B98E',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  navigationButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitQuizButton: {
    backgroundColor: '#00B98E',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  submitQuizButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedOption: {
    backgroundColor: 'rgba(0,185,142,0.2)',
    borderColor: '#00B98E',
  },
  submitModalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  submitModalCancelButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#00B98E',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 0.45,
  },
  submitModalCancelButtonText: {
    color: '#00B98E',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitModalConfirmButton: {
    backgroundColor: '#00B98E',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 0.45,
  },
  submitModalConfirmButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'}
});
export default SundayAttempt;
