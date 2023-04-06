import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import React from 'react';

const color = () => {
  // Generate a random number between 0 and 255 for each color component
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Combine the color components into a single string using hexadecimal notation
  const color = '#' + red.toString(16) + green.toString(16) + blue.toString(16);

  return color;
};

import {useNavigation} from '@react-navigation/native';

const Quizs = ({title, description, quiz, param}) => {
  const navigation = useNavigation();

  console.log(quiz, 'quiz from quizs component');

  return (
    <>

     { (quiz)?
        ( <TouchableOpacity
         style={styles.container}
         onPress={() => navigation.navigate(param, {quiz: quiz})}>
         <Text style={styles.title}>{title.substring(0,16)}</Text>
         <Text style={styles.description}>{description.substring(0,16)}{'..'}</Text>
         <Text style={styles.description}>Time:{quiz.quizTime} min</Text>
       </TouchableOpacity>):(<ActivityIndicator size="large" color="#1a759f"/>)
      
     } 
       
      
    </>
  );
};

export default Quizs;

const styles = StyleSheet.create({
  container: {
    width: '48%',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#1a759f',
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
});
