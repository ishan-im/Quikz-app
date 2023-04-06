import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useContext} from 'react';

import {signOut,onAuthStateChangedListener} from '../../utils/fitrebase/auth';

import {useNavigation,useRoute} from '@react-navigation/native';

import {showToast} from '../../utils/Toast/toast';

import {UserContext} from '../../utils/context/userContext';

import { BackHandler, Alert } from 'react-native';


const Home = () => {
  const navigation = useNavigation();

  const route = useRoute();

 


  

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(user => {
      if (!user) {
        navigation.replace('SignIn');
      }
    });
    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      showToast('success', 'Signed Out Successfully');
      return navigation.replace('SignIn');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleStyle}>Quikz</Text>

        <TouchableOpacity style={styles.logOutButton} onPress={handleSignOut}>
          <Image
            source={{
              uri: 'https://icons.veryicon.com/png/o/miscellaneous/basic-monochrome-icon/sign-out-54.png',
            }}
            style={{width: 25, height: 25,padding:10}}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://cdni.iconscout.com/illustration/premium/thumb/giving-different-feedback-and-review-in-websites-2112230-1779230.png',
          }}
          style={styles.imageStyle}
          resizeMode="cover"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('TakeQuiz')}>
          <Text style={styles.text}>Take Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('CreateQuiz')}>
          <Text style={styles.text}>Make Quiz</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 30,
    backgroundColor: '#ffff',
  },
  titleContainer: {
    marginBottom: 20,
  },
  titleStyle: {
    fontSize: 45,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1a759f',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 350,
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
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
  logOutButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 10,
  },
});
