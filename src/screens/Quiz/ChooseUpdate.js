import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

import HomIcon from '../../components/HomIcon';

import { useNavigation } from '@react-navigation/native';

const ChooseUpdate = ({route}) => {

    const {quiz} = route.params;

    console.log(quiz, 'from choose update');

    const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <HomIcon />
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("UpdateQuizContent",{quiz:quiz})}>
          <Text style={styles.btnText}>Update Quiz Content</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("ChooseUpdateQuestion",{quiz:quiz})}>
          <Text style={styles.btnText}>Update Quiz Question</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChooseUpdate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 24,
    backgroundColor: '#fff',
  },

  btnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    backgroundColor: '#1a759f',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    marginBottom: 20,
  },

  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
});
