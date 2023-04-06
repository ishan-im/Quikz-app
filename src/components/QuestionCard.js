import {StyleSheet, Text, View,ScrollView} from 'react-native';
import React from 'react';

const QuestionCard = ({children,question}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.top}>
        <Text style={styles.question}>Q. {question} </Text>
      </View>
      {children}
    </ScrollView>
  );
};

export default QuestionCard;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  top: {
    marginVertical: 20,
  },
  question: {
    fontSize: 28,
    color: 'gray',
  },
});
