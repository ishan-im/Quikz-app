import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './src/screens/Home/Home';

import Quiz from './src/screens/Quiz/Quiz';
import CreateQuiz from './src/screens/Quiz/CreateQuiz';
import Result from './src/screens/Quiz/Result';

import SignUp from './src/screens/Auth/SignUp';
import SignIn from './src/screens/Auth/SignIn';

import TakeQuiz from './src/screens/Quiz/TakeQuiz';

import AddQuestions from './src/screens/Quiz/AddQuestions';

import UpdateQuiz from './src/screens/Quiz/UpdateQuiz';

import UpdateQuizContent from './src/screens/Quiz/UpdateQuizContent';

import UpdateQuizQuestion from './src/screens/Quiz/UpdateQuizQuestion';

import ChooseUpdate from './src/screens/Quiz/ChooseUpdate';

import Splash from './src/screens/Splash/Splash';

import ChooseUpdateQuestion from './src/screens/Quiz/ChooseUpdateQuestion';

import AddQuizQuestion from './src/screens/Quiz/AddQuizQuestion';

import Toast from 'react-native-toast-message';

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Quiz" component={Quiz} />
          <Stack.Screen name="TakeQuiz" component={TakeQuiz} />
          <Stack.Screen name="CreateQuiz" component={CreateQuiz} />
          <Stack.Screen name="UpdateQuiz" component={UpdateQuiz} />
          <Stack.Screen name="ChooseUpdate" component={ChooseUpdate} />
          <Stack.Screen
            name="UpdateQuizQuestion"
            component={UpdateQuizQuestion}
          />
          <Stack.Screen
            name="ChooseUpdateQuestion"
            component={ChooseUpdateQuestion}
          />
          <Stack.Screen name="AddQuizQuestion" component={AddQuizQuestion} />
          <Stack.Screen
            name="UpdateQuizContent"
            component={UpdateQuizContent}
          />
          <Stack.Screen name="AddQuestions" component={AddQuestions} />
          <Stack.Screen name="Result" component={Result} />
        </Stack.Navigator>
      </NavigationContainer>

      <Toast />
    </>
  );
}

export default App;
