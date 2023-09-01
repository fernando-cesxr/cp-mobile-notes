import React, { useEffect, useState } from 'react';
import { View, Text, FlatList,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { NavigationContainer }  from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Inicio = ({navigation}) => {
  const [data, setData] = useState([]);

  
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
    

    useFocusEffect(
      React.useCallback(() => {
        carregarDados();
      }, [])
    );

  

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
