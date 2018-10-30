import React, { Component } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';

const logo = require('../asset/vsii1.png');
class LoadingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount = () => {
        setTimeout(() => {
            this.props.navigation.navigate('Scan');
        }, 3000);
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <Image source={logo} />
            </View>
        );
    }
}

export default LoadingScreen;