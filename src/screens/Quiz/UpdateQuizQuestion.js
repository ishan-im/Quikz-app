import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import React, {useState, useEffect} from 'react';

import { showToast } from '../../utils/Toast/toast';



import HomIcon from '../../components/HomIcon';

import Title from '../../components/Title';

import firestore from '@react-native-firebase/firestore';

import QuestionUpdateForm from '../../components/QuestionUpdateForm';


const width = Dimensions.get('window').width;

const height = Dimensions.get('window').height;

import { useNavigation } from '@react-navigation/native';

const UpdateQuizQuestion = ({route}) => {

  const navigation = useNavigation();

  const {quiz} = route?.params;

  console.log(quiz, 'quiz from update quizquestion');

  const quizId = quiz?.key;

  const [quizs, setQuizs] = useState(quiz?.quizQuestions);

  console.log(quizs,quizId, 'quizs  fromupdatequizquestion');

  // update the question after successful update or deletion on snapshot

  useEffect(() => {

    const subscriber = firestore()
      .collection('quizzes')
      .doc(quizId)
      .onSnapshot(documentSnapshot => {
        console.log('User data: ', documentSnapshot?.data());
        setQuizs(documentSnapshot.data()?.quizQuestions);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();

  }, []);

  // const collectionRef = firestore.collection("quizzes");

  // useEffect(() => {
  //   const getDocument = async () => {
  //     try {
  //       const documentRef = collectionRef.doc(quizId);
  //       const documentSnapshot = await documentRef.get();
  //       if (documentSnapshot.exists) {
  //         const data = documentSnapshot.data();
  //         // setDocumentData((prevData) => [...prevData, data]);
  //         console.log(data, 'data from update quiz question useEffect');
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getDocument();
  // }, [quizId]);


  console.log(quizs, 'quizs from update quiz question');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HomIcon />
      <Title title="Update Question" />

      {(!quizs || quizs.length===0) && (
        <>
        <ActivityIndicator size="large" color="#1a759f" />

        <Text style={{textAlign: 'center', fontSize: 25, marginTop: 20, padding: 10, color: "#1a759f", fontWeight: 'bold' }}>No Question Available :(</Text>

        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("AddQuizQuestion",{quiz:quiz})}>
          <Text style={styles.btnText}>Add Question</Text>
        </TouchableOpacity>

        </>
      )}

      {(quizs &&
        quizs.length !== 0) &&
        quizs?.map((quiz, index) =>
          quiz ? (
            <View key={index + Math.random(16)}>
              <QuestionUpdateForm
                _questionName={quiz?.questionName}
                _quizOptions={quiz?.quizOptions}
                _correctAnswer={quiz?.correctAnswer}
                _id={quizId}
                objectId={index}
                _quiz={quiz?.quizQuestions}
              />
            </View>
          ) : (
            <ActivityIndicator size="large" />
          ),
        )}
    </ScrollView>
  );
};

export default UpdateQuizQuestion;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 22,
    paddingVertical: 24,
    
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
    color: '#333',
  },
  underLine: {
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  btnContainer: {
    position: 'relative',

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
