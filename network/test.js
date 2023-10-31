import React, { useState, useEffect, Component } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto-js';
import * as Linking from 'expo-linking';



class RequestScreen extends Component {

    RequestTokens = (funkcja) => {
        const parseQueryParams = (query) => {
            const keyValuePairs = query.split('&');
            const params = {};
        
            keyValuePairs.forEach(pair => {
                const [key, value] = pair.split('=');
                params[key] = decodeURIComponent(value || '');
            });
        
            return params;
        }
        console.log("Hello");
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
        axios({
            url: request_data.url,
            method: request_data.method,
            headers: oauth.toHeader(oauth.authorize(request_data)),
        })
        .then(response => {
            console.log("Hello2");
            const data = parseQueryParams(response.data);
            const oauthToken = data.oauth_token;
            const oauthTokenSecret = data.oauth_token_secret;
            console.log("Hello3");
            AsyncStorage.setItem('USOS_TOKEN', oauthToken);
            AsyncStorage.setItem('USOS_SECRET', oauthTokenSecret);
            console.log("Hello4");
            
            console.log('Otrzymany request token:', oauthToken);
            console.log('Otrzymany request token secret:', oauthTokenSecret);
            funkcja(<View><Text>Otrzymany request token {oauthToken}</Text><Text>Otrzymany request secret {oauthTokenSecret}</Text></View>);
            this.setState({secret: oauthTokenSecret});
            this.setState({token: oauthToken});
    
        })
        .catch(error => {
            console.error('Błąd podczas uzyskiwania request token:', error);
        });
    }

    constructor() {
        super();
        this.DataView = React.createRef();
        this.state = {
            dataViewContent: null,
            secret: null,
            token: null, // Inicjalnie brak zawartości
        };
    }

    setStaticViewContent = (object) => {
        // Tworzenie statycznego widoku z zawartością
        const staticViewContent = object;

        this.setState({ dataViewContent: staticViewContent });
    }

    render() {
    return (
        <View>
            <Button title='Request Token' onPress={() => {
                this.RequestTokens(this.setStaticViewContent);
                
                }}/>
            <Button title='Autoryzacja' onPress={() => this.setStaticViewContent(<View><Text>hello</Text><Text>hello</Text><Text>hello</Text></View>)}/>
            <Button title='Access Token' onPress={() => this.setStaticViewContent(<View><Text>hello</Text></View>)}/>
            <Button title='Show state' onPress={() => this.setStaticViewContent(<View><Text>secret: {this.state.secret}</Text><Text>token: {this.state.token}</Text></View>)}/>
            <View ref={this.DataView}>
                {this.state.dataViewContent}
            </View>
        </View>
    );
    }

};

export default RequestScreen;