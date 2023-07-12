import { NavigationContainer, useNavigation, CommonActions, useNavigationContainerRef } from '@react-navigation/native'
import WelcomeScreen from './src/views/welcome/Welcome'
import LoginScreen from './src/views/login/Login'
import SignupScreen from './src/views/signup/Signup'
import SignupNextScreen from './src/views/signup/SignupNext'
import HomeScreen from './src/views/home/Home';
import ConectionScreen from './src/views/conection/Conection';
import { useDispatch, useSelector } from 'react-redux';
import { setOnboardingStatus, useDeauthenticateMutation } from './src/features/reducers/session';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { Image } from 'react-native-svg';
import { useEffect, useRef } from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native'
import Out from './assets/out.svg'

const Stack = createNativeStackNavigator();
export default function () {
  const navigation = useNavigationContainerRef()
  const dispatch = useDispatch()
  const { user_token } = useSelector((state) => state.main)
  const { user, onboardingStatus } = useSelector((state) => state.session)

  const [deauthenticate] = useDeauthenticateMutation()
  console.log('onboardingStatus', onboardingStatus)

  return (
    <NavigationContainer ref={navigation}>
      <Stack.Navigator
        initialRouteName={
          user_token
            ? 'HomeScreen'
            : onboardingStatus
              ? 'LoginScreen'
              : 'WelcomeScreen'
        }
        headerMode="none"
        screenOptions={{
          headerTitle: () => <Image source={require('./assets/logo-white.png')} style={{ width: 165, height: 27, marginTop: 10 }} />,
          headerBackTitle: '',
          headerTintColor: '#fff',
          headerTransparent: true,
          headerTitleAlign: 'center'
        }}
      >
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerTransparent: false, headerStyle: { backgroundColor: '#000' }, statusBarColor: '#000' }} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerTransparent: false, headerStyle: { backgroundColor: '#000' }, statusBarColor: '#000' }} />
        <Stack.Screen name="SignupNextScreen" component={SignupNextScreen} options={{ headerTransparent: false, headerStyle: { backgroundColor: '#000' }, statusBarColor: '#000' }} />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerRight: () => (
              <TouchableOpacity
                style={{ position: 'absolute', top: -10, right: 10 }}
                onPress={() => {
                  deauthenticate({ user_id: user.id })
                    .then((response) => {
                      console.log('response', response)
                      if (response.data.success === true) {
                        navigation.dispatch(
                          CommonActions.reset({
                            index: 0,
                            routes: [{ name: "LoginScreen" }],
                          })
                        )
                      }
                    })
                }}>
                <Out width={22} height={22} fill={'#FFF'} />
              </TouchableOpacity>
            ),
            headerTransparent: false,
            headerStyle: {
              backgroundColor: '#000'
            },
            statusBarColor: '#000'
          }}
        />
        <Stack.Screen name="ConectionScreen" component={ConectionScreen} options={{ headerTransparent: false, headerStyle: { backgroundColor: '#000' }, statusBarColor: '#000' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}