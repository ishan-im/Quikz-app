import {StyleSheet, Text, View, ScrollView, TextInput,TouchableOpacity} from 'react-native';
import React, {useState,useEffect} from 'react';

import Title from '../../components/Title';

import firestore from '@react-native-firebase/firestore';

import { useNavigation } from '@react-navigation/native';

import HomIcon from '../../components/HomIcon';

import { showToast } from '../../utils/Toast/toast';

const UpdateQuizContent = ({route}) => {
  const {quiz} = route?.params;

  const quizId = quiz?.key;


  const navigation = useNavigation();


  const [quizName, setQuizName] = useState(quiz?.quizName);
  const [quizDescription, setQuizDescription] = useState(quiz?.quizDescription);

  const [quizAnswers, setQuizAnswers] = useState();
  const [quizQuestions, setQuizQuestions] = useState([]);

  const [btnText,setBtnText]=useState('Update Quiz')


  const [quizPoints, setQuizPoints] = useState(quiz?.quizPoints);
  const [quizTime, setQuizTime] = useState(quiz?.quizTime);

  console.log('quiz from update quiz question', quiz);


    useEffect(() => {
        const subscriber = firestore()

            .collection('quizzes')
            .doc(quizId)
            .onSnapshot(documentSnapshot => {
                setQuizName(documentSnapshot.data()?.quizName);
                setQuizDescription(documentSnapshot.data()?.quizDescription);
                setQuizPoints(documentSnapshot.data()?.quizPoints);
                setQuizTime(documentSnapshot.data()?.quizTime);
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);



    const handleQuizUpdate = async() =>{

        setBtnText('Updating Quiz...')

        try{

            const quizAnswersRef = await firestore().collection('quizzes').doc(quizId).set({
                quizName: quizName,
                quizDescription: quizDescription,
                quizPoints: quizPoints,
                quizTime: quizTime,

            },{ merge: true })

            setBtnText('Update Quiz')

            return showToast('success','Quiz Updated Successfully');

        }catch(error){
            console.log(error);
            showToast('error','Error Updating Quiz');
            setBtnText('Update Quiz')
        }

    }

    const handleDeleteQuiz = async() =>{

      try{

       const ref=  await firestore().collection('quizzes').doc(quizId).delete();

        console.log(ref);

        showToast('success','Quiz Deleted Successfully');

         return navigation.navigate('Home')

      }catch(error){
        showToast('error','Error Deleting Quiz');
        console.log(error);
      }

    }


    const handleQuizAnswers = async() =>{

    }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <HomIcon />
      <Title title="Update Quiz" />

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
          value={quizDescription}
          onChangeText={text => setQuizDescription(text)}
        />
        <View style={styles.underLine}></View>

        <TextInput
          style={styles.input}
          placeholder="Quiz Point (Each Question)"
          value={quizPoints}
          onChangeText={text => setQuizPoints(text)}
        />
        <View style={styles.underLine}></View>

        <TextInput
          style={styles.input}
          placeholder="Quiz Time (In Minutes for each Question)"
          value={quizTime}
          onChangeText={text => setQuizTime(text)}
        />
        <View style={styles.underLine}></View>
      </View>

      <View style={styles.btnContainer}>
      <TouchableOpacity style={styles.button} onPress={handleQuizUpdate}>
        <Text style={styles.btnText}>{btnText}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleDeleteQuiz}>
        <Text style={styles.btnText}>Delete Quiz</Text>
      </TouchableOpacity>


    </View>




    </ScrollView>
  );
};

export default UpdateQuizContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 22,
    paddingTop: 24,
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
    bottom: -20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  button: {
    backgroundColor: '#1a759f',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
});
