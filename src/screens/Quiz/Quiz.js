import { StyleSheet, Text, View,SafeAreaView,ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import QuizCard from '../../components/QuizCard'
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Quiz = ({route}) => {

  const {quiz} = route.params;


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <QuizCard quiz={quiz}/>
    </ScrollView>
  )
}

export default Quiz

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: windowHeight,
    width: windowWidth,
  }

})