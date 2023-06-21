import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, ImageBackground, Text, View 
    ,StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RadioButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { useCreateUserMutation } from '../../features/reducers/signup'
import Eye from '../../../assets/eye.svg'
import EyeSlash from '../../../assets/eye-slash.svg'

function SignupScreen() {

    const navigation = useNavigation()
    const { user_token } = useSelector(store => store.main)

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

    // RADIO BUTTONS
    const [checked, setChecked] = useState('first');
    const handleChecked = (value) => {
        setChecked(value);
    };

    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const showAlert = () => {
        console.log('Mosrando')
        Alert.alert(
            'Titulo',
            'Cuenta creada correctamente',
            [
                { text: 'Cancelar', onPress: () => console.log('Cancelar') },
                { text: 'Aceptar', onPress: () => console.log('Aceptar') }
            ]
        );
    };

    const [ createUser, { isLoading: creatingUserLoading } ] = useCreateUserMutation();

    return (
            <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#000' }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView contentContainerStyle={{flexGrow: 1  }}>
                        <ImageBackground source={ require('../../../assets/manchasTop.png') } 
                        style={{ width: 180, height: 200, alignSelf: 'flex-end', flex: 1, position: 'absolute'  }} />

                            <View style={styles.form}>
                                <Text style={styles.titles}>Datos generales</Text>
                                <View>
                                    <Text style={styles.labels}>Nombre</Text> 
                                    <TextInput onChangeText={setFirst_name} value={first_name} style={styles.formSignupInputs} />
                                </View>
                                <View style={{marginTop: 5}}>
                                    <Text style={styles.labels}>Apellidos</Text> 
                                    <TextInput onChangeText={setLast_name} value={last_name} style={styles.formSignupInputs} />
                                </View>
                                <View style={{marginTop: 5}}>
                                    <Text style={styles.labels}>Email</Text> 
                                    <TextInput onChangeText={setEmail} value={email} style={styles.formSignupInputs} />
                                </View>
                                <View style={{marginTop: 5}}>
                                    <Text style={styles.labels}>Teléfono</Text> 
                                    <TextInput onChangeText={setPhone} value={phone} style={styles.formSignupInputs} />
                                </View>
                                <View style={{marginTop: 5}}>
                                    <Text style={styles.labels}>Contraseña</Text> 
                                    <TextInput secureTextEntry={!showPassword} onChangeText={setPassword} value={password} style={styles.formSignupInputs} />
                                    <TouchableOpacity onPress={toggleShowPassword} style={{position: 'absolute', right: 25, top: '47%'}}>
                                    {
                                        showPassword
                                        ? <EyeSlash width={22} height={22} fill={'#7F8C8D'} />
                                        : <Eye width={22} height={22} fill={'#fff'} />
                                        }
                                    </TouchableOpacity>
                                </View>
                                
                                <TouchableOpacity style={styles.nextButton} onPress={() => {
                                        if (email.length > 0 && password.length > 0 && first_name.length > 0
                                            && last_name.length > 0 && phone.length > 0) {
                                            createUser({ first_name, last_name, email, phone, password })
                                            .then(response => {
                                                console.log('response', response)
                                                showAlert
                                                navigation.navigate('LoginScreen')
                                            })
                                            .catch((error) => {
                                                console.log('error', error)
                                            })
                                        } else {
                                        console.log('Por favor llena los campos correctamente')
                                        }
                                    }}>
                                    <Text style={styles.textButton}>{ 
                                    !creatingUserLoading
                                    ? 'Crear cuenta'
                                    : 'Cargando...'
                                    }</Text>
                                </TouchableOpacity>
                            </View>

                        <ImageBackground style={{ width: 180, height: 200, alignSelf: 'flex-start', zIndex:-1, position: 'absolute', bottom: 0 }} 
                    source={ require('../../../assets/manchasBottom.png') } />
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
}

export default SignupScreen

const styles = StyleSheet.create({
    form: {
      height: 'auto',
      paddingLeft: 10,
      paddingRight: 10,
      flex: 1,
      paddingTop: '20%'
    },

    titles: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: '4%'
    },

    labels: {
        fontSize: 14,
        color: '#E08631',
        marginLeft: '4%'
    },

    formSignupInputs: {
        margin: 10,
        padding: 6,
        borderBottomColor: '#CCD1D1',
        backgroundColor: '#292929',
        borderRadius: 10,
        color: '#fff'
    },

    nextButton: {
        backgroundColor: '#E08631',
        padding: 9,
        width: 'auto',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: 80
    },

    textButton: {
        textAlign: 'center', 
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        textTransform: 'uppercase'
    }
})