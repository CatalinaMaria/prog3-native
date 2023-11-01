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
      <View style = {styles.productswrapper}>
        <Text style = {styles.productstitle}>Inicia Sesión</Text>
        <View style = {styles.registro}>
                <TextInput
                    style = {styles.control}
                    placeholder = 'Dinos tu email'
                    keyboardType = 'email-address'
                    value = {this.state.mail}
                    onChangeText = { (text) => this.setState({mail: text}) }
                />
                <TextInput
                    style = {styles.control}
                    placeholder = 'Dinos tu password'
                    keyboardType = 'email-address'
                    value = {this.state.password}
                    onChangeText = { (text) => this.setState({password: text}) }
                />
                <TouchableOpacity
                   
                    onPress={() => this.loguearUsuario(this.state.mail, this.state.password)}
                >
                    <Text  style = {styles.button}>Iniciar sesión</Text>
                </TouchableOpacity>
        </View>
      </View>
    )

  
    
  }

  
}

const styles = StyleSheet.create({
    productswrapper:{
        marginTop: 30,
        marginBottom: 30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    registro:{
       
        backgroundColor: 'green',
        aspectRatio: 5,
        padding: 30,
        marginTop: 40,
        border: 5,
        fontFamily: 'calibri',
        fontSize: 15,
        height: 350,
        width: 350,
        
       
    },
    productstitle:{
        fontSize: 40,
        fontWeight: 400,
        color: 'gray',
        fontFamily:'Gill Sans',
    },
    control:{
        outerWidth: 100,
        backgroundColor: '#9fc1ad',
        padding: 10,
        border: 5,
        marginBottom: 20,
        border: 1,
        fontFamily: 'calibri',
        fontSize: 18,
        color: 'white',

    },

    button:{
        width: 100,
        padding: 3,
        color: 'white',
        fontSize: 10,
        fontFamily: 'arial',
        width:80

    }
})

