import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import FormComentarios from '../components/FormComentarios';
import { db } from '../firebase/config';

export default class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataPost: null,
        };
    }

    componentDidMount() {
        this.unsubscribe = db
            .collection('posts')
            .doc(this.props.route.params.id)
            .onSnapshot((doc) => {
                this.setState({ dataPost: doc.data() });
            });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Comentarios</Text>
                {this.state.dataPost !== null && this.state.dataPost.comentarios !== undefined ? (
                    <View style={styles.commentsContainer}>
                        <FlatList
                            data={this.state.dataPost.comentarios
                                .slice()
                                .sort((a, b) => b.createdAt - a.createdAt)}
                            keyExtractor={(item) => item.createdAt.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.commentContainer}>
                                    <Text style={styles.ownerText}>{item.owner}</Text>
                                    <Text style={styles.commentText}>{item.comentario}</Text>
                                </View>
                            )}
                        />
                    </View>
                ) : (
                    <Text>Aún no hay comentarios.</Text>
                )}
                <FormComentarios postId={this.props.route.params.id} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#9fc1ad',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    commentsContainer: {
        backgroundColor: '#5F866F',
        borderRadius: 10,
        padding: 10,
        alignSelf: 'center',
        width: '70%',
    },
    commentContainer: {
        marginBottom: 10,
    },
    ownerText: {
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
    },
    commentText: {
        color: 'black',
    },
});
