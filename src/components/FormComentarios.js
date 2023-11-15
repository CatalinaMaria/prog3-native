import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

export default class FormComentarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comentario: '',
        };
    }

    enviarComentario() {
        if (this.state.comentario.trim() === '') {
            return; // Evita enviar comentarios vacíos
        }

        db.collection('posts')
            .doc(this.props.postId)
            .update({
                comentarios: firebase.firestore.FieldValue.arrayUnion({
                    owner: auth.currentUser.email,
                    createdAt: Date.now(),
                    comentario: this.state.comentario,
                }),
            });

        // Limpiar el campo de comentario después de enviar
        this.setState({ comentario: '' });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.commentInputContainer}>
                    <TextInput
                        placeholder='Agrega tu comentario'
                        keyboardType='default'
                        onChangeText={(text) => this.setState({ comentario: text })}
                        value={this.state.comentario}
                        multiline={true}
                        numberOfLines={4}
                        style={styles.commentInput}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => this.enviarComentario()}
                    disabled={!this.state.comentario.trim()} // Deshabilita el botón si el comentario está vacío
                    style={styles.button}
                >
                    <Text>Comentar</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        width: '70%',
        alignSelf: 'center',
    },
    commentInputContainer: {
        borderWidth: 2,
        borderColor: '#5F866F', // Color del marco verde oscuro
        borderRadius: 5,
        marginBottom: 10,
    },
    commentInput: {
        padding: 10,
    },
    button: {
        backgroundColor: '#5F866F',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
});
