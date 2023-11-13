import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

export default class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            likes: 0,
            estaMiLike: false
        };
    }

    componentDidMount(){
        const validacionLike = this.props.data.likes.includes(auth.currentUser.email);
        this.setState({
            estaMiLike: validacionLike
        });
    }

    borrarPost() {
        db.collection('posts')
            .doc(this.props.id)
            .delete()
            .then(() => {
                console.log('Post eliminado correctamente');
            })
            .catch((error) => {
                console.error('Error al eliminar el post:', error);
            });
    }

    like(){
        db.collection('posts')
            .doc(this.props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then((resp) => {
                this.setState({
                    estaMiLike: true
                });
            })
            .catch((err) => console.log(err));
    }

    unlike(){
        db.collection('posts')
            .doc(this.props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then((resp) => {
                this.setState({
                    estaMiLike: false
                });
            })
            .catch((err) => console.log(err));
    }

    irAComentar(){
        this.props.navigation.navigate('Comments', { id: this.props.id });
    }

    irAlPerfil(){
        if (this.props.owner === auth.currentUser.email) {
            this.props.navigation.navigate('Profile');
        } else {
            this.props.navigation.navigate('UserProfile', {
                userId: this.props.owner 
            });
        }
    }

    render() {
        return (
            <View style={styles.posts}>
                <TouchableOpacity onPress={() => this.irAlPerfil()}>
                    <Text>{this.props.data.owner}</Text>
                </TouchableOpacity>
                <Text>{this.props.data.descripcion}</Text>
                <View>
                    <Image
                        source={{ uri: this.props.data.fotoUrl ? this.props.data.fotoUrl : '' }}
                        style={styles.img}
                        resizeMode='contain'
                    />
                    <Text>
                        {this.props.data.likes.length}
                    </Text>
                    {
                        this.state.estaMiLike ?
                            <TouchableOpacity onPress={() => this.unlike()}>
                                <FontAwesome name='heart' color='red' size={24} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => this.like()}>
                                <FontAwesome name='heart-o' color='red' size={24} />
                            </TouchableOpacity>
                    }
                </View>
                <View>
                    <TouchableOpacity onPress={() => this.irAComentar()}>
                        <Text>Comentar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    img:{
        width: '100%',
        height: 200
    },
    posts:{
       flex: 1
    }
});
