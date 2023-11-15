// EditProfileScreen.js
import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

export default class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: '',
      newMinibio: '',
      newProfileImage: '',
    };
  }

  guardarCambios() {
    const userId = auth.currentUser.uid;
    db.collection('users')
      .doc(userId)
      .update({
        name: this.state.newName,
        minibio: this.state.newMinibio,
        fotoPerfil: this.state.newProfileImage,
      })
      .then(() => {
        console.log('Cambios guardados exitosamente');
        this.props.navigation.goBack();
      })
      .catch((error) => {
        console.error('Error al guardar cambios:', error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Editar Perfil</Text>
        <TextInput
          style={styles.input}
          placeholder="Nuevo nombre de usuario"
          value={this.state.newName}
          onChangeText={(text) => this.setState({ newName: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Nueva mini bio"
          value={this.state.newMinibio}
          onChangeText={(text) => this.setState({ newMinibio: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Nueva URL de foto de perfil"
          value={this.state.newProfileImage}
          onChangeText={(text) => this.setState({ newProfileImage: text })}
        />
        <TouchableOpacity style={styles.button} onPress={() => this.guardarCambios()}>
          <Text>Guardar Cambios</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9fc1ad',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    width: '80%',
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
  },
});
