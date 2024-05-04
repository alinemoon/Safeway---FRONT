import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';

const WelcomeScreen = ({ navigation, userInfo }) => {

  const mostrarPerfil = () => {
    navigation.navigate('Perfil');
  }

  const mostrarViagem = () => {
    navigation.navigate('Viagem');
  }

  const mostrarCadastro = () => {
    navigation.navigate('Cadastro');
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#007bff" barStyle="light-content" />
      <View style={styles.navigationBar}>
        <View style={styles.navigationBarContent} />
      </View>
      <Text style={styles.welcomeTitle}>Bem-vindo {userInfo.name}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.icon} onPress={mostrarPerfil}>
          <Image source={require('./assets/perfil_icon.png')} style={styles.iconImage} />
          <Text style={styles.iconText}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={mostrarViagem}>
          <Image source={require('./assets/viagem_icon.png')} style={styles.iconImage} />
          <Text style={styles.iconText}>Viagem</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={mostrarCadastro}>
          <Image source={require('./assets/cadastro_icon.png')} style={styles.iconImage} />
          <Text style={styles.iconText}>Cadastro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  navigationBar: {
    backgroundColor: '#007bff',
    height: 44, // Altura da barra de navegação
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    overflow: 'hidden',
  },
  navigationBarContent: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  icon: {
    alignItems: 'center',
  },
  iconImage: {
    width: 50,
    height: 50,
  },
  iconText: {
    marginTop: 5,
  },
});

export default WelcomeScreen;
