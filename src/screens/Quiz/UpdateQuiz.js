import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';

import Quizs from '../../components/Quizs';

import firestore from '@react-native-firebase/firestore';

import {QuizContext} from '../../utils/context/quizContext';

import {UserContext} from '../../utils/context/userContext';

import HomIcon from '../../components/HomIcon';

import Title from '../../components/Title';

const UpdateQuiz = ({navigation}) => {
  // const {quizs} = useContext(QuizContext);

  const {currentUser} = useContext(UserContext);

  console.log(currentUser, 'from update quiz');

  const [quiz, setQuiz] = useState([]);

  // return only those quizes whose author is the current user from firestore

  useEffect(() => {
    const subscriber = firestore()
      .collection('quizzes')
      .where('creator', '==', currentUser.uid)
      .onSnapshot(querySnapshot => {
        const quikzs = [];

        querySnapshot.forEach(documentSnapshot => {
          quikzs.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setQuiz(quikzs);
      });

    // Unsubscribe from events when no longer in use

    return () => subscriber();
  }, []);

  console.log(quiz, 'from update quiz');

  return (
    <ScrollView contentContainerStyle={{flex: 1, backgroundColor: '#fff'}}>
      <HomIcon />
    <Title title="Update Quiz"/>

      {quiz && quiz.length > 0 ? (
        quiz?.map((qui, index) => {
          return (
            qui && (
              <View style={styles.container}>
                <Quizs
                  key={index}
                  title={qui.quizName}
                  description={qui.quizDescription}
                  quiz={qui}
                  param="ChooseUpdate"
                />
              </View>
            )
          );
        })
      ) : (
        <View style={styles.textContainer}>
          <Text style={{fontSize:20, color: 'black'}}>No Quiz to Update :(</Text>
          
        </View>
      )}
    </ScrollView>
  );
};

export default UpdateQuiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 20,
    backgroundColor: '#fff',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',

  }
});
