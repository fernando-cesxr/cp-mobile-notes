import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditarNota = ({ route, navigation }) => {
  const { item } = route.params;
  const [titulo, setTitulo] = useState(item.titulo);
  const [descricao, setDescricao] = useState(item.descricao);

  const handleCancel = () => {
    navigation.goBack();
  }

  const handleUpdate = async () => {
    try {
      const updatedItem = {
        ...item,
        titulo,
        descricao,
      };

      await AsyncStorage.setItem(item.id, JSON.stringify(updatedItem));
      console.log('Item atualizado com sucesso!');
      navigation.goBack(); // Voltar para a tela de detalhes
    } catch (error) {
      console.error('Erro ao atualizar o item:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Editar Item</Text>
      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
      />
      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleUpdate} style={styles.button}>
        <Text style={styles.text}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCancel} style={styles.button}>
        <Text style={styles.text}>Cancelar</Text>
      </TouchableOpacity>

    </View>
  );
};

export default EditarNota;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#FFFFF0'
  },
  input: {
    fontSize: 16,
    fontWeight: 'bold',
    borderWidth: 2,
    padding: 10,
    backgroundColor: '#FFEFD5',
    width: '50%',
    margin: 5,
    borderRadius: 10
  },
  button:{
    backgroundColor: '#FFEFD5',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2

  },
  text:{
    fontWeight: 'bold',
    fontSize: 20
  }
});