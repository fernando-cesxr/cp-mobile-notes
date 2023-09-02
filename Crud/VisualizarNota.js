import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VisualizarNota = ({ route, navigation }) => {
    const { item } = route.params;

    const handleCancel = () => {
      navigation.goBack();
    }
  
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
        console.log("Item excluído com sucesso!")
        navigation.navigate('Inicio', { updatedData });
      } catch (error) {
        console.error('Erro ao excluir o item:', error);  
      }
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.notes}>
          <Text style={styles.text}>Título: {item.titulo}</Text>
          <Text style={styles.text}>Descrição: {item.descricao}</Text>
        </View>
        <TouchableOpacity onPress={handleEdit} style={styles.button}>
          <Text style={styles.text}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} style={styles.button}>
          <Text style={styles.text}>Apagar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCancel} style={styles.button}>
          <Text style={styles.text}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    );
  };

export default VisualizarNota;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#FFFFF0'
  },
  notes: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    backgroundColor: '#FFEFD5',
    borderRadius: 5,
    borderWidth: 2,
    paddingRight: 80,
    paddingLeft: 80,
    margin: 10,
    paddingVertical: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5
  },
  text:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  button:{
    backgroundColor: '#FFEFD5',
    margin: 10,
    padding: 10,
    paddingRight: 5,
    paddingLeft: 5,
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2

  },
});