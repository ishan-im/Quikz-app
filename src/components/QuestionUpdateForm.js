import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState,useEffect} from 'react';

import firestore from '@react-native-firebase/firestore';

import { showToast } from '../utils/Toast/toast';

const QuestionUpdateForm = ({
  _questionName,
  _quizOptions,
  _correctAnswer,
  _id,
  objectId,
}) => {
  const [questionName, setQuestionName] = useState(
    _questionName ? _questionName : null,
  );
  const [quizOptions, setQuizOptions] = useState(
    _quizOptions ? _quizOptions : [],
  );
  const [correctAnswer, setCorrectAnswer] = useState(
    _correctAnswer ? _correctAnswer : null,
  );

  const [btnText, setBtnText] = useState('Update');

  const [deleteButton, setDeleteButton] = useState('Delete');

  useEffect(() => {
    console.log('useEffect');
    setQuestionName(_questionName);
    setQuizOptions(_quizOptions);
    setCorrectAnswer(_correctAnswer);
  }, [_questionName, _quizOptions, _correctAnswer]);

  console.log(
    'quizOptions',
    correctAnswer,
    quizOptions[0]?.question,
    objectId,
    _id,
  );

  const handleQuestionChange = (text, questionId) => {
    const newQuestions = [...quizOptions];
    const questionIndex = questionId - 1;
    newQuestions[questionIndex] = {
      ...newQuestions[questionIndex],
      question: text,
    };
    setQuizOptions(newQuestions);
  };

  console.log(quizOptions,'quizOptions');

  const handleDeleteQuestion =  () => {

    setDeleteButton('Deleting...');

    const usersRef = firestore().collection('quizzes');
     const john = {
      correctAnswer: _correctAnswer,
      questionName: _questionName,
      quizOptions: _quizOptions,
    };

    usersRef
      .where('quizQuestions', 'array-contains', john)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const docIdRef = usersRef.doc(doc.id);
          console.log('docIdRef', docIdRef);
          docIdRef
            .update({
              quizQuestions: firestore.FieldValue.arrayRemove(john),
            })
            .then(() => {
              setDeleteButton('Delete');
              showToast('success', 'Question Deleted Successfully');
              console.log(
                `Object  deleted from friends array in document ${doc.id}`,
              );
            })
            .catch(error => {
              setDeleteButton('Delete');
              showToast('error', 'Error Deleting Question');
              console.error(
                `Error deleting object with name 'John' from friends array in document ${doc.id}:`,
                error,
              );
            });
        });
      })
      .catch(error => {
        setDeleteButton('Delete');
        showToast('error', 'Error Deleting Question');
        console.error(
          'Error getting documents where friends array contains John:',
          error,
        );
      });
  };

  const handleUpdateQuestion =  () => {

    setBtnText('Updating...');

    const docIdRef =  firestore().collection('quizzes').doc(_id);

    const john = {
      correctAnswer: _correctAnswer,
      questionName: _questionName,
      quizOptions: _quizOptions,
    };

    const usersRef = firestore().collection('quizzes');

    usersRef
      .where('quizQuestions', 'array-contains', john)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(document => {
          const docIdRef = usersRef.doc(document.id);
          console.log('docIdRef', docIdRef);
          docIdRef
            .update({
              quizQuestions: firestore.FieldValue.arrayRemove(john),
            })
            .then(() => {
              docIdRef
                .update({
                  quizQuestions: firestore.FieldValue.arrayUnion({
                    correctAnswer: correctAnswer,
                    questionName: questionName,
                    quizOptions: quizOptions,
                  }),
                })
                .then(() => {
                  console.log('Update complete.');
                  showToast('success', 'Question Updated Successfully');
                  setBtnText('Update');

                })
                .catch(error => {
                  console.error(error.message);
                  showToast('error', 'Error Updating Question');
                  setBtnText('Update');
                });
            })
            .catch(error => {
              console.error(error.message);
              showToast('error', 'Error Updating Question');
              setBtnText('Update');
            });
        });
      })
      .catch(error => {
        console.error(error.message);
        showToast('error', 'Error Updating Question');
        setBtnText('Update');
      });
  };

  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Question Name"
          placeholderTextColor={'#000'}
          value={questionName}
          onChangeText={text => setQuestionName(text)}
        />
        <View style={styles.underLine}></View>

        <TextInput
          style={styles.input}
          placeholder="Options 1"
          placeholderTextColor={'#000'}
          value={quizOptions[0]?.question}
          onChangeText={text => handleQuestionChange(text, 1)}
        />
        <View style={styles.underLine}></View>

        <TextInput
          style={styles.input}
          placeholder="Options 2"
          placeholderTextColor={'#000'}
          value={quizOptions[1]?.question}
          onChangeText={text => handleQuestionChange(text, 2)}
        />
        <View style={styles.underLine}></View>

        <TextInput
          style={styles.input}
          placeholder="Options 3"
          placeholderTextColor={'#000'}
          value={quizOptions[2]?.question}
          onChangeText={text => handleQuestionChange(text, 3)}
        />
        <View style={styles.underLine}></View>

        <TextInput
          style={styles.input}
          placeholder="Options 4"
          placeholderTextColor={'#000'}
          value={quizOptions[3]?.question}
          onChangeText={text => handleQuestionChange(text, 4)}
        />
        <View style={styles.underLine}></View>

        <TextInput
          style={styles.input}
          placeholder="Correct Answer"
          value={correctAnswer}
          onChangeText={text => setCorrectAnswer(text)}
        />
        <View style={styles.underLine}></View>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.button} onPress={handleUpdateQuestion}>
          <Text style={styles.btnText}>{btnText}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleDeleteQuestion}>
          <Text style={styles.btnText}>{deleteButton}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default QuestionUpdateForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 22,
    paddingTop: 24,
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
