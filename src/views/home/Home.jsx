import React, { useEffect, useState, Fragment } from 'react'
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, ImageBackground, Text, View 
    ,StyleSheet, Image, TouchableOpacity, RefreshControl } from 'react-native'
import CircleSvg from '../../../assets/circle.svg'
import CheckSvg from '../../../assets/check.svg'
import XmarkSvg from '../../../assets/xmark.svg'
import ChvronLeftSvg from '../../../assets/chevron-left.svg'
import ChvronRightSvg from '../../../assets/chevron-right.svg'
import { CommonActions } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { useFetchRunnersMutation } from "../../features/reducers/users";

function HomeScreen(){
    const { user } = useSelector((state) => state.session)
    const { runners } = useSelector((state) => state.users)
    // console.log(user?.nombre)
    console.log('Refresh runners: ', runners)

    //const data = ['5 abril 2023', '2 abril 2023', '1 abril 2023']

    const [fetchRunners, { isLoading: loadingRunners }] = useFetchRunnersMutation()

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#000'}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={loadingRunners} 
                            onRefresh={()=>{
                                fetchRunners()
                            }}>
                        </RefreshControl>
                    }>
                    <ImageBackground source={ require('../../../assets/manchasTop.png') } 
                            style={{ width: 180, height: 200, alignSelf: 'flex-end', flex: 1, position: 'absolute'  }} />


                        <View style={styles.form}>
                            <Text style={{color: '#E08631'}}>Hola, {user?.nombre}</Text>
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
                                    <View style={{ flex: 1, alignItems: 'center'}}><Text style={{color: '#fff', fontSize: 10}}>39.3</Text></View>
                                </View>
                            </View>

                            <Text style={styles.titles}>{'\nEventos'}</Text>
                            <View style={styles.cardEvent}>
                                <ImageBackground
                                    style={{ width: '100%', height: '100%', position: 'absolute' }} 
                                    source={ require('../../../assets/event.png') }
                                    borderRadius={5}
                                />
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
                            {
                                !runners
                                ? null
                                : runners.map((r,index) => {
                                    return (
                                        <Fragment key={`activity_${index}`}>
                                            <Text style={{color: '#E08631', marginTop: 20, marginLeft: 20}}>Corredor: {r.nombre}</Text>
                                            <View style={styles.card}>
                                                <View style={{alignItems: 'flex-end'}}><Text style={styles.labelsCard}>{r.fecha}</Text></View>
                                                <Text style={{color: '#E08631', fontSize: 19, fontWeight: 'bold', marginLeft: '2%', marginBottom:16}}>{r.actividad}</Text>
                                                <View style={{ flexDirection: 'row', height: '20%' }}>
                                                    <View style={{ flex: 1, alignItems: 'center'}}><Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12}}>{r.tiempo} </Text></View>
                                                    {
                                                        !r.distancia
                                                        ? null
                                                        : <View style={{ flex: 1, alignItems: 'center'}}><Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12}}>{r.distancia} <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 8}}>km</Text></Text></View>
                                                    }
                                                    <View style={{ flex: 1, alignItems: 'center'}}><Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12}}>{r.ritmo_prom} <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 8}}>m/km</Text></Text></View>
                                                    <View style={{ flex: 1, alignItems: 'center'}}><Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12}}>{r.heart_rate} <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 8}}>bpm</Text></Text></View>
                                                    {
                                                        !r.score
                                                        ? null
                                                        : <View style={{ flex: 0.6, alignItems: 'center'}}><Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12}}>{r.score}%</Text></View>
                                                    }
                                                </View>
                                                <View style={{ flexDirection: 'row', height: '20%' }}>
                                                    <View style={{ flex: 1, alignItems: 'center'}}><Text style={styles.labelsCard}>Tiempo</Text></View>
                                                    {
                                                        !r.distance
                                                        ? null
                                                        : <View style={{ flex: 1, alignItems: 'center'}}><Text style={styles.labelsCard}>Distancia</Text></View>
                                                    }
                                                    <View style={{ flex: 1, alignItems: 'center'}}><Text style={styles.labelsCard}>Ritmo prom</Text></View>
                                                    <View style={{ flex: 1, alignItems: 'center'}}><Text style={styles.labelsCard}>Heart Rate</Text></View>
                                                    {
                                                        !r.score
                                                        ? null
                                                        : <View style={{ flex: 0.6, alignItems: 'center'}}><Text style={styles.labelsCard}>Score</Text></View>
                                                    }
                                                </View>
                                            </View>
                                        </Fragment>
                                    )
                                })
                            }
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
      paddingTop: '10%',
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