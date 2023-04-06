import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
} from 'react-native';

import { BackHandler } from 'react-native';

import React, {useState, useEffect} from 'react';

import { showToast } from '../../utils/Toast/toast';

import {
  onGoogleSignIn,
  signIn,
  onAuthStateChangedListener,
} from '../../utils/fitrebase/auth';

import { useRoute } from '@react-navigation/native';

const SignIn = ({navigation}) => {

  const route = useRoute();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [buttonText, setButtonText] = useState('Sign In');

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(user => {
      if (user) {
        navigation.navigate('Home');
      }
    });
    return unsubscribe;
  }, []);

  const handleSignIn = async () => {

   

    if (!email) {
      showToast('info','Please enter email');
      return;
    }

    if (!password) {
      showToast('error','Please enter password');
      return;
    }

    const emailRegex = new RegExp(
      '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
    );

    if (!emailRegex.test(email)) {
      showToast('error','Please enter a valid email');
      return;
    }

   

    console.log(email, password);

    setButtonText('Signing In...');

    try {
      const result = await signIn(email, password);
        console.log(result);
        setButtonText('Sign In');
      navigation.navigate('Home');

    } catch (error) {
      console.log(error);
      setButtonText('Sign In');
    }
  };

  const handleGoogleSignIn =  () => {
   
  };


  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>
        Sign In to your account to get started
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          keyboardType="email-address"
          placeholderTextColor="#000"
          autoCapitalize="none"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <View style={styles.underLine}></View>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#000"
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <View style={styles.underLine}></View>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={handleSignIn} style={styles.button}>
          <Text style={styles.btnText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>

      {/* sign in using google */}

      {/* <View style={styles.gogoleBtnContainer}>
        <TouchableOpacity
          onPress={handleGoogleSignIn}
          style={styles.gogoleBtnContainer2}>
          <Text style={styles.btnText2}>Sign in Using</Text>
          <Image
            source={{
              uri: 'https://w7.pngwing.com/pngs/338/520/png-transparent-g-suite-google-play-google-logo-google-text-logo-cloud-computing.png',
            }}
            style={{width: 30, height: 30, marginHorizontal: 10}}
          />
        </TouchableOpacity>
      </View> */}

      <View style={styles.bottomContainer}>
        <Text style={{color: '#000'}}>New Here?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.btnText2}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 24,
    backgroundColor: '#fff',
    
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1a759f',
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
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
  btnContainer: {
    marginTop: 24,
  },
  inputFocused: {
    borderColor: 'blue',
  },
  bottomContainer: {
    position: 'relative',
    top: 200,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText2: {
    color: '#1a759f',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  gogoleBtnContainer: {
    marginTop: 30,
  },

  gogoleBtnContainer2: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
});
