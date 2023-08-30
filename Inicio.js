import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Inicio = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const items = await AsyncStorage.multiGet(keys);

        const parsedItems = items.map(([key, value]) => ({
          id: key,
          ...JSON.parse(value),
        }));

        setData(parsedItems);
      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
      }
    };

    carregarDados();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ padding: 10 }}
      onPress={() => navigation.navigate('Visualizar', { item })}
    >
      <Text>Título: {item.titulo}</Text>
      <Text>Descrição: {item.descricao}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Inicio;
