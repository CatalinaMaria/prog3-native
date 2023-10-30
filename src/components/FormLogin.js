import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'

export default class FormLogin extends Component {
    constructor(props){
        super(props)
        this.state = {
            mail:'',
            password: ''
        }
    }

    loguearUsuario(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then((user)=> {
            this.props.navegacion.navigate('TabNavigation')
        })
        .catch((e)=> console.log(e))
    }

  render() {
    return (
      <View>
        <Text>Logueate en mi app</Text>
        <View>
                <TextInput
                   
                    placeholder = 'Dinos tu email'
                    keyboardType = 'email-address'
                    value = {this.state.mail}
                    onChangeText = { (text) => this.setState({mail: text}) }
                />
                <TextInput
                   
                    placeholder = 'Dinos tu password'
                    keyboardType = 'email-address'
                    value = {this.state.password}
                    onChangeText = { (text) => this.setState({password: text}) }
                />
                <TouchableOpacity
                   
                    onPress={() => this.loguearUsuario(this.state.mail, this.state.password)}
                >
                    <Text>Iniciar sesión</Text>
                </TouchableOpacity>
        </View>
      </View>
    )
  }
}

