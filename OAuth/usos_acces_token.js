import axios from 'axios';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto-js';
import * as Linking from 'expo-linking';
import { useNavigation } from '@react-navigation/native';
import React, {  useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleAccessTokenRequest = () => {
    console.log('hello');
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
                console.log('hejka');
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
                //Linking.removeEventListener('url', handleOpenURL);
            };
}, []);

    // Tworzenie instancji OAuth
    const oauth = OAuth({
        consumer: {
            key: 'JFvr37ZNurr7DQg8XBMs',
            secret: 'JfaNuxCDqU3aCY7vZYuDttU6xFTq2VUNc3EpfF2p',
        },
        signature_method: 'HMAC-SHA1',
        hash_function(base_string, key) {
            return crypto.enc.Base64.stringify(crypto.HmacSHA1(base_string, key));
        },
    });

    const request_data = {
        url: 'https://apps.usos.pw.edu.pl/services/oauth/access_token',
        method: 'POST',
        data: { oauth_callback: Linking.makeUrl('/oauth-callback') },
    };

    const access_tok = () => {
        
        axios({
            url: request_data.url,
            method: request_data.method,
            headers: oauth.toHeader(oauth.authorize(request_data)),
        })
        .then(response => {
            console.log('hej442');
            const data = parseQueryParams(response.data);
            console.log('hej332');
            const oauthToken = data.oauth_token;
            const oauthTokenSecret = data.oauth_token_secret;
            AsyncStorage.setItem('USOS_ACCESS_TOKEN', oauthToken);
            AsyncStorage.setItem('USOS__ACCESS_SECRET', oauthTokenSecret);
            
            console.log('Otrzymany request token:', oauthToken);
            console.log('Otrzymany request token secret:', oauthTokenSecret);
            
        })
        .catch(error => {
            console.error(error)
        });
    };

    return {
        access_tok
    };
};