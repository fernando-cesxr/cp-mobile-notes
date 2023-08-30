import React from 'react';
import { View, Text } from 'react-native';

const VisualizarNota = ({ route, navigation }) => {
    const { item } = route.params;
  
    const handleEdit = () => {
      navigation.navigate('Edit', { item });
    };
  
    return (
      <View style={{ padding: 10 }}>
        <Text>Título: {item.titulo}</Text>
        <Text>Descrição: {item.descricao}</Text>
        <Button title="Editar" onPress={handleEdit} />
      </View>
    );
  };

export default VisualizarNota;