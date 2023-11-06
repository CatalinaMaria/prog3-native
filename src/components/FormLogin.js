import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'


export default class FormLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: '',
            password: '',
            emailError: null, 
            passwordError: null, 
            allFieldsCompleted: false,
            generalError: null, 
        };
    }

    loguearUsuario(email, password) {
        this.setState({
            emailError: null,
            passwordError: null,
            generalError: null, // Limpiar los mensajes de error
        });

        if (!email || !password) {
            this.setState({ generalError: 'Por favor, completa todos los campos.' });
        } else {
            auth
                .signInWithEmailAndPassword(email, password)
                .then((user) => {
                    this.props.navegacion.navigate('TabNavigation');
                })
                .catch((error) => {
                    switch (error.code) {
                        case 'auth/invalid-email':
                            this.setState({ emailError: 'El correo electrónico es incorrecto.' });
                            break;
                        case 'auth/user-not-found':
                        case 'auth/wrong-password':
                            this.setState({ passwordError: 'Contraseña incorrecta. Por favor, inténtalo de nuevo.' });
                            break;
                        default:
                            this.setState({ generalError: 'Error al iniciar sesión. Por favor, inténtalo de nuevo.' });
                            console.log(error);
                            break;
                    }
                });
        }
    }

    actualizarEstadoCampos() {
        const { mail, password } = this.state;
        const allFieldsCompleted = mail.length > 0 && password.length > 0;
        this.setState({ allFieldsCompleted });
    }

    render() {
        return (
            <View style={styles.productswrapper}>
                <Text style={styles.productstitle}>Inicia Sesión</Text>
                <View style={styles.registro}>
                    <TextInput
                        style={styles.control}
                        placeholder="Dinos tu email"
                        keyboardType="email-address"
                        value={this.state.mail}
                        onChangeText={(text) => {
                            this.setState({ mail: text });
                            this.actualizarEstadoCampos(); // Actualizar el estado de campos completos
                        }}
                    />
                    {this.state.emailError && (
                        <Text style={styles.errorMessage}>{this.state.emailError}</Text>
                    )}

                    <TextInput
                        style={styles.control}
                        placeholder="Dinos tu password"
                        keyboardType="default"
                        value={this.state.password}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({ password: text });
                            this.actualizarEstadoCampos(); // Actualizar el estado de campos completos
                        }}
                    />
                    {this.state.passwordError && (
                        <Text style={styles.errorMessage}>{this.state.passwordError}</Text>
                    )}

                    {this.state.generalError && (
                        <Text style={styles.errorMessage}>{this.state.generalError}</Text>
                    )}

                    <TouchableOpacity
                        onPress={() => this.loguearUsuario(this.state.mail, this.state.password)}
                        disabled={!this.state.allFieldsCompleted} // Deshabilitar el botón si no todos los campos están completos
                    >
                        <Text style={[styles.button, !this.state.allFieldsCompleted && styles.buttonDisabled]}>
                            Iniciar sesión
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
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

