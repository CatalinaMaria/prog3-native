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
            <Text style = {styles.productstitle}>Registrate en mi app</Text>
            <View style = {styles.registro}>
                <TextInput 
                    style = {styles.control}
                    placeholder = 'Dinos tu nombre'
                    keyboardType = 'default'
                    value = {this.state.name}
                    onChangeText = { (text) => this.setState({name: text}) }
                />

                <TextInput
                   style = {styles.control}
                    placeholder = 'Dinos tu email'
                    keyboardType = 'email-address'
                    value = {this.state.mail}
                    onChangeText = { (text) => this.setState({mail: text}) }
                />
                <TextInput
                    style = {styles.control}
                    placeholder='Crea una minibio'
                    value={this.state.minibio}
                    onChangeText={(text) => this.setState({minibio:text})}
                />
                <TextInput
                    style = {styles.control}
                    placeholder = 'Dinos tu password'
                    keyboardType = 'default'
                    value = {this.state.password}
                    secureTextEntry={true}
                    onChangeText = { (text) => this.setState({password: text}) }
                />

                <Text
                    
                >
                    ¿Ya estás registrado?
                    <TouchableOpacity style = {styles.button}
                        onPress={()=> this.props.navegacion.navigate('Login')}
                    >
                         INICIA SESIÓN
                    </TouchableOpacity>
                </Text>


                <TouchableOpacity 
                onPress={()=> this.registrarUsuario(this.state.name, this.state.mail, this.state.password)}                
                >
                    <Text style = {styles.button}>Registrame</Text>
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


export default FormRegister