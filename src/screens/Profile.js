import { Text, View, TouchableOpacity, StyleSheet, FlatList,Image  } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import Post from '../components/Post'
import firebase from 'firebase'

export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      usuarios: [],
      posts: [] 
    }
  }

  componentDidMount(){
    db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot((docs)=>{
      
      let arrDocs = []
      //Recorre el array de documentos y sube un array de resultados con el id de cada documento
      docs.forEach((doc) => {
        arrDocs.push({
          id:doc.id,
          data: doc.data()
        })
      })

      //Guarda en el estado los datos del componente para despues renderizarlos
      this.setState({
        usuarios : arrDocs
      }, () => console.log(this.state.usuarios))

    })

    db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot((docs)=>{
      
      let arrDocs = []
      //Recorre el array de documentos y sube un array de resultados con el id de cada documento
      docs.forEach((doc) => {
        arrDocs.push({
          id:doc.id,
          data: doc.data()
        })
      })
      arrDocs.sort((a,b)=> b.data.createdAt - a.data.createdAt)
      //Guarda en el estado los datos del componente para despues renderizarlos
      this.setState({
        posteos : arrDocs
      }, () => console.log(this.state.posteos))

    })
  }

  borrarPosts(){
    //pendiente
  }

  logout(){
    auth.signOut()
    this.props.navigation.navigate('Register')
  }

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
                <Image
                  source={{ uri: item.data.fotoPerfil }}
                  style={styles.profileImage}
                />
                <Text style={styles.mail}>{item.data.owner}</Text>
                <Text style={styles.minibio}>{item.data.minibio}</Text>
              </View>
            )}
          />
        </View>
  
        <View style={styles.posts}>
          <Text style={styles.postsTitle}>Tus posteos</Text>
          <Text>Cantidad de posteos: {this.state.posts.length}</Text>
          <FlatList
            data={this.state.posteos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.post}>
                <Post navigation={this.props.navigation} data={item.data} id={item.id} />
              </View>
            )}
          />
        </View>
  
        <View style={styles.logout}>
          <TouchableOpacity
            onPress={() => this.logout()}
          >
            <Text>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileInfo: {
    alignItems: 'center',
    padding: 20,

  },
  mail: {

    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100, // Hace la imagen redondeada
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
    width: '100%',
    padding: 20,
  },
  postsTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    fontFamily: 'calibri'
  },
  post: {
    marginBottom: 20,
  },
  logout: {
    marginVertical: 20,
  },
});