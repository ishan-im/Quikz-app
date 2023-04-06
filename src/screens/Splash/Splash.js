import {StyleSheet, Text, View, Image,Alert} from 'react-native';
import React, {useEffect} from 'react';

import {useNavigation, useRoute} from '@react-navigation/native';

import {onAuthStateChangedListener} from '../../utils/fitrebase/auth';

import {BackHandler} from 'react-native';

const Splash = () => {
  const navigation = useNavigation();

  const route = useRoute();

  console.log(route.name);

 

  useEffect(() => {
    setTimeout(() => {
      onAuthStateChangedListener(user => {
        if (user) {
          // User is signed in, see docs for a list of available properties

          navigation.navigate('Home');
        } else {
          navigation.navigate('SignIn');
        }
      });
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleStyle}>Quikz</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/splash.png')}
          style={styles.imageStyle}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 30,
    backgroundColor: '#ffff',
  },
  titleContainer: {
    marginTop: 20,
  },
  titleStyle: {
    fontSize: 55,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1a759f',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 380,
    height: 380,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
