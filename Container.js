import { NavigationContainer, useNavigation } from '@react-navigation/native'
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
import { useEffect } from 'react';
import { Image } from 'react-native'
const Stack = createNativeStackNavigator();
export default function () {
  const dispatch = useDispatch()
  const { user_token } = useSelector((state) => state.main)
  const { onboardingStatus } = useSelector((state) => state.session)
  console.log('onboardingStatus', onboardingStatus)

  return (
    <NavigationContainer>
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
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerTransparent: false, headerStyle: { backgroundColor: '#000' }, statusBarColor: '#000' }} />
        <Stack.Screen name="ConectionScreen" component={ConectionScreen} options={{ headerTransparent: false, headerStyle: { backgroundColor: '#000' }, statusBarColor: '#000' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}