import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { storage} from '../firebase/config'

export default class MyImage extends Component {
    constructor(props){
        super(props)
        this.state = {
            imagenCargada: ''
        }
    }

    activarPicker(){
        ImagePicker.launchImageLibraryAsync()
        .then(imageData => this.setState({
            imagenCargada: imageData.assets[0].uri
        }))
        .catch( err => console.log(err))
    }

    aceptarImagen(){
        fetch(this.state.imagenCargada)
        .then(resp => resp.blob())
        .then(imagen => {
            let ref = storage.ref(`imgPerfil/${Date.now()}.jpeg`)
            ref.put(imagen)
            .then(() => {
                ref.getDownloadURL()
                .then(url => this.props.actualizarEstadoFotoDePerfil(url))
            })
        })
        .catch( err => console.log(err))
    }

    rechazarImagen(){
        this.setState({
            imagenCargada: ''
        })
    }

  render() {
    return (
      <View>
        <Text> Carga una foto !</Text>
        
        {
            this.state.imagenCargada !== '' ?
             <> 
                <Image
                source = {{uri: this.state.imagenCargada}}
                style = {styles.img}
                />
                <TouchableOpacity
                onPress={() => this.aceptarImagen()}
                >
                    <Text> Aceptar imagen </Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => this.rechazarImagen()}
                >
                    <Text> Rechazar imagen </Text>
                </TouchableOpacity>
            </>
            :
            <>
            <TouchableOpacity
                onPress={() => this.activarPicker()}
            >
                <Text>Cargar imagen de libreria</Text>
            </TouchableOpacity>
            </>
    }
          {
            //<ImagePicker/>
            }
    </View>
         
    )
  }
}

const styles = StyleSheet.create({
    img: {
        height: 200,
    }

})