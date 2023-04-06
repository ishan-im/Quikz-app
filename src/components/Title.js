import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Title = ({title}) => {
  return (
    <>
    <Text style={styles.title}>{title}</Text>
    </>
  )
}

export default Title

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1a759f',
        textAlign: 'center',
        marginVertical: 15,
      },
})