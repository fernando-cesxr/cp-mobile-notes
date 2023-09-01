import React from 'react';
import { View, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VisualizarNota = ({ route, navigation }) => {
    const { item } = route.params;
  
    const handleEdit = () => {
      navigation.navigate('Editar', { item });
    };
    const handleDelete = async () => {
      try {
        // Obtém as chaves existentes no AsyncStorage
        const keys = await AsyncStorage.getAllKeys();
  
        // Remove a chave correspondente
        await AsyncStorage.removeItem(item.id);
  
        // Atualiza a lista de dados
        const updatedData = keys.filter((key) => key !== item.id);
        navigation.navigate('Inicio', { updatedData });
      } catch (error) {
        console.error('Erro ao excluir o item:', error);
      }
    };
  
    return (
      <View style={{ padding: 10 }}>
        <Text>Título: {item.titulo}</Text>
        <Text>Descrição: {item.descricao}</Text>
        <Button title="Editar" onPress={handleEdit} /><Button title='Excluir' onPress={handleDelete}/>
      </View>
    );
  };

export default VisualizarNota;