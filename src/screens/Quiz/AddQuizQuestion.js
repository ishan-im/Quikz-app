import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput
  } from 'react-native';
  import React,{useState} from 'react';
  
  import HomIcon from '../../components/HomIcon';
  
  import Title from '../../components/Title';
  
  import firestore from '@react-native-firebase/firestore';

  import { showToast } from '../../utils/Toast/toast';

const AddQuizQuestion = ({route}) => {
  const {quiz} = route?.params;

  const quizId = quiz?.key;

  console.log(quiz, 'quizfromupdatequizquestion');

    const [questionName, setQuestionName] = useState(null);
    const [quizOptions, setQuizOptions] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState(null);

    const [btnText,setBtnText]=useState('Add Question')

  const handleQuestionUpdate = async () => {
    try {
      const quizAnswersRef = await firestore()
        .collection('quizzes')
        .doc(quizId).update({
            quizOptions: firebase.firestore.FieldValue.arrayUnion({ key1: 'value1', key2: 'value2' })
          })
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuizAnswers = async () => {

    console.log(questionName, quizOptions, correctAnswer);

    if (!questionName) {
        showToast('error','Please enter question name');
        return;
    }

    if (!quizOptions) {
      showToast('error','Please enter quiz options');
        return;
    }

    if (!correctAnswer) {
      showToast('error','Please enter correct answer index');
        return;
    }

    

    setBtnText('Adding Question...')

    try{
        

        // const quizAnswersRef = await firestore().collection('quizzes').doc(quizId).set({
        //     questionName: questionName,
        //     correctAnswerIndex: correctAnswerIndex,
        // },{ merge: true })

        const ansRef = await firestore().collection('quizzes').doc(quizId).update({
            quizQuestions: firestore.FieldValue.arrayUnion({ questionName: questionName, correctAnswer: correctAnswer,quizOptions: quizOptions,})
          })

        console.log('ansref: ',ansRef);

        setBtnText('Add Question')

        setQuestionName(null);
        setCorrectAnswer(null);

        return showToast('success','Question Added Successfully');
    }catch(error){
        console.log(error);
        setBtnText('Add Question')
    }

}



const handleQuestionChange = (text, questionId) => {
    const newQuestions = [...quizOptions];
    const questionIndex = questionId -1;
    newQuestions[questionIndex] = {
      ...newQuestions[questionIndex],
      question: text,
    };
    setQuizOptions(newQuestions);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

        <HomIcon />
      <Title title="Add Quiz Question" />
      <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Question Name"
        value={questionName}
        onChangeText={text => setQuestionName(text)}
      />
      <View style={styles.underLine}></View>

      <TextInput
        style={styles.input}
        placeholder="Options 1"
        onChangeText={text => handleQuestionChange(text, 1)}
      />
      <View style={styles.underLine}></View>

      <TextInput
        style={styles.input}
        placeholder="Options 2"
        onChangeText={text => handleQuestionChange(text, 2)}
      />
      <View style={styles.underLine}></View>

      <TextInput
        style={styles.input}
        placeholder="Options 3"
        onChangeText={text => handleQuestionChange(text, 3)}
      />
      <View style={styles.underLine}></View>

      <TextInput
        style={styles.input}
        placeholder="Options 4"
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
      <TouchableOpacity style={styles.button} onPress={handleQuizAnswers}>
        <Text style={styles.btnText}>{btnText}</Text>
      </TouchableOpacity>

    </View>


    </ScrollView>
  );
};

export default AddQuizQuestion

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 18,
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
  });
  