import React from 'react';
import { StatusBar, StyleSheet, Text, View, Button, Image, ImageBackground, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation, setUserInfo }) => {
  const [userInfo, setUserInfoState] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '1024782208301-qdolc7nipej618h19cn5gg2umeesfmd7.apps.googleusercontent.com',
    iosClientId: '1024782208301-0fldioc8l3mic9aa7sq3vt7756ki5eo9.apps.googleusercontent.com',
    webClientId: '1024782208301-1ifdiopbjfg791qnksiqge10iak35q1k.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem('@user');
    if (!user) {
      if (response?.type === 'success') {
        await getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfoState(JSON.parse(user));
    }
  }

  const getUserInfo = async (token) => {
    if (!token) {
      console.error('Token de acesso ausente');
      return;
    }
    try {
      const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error('Falha ao buscar informações do usuário');
      }
      const user = await response.json();
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      setUserInfoState(user);
      setUserInfo(user); // Set userInfo in App.js
      navigation.navigate('Welcome');
    } catch (error) {
      console.error('Erro ao buscar informações do usuário:', error);
    }
  };

  const handleLoginButtonPress = async () => {
    await promptAsync();
  };

  return (
    <ImageBackground source={require('./assets/Background.png')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.squareContainer}>
          <Image source={require('./assets/Logo_001.png')} style={styles.logo} />
          <Text style={styles.welcomeText}>Bem-vindo ao SafeWay! Faça seu login abaixo para prosseguir</Text>
          {userInfo && (
            <View style={styles.userInfoContainer}>
              <Image source={{ uri: userInfo.picture }} style={styles.userAvatar} />
              <View style={styles.userInfo}>
                <Text>Usuário: {userInfo.name}</Text>
                <Text>Email: {userInfo.email}</Text>
              </View>
            </View>
          )}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLoginButtonPress}
          >
            <FontAwesome name="google" size={20} color="white" style={styles.icon} />
            <Text style={styles.buttonText}>Login com Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              AsyncStorage.removeItem('@user');
              setUserInfo(null);
              setUserInfoState(null);
            }}
          >
            <FontAwesome name="sign-out" size={20} color="white" style={styles.icon} />
            <Text style={styles.buttonText}>Sair</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareContainer: {
    width: 400,
    height: 550,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  logo: {
    width: 200,
    height: 250,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  loginButton: {
    width: '80%',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoutButton: {
    width: '80%',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
  icon: {
    marginRight: 5,
  },
});

export default Login;
