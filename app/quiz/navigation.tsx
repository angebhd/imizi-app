import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@/app/quiz'; // Adjust path as needed
import DailyQuiz from '@/app/quiz/dailyList';
import DailyAttempt from './dailyAttempt';
// import SundayQuizScreen from '@/app/quiz/QuizScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="DailyQuiz" component={DailyQuiz} />
      <Stack.Screen name="SundayQuiz" component={DailyQuiz} />
      <Stack.Screen name="dailyAttempt" component={DailyAttempt} />

      <Stack.Screen name="free-course/CourseContent" component={CourseContentScreen} />

    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
