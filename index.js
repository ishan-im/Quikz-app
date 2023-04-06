/**
 * @format
 */

import {AppRegistry, ScrollView} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {UserProvider} from './src/utils/context/userContext';

import {QuizProvider} from './src/utils/context/quizContext';

const Main = () => {
  return (
    <UserProvider>
      <QuizProvider>
        <App />
      </QuizProvider>
    </UserProvider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
