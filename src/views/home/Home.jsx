import React, { useEffect, useState, Fragment } from 'react'
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, ImageBackground, Text, View 
    ,StyleSheet, Image, TouchableOpacity, RefreshControl,  NativeEventEmitter, NativeModules } from 'react-native'
import CircleSvg from '../../../assets/circle.svg'
import CheckSvg from '../../../assets/check.svg'
import XmarkSvg from '../../../assets/xmark.svg'
import ChvronLeftSvg from '../../../assets/chevron-left.svg'
import ChvronRightSvg from '../../../assets/chevron-right.svg'
import { CommonActions } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { useFetchRunnersMutation } from "../../features/reducers/users"
import { useCreateWorkoutMutation } from '../../features/reducers/workouts'
import AppleHealthKit, { HealthInputOptions, HealthKitPermissions } from 'react-native-health'

// GARMIN
import { Decoder, Stream, Profile, Utils } from '@garmin-fit/sdk';

// const bytes = [0x0E, 0x10, 0xD9, 0x07, 0x00, 0x00, 0x00, 0x00, 0x2E, 0x46, 0x49, 0x54, 0x91, 0x33, 0x00, 0x00];

// const stream = Stream.fromByteArray(bytes);

// HEALTH PERMISSIONS
const permissions = {
    permissions: {
      read: [AppleHealthKit.Constants.Permissions.Steps, 
            AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
            AppleHealthKit.Constants.Permissions.Workout,
            AppleHealthKit.Constants.Permissions.WorkoutRoute,
        ],
      write: [AppleHealthKit.Constants.Permissions.Workout]
    }
}
// ==================
function HomeScreen(){
    // HEALTH PERMISSIONS
    const [hasPermissions, setHasPermission ] = useState(false)

    const [idWorkout, setIdWorkout] = useState('')
    const [workoutData, setWorkoutData] = useState('')

    const actualizarIdWorkout = (result) => {
        setIdWorkout(result)
        console.log('\nID: ', idWorkout)
    }

    const actualizadWorkoutData = (result) => {
        setWorkoutData(result)
        console.log('\nData: ', workoutData)
    }
    

    useEffect( ()=>{
        AppleHealthKit.initHealthKit(permissions, (err, result) =>{
            if (err) {
                console.log('Error al obtener permisos')
                return
            }
            setHasPermission(true)
            console.log('Permisos para Health:', result)
        })

    }, [])

    

    useEffect(() => {
        if (!hasPermissions) {
            return
        }

        console.log('UseEffect')

        new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
            "healthKit:Running:new",
            async () => {
                AppleHealthKit.getSamples(optionsSample2 = {
                    startDate: new Date(2023, 0, 0).toISOString(),
                    endDate: new Date().toISOString(),
                    type: 'Running',
                  }, (err, result) => {
                    if (err) {
                        console.log('Error al obtener sou')
                        return
                    }

                    // if (result)  
                    //     console.log('\nRutas de entrenamiento correr: ', Object.keys(result))
                })
            }
        )

        // new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
        //     "healthKit:Walking:new",
        //     async () => {
        //         AppleHealthKit.getSamples(optionsSample2 = {
        //             startDate: new Date(2023, 0, 0).toISOString(),
        //             endDate: new Date().toISOString(),
        //             type: 'Walking',
        //           }, (err, result) => {
        //             if (err) {
        //                 console.log('Error al obtener sou')
        //                 return
        //             }
        //             console.log('\nRutas de entrenamiento caminar: ', result)
        //         })
        //     }
        // )

        const options = {
            date: new Date(2023,5,22).toISOString(),
            includeManuallyAdded: false
        }

        let optionsWorkout = {
            type: 'Running', // See HealthActivity Enum
            startDate: new Date(2023, 5, 23).toISOString(),
            endDate: new Date(2023, 5, 25).toISOString(),
            energyBurned: 50, // In Energy burned unit,
            energyBurnedUnit: 'calorie', 
            distance: 170, // In Distance unit
            distanceUnit: 'meter',
            averageRate: 10
        }
        

        AppleHealthKit.getStepCount(options, (err, result) => {
            if (err) {
                console.log('Error al obtener los pasos')
                return
            }
            console.log('\nActividad de pasos: ', result)
        })

        AppleHealthKit.getDistanceWalkingRunning(options, (err, result) => {
            if (err) {
                console.log('Error al obtener actividad')
                return
            }
            console.log('\nDistancia recorrida: ', result)
        })

        AppleHealthKit.getAnchoredWorkouts(options, (err, result) => {
            if (err) {
                console.log('Error al obtener actividad')
                return
            }
            //console.log('\nEntrenamiento: ', result)
        })

        // AppleHealthKit.saveWorkout(optionsWorkout, (err, result) => {
        //     if (err) {
        //         console.log('Error al guardar entrenamiento')
        //         return
        //     }
            
        //     actualizarIdWorkout(result)
        //     console.log('\nEntrenamiento guardado: ', result)
            
        // })

        AppleHealthKit.getSamples(optionsSample = {
            startDate: new Date(2023, 5, 0).toISOString(),
            endDate: new Date().toISOString(),
            type: ['Running'],
          }, (err, result) => {
            if (err) {
                console.log('Error al obtener sou')
                return
            }
            console.log('\nCarrera: ', result[result.length-1])
            actualizarIdWorkout(result[result.length-1].id)

            var optionsroute = { 
                id: idWorkout,
                //id: 'D796C686-5208-47F8-AE6E-3FD4E5618D8A',
            }

            AppleHealthKit.getWorkoutRouteSamples( optionsroute, (err, results) => {
                if (err) {
                    console.log('Error al obtener la ruta')
                    actualizadWorkoutData(results)
                    return
                }
                console.log('Ruta: ',results.data)
                actualizadWorkoutData(results.data)
              },
            )
        })

        


    }, [hasPermissions])
    // ==================

    const { user } = useSelector((state) => state.session)
    const { runners } = useSelector((state) => state.users)

    console.log('id usuario:', user.id)

    //console.log('Refresh runners: ', runners)

    const [fetchRunners, { isLoading: loadingRunners }] = useFetchRunnersMutation()
    const [ createWorkout] = useCreateWorkoutMutation()

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
                                
                                createWorkout({"id_usuarios":user.id, "uuid":idWorkout, "workout_data":workoutData})
                                // async function postData(url = "", data = {}) {
                                //     // Default options are marked with *
                                //     const response = await fetch(url, {
                                //       method: "POST", // *GET, POST, PUT, DELETE, etc.
                                //       mode: "no-cors", // no-cors, *cors, same-origin
                                //       cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                                //       credentials: "same-origin", // include, *same-origin, omit
                                //       headers: {
                                //         //"Content-Type": "application/json",
                                //          'Content-Type': 'application/x-www-form-urlencoded',
                                //       },
                                //       redirect: "follow", // manual, *follow, error
                                //       referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                                //       body: JSON.stringify(data), // body data type must match "Content-Type" header
                                //     });
                                //     return response.text(); // parses JSON response into native JavaScript objects
                                //   }
                                //   postData("https://muungano.mx/v1/test", { answer: 42 }).then((data) => {
                                //         console.log(data); // JSON data parsed by `data.json()` call
                                //         });
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
                                    style={{ width: '100%', height: '104%', position: 'absolute' }} 
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