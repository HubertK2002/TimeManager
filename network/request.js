import React from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto-js';
import * as Linking from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';

const parseQueryParams = (query) => {
  const keyValuePairs = query.split('&');
  const params = {};

  keyValuePairs.forEach(pair => {
      const [key, value] = pair.split('=');
      params[key] = decodeURIComponent(value || '');
  });

  return params;
}

//'/oauth-callback'
//
class Request_data {
  method = 'POST';
  constructor(href, callback_url)
  {
    this.url = href,
    this.data =  { oauth_callback: Linking.makeUrl(callback_url) };
  }
};

class RequestHeader {
  constructor(requestdata, oauth) {
    this.url = requestdata.url;
    this.method = requestdata.method;
    this.headers = oauth.toHeader(oauth.authorize(requestdata));
  }
}

class Auth extends OAuth
{
  constructor(consumer)
  {
    super({
      consumer,
      signature_method: 'HMAC-SHA1',
      hash_function(base_string, key) {
        return crypto.enc.Base64.stringify(crypto.HmacSHA1(base_string, key));
      },
    });
  }
}

class Request
{
  client_key = "UmZNUsQgxVPx2sLvsXHz";
  client_secret = "A2EWyBSTMjQyYDv6mHsfjnZTF4b5579c9BXKTaED";
  requesthref = 'https://apps.usos.pw.edu.pl/services/oauth/request_token';
  constructor(object_refrence) {
    this.Parent = object_refrence;
  }
  RequestToken(funkcja) {
    var oauth = new Auth({key: this.client_key, secret: this.client_secret});
    var header = new RequestHeader( new Request_data(this.requesthref,"/oauth-callback"), oauth);
    axios(header).then(response => this.RequestTokenCallback(response, funkcja)).catch(error => this.RequestCatch(error));
  }

  RequestTokenCallback(response, funkcja) {
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
    this.Parent.setState({secret: oauthTokenSecret});
    this.Parent.setState({token: oauthToken});
  }
  RequestCatch(error) {
    console.error('Błąd podczas uzyskiwania request token:', error);
  }
}

export default Request;
