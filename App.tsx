/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { FAB, Image } from '@rneui/themed';
import Colors from './src/components/Colors';
import MoxoHeader from './src/components/MoxoHeader';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={{
      backgroundColor: isDarkMode ? Colors.black : Colors.white,
      flex:1,
    }}>
      <View style={{
      backgroundColor: isDarkMode ? Colors.black : Colors.white,
      flex:1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
        {/* <MoxoHeader/>
         */}
        <Text
        style={[
            styles.text,
            {
            color: isDarkMode ? Colors.white : Colors.black,
            },
        ]}>
        Welcome to
        {'\n'}
        Moxo!
        </Text>
        <FAB style={styles.fab}>
        <Image
            style={styles.icon}
            source={ require('./src/assets/logo.png') }
            containerStyle={styles.icon}> 
        </Image>
      </FAB>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right:30,
    bottom:60
  },
  icon: {
    position: 'absolute',
    width: 56,
    height: 56,
    flex:1
  }
});

export default App;
