import { Text, View, StyleSheet, FlatList, Image } from 'react-native'
import React, { Component } from 'react'
import { db } from '../firebase/config'
import Post from '../components/Post'

export default class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usuarios: [],
            posteos: []
        }
    }

    componentDidMount() {
        db.collection('users').where('owner', '==', this.props.route.params.user).onSnapshot((docs) => {
            let arrDocs = []
            docs.forEach((doc) => {
                arrDocs.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                usuarios: arrDocs
            }, () => console.log(this.state.usuarios))

        })

        db.collection('posts').where('owner', '==', this.props.route.params.user).onSnapshot((docs) => {
            let arrDocs = []
            docs.forEach((doc) => {
                arrDocs.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            arrDocs.sort((a, b)=> b.data.createdAt - a.data.createdAt)
            this.setState({
                posteos: arrDocs
            }, () => console.log(this.state.posteos))

        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.profileInfo}>
                    <FlatList
                        data={this.state.usuarios}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <View>
                            <Text style={styles.username}>{item.data.name}</Text>
                            {item.data.fotoPerfil != '' ?
                                <Image
                                    source={item.data.fotoPerfil}
                                    style={styles.img}
                                    resizeMode='contain'
                                />
                                :
                                ''
                            }
                            <Text style={styles.mail}>{item.data.owner}</Text>
                            {item.data.minibio ?
                                <Text style={styles.minibio}>{item.data.minibio}</Text>
                                :
                                ''
                            }
                        </View>
                        }
                    />
                </View>
                <View style={styles.posts}>
                    <Text style={styles.postsTitle}>Posteos de {this.props.route.params.user} </Text>
                    <Text style={styles.cantidadPosteos}>Cantidad: {this.state.posteos.length} </Text>
                    <FlatList
                        data={this.state.posteos}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) =>
                            <View style={styles.post}>
                                <Post navigation={this.props.navigation} data={item.data} id={item.id} />
                            </View>
                        }
                    />
                </View>
            </View>
        )
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
      username: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      mail: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
      },
      minibio: {
        fontSize: 14,
        color: 'balck',
        textAlign: 'center',
      },
      posts: {
        flex: 2,
        padding: 10,
      },
      postsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'calibri',
        marginBottom: 15,
      },
      cantidadPosteos: {
        marginBottom: 15,
      },
      post: {
        marginBottom: 15,
      },
      img:{
        width: 200,
        height: 200,
        borderRadius: 100,
      }
   
})