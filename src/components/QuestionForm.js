import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const QuestionForm = ({placeholder}) => {

    const [value, setValue] = React.useState(null)

const handleChangeText = (text) => {



}

  return (
    <>
    <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={text => setValue(text)}
      />
      <View style={styles.underLine}></View>
    </>
  )
}

export default QuestionForm

const styles = StyleSheet.create({
    input: {
        borderWidth: 0,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 12,
        fontSize: 16,
      },
      underLine: {
        borderBottomColor: 'gray',
        borderBottomWidth: 2,
        paddingHorizontal: 12,
        marginBottom: 16,
      },
})