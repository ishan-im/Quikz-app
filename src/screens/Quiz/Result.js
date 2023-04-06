import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react'

import { scores } from '../../components/QuizCard';



import {useNavigation} from '@react-navigation/native';

const Result = ({route}) => {

    const {score} = route.params;

    const {totalScore} = route.params;

    const navigation = useNavigation();

    const resultBanner=(Number(score)/Number(totalScore))>.5?"https://cdni.iconscout.com/illustration/premium/thumb/men-celebrating-victory-4587301-3856211.png" :"https://cdni.iconscout.com/illustration/free/thumb/concept-about-business-failure-1862195-1580189.png"
    
    
    
  return (
    <View style={styles.container}>

<Text style={styles.scoreValue}>Your Score is {score}</Text>
<View style={styles.bannerContainer}>
  <Image
    source={{
      uri:resultBanner
    }}
    style={styles.banner}
    resizeMode="contain"
  />
</View>
<TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
  <Text style={styles.buttonText}>GO TO HOME</Text>
</TouchableOpacity>
</View>
  )
}

export default Result

const styles = StyleSheet.create({
    banner: {
        height: 300,
        width: 300,
      },
      bannerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      },
      container: {
        paddingTop: 40,
        paddingHorizontal: 20,
        height: '100%',
        backgroundColor: '#fff',
      },
      button: {
        width: '100%',
        backgroundColor: '#1A759F',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 30,
      },
      buttonText: {
        fontSize: 24,
        fontWeight: '600',
        color: 'white',
      },
      scoreValue:{
        fontSize: 24,
        fontWeight:'800',
        alignSelf:'center',
        color:'#1A759F'
      }
})