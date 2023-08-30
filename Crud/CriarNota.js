import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CriarNota = () => {
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
    <View>
      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <Button title="Inserir Dados" onPress={inserirDados} />
    </View>
  );
};

export default CriarNota;
