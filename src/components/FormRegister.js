import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'

class FormRegister extends Component {
    constructor(props){
        super(props)
        this.state = {
            name:'',
            mail: '',
            password: '',
            minibio:''
        }
    }

    registrarUsuario(name, email, password){
        auth.createUserWithEmailAndPassword(email, password)
        .then(user => db.collection('users').add({
                owner: this.state.mail,
                createdAt: Date.now(),
                name: this.state.name,
                minibio: this.state.minibio
            })
        )
        .then((resp) => console.log(resp))
        .catch( err => console.log(err))
    }

    render() {
        return (
        <View style = {styles.productswrapper}>
            <Text>Registrate a mi app</Text>
            <View style = {styles.registro}>
                <TextInput 
                    
                    placeholder = 'Dinos tu nombre'
                    keyboardType = 'default'
                    value = {this.state.name}
                    onChangeText = { (text) => this.setState({name: text}) }
                />

                <TextInput
                   
                    placeholder = 'Dinos tu email'
                    keyboardType = 'email-address'
                    value = {this.state.mail}
                    onChangeText = { (text) => this.setState({mail: text}) }
                />
                <TextInput
                    
                    placeholder='Crea una minibio'
                    value={this.state.minibio}
                    onChangeText={(text) => this.setState({minibio:text})}
                />
                <TextInput
                    
                    placeholder = 'Dinos tu password'
                    keyboardType = 'default'
                    value = {this.state.password}
                    secureTextEntry={true}
                    onChangeText = { (text) => this.setState({password: text}) }
                />

                <Text
                    
                >
                    ¿Ya estás regustrado?
                    <TouchableOpacity
                        onPress={()=> this.props.navegacion.navigate('Login')}
                    >
                        Logueate aquí!
                    </TouchableOpacity>
                </Text>


                <TouchableOpacity 
                onPress={()=> this.registrarUsuario(this.state.name, this.state.mail, this.state.password)}                
                >
                    <Text >Registrame</Text>
                </TouchableOpacity>

            </View>

        </View>
        )
    }
}
const styles = StyleSheet.create({
    productswrapper:{
        marginTop: 30,
        marginBottom: 30
    },
    registro:{
       
        backgroundColor: 'green',
        aspectRatio: 5,
        padding: 30,
        marginTop: 40,
        border: 5,
        fontFamily: 'calibri',
        fontSize: 15,
       
    },
})


export default FormRegister