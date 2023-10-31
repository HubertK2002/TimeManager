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

//const authorizationUrl = `https://apps.usos.pw.edu.pl/services/oauth/authorize?oauth_token=${oauthToken}&scope=offline_access&oauth_callback=${encodeURIComponent(Linking.makeUrl('/oauth-callback'))}`;
//Linking.openURL(authorizationUrl); // Otwórz URL autoryzacji w przeglądarce

class Request
{
  client_key = "UmZNUsQgxVPx2sLvsXHz";
  client_secret = "A2EWyBSTMjQyYDv6mHsfjnZTF4b5579c9BXKTaED";
  requesthref = 'https://apps.usos.pw.edu.pl/services/oauth/request_token';
  authhref = 'https://apps.usos.pw.edu.pl/services/oauth/authorize'  
  requestToken = "";
  requestSecret = "";
  oauthVerifier = "";
  constructor(object_refrence) {
    this.Parent = object_refrence;
  }
  RequestToken(funkcja) {
    var oauth = new Auth({key: this.client_key, secret: this.client_secret});
    var header = new RequestHeader( new Request_data(this.requesthref,"/oauth-callback"), oauth);
    axios(header).then(response => this.RequestTokenCallback(response, funkcja)).catch(error => this.RequestCatch(error));
  }
  Authorize(funkcja) {
    var parameters = {
      oauth_token: this.requestToken,
      scope: "offline_access",
      oauth_callback: Linking.makeUrl('/oauth')
    }
    var url = this.makeURL(this.authhref, parameters);
    console.log(url);
    Linking.openURL(url);
  }

  RequestTokenCallback(response, funkcja) {
    console.log("Hello");
    const data = parseQueryParams(response.data);
    this.requestToken = data.oauth_token;
    this.requestSecret = data.oauth_token_secret;
    console.log("Hello");
    AsyncStorage.setItem('USOS_TOKEN', this.requestToken);
    AsyncStorage.setItem('USOS_SECRET', this.requestSecret);
    funkcja(<View><Text>Otrzymany request token {this.requestToken}</Text><Text>Otrzymany request secret {this.requestSecret}</Text></View>);
    console.log("Hello");
    this.Parent.setState({secret: this.requestToken});
    this.Parent.setState({token: this.requestSecret});
  }
  AuthorizationCallback(response, funkcja) {
    const data = parseQueryParams(response.data);
    this.oauthVerifier = data.oauth_verifier;
    AsyncStorage.setItem('USOS_VERIFIER', this.oauthVerifier);
    funkcja(<View><Text>Otrzymany verifier {this.oauthVerifier}</Text></View>);
    this.Parent.setState({verifier: this.oauthVerifier});
  }

  RequestCatch(error) {
    console.error('Błąd podczas uzyskiwania request token:', error);
  }

  makeURL(url, parameters) {
    const queryString = Object.keys(parameters)
    .map(key => `${key}=${encodeURIComponent(parameters[key])}`)
    .join('&');
    return url + "?" + queryString;
  }
}

export default Request;
