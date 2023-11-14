import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth } from '../firebase/config';
import firebase from 'firebase/app';
import 'firebase/auth';

const ChangePasswordScreen = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = async () => {
    try {
      const user = auth.currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
      await user.reauthenticateWithCredential(credential);
      await user.updatePassword(newPassword);

      Alert.alert('Contraseña actualizada con éxito');
      navigation.goBack(); 
    } catch (error) {
        console.error('Error en handleChangePassword:', error);
        Alert.alert('Error al cambiar la contraseña', error.message);    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cambiar Contraseña</Text>
      <TextInput
        placeholder="Contraseña actual"
        secureTextEntry
        style={styles.input}
        value={currentPassword}
        onChangeText={(text) => setCurrentPassword(text)}
      />
      <TextInput
        placeholder="Nueva contraseña"
        secureTextEntry
        style={styles.input}
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
      />
     <TouchableOpacity onPress={() => { 
        console.log('Botón Cambiar Contraseña presionado');
        handleChangePassword(); }} style={styles.button}>
        <Text>Cambiar Contraseña</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default ChangePasswordScreen;
