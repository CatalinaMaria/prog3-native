import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'


export default class Contador extends Component {
    constructor(props){
        super(props)
        this.state = {
            contador: 0
        }
    }

    sumar(){
     this.setState({
        contador: this.state.contador + 1
     })   
    }

    decrementar(){
        this.setState({
            contador: this.state.contador - 1 
        })
    }
  render() {
    return (
      <View>
        <Text>Contador</Text>
        <Text>{this.state.contador}</Text>
        <TouchableOpacity
       
        onPress={() => this.sumar()}>
            <Text>Sumar</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onLongPress={()=> this.decrementar()}
        >
            <Text>Decrementar</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

