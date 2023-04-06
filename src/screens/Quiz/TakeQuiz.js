import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';

import Quizs from '../../components/Quizs';

import firestore from '@react-native-firebase/firestore';

import {QuizContext} from '../../utils/context/quizContext';

import {showToast} from '../../utils/Toast/toast';

const TakeQuiz = ({navigation}) => {
  const {quizs} = useContext(QuizContext);

  const [quikzs, setQuizs] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('quizzes')
      .onSnapshot(querySnapshot => {
        const quizs = [];

        querySnapshot.forEach(documentSnapshot => {
          quizs.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setQuizs(quizs);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  console.log(quikzs.length);

  return (
    <>
      <View style={styles.container}>
        {quikzs.length > 0 ? (
          quikzs?.map((quiz, index) => {
            return (
              quiz && (
                <Quizs
                  key={index}
                  title={quiz.quizName}
                  description={quiz.quizDescription}
                  quiz={quiz}
                  param="Quiz"
                />
              )
            );
          })
        ) : (
          <>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 25,
              marginTop: 20,
              padding: 10,
              color: '#1a759f',
              fontWeight: 'bold',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            No Quiz Available :(
          </Text>

          <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('CreateQuiz')}>
          <Text style={styles.text}>Make Quiz</Text>
        </TouchableOpacity>

             

          </>
        )}
      </View>
    </>
  );
};

export default TakeQuiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
  },
   buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '100%',
    paddingTop: 30,

    marginTop: 30,
  },

  buttonStyle: {
    backgroundColor: '#1a759f',
    borderRadius: 16,
    padding: 10,
    height: 60,
    width: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffff',
  },
});
