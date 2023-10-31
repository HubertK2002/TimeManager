import React, { useState, useEffect, Component } from 'react';
import { View, Text, Button } from 'react-native';
import Request from './request';
import AsyncStorage from '@react-native-async-storage/async-storage';

class RequestScreen extends Component {
    constructor() {
        super();
        this.DataView = React.createRef();
        this.state = {
            dataViewContent: null,
            secret: null,
            token: null,
            verifier: null,
            request: new Request(this) // Inicjalnie brak zawartości
        };
        AsyncStorage.getItem('VERIFIER').then((value) => {
            console.log("Value " + value);
            if (value) {
              // Jeśli wartość została znaleziona, zaktualizuj stan komponentu
              this.setState({ verifier: value });
            }
          })
          .catch((error) => {
            console.error('Błąd podczas pobierania wartości z AsyncStorage: ', error);
          });
    }

    setStaticViewContent = (object) => {
        // Tworzenie statycznego widoku z zawartością
        const staticViewContent = object;

        this.setState({ dataViewContent: staticViewContent });
    }

    render() {
    return (
        <View>
            <Button title='Request Token' onPress={() => { this.state.request.RequestToken(this.setStaticViewContent)
                
                }}/>
            <Button title='Autoryzacja' onPress={() => this.state.request.Authorize(this.setStaticViewContent)}/>
            <Button title='Access Token' onPress={() => this.setStaticViewContent(<View><Text>hello</Text></View>)}/>
            <Button title='Show state' onPress={() => this.setStaticViewContent(
                <View><Text>secret: {this.state.request.requestSecret}</Text><Text>token: {this.state.request.requestToken}</Text><Text>verifier: {this.state.verifier}</Text></View>)}/>
            <View ref={this.DataView}>
                {this.state.dataViewContent}
            </View>
        </View>
    );
    }

};

export default RequestScreen;