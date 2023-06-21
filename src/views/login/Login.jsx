import { CommonActions, useNavigation } from '@react-navigation/native'
import {
  View, TouchableWithoutFeedback, TouchableOpacity, Text, KeyboardAvoidingView,
  Platform, ImageBackground, StyleSheet, Keyboard, ScrollView, TextInput, Image
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Eye from '../../../assets/eye.svg'
import EyeSlash from '../../../assets/eye-slash.svg'
import { useAuthenticateMutation } from '../../features/reducers/session'
import { useSelector } from 'react-redux'

function LoginScreen() {
  const navigation = useNavigation()
  const { user_token } = useSelector(store => store.main)

  console.log('user_token', user_token)
  useEffect(() => {
    if (user_token != null) {
      navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [{ name: "HomeScreen" }],
        })
      )
    }
  }, [user_token])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  const [authenticate, { isLoading: loadingAuthentication }] = useAuthenticateMutation()

  const toggleShowPassword = () => {
    console.log('toggleShowPassword', toggleShowPassword)
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#000' }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ImageBackground source={require('../../../assets/manchasTop.png')}
            style={{ width: 180, height: 200, alignSelf: 'flex-end', flex: 1, position: 'absolute' }} />
          <View style={styles.formLogin}>
            <View style={{ paddingLeft: 10 }}>
              <Text style={styles.textWelcomeR}>Welcome{'\n'}
                Runner</Text>
            </View>
            <TextInput onChangeText={setEmail} value={email} style={styles.formLoginInputs} placeholder='Correo electrónico' />
            <View>
              <TextInput onChangeText={setPassword} secureTextEntry={!showPassword} value={password} style={styles.formLoginInputs} placeholder='Contraseña' />
              <TouchableOpacity onPress={toggleShowPassword} style={{ position: 'absolute', right: 25, top: '33%' }}>
                {
                  showPassword
                  ? <EyeSlash width={22} height={22} fill={'#7F8C8D'} />
                  : <Eye width={22} height={22} fill={'#000'} />
                }
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                if (email.length > 0 && password.length > 0) {
                  console.log('authenticate')
                  authenticate({ email, password })
                    .then(response => {
                      console.log('response', response)
                    })
                    .catch((error) => {
                      console.log('error', error)
                    })
                } else {
                  console.log('Por favor llena los campos correctamente')
                }
              }}
            >
              {/* <TouchableOpacity style={styles.loginButton} onPress={this.printData }> */}
              <Text style={styles.textButton}>
                {
                  !loadingAuthentication
                  ? 'Iniciar sesión'
                  : 'Cargando...'
                }
              </Text>
            </TouchableOpacity>

            <View style={styles.formLoginRegistrarse}>
              <Text style={styles.formLoginRegistrarseFirstText}>¿Todavía no tienes cuenta?</Text>
            </View>

            <View>
              <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
                <Text style={styles.formLoginRegistrarseSecondText}>Regístrate</Text>
              </TouchableOpacity>
            </View>

          </View>
          <ImageBackground style={{ width: 180, height: 200, alignSelf: 'flex-start', zIndex: -1, position: 'absolute', bottom: 0 }}
            source={require('../../../assets/manchasBottom.png')} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  formLogin: {
    height: 'auto',
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    paddingTop: '25%'
  },
  formLoginInputs: {
    margin: 10,
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#CCD1D1',
    backgroundColor: '#fff',
    borderRadius: 10
  },
  formLoginRegistrarse: {
    flexDirection: 'row',
    marginTop: 30,
    alignSelf: 'center'
  },
  formLoginRegistrarseFirstText: {
    color: '#fff',
    marginTop: 20,
    alignSelf: 'center',
    top: 100,
    display: 'none'
  },
  formLoginRegistrarseSecondText: {
    color: '#E08631',
    alignSelf: 'center',
    marginTop: 20,
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },

  textWelcomeR: {
    color: '#fff',
    fontFamily: 'HighSpeed',
    fontSize: 40,
    marginBottom: 44
  },

  loginButton: {
    backgroundColor: '#E08631',
    padding: 9,
    width: 'auto',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 40
  },

  textButton: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15
  }
});