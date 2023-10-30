import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

export default function Card(props) {
    console.log(props)
  return (
    <View>

        <Image
            
            source={
                {
                    uri: props.data.img
                }
            }
            resizeMode='contain'
        /> 
      <Text>{props.data.name}</Text>
    </View>
  )
}

