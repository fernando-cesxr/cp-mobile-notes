import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditarNota = ({ route, navigation }) => {
  const { item } = route.params;
  const [titulo, setTitulo] = useState(item.titulo);
  const [descricao, setDescricao] = useState(item.descricao);

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
    <View style={{ padding: 10 }}>
      <Text>Editar Item</Text>
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
      <Button title="Salvar" onPress={handleUpdate} />
    </View>
  );
};

export default EditarNota;
