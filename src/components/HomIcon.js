import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native'

const HomIcon = ({}) => {

    const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={()=> navigation.navigate("Home")} style={styles.icon}>
      <Image
        style={{width: 40, height: 40}}
        source={{uri:"https://w7.pngwing.com/pngs/848/762/png-transparent-computer-icons-home-house-home-angle-building-rectangle.png"}}
      />
    </TouchableOpacity>
  )
}

export default HomIcon

const styles = StyleSheet.create({
   
    icon:{
        position:"absolute",
        top:40,
        left:15,
        zIndex:1

    }

})