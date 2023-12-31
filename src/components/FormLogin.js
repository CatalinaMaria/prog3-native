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
            this.setState({ allFieldsCompleted: false });
        } else {
            auth
                .signInWithEmailAndPassword(email, password)
                .then((user) => {
                    this.props.navegacion.navigate('TabNavigation');
                })
                .catch((error) => {
                    if (error.code === 'auth/invalid-email') {
                      this.setState({ emailError: 'El correo electrónico es incorrecto.' });
                    } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                      this.setState({ passwordError: 'Contraseña incorrecta. Por favor, inténtalo de nuevo.' });
                    } else {
                      this.setState({ generalError: 'Error al iniciar sesión. Por favor, inténtalo de nuevo.' });
                      
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
                            this.actualizarEstadoCampos(); 
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
                            this.actualizarEstadoCampos(); 
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
                        disabled={!this.state.allFieldsCompleted} 
                    >
                        <Text style={styles.textLink}>
                        ¿Aún no tienes una cuenta? 
                        <TouchableOpacity
                            onPress={()=> this.props.navigation.navigate('Register')}
                         > Registrarse</TouchableOpacity>
                        </Text>

                        <Text style={[styles.button, !this.state.allFieldsCompleted && styles.buttonDisabled]}>
                            INICIAR SESIÓN
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
       
        backgroundColor: '#9fc1ad',
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
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#5F866F',
        alignItems: 'center',
        justifyContent: 'center'
    },
    control:{
        borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 24,
    padding: 10,
    borderRadius: 8,
    color: 'white',

    },
    textLink: {
        marginBottom: 24,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#5F866F',
      },
    button:{
        width: 100,
        padding: 3,
        color: 'white',
        fontSize: 17,
        fontFamily: 'calibri',
        width:'100%',
        fontWeight: 'bold',
        backgroundColor: '#5F866F',
        borderRadius: 8,
    }
})

