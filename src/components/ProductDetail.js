import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, BackHandler, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

var moment = require('moment');
const apple = require('../asset/apple.jpg');
const { height } = Dimensions.get('window');
class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    handleBackPress = () => {
        this.props.navigation.goBack();
        return true;
    }
    render() {
        const { navigation } = this.props;
        const product = navigation.getParam('product');
        return (
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: '#27ae60', height: 80, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity
                        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                        style={{ padding: 10, alignItems: 'center', position: 'absolute', left: 10, top: 10, bottom: 10, justifyContent: 'center' }}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name='arrow-left' style={{ fontSize: 26, color: '#ffff', }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>VI-TRACING</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 20 }}>
                    <Text style={{ color: '#040404', fontWeight: 'bold', paddingRight: 10, fontSize: 30 }}>{product.productName}</Text>
                    <Icon name='check-circle' style={{ color: '#27ae60', fontSize: 40 }} />
                </View>
                <Image
                    style={{ width: '100%', height: 200 }}
                    source={apple} />

                <View style={{ margin: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
                        <Text style={{ flex: 1.5, fontWeight: 'bold', color: '#262A35', fontSize: 16 }}>ORIGIN</Text>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.navigate('FarmerOrg', { farmer: product.farmer })}>
                            <Text style={{ flex: 1, fontSize: 16, color: '#7f8c8d', }}>{product.farmer.org.name}</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
                        <Text style={{ flex: 1.5, fontWeight: 'bold', color: '#262A35', fontSize: 16 }}>VERIFIER</Text>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.navigate('VerifierOrg', { verifier: product.verifier })}>
                            <Text style={{ flex: 1, fontSize: 16, color: '#7f8c8d', }}>{[...new Set(product.verifier.map(verifier => { return verifier.org.name }))].join(", ")}</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
                        <Text style={{ flex: 1.5, fontWeight: 'bold', color: '#262A35', fontSize: 16 }}>RETAILER</Text>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.navigate('RetailerOrg', { retailer: product.retailer })}>
                            <Text style={{ flex: 1, fontSize: 16, color: '#7f8c8d', }}>{[...new Set(product.retailer.map(retailer => { return retailer.org.name }))].join(", ")}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
                        <Text style={{ flex: 1.5, fontWeight: 'bold', color: '#262A35', fontSize: 16 }}>PACKED DATE</Text>
                        <Text style={{ flex: 1, fontSize: 16, color: '#7f8c8d' }}>{moment(product.packedDateTime).format('MMM DD YYYY')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
                        <Text style={{ flex: 1.5, fontWeight: 'bold', color: '#262A35', fontSize: 16 }}>EXPIRED DATE</Text>
                        <Text style={{ flex: 1, fontSize: 16, color: '#7f8c8d' }}>{moment(product.expiredDateTime).format('MMM DD YYYY')}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default ProductDetail;