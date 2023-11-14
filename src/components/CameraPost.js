import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import { Camera } from 'expo-camera'
import { storage } from '../firebase/config'

export default class CamaraPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            mostrarCamara: true,
            permisos:false,
            urlTemp:'',
        }
        this.metodosDeCamara = null  
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then((resp)=> this.setState({permisos: true}))
        .catch((err) => console.log(err))
    }

    tomarFoto(){
        this.metodosDeCamara.takePictureAsync()
        .then(imgTemp => this.setState({
            urlTemp: imgTemp.uri,
            mostrarCamara: false
        }))
        .catch(err => console.log(err))
    }

    aceptarFoto(){
        fetch(this.state.urlTemp)
        .then(resp => resp.blob())
        .then(img => {
            const ref = storage.ref(`fotos/${Date.now()}.jpg`)
            ref.put(img)
            .then(resp =>{
                ref.getDownloadURL()
                .then((url)=> this.props.actualizarFotourl(url))
            })
            .catch(err => console.log(err))
        })
        .catch(err=> console.log(err))

    }

    rechazarFoto(){
        this.setState({
            mostrarCamara: true,
            urlTemp: ''
        })
    }

  render() {
    return (
      <View style={styles.container}>
        {
            this.state.permisos && this.state.mostrarCamara ?
            <>
                <Camera
                    style= {styles.camara}
                    type={Camera.Constants.Type.back}
                    ref={(metodosDeCamara)=> this.metodosDeCamara = metodosDeCamara}
                />
                <TouchableOpacity
                    onPress={() => this.tomarFoto()}
                >
                    <Text style={styles.textoAceptar}>Tomar foto</Text>
                </TouchableOpacity>
            </>
            : this.state.permisos && this.state.mostrarCamara === false ?
                <>
                    <Image
                        source={{uri : this.state.urlTemp}}
                        style={styles.img}
                        resizeMode={'contain'}
                    />
                    <TouchableOpacity
                        onPress={()=> this.aceptarFoto()}
                    >
                        <Text style={styles.textoAceptar}>
                            Aceptar Foto
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=> this.rechazarFoto()}
                    >
                        <Text style={styles.textoAceptar}>
                            Rechazar Foto
                        </Text>
                    </TouchableOpacity>
                </>
            :
            <Text>No tienes permisos para usar la camara</Text>

        }
       
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    camara: {
        flex:1,
        width: 500, 
    },
    img:{
        height: 500,
        width: 500,
    },
    textoAceptar: {
        backgroundColor: '#5F866F',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 15,
    }
})