import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useContext} from 'react';

import firestore from '@react-native-firebase/firestore';

import {UserContext} from '../../utils/context/userContext';

import HomIcon from '../../components/HomIcon';
import {showToast} from '../../utils/Toast/toast';

const CreateQuiz = ({navigation}) => {
  const [quizName, setQuizName] = useState('');
  const [quizDescription, setQuizDescription] = useState('');

  const [quizAnswers, setQuizAnswers] = useState();
  const [quizQuestions, setQuizQuestions] = useState([]);

  const [quizPoints, setQuizPoints] = useState(null);
  const [quizTime, setQuizTime] = useState(null);

  const [btnText, setBtnText] = useState('Create Quiz');

  const {currentUser} = useContext(UserContext);

  const handleQuiz = async () => {
    console.log(quizName, quizDescription, quizPoints, quizTime, []);

    if (!quizName) {
      showToast('info', 'Please enter quiz name');
      return;
    }

    if (!quizDescription) {
      showToast('info', 'Please enter quiz description');
      return;
    }

    if (!quizPoints) {
      showToast('info', 'Please enter quiz points');
      return;
    }

    if (!quizTime) {
      showToast('info', 'Please enter quiz time');
      return;
    }

    setBtnText('Creating Quiz...');

    try {
      const quiz = {
        quizName: quizName,
        quizDescription: quizDescription,
        creator: currentUser.uid,
        quizPoints: quizPoints,
        quizTime: quizTime,
        quizQuestions: [],
      };

      const quizRef = await firestore().collection('quizzes').add(quiz);

      console.log(quizRef);

      showToast('info', 'Quiz Created Successfully');

      return navigation.navigate('AddQuestions', {quizId: quizRef.id});
    } catch (error) {
      console.log(error);
      showToast('error', 'Something went wrong :(');
      setBtnText('Create Quiz');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HomIcon />
      <Text style={styles.title}>Create Quiz</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Quiz Name"
          placeholderTextColor={'#000'}
          value={quizName}
          onChangeText={text => setQuizName(text)}
        />
        <View style={styles.underLine}></View>

        <TextInput
          style={styles.input}
          placeholder="Quiz Description"
          
          placeholderTextColor={'#000'}
          value={quizDescription}
          onChangeText={text => setQuizDescription(text)}
        />
        <View style={styles.underLine}></View>

        <TextInput
          style={styles.input}
          placeholder="Quiz Point (For Each Question)"
          
          placeholderTextColor={'#000'}
          value={quizPoints}
          onChangeText={text => setQuizPoints(text)}
        />
        <View style={styles.underLine}></View>

        <TextInput
          style={styles.input}
          placeholder="Quiz Time (In Minutes for each Question)"
          
          placeholderTextColor={'#000'}
          value={quizTime}
          onChangeText={text => setQuizTime(text)}
        />
        <View style={styles.underLine}></View>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.button} onPress={handleQuiz}>
          <Text style={styles.btnText}>{btnText}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('UpdateQuiz')}>
          <Text style={styles.btnText2}>Update Quiz</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateQuiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1a759f',
    textAlign: 'center',
    marginVertical: 10,
  },
  inputContainer: {
    marginVertical: 24,
  },

  input: {
    borderWidth: 0,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#000',
  },
  underLine: {
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  btnContainer: {
    position: 'relative',
    bottom: -120,
  },
  button: {
    backgroundColor: '#1a759f',
    padding: 16,
    borderRadius: 12,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
  bottomContainer: {
    position: 'relative',
    bottom: -120,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 16,
    borderColor: '#1a759f',
    borderWidth: 2,
  },
  btnText2: {
    color: '#1a759f',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 20,
  },
});
