import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

// Importando ícones
import Icon from 'react-native-vector-icons/FontAwesome';

const Cadastro = ({ navigation }) => {
  const irParaCadastroEscola = () => {
    navigation.navigate('CadastroEscola');
  };

  const irParaCadastroAluno = () => {
    navigation.navigate('CadastroAluno');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha o tipo de cadastro:</Text>
      <TouchableOpacity style={styles.button} onPress={irParaCadastroEscola}>
        <Icon name="building" size={20} color="#ffffff" />
        <Text style={styles.buttonText}>Cadastro Escola</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={irParaCadastroAluno}>
        <Icon name="user" size={20} color="#ffffff" />
        <Text style={styles.buttonText}>Cadastro Aluno</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    color: '#007bff',
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default Cadastro;
