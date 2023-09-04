import React, { useEffect, useState } from 'react';
import { View, Text, FlatList,TouchableOpacity, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
      <TouchableOpacity
      style={styles.notes}
        onPress={() => navigation.navigate('Visualizar', { item })}
      >
        <Text style={styles.text} numberOfLines={1}>Título: {item.titulo}</Text>
        <Text style={styles.text} numberOfLines={2}>Descrição: {item.descricao}</Text>
      </TouchableOpacity>
    </View>
  );

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Notas Rápidas</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Inicio;


const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#FFFFF0'
  },
  notes: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEFD5',
    borderRadius: 5,
    borderWidth: 2,
    padding: 10,
    paddingHorizontal: 70,
    margin: 20,
    height: 200,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5, 
    
  },
  text:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  }
  
});
