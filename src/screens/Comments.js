import { Text, View, FlatList } from 'react-native'
import React, { Component } from 'react'
import FormComentarios from '../components/FormComentarios'
import { db } from '../firebase/config'

export default class Comments extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataPost: null
        }
    }

    componentDidMount(){
        db
        .collection('posts')
        .doc(this.props.route.params.id)
        .onSnapshot((doc)=>{
            this.setState({ dataPost: doc.data() })
        })
    }

    render() {
        return (
            <View>
                <Text>Comentarios</Text>
                {
                    this.state.dataPost !== null && this.state.dataPost.comentarios !== undefined ?
                        <FlatList
                            data={this.state.dataPost.comentarios.slice().sort((a, b) => b.createdAt - a.createdAt)}
                            keyExtractor={(item) => item.createdAt.toString()}
                            renderItem={({ item }) => (
                                <View>
                                    <Text>{item.owner}</Text>
                                    <Text>{item.comentario}</Text>
                                </View>
                            )}
                        />
                        :
                        <Text>Aún no hay comentarios.</Text>
                }
                <FormComentarios postId={this.props.route.params.id} />
            </View>
        )
    }
}
