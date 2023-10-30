import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { TextInputComponent } from 'react-native'

export default class FormDescripcionPost extends Component {
    constructor(props){
        super(props)
        this.state ={
            descripcionPost : ''
        }
    }
  render() {
    return (
      <View>
        <Text>Describe tu post</Text>
        <View>
            <TextInput
            placeholder='Anhade aqui la descripcion de tu post'
            onChangeText={(text)=> this.setState({
                descripcionPost: text
            }) }
            value={this.state.descripcionPost}
            
            multiline={true}
            numberOfLines={8}
            />
            <TouchableOpacity
               
                onPress={()=> this.props.onSubmit({
                    descripcion: this.state.descripcionPost
                })}
            >
                <Text>
                    Enviar
                </Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}

