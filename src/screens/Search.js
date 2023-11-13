import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { db } from '../firebase/config';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            busqueda: '',
            resultados: [],
            mensaje: '',
        };
    }

    buscarUsuarios = async () => {
        const { busqueda } = this.state;

        if (!busqueda.trim()) {
            return;
        }

        try {
            const snapshot = await db
                .collection('users')
                .where('owner', '==', busqueda) 
                .get();

            const resultados = snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }));

            if (resultados.length > 0) {
                this.setState({
                    resultados,
                    mensaje: '',
                });
            } else {
                this.setState({
                    resultados: [],
                    mensaje: 'El mail/username no existe.',
                });
            }
        } catch (error) {
            console.error('Error al buscar usuarios:', error);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder='Buscar por mail'
                    onChangeText={(text) => this.setState({ busqueda: text })}
                    value={this.state.busqueda}
                    style={styles.input}
                />
                <TouchableOpacity onPress={this.buscarUsuarios} style={styles.button}>
                    <Text>Buscar</Text>
                </TouchableOpacity>

                {this.state.mensaje ? <Text style={styles.mensaje}>{this.state.mensaje}</Text> : null}

                <FlatList
                    data={this.state.resultados}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() =>
                                this.props.navigation.navigate('UserProfile', {
                                    userId: item.id,
                                })
                            }
                            style={styles.resultadoItem}
                        >    <Text>{item.data.name}</Text> 
                            <Text>{item.data.owner}</Text>
                            
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    mensaje: {
        color: 'red',
        marginBottom: 10,
    },
    resultadoItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
});