import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Vibration, Dimensions, BackHandler, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RNCamera } from 'react-native-camera';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const URI = 'http://118.70.170.165:3001/api';
const logo = require('../asset/vsii1.png');

class Scan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scanning: false,
            qrcode: ''
        };
    }


    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    handleBackPress = () => {
        if (this.state.scanning) {
            this.setState({ scanning: false })
        } else {
            BackHandler.exitApp();
        }

        return true;
    }


    onBarCodeRead = (e) => {
        this.setState({ qrcode: e.data });
        this.setState({ scanning: false }, () => {
            const url = URI + '/Shipment/' + e.data;
            const data = { filter: '{"include":"resolve"}' };
            const params = Object.keys(data).map(key => key + '=' +
                encodeURIComponent(data[key])).join('&');
            const fullUrl = url + `${params ? '?' + params : ''}`;

            fetch(fullUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(resJson => {
                    if (resJson.error || !resJson.retailer || !resJson.verifier) {
                        alert('QR Code not available')
                        return Promise.reject(new Error('Fail!'));
                    } else {
                        this.props.navigation.navigate('ProductDetail', { product: resJson })
                    }
                })
                .catch(err => console.log(err))
        });
    }


    render() {
        const { scanning } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: 'white'}}>
                <View style={styles.header}>
                    {
                        scanning &&
                        <TouchableOpacity
                            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                            style={{ paddingLeft: 10, alignItems: 'center', position: 'absolute', left: 10, top: 10 }}
                            onPress={() => this.setState({ scanning: false })}
                        >
                            <Icon name='arrow-left' style={{ fontSize: 26, color: '#ffff', }} />
                        </TouchableOpacity>
                    }

                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>VI-TRACING</Text>
                </View>
                {
                    scanning ?
                        <View style={styles.container}>
                            <RNCamera
                                ref={ref => {
                                    this.camera = ref;
                                }}
                                style={styles.preview}
                                type={RNCamera.Constants.Type.back}
                                flashMode={RNCamera.Constants.FlashMode.on}
                                permissionDialogTitle={'Permission to use camera'}
                                permissionDialogMessage={'We need your permission to use your camera phone'}
                                onBarCodeRead={this.onBarCodeRead}
                                playSoundOnCapture={true}
                            >
                                <View style={styles.rectangle}>
                                    <View style={styles.rectangleColor} />
                                    <View style={styles.topLeft} />
                                    <View style={styles.topRight} />
                                    <View style={styles.bottomLeft} />
                                    <View style={styles.bottomRight} />
                                </View>
                                <View style={{ position: 'absolute', bottom: 20, justifyContent: 'center', flex: 1 }}>
                                    <Text style={{ color: 'white', alignSelf: 'center' }}>Place the QR Code inside the area to Scan it</Text>
                                </View>
                            </RNCamera>

                        </View>
                        :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',  }}>        
                            <TouchableOpacity
                                onPress={() => this.setState({ scanning: true })}
                                style={{
                                    height: 150,
                                    width: 150,
                                    borderRadius: 150 / 2,
                                    backgroundColor: '#27ae60',
                                    justifyContent: 'center', alignItems: 'center'
                                }}
                            >
                                <Icon name='qrcode' style={{ fontSize: 50, color: 'white' }} />
                                <Text style={{ color: 'white', fontSize: 18, padding: 5 }}>Scan</Text>
                            </TouchableOpacity>
                            <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 50 }}>
                                <Text>Find the QR code and move the camera to scan it</Text>
                            </View>
                        </View>
                }
            </View>
        );
    }
}

export default Scan;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#27ae60', 
        height: deviceHeight * 0.08, 
        alignItems: 'center', 
        flexDirection: 'row', 
        justifyContent: 'center'
    },
    preview: {
        flex: 1,
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    },
    scanText: {
        alignSelf: 'center',
        paddingVertical: 30,
        fontSize: 15
    },
    scanButton: {
        backgroundColor: '#27ae60',
        height: 120,
        width: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rectangle: {
        position: 'absolute',
        borderLeftColor: 'rgba(0, 0, 0, .3)',
        borderRightColor: 'rgba(0, 0, 0, .3)',
        borderTopColor: 'rgba(0, 0, 0, .3)',
        borderBottomColor: 'rgba(0, 0, 0, .3)',
        borderLeftWidth: deviceWidth / 1,
        borderRightWidth: deviceWidth / 1,
        borderTopWidth: deviceHeight / 5,
        borderBottomWidth: deviceHeight / 1,
        zIndex: 0
    },
    rectangleColor: {
        height: 250,
        width: 250,
        backgroundColor: 'transparent',
    },
    topLeft: {
        width: 50,
        height: 50,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        position: 'absolute',
        left: -1,
        top: -1,
        borderLeftColor: 'green',
        borderTopColor: 'green'
    },
    topRight: {
        width: 50,
        height: 50,
        borderTopWidth: 2,
        borderRightWidth: 2,
        position: 'absolute',
        right: -1,
        top: -1,
        borderRightColor: 'green',
        borderTopColor: 'green'
    },
    bottomLeft: {
        width: 50,
        height: 50,
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        position: 'absolute',
        left: -1,
        bottom: -1,
        borderLeftColor: 'green',
        borderBottomColor: 'green'
    },
    bottomRight: {
        width: 50,
        height: 50,
        borderBottomWidth: 2,
        borderRightWidth: 2,
        position: 'absolute',
        right: -1,
        bottom: -1,
        borderRightColor: 'green',
        borderBottomColor: 'green'
    },
});


