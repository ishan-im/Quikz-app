import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import {signUp, onAuthStateChangedListener} from '../../utils/fitrebase/auth';

import firestore from '@react-native-firebase/firestore';

import {showToast} from '../../utils/Toast/toast';

const SignUp = ({navigation}) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [buttonText, setButtonText] = useState('Sign Up');

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(user => {
      if (user) {
        navigation.navigate('Home');
      }
    });
    return unsubscribe;
  }, []);



function checkString(char){
  // the character with whitespace
char = char.replace(/\s/g, ''); // remove whitespace
return (char.length);
}


  const handleSignup = async () => {
    if (!name) {
      showToast('info', 'Please enter name');
      return;
    }

    if(checkString(name)<1){

      showToast('error', 'Name must be at least 1 character long');
      return;

    }

    if (!email) {
      showToast('info', 'Please enter email');
      return;
    }

    const emailRegex = new RegExp(
      '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
    );

    if (!emailRegex.test(email)) {
      showToast('error', 'Please enter a valid email');
      return;
    }

    if (!password) {
      showToast('info', 'Please enter password');
      return;
    }

    // regex to check strong password
    const strongPasswordRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    );

    if (!strongPasswordRegex.test(password)) {
      showToast(
        'error',
        'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character',
      );
      return;
    }

    //check temporary or invalid email firebase

    console.log(name, email, password);

    setButtonText('Signing Up...');

    try {
      const {user} = await signUp(email, password);

      console.log(user);

      const doc = {
        displayName: name,
        email: email,
        uid: user.uid,
      };

      const docRef = await firestore()
        .collection('users')
        .doc(user.uid)
        .set(doc);

      setButtonText('Sign Up');

      showToast('success','Welcome to Quikz!');

      return navigation.navigate('Home');
    } catch (error) {
      console.log(error);
      showToast('error', 'Something went wrong');
      setButtonText('Sign Up');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <Text style={styles.subtitle}>Create an account to get started</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor='#000'
          value={name}
          onChangeText={text => setName(text)}
        />
        <View style={styles.underLine}></View>

        <TextInput
          style={styles.input}
          placeholder="Email address"
          keyboardType="email-address"
          placeholderTextColor='#000'
          autoCapitalize="none"
          value={email}
          onChangeText={text => setEmail(text.toString().trim())}
        />
        <View style={styles.underLine}></View>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor='#000'
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <View style={styles.underLine}></View>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={handleSignup} style={styles.button}>
          <Text style={styles.btnText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={{color: '#333'}}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.btnText2}> Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;

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
    color: '#333',
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
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  btnText2: {
    color: '#1a759f',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
