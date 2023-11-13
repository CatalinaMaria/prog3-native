import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { db } from '../firebase/config'; 

export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: null,
        };
    }

    componentDidMount() {
        const userId = this.props.route.params.userId;

        db.collection('users')
            .doc(userId)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    const userData = doc.data();
                    this.setState({ userInfo: userData });
                } else {
                    console.log('El usuario no fue encontrado');
                }
            })
            .catch((error) => {
                console.error('Error al obtener la información del usuario:', error);
            });
    }

    render() {
        const { userInfo } = this.state;

        if (!userInfo) {
            return (
                <View style={styles.container}>
                    <Text>Cargando perfil...</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Text>Perfil de {userInfo.name}</Text>
                <Text>Email: {userInfo.owner}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});