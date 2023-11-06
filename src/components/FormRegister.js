import firebase from 'firebase';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import { Camera } from 'expo-camera';

class FormRegister extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            mail: '',
            password: '',
            minibio: '',
            error: null,
            emailError: null,
            passwordError: null,
            allFieldsCompleted: false,
            rememberMe: false,
            urlFoto: '',
            paso1: true
        }
    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                // El usuario está autenticado, redirige a la página de inicio
                this.props.navigation.navigate('Home');
            } else {
                // El usuario no está autenticado, establece "Remember Me" en false
                this.setState({ rememberMe: false });
            }
        });
    }
    

    registrarUsuario(name, email, password) {
        // Limpia los mensajes de error anteriores
        this.setState({ error: null, emailError: null, passwordError: null });
    
        if (!name || !email || !password) {
            this.setState({ error: 'Por favor, completa todos los campos obligatorios.' });
            this.setState({ allFieldsCompleted: false });
        } else {
            const authPromise = this.state.rememberMe
                ? auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => auth.createUserWithEmailAndPassword(email, password))
                : auth.createUserWithEmailAndPassword(email, password);
    
            authPromise
                .then((user) => {
                    // El usuario se ha registrado 
                    db.collection('users')
                        .add({
                            owner: this.state.mail,
                            createdAt: Date.now(),
                            name: this.state.name,
                            minibio: this.state.minibio,
                        })
                        .then((resp) => console.log(resp))
                        .catch((error) => {
                            console.error('Error al agregar el usuario a la base de datos:', error);
                        });
    
                    // Redirigir al usuario a la página de inicio 
                    this.props.navigation.navigate('Home');
                })
                .catch((err) => {
                    if (err.code === 'auth/invalid-email') {
                        this.setState({ emailError: 'El formato del correo electrónico es incorrecto.' });
                        this.setState({ allFieldsCompleted: false });
                    } else if (err.code === 'auth/weak-password') {
                        this.setState({ passwordError: 'La contraseña es débil. Debe contener al menos 6 caracteres.' });
                        this.setState({ allFieldsCompleted: false });
                    } else {
                        this.setState({ error: 'Se produjo un error al registrar el usuario. Por favor, inténtalo de nuevo.' });
                        this.setState({ allFieldsCompleted: false });
                    }
                });
        }
    }
    
    actualizarEstadoCamposObligatorios() {
        const { name, mail, password } = this.state;
        const allFieldsCompleted = name.length > 0 && mail.length > 0 && password.length > 0;
        this.setState({ allFieldsCompleted });
    }    

    render() {
        return (
            <View style={styles.productswrapper}>
                <Text style={styles.productstitle}>Regístrate en mi app</Text>
                <View style={styles.registro}>
                    <TextInput
                        style={styles.control}
                        placeholder="Dinos tu nombre"
                        keyboardType="default"
                        value={this.state.name}
                        onChangeText={(text) => {
                            this.setState({ name: text });
                            this.actualizarEstadoCamposObligatorios();
                        }}
                    />
                    <Text style={styles.errorMessage}>{this.state.error}</Text>
    
                    <TextInput
                        style={styles.control}
                        placeholder="Dinos tu email"
                        keyboardType="email-address"
                        value={this.state.mail}
                        onChangeText={(text) => {
                            this.setState({ mail: text });
                            this.actualizarEstadoCamposObligatorios();
                        }}
                    />
                    <Text style={styles.errorMessage}>{this.state.emailError}</Text>
    
                    <TextInput
                        style={styles.control}
                        placeholder="Crea una minibio"
                        value={this.state.minibio}
                        onChangeText={(text) => this.setState({ minibio: text })}
                    />
    
                    <TextInput
                        style={styles.control}
                        placeholder="Dinos tu password"
                        keyboardType="default"
                        value={this.state.password}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({ password: text });
                            this.actualizarEstadoCamposObligatorios();
                        }}
                    />
                    <Text style={styles.errorMessage}>{this.state.passwordError}</Text>
    
                    <Text>¿Ya estás registrado?</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.props.navegacion.navigate('Login')}
                    >
                        INICIA SESIÓN
                    </TouchableOpacity>
                    <TouchableOpacity
                     style={styles.rememberMeButton}
                     onPress={() => this.setState({ rememberMe: !this.state.rememberMe })}
                    >
                    <Text style={styles.rememberMeText}>
                    {this.state.rememberMe ? '✓' : ' '}
                     Recuérdame
                    </Text>
                    </TouchableOpacity>

                    {this.state.allFieldsCompleted && (
                        <TouchableOpacity
                            onPress={() =>
                                this.registrarUsuario(this.state.name, this.state.mail, this.state.password)
                            }
                        >
                            <Text style={styles.button}>Regístrame</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    }    
}
const styles = StyleSheet.create({
    productswrapper: {
        marginTop: 30,
        marginBottom: 30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    registro: {

        backgroundColor: 'green',
        aspectRatio: 5,
        padding: 30,
        marginTop: 40,
        border: 5,
        fontFamily: 'calibri',
        fontSize: 15,
        height: 380,
        width: 350,


    },
    productstitle: {
        fontSize: 40,
        fontWeight: 400,
        color: 'gray',
        fontFamily: 'Gill Sans',
    },
    control: {
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
    button: {
        width: 100,
        padding: 3,
        color: 'black',
        fontSize: 10,
        fontFamily: 'arial',
        width: 80

    },
    errorMessage: {
        color: 'red',
        marginBottom: 10,
    }
})


export default FormRegister