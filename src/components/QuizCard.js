import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';

import QuestionCard from './QuestionCard';
import OptionCard from './OptionCard';

import {useNavigation} from '@react-navigation/native';

 var scores = 0;

const QuizCard = ({quiz}) => {
  const navigation = useNavigation();

  const [quizs, setQuizs] = useState(quiz?.quizQuestions[0]);

  const [question, setQuestion] = useState(1);

  const [score, setScore] = useState(0);

  const [totalQuestions, setTotalQuestions] = useState(
    quiz?.quizQuestions?.length,
  );

  const handleNext = () => {
    if (isActive) {
      setQuestion(question + 1);
      setQuizs(quiz.quizQuestions[question]);
      setTimer();
      setSelectedOption(null);
      scores += score;
      setScore(0);
    }
    if (totalQuestions === question) {
      navigation.navigate('Result', {score: score});
    }
  };

  const [time, setTime] = useState(60 * Number(quiz?.quizTime));
  const [isActive, setIsActive] = useState(true); // set initial state of isActive to true
  const intervalRef = useRef();

  const countDownTimer = () => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime - 1); // decrement time by 1 second every interval
      }, 1000); // set interval to 1 second
    }

    return () => clearInterval(intervalRef.current); // clear interval on unmount or state change
  };

  useEffect(() => {
    if (totalQuestions !== 0) {
      countDownTimer();
    }
  }, [isActive]);

  const setTimer = () => {
    clearInterval(intervalRef.current); // clear interval when time reaches 0
    setIsActive(false); // set isActive to false to stop the countdown
    setTimeout(() => {
      if (question > totalQuestions) {
        setIsActive(false);
        return navigation.navigate('Result', {score: score});
      } else {
        setTime(60 * Number(quiz?.quizTime)); // set time back to 2 minutes after a 2-second delay
        setIsActive(true);
      }

      // set isActive to true to start the countdown again
    }, 0); // set delay to 0 seconds
  };

  useEffect(() => {
    if (time === 0) {
      clearInterval(intervalRef.current); // clear interval when time reaches 0

      setIsActive(false); // set isActive to false to stop the countdown
      setTimeout(() => {
        // set time back to 2 minutes after a 2-second delay

        if (question > totalQuestions) {
          setIsActive(false);
          navigation.navigate('Result', {score: score});
        } else {
          setTime(60 * Number(quiz?.quizTime));
          setIsActive(true);
          handleNext();
        }

        // set isActive to false to stop the countdown
      }, 2000); // set delay to 2 seconds
    }
  }, [time]);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectedOption = _option => {
    setSelectedOption(_option);
    setScore(0);
  };


  // update the optioncard components color after each click on the optioncard component
  const [optionColor, setOptionColor] = useState(null);


 


  

  console.log('selectedOption: ', selectedOption);

  useEffect(() => {
    if (selectedOption === quizs?.correctAnswer) {
      setScore(Number(quiz?.quizPoints));
    }



  }, [selectedOption, score]);

  console.log('scores: ', scores, 'score: ', score);

  function formatDuration(durationInSeconds) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  console.log(
    'totalQuestions from quizcard: ',
    totalQuestions,
    question,
    isActive,
  );

  const showResult = () => {
    navigation.navigate('Result', {
      score:
        selectedOption === quizs?.correctAnswer
          ? scores + Number(quiz?.quizPoints)
          : scores,
      totalScore:
        Number(totalQuestions) * Number(quiz.quizPoints),
    })
    stopTimer();
    scores = 0;
  }

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
  }


  return (
    <>
      {quizs && question <= totalQuestions ? (
        <>
          <QuestionCard question={quizs.questionName}>
            {quizs.quizOptions.map((option, ind) => (
              <OptionCard
                option={option.question}
                key={ind}
                handleSelectedOption={handleSelectedOption}
              />
            ))}
          </QuestionCard>

          {time > 0 && <Text style={styles.timer}>{formatDuration(time)}</Text>}

          {selectedOption && question !== totalQuestions && (
            <View style={styles.btnContainer}>
              <TouchableOpacity onPress={handleNext} style={styles.nextButon}>
                <Text style={{color: '#1a759f', fontSize: 15}}>Next</Text>
              </TouchableOpacity>
            </View>
          )}

          {selectedOption && question == totalQuestions && (
            <View style={styles.resultButton}>
              <TouchableOpacity
                style={styles.showResults}
                onPress={showResult}>
                <Text style={{color: '#000'}}>Show results</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        <>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
              padding: 20,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: '#333',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              OOPS No Quiz Avaiable :(
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={styles.button}>
              <Text style={styles.buttonText}>GO TO HOME</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
};

export default QuizCard;

const styles = StyleSheet.create({
  timer: {
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
    padding: 10,
    position: 'absolute',
    bottom: 70,
    left: '45%',
  },

  btnContainer: {
    width: '100%',
    position: 'relative',
    top: -120,
    left: '75%',
    bottom: 200,
    height: 40,
    width: 60,
    borderRadius: 10,
  },

  nextButon: {
    padding: 8,
    borderColor: '#1a759f',
    borderWidth: 1,
    borderRadius: 10,
  },

  showResults: {
    padding: 8,
    borderColor: '#1a759f',
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    width: 100,
  },
  resultButton: {
    position: 'relative',
    width: '100%',
    left: '45%',
    height: 40,
    width: 60,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: -100,
  },
  button: {
    width: '80%',
    height: 60,
    backgroundColor: '#1A759F',
    padding: 6,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
});
