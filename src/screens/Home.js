import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import Contador from '../components/Contador'
import Card from '../components/Card'
import { db } from '../firebase/config'
import Post from '../components/Post'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posteos: []
        }
    }

    componentDidMount() {
        db.collection('posts')
            .orderBy('createdAt', 'desc')
            .onSnapshot(docs => {
                let arrPosteos = []
                docs.forEach(doc => {
                    const posteoData = doc.data();
                    const owner = posteoData.owner;
                    arrPosteos.push({
                        id: doc.id,
                        data: posteoData,
                        owner: owner 
                    })
                })

                this.setState({
                    posteos: arrPosteos
                })
            })
    }

    render() {
        return (
            <View style={styles.posteos}>
                <FlatList 
                    data={this.state.posteos}
                    style={styles.card}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Post
                        navigation={this.props.navigation}
                        data={item.data}
                        id={item.id}
                        owner={item.owner} 
                    />
                    )}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    posteos: {
        flex: 1,
        marginTop: 30,
        marginBottom: 30,
        backgroundColor: '#9fc1ad',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card:{
        marginTop: 20,
    }
    
})
    


