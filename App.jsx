import { Colors } from 'react-native/Libraries/NewAppScreen'
import { SafeAreaView, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/features/store'
import Container from './Container'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView></SafeAreaView>
        <StatusBar barStyle={'light-content'} backgroundColor={Colors.darker} animated={true} />
        <Container />
      </PersistGate>
    </Provider>
  )
}

export default App;
