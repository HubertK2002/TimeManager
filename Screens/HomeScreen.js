import React from 'react';
import { View, Text, Button } from 'react-native';
import { useUsosAuth  } from '../OAuth/usosAuth';
import axios from 'axios';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto-js';
import { handleAccessTokenRequest } from '../OAuth/usos_acces_token';

function HomeScreen({ navigation }) {
  const { initiateAuthorization } = useUsosAuth();
  const { access_tok } = handleAccessTokenRequest();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Dodaj aktywność"
        onPress={() => navigation.navigate('Details')}
      />
       <Button
        title="Pokaż aktywności"
        onPress={() => navigation.navigate('WeekActivities')}
      />
        <Button
        title="Rozpocznij Autoryzację w USOS"
        onPress={initiateAuthorization} // Tutaj używamy naszej funkcji
      />
      <Button
        title="Access Token"
         // Tutaj używamy naszej funkcji
         onPress={access_tok}
      />
       <Button
        title="Kalendarz"
        onPress={CalendarData} // Tutaj używamy naszej funkcji
      />
      <Button
        title="TestView"
        onPress={() => navigation.navigate('RequestScreen')} // Tutaj używamy naszej funkcji
      />
    </View>
  );
}

function CalendarData() { 
  const oauth = OAuth({
    consumer: {
        key: 'UmZNUsQgxVPx2sLvsXHz',
        secret: 'A2EWyBSTMjQyYDv6mHsfjnZTF4b5579c9BXKTaED',
    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
        return crypto.enc.Base64.stringify(crypto.HmacSHA1(base_string, key));
    },
});
const request_data = {
  url: "https://usosapps.uw.edu.pl/services/tt/user",
  method: 'GET',
  data: {
      oauth_token: "yH4ucmHbFG2zfbYA4APa"
  }
};

const authHeader = oauth.toHeader(oauth.authorize(request_data));

axios.get(request_data.url, { headers: authHeader })
  .then(response => {
      console.log(response.data);
  })
  .catch(error => {
      console.error("Wystąpił błąd:", error);
  });
}

export default HomeScreen;
