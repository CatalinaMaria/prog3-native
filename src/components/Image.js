import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../firebase/config';

export default class MyImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagenCargada: '',
    };
  }

  activarPicker() {
    ImagePicker.launchImageLibraryAsync()
      .then(imageData => this.setState({ imagenCargada: imageData.uri }))
      .catch(err => console.log(err));
  }

  aceptarImagen() {
    if (this.state.imagenCargada !== '') {
      fetch(this.state.imagenCargada)
        .then(resp => resp.blob())
        .then(imagen => {
          let ref = storage.ref(`imgPerfil/${Date.now()}.jpeg`);
          ref.put(imagen).then(() => {
            ref.getDownloadURL().then(url => {
              this.props.actualizarEstadoFotoDePerfil(url);
              this.setState({ imagenCargada: '' });
            });
          });
        })
        .catch(err => console.log(err));
    }
  }

  rechazarImagen() {
    this.setState({
      imagenCargada: '',
    });
  }

  render() {
    return (
      <View>
        <Text> Carga una foto !</Text>

        {this.state.imagenCargada !== '' ? (
          <>
            <Image source={{ uri: this.state.imagenCargada }} style={styles.img} />
            <TouchableOpacity onPress={() => this.aceptarImagen()}>
              <Text> Aceptar imagen </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.rechazarImagen()}>
              <Text> Rechazar imagen </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={() => this.activarPicker()}>
              <Text>Cargar imagen de librería</Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.props.navigation.navigate('TabNavigation')}
        >
          <Text>Omitir este paso</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    height: 200,
  },
  btn: {
    backgroundColor: 'pink',
    padding: 10,
    margin: 10,
  },
});
