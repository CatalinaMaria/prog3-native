import React, { Component, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image, Modal, Pressable, Alert } from 'react-native';
import { auth, db } from '../firebase/config';
import Post from '../components/Post';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: [],
      posteos: [],
      selectedPostId: null,
      modalVisible: false,
    };
  }

  componentDidMount() {
    db.collection('users')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot((docs) => {
        let arrDocs = [];
        docs.forEach((doc) => {
          arrDocs.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        this.setState({
          usuarios: arrDocs,
        });
      });

    db.collection('posts')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot((docs) => {
        let arrDocs = [];
        docs.forEach((doc) => {
          arrDocs.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        arrDocs.sort((a, b) => b.data.createdAt - a.data.createdAt);
        this.setState({
          posteos: arrDocs,
        });
      });
  }

  confirmarBorrado = async (postId) => {
    try {
      await db.collection('posts').doc(postId).delete();
      console.log('Post eliminado correctamente');

      // Actualizar el estado después de borrar el posteo
      const updatedPosteos = this.state.posteos.filter(post => post.id !== postId);
      this.setState({
        posteos: updatedPosteos,
        modalVisible: false,
      });
    } catch (error) {
      console.error('Error al eliminar el post:', error);
    }
  }

  borrarPost = (postId) => {
    // Mostrar el modal de confirmación
    this.setState({
      selectedPostId: postId,
      modalVisible: true,
    });
  }

  closeModal = () => {
    // Cerrar el modal sin borrar el posteo
    this.setState({
      selectedPostId: null,
      modalVisible: false,
    });
  }

  logout = () => {
    auth.signOut();
    this.props.navigation.navigate('Register');
  }

  handleChangePassword = () => {
    this.props.navigation.navigate('ChangePasswordScreen');
  };

  handleEditProfile = () => {
    this.props.navigation.navigate('EditProfileScreen');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.postsTitle}>Tu perfil</Text>
        <View style={styles.profileInfo}>
          <FlatList
            data={this.state.usuarios}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.username}>{item.data.name}</Text>
                <Image source={{ uri: item.data.fotoPerfil }} style={styles.profileImage} />
                <Text style={styles.mail}>{item.data.owner}</Text>
                <Text style={styles.minibio}>{item.data.minibio}</Text>
                <TouchableOpacity onPress={this.handleEditProfile}>
                  <Text style={styles.editProfileButton}>Editar Perfil</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        <View style={styles.posts}>
          <Text style={styles.postsTitle}>Tus posteos</Text>
          <Text style={styles.cantidadPosteos}>Cantidad de posteos: {this.state.posteos.length}</Text>
          <View style={styles.postsList}>
            <FlatList
              data={this.state.posteos}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.post}>
                  <TouchableOpacity onPress={() => this.borrarPost(item.id)}>
                    <Text>Borrar</Text>
                  </TouchableOpacity>
                  <Post navigation={this.props.navigation} data={item.data} id={item.id} />
                </View>
              )}
            />
          </View>
        </View>

        <View style={styles.changePasswordButton}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ChangePasswordScreen')}>
            <Text>Cambiar Contraseña</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.logout}>
          <TouchableOpacity onPress={this.logout}>
            <Text>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.closeModal();
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>¿Estás seguro de que quieres borrar este posteo?</Text>
              <View style={styles.modalButtons}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => this.closeModal()}
                >
                  <Text style={styles.textStyle}>Cancelar</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonConfirm]}
                  onPress={() => this.confirmarBorrado(this.state.selectedPostId)}
                >
                  <Text style={styles.textStyle}>Borrar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#9fc1ad',
  },
  profileInfo: {
    alignItems: 'center',
    padding: 10,
  },
  mail: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  username: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  minibio: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
  posts: {
    flex: 2,
    padding: 10,
  },
  postsList: {
    flex: 1,
  },
  postsTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    fontFamily: 'calibri',
    marginBottom: 15,
  },
  post: {
    marginBottom: 15,
  },
  logout: {
    marginVertical: 20,
  },
  cantidadPosteos: {
    marginBottom: 15,
  },
  editProfileButton: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'none',
    marginTop: 10,
  },
  changePasswordButton: {
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonConfirm: {
    backgroundColor: '#FF6347',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
