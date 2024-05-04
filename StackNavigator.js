import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home';
import App from './App';
import CadastroEscolaScreen from './Cadastro_Escola'; // Adicionando importação aqui

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="App">
      <Stack.Screen name="App" component={App} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Cadastro_Escola" component={CadastroEscolaScreen} /> {/* Corrigindo o nome do componente */}
    </Stack.Navigator>
  );
}

export default StackNavigator;
