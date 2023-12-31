import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FormSearch from '../components/FormSearch';
import { db, auth } from '../firebase/config';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: [],
      backup: [],
      valor: ''
    };
  }

  componentDidMount() {
    db.collection('users').onSnapshot((docs) => {
      let usuarios = [];
      docs.forEach((doc) => {
        usuarios.push({ id: doc.id, data: doc.data() });
      });
      this.setState({ usuarios, backup: usuarios });
    });
  }

  filtrarUsuarios(name) {
    let usuariosFiltrados = this.state.backup.filter((elm) => {
      const lowercaseName = elm.data.name ? elm.data.name.toLowerCase() : '';
      const lowercaseOwner = elm.data.owner ? elm.data.owner.toLowerCase() : '';
  
      return (
        lowercaseName.includes(name.toLowerCase()) ||
        lowercaseOwner.includes(name.toLowerCase())
      );
    });
  
    this.setState({
      usuarios: usuariosFiltrados,
    });
  }
  
  actualizarInput(valor) {
    this.setState({
      valor: valor
    });
  }

  irAlPerfil(owner) {
    owner == auth.currentUser.email ?
      this.props.navigation.navigate('MyProfile')
      :
      this.props.navigation.navigate('UserProfile', { user: owner })
  }

  render() {
    return (
      <View style={styles.container}>
        <FormSearch filtrarUsuarios={(nombre) => this.filtrarUsuarios(nombre)} actualizarInput={(valor) => this.actualizarInput(valor)} />
        {this.state.valor != '' ? (
          this.state.usuarios.length != 0 ?
            <FlatList
              data={this.state.usuarios}
              renderItem={({ item }) =>
                <View style={styles.usuarioItem}>
                  <TouchableOpacity onPress={() => this.irAlPerfil(item.data.owner)}>
                    <Text style={styles.userName}>{item.data.name}</Text>
                    <Text style={styles.userOwner}>{item.data.owner}</Text>
                  </TouchableOpacity>
                </View>}
              keyExtractor={(item) => item.id.toString()}
            />
            :
            <Text style={styles.text}>No se han encontrado resultados</Text>
        ) : (
          <Text style={styles.text}>Busca un usuario</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#9fc1ad',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
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
