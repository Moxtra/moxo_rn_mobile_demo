/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
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
import * as moxo from '@moxtradeveloper/react-native-moxo-module';
import { DOMAIN, CLIENT_ID, CLIENT_SECRET, ORG_ID, EMAIL, UNIQUE_ID } from '@env'

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoading, setIsLoading] = useState(false);
  const [isMoxoLogined, setIsMoxoLogined] = useState(false);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const moxoLogin = async () => {
    if (isMoxoLogined === true) {
      console.log('Moxo is already logined');
      moxo.showMEPWindow();
      return;
    }
    // Setup domain
    moxo.setup(DOMAIN)
    // Get access token
    setIsLoading(true)
    var payload = {
      'client_id': CLIENT_ID,
      'client_secret': CLIENT_SECRET,
      'org_id': ORG_ID,
    }
    if (UNIQUE_ID !== undefined) {
      Object.assign(payload, {'unique_id': UNIQUE_ID})
    } else {
      Object.assign(payload, {'email': EMAIL})
    }
    const response = await fetch('https://' + DOMAIN + '/v1/core/oauth/token', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
     },
      body: JSON.stringify(payload)
    })
    const json = await response.json();
    const token = json.access_token

    //Login and show moxo engagement platform window
    moxo.link(token).then((result: boolean)=>{
      setIsLoading(false);
      if (result)
        setIsMoxoLogined(true);
        moxo.showMEPWindow();
      }).catch(((err: any)=>{
        setIsLoading(false);
        console.log(`Link failed!:${err}`);
      }))
  }

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
            styles.title,
            {
            color: isDarkMode ? Colors.white : Colors.black,
            },
        ]}>
        Welcome to
        {'\n'}
        Moxo!
        </Text>
        <Text
        style={[
            styles.subTitle,
            {
            color: isDarkMode ? Colors.white : Colors.black,
            },
        ]}>
        Click icon at bottom right to login
        </Text>
        <FAB 
        loading={isLoading}
        color={Colors.branding}
        style={styles.fab}
        onPress={moxoLogin}>
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
  title: {
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 30,
    fontWeight: '500',
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
