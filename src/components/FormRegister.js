import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MyImage from './Image';

class FormRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      mail: '',
      password: '',
      minibio: '',
      fotoPerfil: '',
      error: null,
      emailError: null,
      passwordError: null,
      allFieldsCompleted: false,
      rememberMe: false,
      urlFoto: '',
      paso1: true,
    };
  }

  componentDidMount() {
    // Tu código componentDidMount actual
  }

  registrarUsuario(name, email, password) {
    // Tu código registrarUsuario actual
  }

  actualizarEstadoCamposObligatorios() {
    const { name, mail, password } = this.state;
    const allFieldsCompleted = name.length > 0 && mail.length > 0 && password.length > 0;
    this.setState({ allFieldsCompleted });
  }

  actualizarFotourl(url) {
    this.setState(
      {
        urlFoto: url,
        paso1: false,
      },
      () => this.actualizarDocDelUsuario()
    );
  }

  actualizarDocDelUsuario() {
    // Tu código actualizarDocDelUsuario actual
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
          <TextInput
            style={styles.control}
            placeholder="Crea una minibio"
            value={this.state.minibio}
            onChangeText={(text) => this.setState({ minibio: text })}
          />
          <TextInput
            style={styles.control}
            placeholder="Pega la URL de tu foto de perfil"
            value={this.state.fotoPerfil}
            onChangeText={(text) => this.setState({ fotoPerfil: text })}
          />

          <Text style={styles.errorMessage}>{this.state.error}</Text>
          <Text style={styles.errorMessage}>{this.state.emailError}</Text>
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
        {this.state.paso1 && <MyImage actualizarEstadoFotoDePerfil={(url) => this.actualizarFotourl(url)} />}
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
    alignItems: 'center',
  },
  registro: {
    backgroundColor: 'green',
    aspectRatio: 5,
    padding: 30,
    marginTop: 40,
    border: 5,
    fontFamily: 'calibri',
    fontSize: 15,
    height: 450,
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
    padding: 3,
    color: 'black',
    fontSize: 17,
    fontFamily: 'calibri',
    width: '100%',
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
});

export default FormRegister;
