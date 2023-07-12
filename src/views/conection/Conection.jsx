import React from 'react'
import OAuth from 'oauth-1.0a'
import { enc, HmacSHA1 } from 'crypto-js';
import { WebView } from 'react-native-webview';


import { View, TouchableWithoutFeedback, TouchableOpacity, Text, KeyboardAvoidingView, 
    Platform, ImageBackground, StyleSheet, Keyboard, ScrollView, TextInput, Image } from 'react-native'

function ConectionScreen(){

    //const { oauthTokens } = useSelector((state) => state.users)

    const getToken = async () => {
        
        const url = 'https://muungano.mx/v1/garmin_connect'

        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.data);
                console.log(data.data.substring(12, 48));
                const oauth_token = data.data.substring(12, 48).toString()
                return (
                    <WebView
                      source={{ uri: 'https://connect.garmin.com/oauthConfirm?oauth_token='+oauth_token+'&oauth_callback=https://ai.uxlabs.mx/api/muungano' }}
                    />
                );
                //oauth_token=cd0feabf-b4e8-45ea-b76b-1da17c2f6a75&oauth_token_secret=TE5pE6gvZcQPC37Tu2ydbQqXfp1v5D9HdKx
            })
            .catch(error => {
                console.log(error);
        });

    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#000'}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={{flexGrow: 1  }}>
                    <ImageBackground source={ require('../../../assets/manchasTop.png') } 
                            style={{ width: 180, height: 200, alignSelf: 'flex-end', flex: 1, position: 'absolute'  }} />


                        <View style={{flex: 1, justifyContent: 'center', paddingLeft: 20, paddingRight: 20, marginTop: 80}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{flex: 1, alignItems: 'flex-end'}}>
                                    <View style={{alignSelf: 'center'}}>
                                        <Image source={require('../../../assets/strava.png')} style={{width:60, height:60, position: 'absolute', top: -40, left: -30}} />
                                        <Image source={require('../../../assets/garmin.png')} style={{width:60, height:60, position: 'absolute'}} />
                                    </View>
                                </View>
                                <View style={{flex: 1, alignItems: 'center'}}>
                                    <Image source={require('../../../assets/conection.png')} style={{width:50, height:45}} />
                                </View>
                                <View style={{flex: 1,  alignItems: 'center'}}>
                                    <Image source={require('../../../assets/muungano.png')} style={{width:82, height:82}} />
                                </View>
                            </View>

                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 100, marginBottom: 50}}>
                                <Text style={{color: '#fff', textAlign: 'center'}}>Tus actividades se mostrarán automáticamente en Muungano app una vez que sincronices ambas aplicaciones. De esta forma podrás ver tus progresos. Además, las carreras y viajes registrados se integrarán en las estadísticas diarias de Muungano app.</Text>
                            </View>
                            
                            
                            <TouchableOpacity style={styles.Button} onPress={()=> navigation.navigate('ConectionScreen')}>
                                <Text style={styles.textButton}>Conecta tu cuenta nueva de Strava</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.Button} onPress={ getToken }>
                                <Text style={styles.textButton}>Conecta tu cuenta nueva de Garmin</Text>
                            </TouchableOpacity>
                        </View>    


                    <ImageBackground style={{ width: 180, height: 200, alignSelf: 'flex-start', zIndex:-1, position: 'absolute', bottom: 0 }} 
                        source={ require('../../../assets/manchasBottom.png') } />
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default ConectionScreen

const styles = StyleSheet.create({

    Button: {
        backgroundColor: '#E08631',
        padding: 9,
        width: '100%',
        maxWidth: 400,
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 15,
    },

    textButton: {
        textAlign: 'center', 
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
  });