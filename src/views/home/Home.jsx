import React, { useEffect } from 'react'
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, ImageBackground, Text, View 
    ,StyleSheet, Image, TouchableOpacity } from 'react-native'
import CircleSvg from '../../../assets/circle.svg'
import CheckSvg from '../../../assets/check.svg'
import XmarkSvg from '../../../assets/xmark.svg'
import ChvronLeftSvg from '../../../assets/chevron-left.svg'
import ChvronRightSvg from '../../../assets/chevron-right.svg'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

function HomeScreen(){
    const navigation = useNavigation()
    const { user } = useSelector((state) => state.session)
    console.log(user.nombre)


    const data = ['5 abril 2023', '2 abril 2023', '1 abril 2023']

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#000'}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <ImageBackground source={ require('../../../assets/manchasTop.png') } 
                            style={{ width: 180, height: 200, alignSelf: 'flex-end', flex: 1, position: 'absolute'  }} />


                        <View style={styles.form}>
                            <Text style={{color: '#E08631'}}>Hola, {user.nombre}</Text>
                            <Text style={styles.titles}>Esta semana</Text>
                            {/* <SvgXml width={20} height={20} xml={ require('../../../assets/circle.svg')} fill='#ff0000'
                            onError={(e) => { console.log('onError', e) }}
                            onLoad={(e) => { console.log('onLoad', e) }}
                            /> */}

                            <View style={styles.card}>
                                <View style={{ flexDirection: 'row', height: '40%' }}>
                                    <View style={{ flex: 1, alignSelf: 'flex-start'}}><ChvronLeftSvg width={14} height={14} fill='#fff'></ChvronLeftSvg></View>
                                    <View style={{ flex: 1, alignItems: 'center'}}><Text style={{color: '#fff'}}>Junio 5 - 11</Text></View>
                                    <View style={{ flex: 1, alignItems: 'flex-end'}}><ChvronRightSvg width={14} height={14} fill='#fff'></ChvronRightSvg></View>
                                </View>
                                <View style={{ flexDirection: 'row', height: '20%' }}>
                                    <View style={{ flex: 1, alignItems: 'center'}}><Text style={styles.labelsCard}>Lun</Text></View>
                                    <View style={{ flex: 1, alignItems: 'center'}}><Text style={styles.labelsCard}>Mar</Text></View>
                                    <View style={{ flex: 1, alignItems: 'center'}}><Text style={styles.labelsCard}>Mier</Text></View>
                                    <View style={{ flex: 1, alignItems: 'center'}}><Text style={styles.labelsCard}>Jue</Text></View>
                                    <View style={{ flex: 1, alignItems: 'center'}}><Text style={styles.labelsCard}>Vie</Text></View>
                                    <View style={{ flex: 1, alignItems: 'center'}}><Text style={styles.labelsCard}>Sab</Text></View>
                                    <View style={{ flex: 1, alignItems: 'center'}}><Text style={styles.labelsCard}>Dom</Text></View>
                                    <View style={{ flex: 1, alignItems: 'center'}}><Text style={styles.labelsCard}>Tot</Text></View>
                                </View>
                                <View style={{ flexDirection: 'row', height: '20%'}}>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                        <CheckSvg width={14} height={14} fill='#747474'></CheckSvg>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                        <CheckSvg width={14} height={14} fill='#fff'></CheckSvg>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                        <CheckSvg width={14} height={14} fill='#E08631'></CheckSvg>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                        <XmarkSvg width={17} height={17} fill='#D94343'></XmarkSvg>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                        <CircleSvg width={14} height={14} fill='#fff'></CircleSvg>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                        <CircleSvg width={14} height={14} fill='#DD9B32'></CircleSvg>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                        <CircleSvg width={14} height={14} fill='#747474'></CircleSvg>
                                    </View>
                                    <View style={{ flex: 1}}></View>
                                </View>
                                <View style={{ flexDirection: 'row', height: '20%' }}>
                                    <View style={{ flex: 1, alignItems: 'center'}}><Text style={styles.labelsCard}>23</Text></View>
                                    <View style={{ flex: 1, alignItems: 'center'}}><Text style={styles.labelsCard}>24</Text></View>
                                    <View style={{ flex: 1, alignItems: 'center'}}><Text style={styles.labelsCard}>25</Text></View>
                                    <View style={{ flex: 1, alignItems: 'center'}}><Text style={styles.labelsCard}>23</Text></View>
                                    <View style={{ flex: 1, alignItems: 'center'}}><Text style={styles.labelsCard}>24</Text></View>
                                    <View style={{ flex: 1, alignItems: 'center'}}><Text style={styles.labelsCard}>26</Text></View>
                                    <View style={{ flex: 1, alignItems: 'center'}}><Text style={styles.labelsCard}>24</Text></View>
                                    <View style={{ flex: 1, alignItems: 'center'}}><Text style={{color: '#fff'}}>39.3</Text></View>
                                </View>
                            </View>

                            <Text style={styles.titles}>{'\nEventos'}</Text>
                            <View style={styles.cardEvent}>
                                <ImageBackground style={{ width: '100%', height: '100%', position: 'absolute' }} 
                        source={ require('../../../assets/event.png') } borderRadius={5} />
                                <Image style={{position: 'absolute', right: 0, height: '110%'}} source={ require('../../../assets/rectanguloRight.png') } />
                                <View style={{flex: 1}}></View>
                                <View style={{flex: 1, paddingTop: 10, paddingBottom: 10}}>
                                    <View style={{flex: 1, justifyContent: 'center', paddingBottom: 15}}>
                                        <Text style={{alignSelf: 'center', color: '#fff', fontSize: 18,
                                                    fontWeight: 900, textTransform: 'uppercase'}}>Chicago</Text>
                                        <Text style={{alignSelf: 'center', color: '#fff', fontSize: 18,
                                                    fontWeight: 900, textTransform: 'uppercase'}}>marathon</Text>
                                    </View>

                                    <View style={{flex: 1}}>
                                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                                            <View style={{flex: 1}}>
                                                <Text style={{alignSelf: 'center', color: '#fff', fontSize: 26,
                                                    fontWeight: 'bold', textTransform: 'uppercase'}}>05</Text>
                                                <Text style={{alignSelf: 'center',color: '#fff'}}>Días</Text>
                                            </View>
                                            <View style={{flex: 1}}>
                                                <Text style={{alignSelf: 'center', color: '#fff', fontSize: 26,
                                                    fontWeight: 'bold', textTransform: 'uppercase'}}>13</Text>
                                                <Text style={{alignSelf: 'center',color: '#fff'}}>Horas</Text>
                                            </View>
                                        </View>
                                        <View style={{flexDirection: 'row'}}>
                                            <View style={{flex: 1}}>
                                                <Text style={{alignSelf: 'center', color: '#fff', fontSize: 26,
                                                    fontWeight: 'bold', textTransform: 'uppercase'}}>18</Text>
                                                <Text style={{alignSelf: 'center',color: '#fff'}}>Minutos</Text>
                                            </View>
                                            <View style={{flex: 1}}>
                                                <Text style={{alignSelf: 'center', color: '#fff', fontSize: 26,
                                                    fontWeight: 'bold', textTransform: 'uppercase'}}>35</Text>
                                                <Text style={{alignSelf: 'center',color: '#fff'}}>Segundos</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                
                            </View>

                            <Text style={styles.titles}>{'\n Historial de actividad'}</Text>
                            {/* {data.map((item, index) => (
                                <View style={styles.card} key={index}> */}
                                <View style={styles.card}>
                                    <View style={{alignItems: 'flex-end'}}><Text style={styles.labelsCard}>5 abril 2023</Text></View>
                                    <Text style={{color: '#E08631', fontSize: 19, fontWeight: 'bold', marginLeft: '2%', marginBottom:16}}>Quality session</Text>
                                    <View style={{ flexDirection: 'row', height: '20%' }}>
                                        <View style={{ flex: 1, alignItems: 'center'}}><Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12}}>00:50:03</Text></View>
                                        <View style={{ flex: 1, alignItems: 'center'}}><Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12}}>9.23 <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 8}}>km</Text></Text></View>
                                        <View style={{ flex: 1, alignItems: 'center'}}><Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12}}>5:45 <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 8}}>m/km</Text></Text></View>
                                        <View style={{ flex: 1, alignItems: 'center'}}><Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12}}>167 <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 8}}>bpm</Text></Text></View>
                                        <View style={{ flex: 0.6, alignItems: 'center'}}><Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12}}>95%</Text></View>
                                    </View>
                                    <View style={{ flexDirection: 'row', height: '20%' }}>
                                        <View style={{ flex: 1, alignItems: 'center'}}><Text style={styles.labelsCard}>Tiempo</Text></View>
                                        <View style={{ flex: 1, alignItems: 'center'}}><Text style={styles.labelsCard}>Distancia</Text></View>
                                        <View style={{ flex: 1, alignItems: 'center'}}><Text style={styles.labelsCard}>Ritmo prom</Text></View>
                                        <View style={{ flex: 1, alignItems: 'center'}}><Text style={styles.labelsCard}>Heart Rate</Text></View>
                                        <View style={{ flex: 0.6, alignItems: 'center'}}><Text style={styles.labelsCard}>Score</Text></View>
                                    </View>
                                </View>
                                <View style={styles.card}>
                                    <View style={{alignItems: 'flex-end'}}><Text style={styles.labelsCard}>4 abril 2023</Text></View>
                                    <Text style={{color: '#fff', fontSize: 19, fontWeight: 'bold', marginLeft: '2%', marginBottom:16}}>Easy run</Text>
                                    <View style={{ flexDirection: 'row', height: '20%' }}>
                                        <View style={{ flex: 1, alignItems: 'center'}}><Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12}}>00:50:08</Text></View>
                                        <View style={{ flex: 1, alignItems: 'center'}}><Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12}}>8.62 <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 8}}>km</Text></Text></View>
                                        <View style={{ flex: 1, alignItems: 'center'}}><Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12}}>5:59 <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 8}}>m/km</Text></Text></View>
                                        <View style={{ flex: 1, alignItems: 'center'}}><Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12}}>164 <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 8}}>bpm</Text></Text></View>
                                        <View style={{ flex: 0.6, alignItems: 'center'}}><Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12}}>98%</Text></View>
                                    </View>
                                    <View style={{ flexDirection: 'row', height: '20%' }}>
                                        <View style={{ flex: 1, alignItems: 'center'}}><Text style={styles.labelsCard}>Tiempo</Text></View>
                                        <View style={{ flex: 1, alignItems: 'center'}}><Text style={styles.labelsCard}>Distancia</Text></View>
                                        <View style={{ flex: 1, alignItems: 'center'}}><Text style={styles.labelsCard}>Ritmo prom</Text></View>
                                        <View style={{ flex: 1, alignItems: 'center'}}><Text style={styles.labelsCard}>Heart Rate</Text></View>
                                        <View style={{ flex: 0.6, alignItems: 'center'}}><Text style={styles.labelsCard}>Score</Text></View>
                                    </View>
                                </View>
                                <View style={styles.card}>
                                    <View style={{alignItems: 'flex-end'}}><Text style={styles.labelsCard}>3 abril 2023</Text></View>
                                    <Text style={{color: '#747474', fontSize: 19, fontWeight: 'bold', marginLeft: '2%', marginBottom:16}}>Cross training</Text>
                                    <View style={{ flexDirection: 'row', height: '20%' }}>
                                        <View style={{ flex: 1, alignItems: 'center'}}><Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12}}>00:31:04</Text></View>
                                        <View style={{ flex: 1, alignItems: 'center'}}><Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12}}>234</Text></View>
                                        <View style={{ flex: 1, alignItems: 'center'}}><Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12}}>173 <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 8}}>bpm</Text></Text></View>
                                    </View>
                                    <View style={{ flexDirection: 'row', height: '20%' }}>
                                        <View style={{ flex: 1, alignItems: 'center'}}><Text style={styles.labelsCard}>Tiempo</Text></View>
                                        <View style={{ flex: 1, alignItems: 'center'}}><Text style={styles.labelsCard}>Calorías</Text></View>
                                        <View style={{ flex: 1, alignItems: 'center'}}><Text style={styles.labelsCard}>Heart Rate</Text></View>
                                    </View>
                                </View>
                                {/* </View>
                            ))} */}
                            <View style={{marginBottom: 20}}></View>
                        </View>


                    <ImageBackground style={{ width: 180, height: 200, alignSelf: 'flex-start', zIndex:-1, position: 'absolute', bottom: 0 }} 
                        source={ require('../../../assets/manchasBottom.png') } />
                </ScrollView>
             </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    form: {
      height: 'auto',
      paddingLeft: 10,
      paddingRight: 10,
      flex: 1,
      paddingTop: '25%',
    },

    labels: {
        fontSize: 1,
        color: '#E08631',
        marginLeft: '4%'
    },

    titles: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: '4%',
    },

    card: {
        backgroundColor: '#292929',
        width: '90%',
        height: 120,
        marginTop: 20,
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
    },

    cardEvent: {
        backgroundColor: '#292929',
        width: '90%',
        height: 'auto',
        marginTop: 20,
        alignSelf: 'center',
        borderRadius: 5,
        flexDirection: 'row'
    },

    labelsCard: {
        fontSize: 10,
        color: '#8D8D8D',
    },
})