import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { auth, db } from '../firebase/config';

const EditProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState('');
  const [minibio, setMinibio] = useState('');

  useEffect(() => {
    const unsubscribe = db.collection('users')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot((docs) => {
        docs.forEach((doc) => {
          const userData = doc.data();
          setName(userData.name);
          setFotoPerfil(userData.fotoPerfil);
          setMinibio(userData.minibio);
        });
      });

    return () => unsubscribe(); 
  }, []);

  const handleSaveChanges = async () => {
    try {
      await db.collection('users')
        .where('owner', '==', auth.currentUser.email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update({
              name: name,
              fotoPerfil: fotoPerfil,
              minibio: minibio,
            });
          });
        });

      Alert.alert('Cambios guardados con éxito');
      navigation.goBack();
    } catch (error) {
      console.error('Error al guardar cambios:', error);
      Alert.alert('Error al guardar cambios', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>
      <View style={styles.profileInfo}>
        <Image source={{ uri: fotoPerfil }} style={styles.profileImage} />
        <TextInput
          placeholder="Nombre de usuario"
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          placeholder="URL de la foto de perfil"
          style={styles.input}
          value={fotoPerfil}
          onChangeText={(text) => setFotoPerfil(text)}
        />
        <TextInput
          placeholder="Minibio"
          style={styles.input}
          value={minibio}
          onChangeText={(text) => setMinibio(text)}
        />
        <TouchableOpacity onPress={handleSaveChanges} style={styles.button}>
          <Text>Guardar Cambios</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#9fc1ad',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 16,
  },
  input: {
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#5F866F',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default EditProfileScreen;
