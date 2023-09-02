import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CriarNota = ({navigation}) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');


  const inserirDados = async () => {
    try {
      const item = {
        titulo,
        descricao,
      };

      await AsyncStorage.setItem(`item_${Date.now()}`, JSON.stringify(item));
      console.log('Dados inseridos com sucesso!');
      setTitulo('');
      setDescricao('');
    } catch (error) {
      console.error('Erro ao inserir os dados:', error);
    }
  };

  return (
    <>
    <View style={styles.container}> 
    <Text style={styles.title}>Criar uma nota</Text>
    <View style={styles.container}>
      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
        placeholderTextColor="#696969"
        
      />
      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={[styles.input, styles.descricao]}
        placeholderTextColor="#696969"
      />

      <TouchableOpacity onPress={inserirDados} style={styles.button}>
        <Text style={styles.text}>Inserir dados</Text>
      </TouchableOpacity>

    </View>
    </View>
    </>
  );
};

export default CriarNota;

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
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 70,
    backgroundColor: '#FFEFD5',
    margin: 5,
    
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
    fontSize: 20,
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  descricao: {
    paddingHorizontal: 55
  }
});
