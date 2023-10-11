import axios from 'axios';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto-js';
import * as Linking from 'expo-linking';
import { useNavigation } from '@react-navigation/native';
import React, {  useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';






export const useUsosAuth = () => {
    const navigation = useNavigation();

    const parseQueryParams = (query) => {
        const keyValuePairs = query.split('&');
        const params = {};
    
        keyValuePairs.forEach(pair => {
            const [key, value] = pair.split('=');
            params[key] = decodeURIComponent(value || '');
        });
    
        return params;
    }

    useEffect(() => {
        const handleOpenURL = (event) => {
            const { path, queryParams } = Linking.parse(event.url);
            var cos = path;
            console.log(cos);
            if(path === 'oauth-callback')
            {
                navigation.navigate('Tokens', {
                    oauthToken: queryParams.oauth_token,
                    oauthTokenSecret: queryParams.oauth_token_secret
                });
            }
            
        };

                // Obsłuż URL, który uruchomił aplikację
            Linking.getInitialURL().then(url => {
                if (url) {
                    handleOpenURL({ url });
                }
            });

            // Dodaj nasłuchiwacz na zmiany URL
            Linking.addEventListener('url', handleOpenURL);

            return () => {
                Linking.removeEventListener('url', handleOpenURL);
            };
}, [navigation]);

    // Tworzenie instancji OAuth
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
        url: 'https://apps.usos.pw.edu.pl/services/oauth/request_token',
        method: 'POST',
        data: { oauth_callback: Linking.makeUrl('/oauth-callback') },
    };

    const initiateAuthorization = () => {
        axios({
            url: request_data.url,
            method: request_data.method,
            headers: oauth.toHeader(oauth.authorize(request_data)),
        })
        .then(response => {
            const data = parseQueryParams(response.data);
            const oauthToken = data.oauth_token;
            const oauthTokenSecret = data.oauth_token_secret;
            AsyncStorage.setItem('USOS_TOKEN', oauthToken);
            AsyncStorage.setItem('USOS_SECRET', oauthTokenSecret);
            
            console.log('Otrzymany request token:', oauthToken);
            console.log('Otrzymany request token secret:', oauthTokenSecret);
            
            const authorizationUrl = `https://apps.usos.pw.edu.pl/services/oauth/authorize?oauth_token=${oauthToken}&scope=offline_access&oauth_callback=${encodeURIComponent(Linking.makeUrl('/oauth-callback'))}`;
            Linking.openURL(authorizationUrl); // Otwórz URL autoryzacji w przeglądarce
        })
        .catch(error => {
            console.error('Błąd podczas uzyskiwania request token:', error);
        });
    };

    return {
        initiateAuthorization
    };
};
