import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import Contador from '../components/Contador'
import Card from '../components/Card'
import { db } from '../firebase/config'
import Post from '../components/Post'


export default class Home extends Component {
    constructor(props){
        super(props)
        this.state ={
            posteos: []
        }
    }  

    componentDidMount(){
        db.collection('posts')
        .where('likes', '>', 1)
        .orderBy('likes', 'desc')
        .limit(6)
        .onSnapshot(docs => {
            let arrPosteos = []
            docs.forEach(doc => {
                arrPosteos.push({
                    id: doc.id,
                    data: doc.data()
                })
            })

            this.setState({
               posteos: arrPosteos 
            })
        })
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.posteos}
                    keyExtractor={(item)=> item.id.toString()}
                    renderItem={({ item })=> <Post navigation={this.props.navigation} data={item.data} id={item.id}/>}
                />
                
            </View>
        )
    }
}

