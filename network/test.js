import React, { useState, useEffect, Component } from 'react';
import { View, Text, Button } from 'react-native';
import Request from './request';

class RequestScreen extends Component {

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
            <Button title='Request Token' onPress={() => { new Request(this).RequestToken(this.setStaticViewContent)
                
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