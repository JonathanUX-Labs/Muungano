import React, { useState } from 'react'
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, ImageBackground, Text, View 
    ,StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Slider from 'react-native-slider'
import { RadioButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

function SignupNextScreen() {

    const navigation = useNavigation()

    // Sliders
    const [value, setValue] = useState(0);
    const handleValueChange = (newValue) => {
        setValue(newValue);
    };

    // RADIO BUTTONS
    const [checked, setChecked] = useState('');
    const handleChecked = (value) => {
        setChecked(value);
      };

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#000' }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={{flexGrow: 1  }}>
                    <ImageBackground source={ require('../../../assets/manchasTop.png') } 
                            style={{ width: 180, height: 200, alignSelf: 'flex-end', flex: 1, position: 'absolute'  }} />

                            <View style={styles.form}>
                            <Text style={styles.titles}>Sobre ti</Text>
                                <View style={{marginTop: 5}}>
                                    <Text style={styles.labels}>Fecha de nacimiento</Text> 
                                    <TextInput style={styles.formSignupInputs} />
                                </View>
                                <View style={{marginTop: 5}}>
                                    <Text style={styles.labels}>En que país vives?</Text> 
                                    <RadioButton.Group  value={checked} onValueChange={handleChecked}>
                                        <RadioButton.Item color='#E08631' 
                                            value="mexico" label="México" labelStyle={{ color: '#fff' }} />
                                        <RadioButton.Item color='#E08631' label="Estados Unidos" 
                                            value="estados_unidos" labelStyle={{ color: '#fff' }} />
                                        <RadioButton.Item color='#E08631' label="Otro" 
                                            value="otro" labelStyle={{ color: '#fff' }} />
                                        <TextInput placeholderTextColor={'#8D8D8D'} style={styles.formSignupInputs} placeholder='Otro' />
                                    </RadioButton.Group>
                                </View>
                                <View style={{marginTop: 5, marginBottom: 40}}>
                                    <Text style={styles.labels}>Selecciona estado</Text> 
                                </View>

                                <Text style={styles.titles}>Contacto de Emergencia</Text>
                                <View style={{marginTop: 5}}>
                                    <Text style={styles.labels}>Nombre</Text> 
                                    <TextInput style={styles.formSignupInputs} />
                                </View>
                                <View style={{marginTop: 5}}>
                                    <Text style={styles.labels}>Parentesco</Text> 
                                    <TextInput style={styles.formSignupInputs} />
                                </View>
                                <View style={{marginTop: 5}}>
                                    <Text style={styles.labels}>Teléfono</Text> 
                                    <TextInput style={styles.formSignupInputs} />
                                </View>
                                <Text style={styles.titles}>Historial</Text>
                                <View style={{marginTop: 20}}>
                                    <Text style={styles.labels}>¿Cuantos kms corriste en tus ultimos 2 meses?</Text> 
                                    <Text style={{ color:'#fff', marginLeft: '4%', marginTop: 10}}> {value} km </Text>
                                    <Slider value={value} minimumValue={0} maximumValue={500} step={1} onValueChange={handleValueChange}
                                    style={styles.sliders}  thumbTintColor='#fff' minimumTrackTintColor='#E08631'
                                    trackStyle={{ height: 8, borderRadius: 5 }} />
                                </View>
                                <View style={{marginTop: 20, marginBottom: 20}}>
                                    <Text style={styles.labels}>En esos 2 meses, cuantos km corriste por semana en promedio?</Text> 
                                    <Text style={{ color:'#fff', marginLeft: '4%', marginTop: 10}}> {30} km </Text>
                                    <Slider value={30} minimumValue={0} maximumValue={500} step={1} onValueChange={handleValueChange}
                                    style={styles.sliders}  thumbTintColor='#fff' minimumTrackTintColor='#E08631'
                                    trackStyle={{ height: 8, borderRadius: 5 }} />
                                </View>
                                
                                <Text style={styles.labels}>De esos 2 meses, cual fue tu carrera más larga y cuanto tiempo te llevó?</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1}}>
                                        <Text style={{color: '#fff', marginTop: 10, marginLeft: 15}}>Distancia</Text>
                                        <TextInput style={styles.formSignupInputs} />
                                    </View>
                                    <View style={{flex: 1}}>
                                        <Text style={{color: '#fff',  marginTop: 10, marginLeft: 15}}>Tiempo</Text>
                                        <TextInput style={styles.formSignupInputs} />
                                    </View>
                                </View>

                                <Text style={styles.labels}>Haz corrido alguna carrera en los ultimos 4 meses?</Text>
                                <RadioButton.Group  value={checked} onValueChange={handleChecked} style={{flexDirection: 'row'}}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: '27%'}}>
                                            <RadioButton.Item color='#E08631' 
                                                value="si" label="Si" labelStyle={{ color: '#fff'}} />
                                        </View>
                                        <View style={{width: '27%'}}>
                                            <RadioButton.Item color='#E08631' label="No" 
                                                value="no" labelStyle={{ color: '#fff' }} />
                                        </View>
                                    </View>
                                </RadioButton.Group>

                                <Text style={styles.labels}>Cual fue la carrera, fecha, y tiempo que lograste finalizar?</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1}}>
                                        <Text style={{color: '#fff', marginTop: 10, marginLeft: 15}}>Distancia</Text>
                                        <TextInput style={styles.formSignupInputs} />
                                    </View>
                                    <View style={{flex: 1}}>
                                        <Text style={{color: '#fff',  marginTop: 10, marginLeft: 15}}>Tiempo</Text>
                                        <TextInput style={styles.formSignupInputs} />
                                    </View>
                                    <View style={{flex: 1}}>
                                        <Text style={{color: '#fff',  marginTop: 10, marginLeft: 15}}>Fecha</Text>
                                        <TextInput style={styles.formSignupInputs} />
                                    </View>
                                </View>

                                <Text style={styles.labels}>Que días de la semana tienes disponible para entrenar?</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1}}>
                                        <TextInput style={styles.formSignupInputs} placeholder='Lun' placeholderTextColor={'#8D8D8D'}
                                        fontSize={13}/>
                                    </View>
                                    <View style={{flex: 1}}>
                                        <TextInput style={styles.formSignupInputs} placeholder='Mar' placeholderTextColor={'#8D8D8D'}
                                        fontSize={13}/>
                                    </View>
                                    <View style={{flex: 1}}>
                                        <TextInput style={styles.formSignupInputs} placeholder='Miér' placeholderTextColor={'#8D8D8D'}
                                        fontSize={12}/>
                                    </View>
                                    <View style={{flex: 1}}>
                                        <TextInput style={styles.formSignupInputs} placeholder='Jue' placeholderTextColor={'#8D8D8D'}
                                        fontSize={13}/>
                                    </View>
                                    <View style={{flex: 1}}>
                                        <TextInput style={styles.formSignupInputs} placeholder='Vier' placeholderTextColor={'#8D8D8D'}
                                        fontSize={13}/>
                                    </View>
                                    <View style={{flex: 1}}>
                                        <TextInput style={styles.formSignupInputs} placeholder='Sab' placeholderTextColor={'#8D8D8D'} 
                                        fontSize={13}/>
                                    </View>
                                    <View style={{flex: 1}}>
                                        <TextInput style={styles.formSignupInputs} placeholder='Dom' placeholderTextColor={'#8D8D8D'}
                                        fontSize={11}/>
                                    </View>
                                </View>

                                <Text style={styles.labels}>Haces algún otro ejericio actualmente?</Text>
                                <RadioButton.Group  value={checked} onValueChange={handleChecked} style={{flexDirection: 'row'}}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: '27%'}}>
                                            <RadioButton.Item color='#E08631' 
                                                value="si" label="Si" labelStyle={{ color: '#fff'}} />
                                        </View>
                                        <View style={{width: '27%'}}>
                                            <RadioButton.Item color='#E08631' label="No" 
                                                value="no" labelStyle={{ color: '#fff' }} />
                                        </View>
                                    </View>
                                </RadioButton.Group>

                                <Text style={styles.labels}>Cual(es) ejercicio(s) practicas y con que frecuencia semanal?</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1}}>
                                        <TextInput style={styles.formSignupInputs} />
                                    </View>
                                    <View style={{flex: 1}}>
                                        <TextInput style={styles.formSignupInputs} />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1}}>
                                        <TextInput style={styles.formSignupInputs} />
                                    </View>
                                    <View style={{flex: 1}}>
                                        <TextInput style={styles.formSignupInputs} />
                                    </View>
                                </View>

                                <Text style={styles.labels}>Que carrera o metas tienes en un futuro, y que fecha tiene?</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1}}>
                                        <Text style={{color: '#fff', marginTop: 10, marginLeft: 15}}>Distancia</Text>
                                        <TextInput style={styles.formSignupInputs} />
                                    </View>
                                    <View style={{flex: 1}}>
                                        <Text style={{color: '#fff',  marginTop: 10, marginLeft: 15}}>Tiempo</Text>
                                        <TextInput style={styles.formSignupInputs} />
                                    </View>
                                    <View style={{flex: 1}}>
                                        <Text style={{color: '#fff',  marginTop: 10, marginLeft: 15}}>Fecha</Text>
                                        <TextInput style={styles.formSignupInputs} />
                                    </View>
                                </View>

                                <Text style={styles.labels}>Cuentas con smartwatch?</Text>
                                <RadioButton.Group  value={checked} onValueChange={handleChecked} style={{flexDirection: 'row'}}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: '27%'}}>
                                            <RadioButton.Item color='#E08631' 
                                                value="si" label="Si" labelStyle={{ color: '#fff'}} />
                                        </View>
                                        <View style={{width: '27%'}}>
                                            <RadioButton.Item color='#E08631' label="No" 
                                                value="no" labelStyle={{ color: '#fff' }} />
                                        </View>
                                    </View>
                                </RadioButton.Group>

                                <Text style={styles.labels}>Que marca?</Text>
                                <RadioButton.Group  value={checked} onValueChange={handleChecked}>
                                    <View >
                                        <View style={{ width: '45%'}}>
                                            <RadioButton.Item color='#E08631' 
                                                value="garmin" label="Garmin" labelStyle={{ color: '#fff'}} />
                                        </View>
                                        <View style={{width: '45%'}}>
                                            <RadioButton.Item color='#E08631' label="Apple watch" 
                                                value="apple_watch" labelStyle={{ color: '#fff' }} />
                                        </View>
                                        <View style={{ width: '45%'}}>
                                            <RadioButton.Item color='#E08631' 
                                                value="coros" label="Coros" labelStyle={{ color: '#fff'}} />
                                        </View>
                                        <View style={{width: '45%'}}>
                                            <RadioButton.Item color='#E08631' label="Otro" 
                                                value="otro" labelStyle={{ color: '#fff' }} />
                                        </View>
                                        <TextInput placeholderTextColor={'#8D8D8D'} style={styles.formSignupInputs} placeholder='Otro' />
                                    </View>
                                </RadioButton.Group>

                                <Text style={styles.labels}>Algun comentario que debamos saber? (Salud, lesiones, operaciones recientes, etc)</Text>
                                <TextInput placeholderTextColor={'#8D8D8D'} style={styles.formSignupInputs} multiline={true} 
                                    numberOfLines={6} />
                                <TouchableOpacity style={styles.nextButton} onPress={()=> navigation.navigate('ConectionScreen')}>
                                    <Text style={styles.textButton}>Siguiente</Text>
                                </TouchableOpacity>
                            </View>

                    <ImageBackground style={{ width: 180, height: 200, alignSelf: 'flex-start', zIndex:-1, position: 'absolute', bottom: 0 }} 
                        source={ require('../../../assets/manchasBottom.png') } />
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default SignupNextScreen

const styles = StyleSheet.create({
    form: {
      height: 'auto',
      paddingLeft: 10,
      paddingRight: 10,
      flex: 1,
      paddingTop: '25%'
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

    sliders: {
        marginTop: 10,
        height: 5,
        marginLeft: '4%',
        marginRight: '4%',
    },

    nextButton: {
        backgroundColor: '#E08631',
        padding: 9,
        width: 'auto',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: 20
    },

    textButton: {
        textAlign: 'center', 
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        textTransform: 'uppercase'
    }
});