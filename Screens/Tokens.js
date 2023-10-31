// tokens.js
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function TokensScreen({ route }) {
//AsyncStorage.setItem('USOS_TOKEN', route.params.oauthToken);
//AsyncStorage.setItem('USOS_SECRET', route.params.oauthTokenSecret);
const [token, setToken] = useState(null);
const [secret, setSecret] = useState(null);

useEffect(() => {
    const fetchTokens = async () => {
      const storedToken = await AsyncStorage.getItem('USOS_TOKEN');
      const storedSecret = await AsyncStorage.getItem('USOS_SECRET');

      setToken(storedToken);
      setSecret(storedSecret);
    };

    fetchTokens();
  }, []);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Oauth Token: {route.params.oauthToken}</Text>
      <Text>Oauth Token Secret:</Text>
      <Text> {secret}</Text>
    </View>
  );
}

export default TokensScreen;