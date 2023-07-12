import { useNavigation } from '@react-navigation/native'
import { View, TouchableOpacity, Text, KeyboardAvoidingView, StatusBar, Image, Platform, ImageBackground, StyleSheet } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setOnboardingStatus } from '../../features/reducers/session';

const WelcomeScreen = () => {
  const navigation = useNavigation()

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#000', alignItems: 'center' }}>
      <ImageBackground source={require('../../../assets/fotoWelcome.png')} style={ stylesWelcome.backgroundWelcome }/>
      <Image style={stylesWelcome.sombraTop} source={ require('../../../assets/rectanguloTop3.png') } />
      <Text style={stylesWelcome.welcomeText1}>Run together</Text>
      <Text style={stylesWelcome.welcomeText2}>Race Yourself</Text>
      <View style={stylesWelcome.containButton}> 
        <TouchableOpacity style={stylesWelcome.welcomeButton} onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={stylesWelcome.textButton}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <Image style={stylesWelcome.sombraBottom} source={ require('../../../assets/rectanguloBottom3.png') } />
    </KeyboardAvoidingView>
  )
}

export default WelcomeScreen;

const stylesWelcome = StyleSheet.create({
  backgroundWelcome: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1
  },

  welcomeText1: {
    textAlign: 'center',
    fontFamily: 'HighSpeed',
    position: 'absolute',
    bottom: 190,
    color: '#fff',
    fontSize: Platform.OS === 'ios' ? 24 : 22,
    zIndex: 2
  },

  welcomeText2: {
    textAlign: 'center',
    fontFamily: 'HighSpeed',
    position: 'absolute',
    bottom: 150,
    color: '#fff',
    fontSize: Platform.OS === 'ios' ? 30 : 27,
    zIndex: 2
  },

  containButton: {
    width: '100%',
    height: 50,
    position: 'absolute',
    bottom: 50,
    zIndex: 2
  },

  welcomeButton: {
    backgroundColor: '#fa9535',
    padding: Platform.OS === 'ios' ? 10 : 6,
    width: 100,
    borderRadius: 10,
    alignSelf: 'center',
  },

  textButton: {
    textAlign: 'center', 
    color: '#fff',
    fontWeight: 'bold',
    fontSize: Platform.OS === 'ios' ? 20 : 17,
  },

  sombraTop: {
    position: 'absolute',
    top: -550,
    height: 1000,
    zIndex: 2
  },

  sombraBottom: {
    position: 'absolute',
    bottom: -420,
  }
});