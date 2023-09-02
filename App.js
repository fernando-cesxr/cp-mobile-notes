import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer }  from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CriarNota from './Crud/CriarNota';
import Inicio from './Inicio'
import EditarNota from './Crud/EditarNota';
import VisualizarNota from './Crud/VisualizarNota';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
    <NavigationContainer>    
      <Tab.Navigator>
        <Tab.Screen name="Inicio" component={Inicio}/>
        <Tab.Screen name="Criar" component={CriarNota}/>
        <Tab.Screen name="Editar" component={EditarNota} options={{tabBarButton: () => null}}/>
        <Tab.Screen name="Visualizar" component={VisualizarNota} options={{tabBarButton: () => null}}/>
      </Tab.Navigator>
    </NavigationContainer>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cor: {
    backgroundColor: '#FFFFF0'
  }
});
