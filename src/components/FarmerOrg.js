import React, { Component } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Left, Right, Body, Text, Icon } from 'native-base';

const farm = require('../asset/farm.png')
class FarmerOrg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }
    render() {
        const { navigation } = this.props;
        const farmer = navigation.getParam('farmer');
        return (
            <Container>
                <View style={styles.header}>
                    <TouchableOpacity
                        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                        style={{ padding: 10, alignItems: 'center', position: 'absolute', left: 10, top: 10, bottom: 10, justifyContent: 'center' }}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name='arrow-left' style={{ fontSize: 26, color: '#ffff', }} type='FontAwesome' />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Farmer Info</Text>
                </View>
                <Content padder>

                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                        <Image source={farm}
                            style={{ width: 100, height: 100, borderRadius: 50 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='check-circle' type='FontAwesome' style={{ color: '#27ae60' }} />
                            <Text style={{ padding: 10, fontSize: 26, fontWeight: 'bold', color: '#130f40' }}>{farmer.org.name}</Text>
                        </View>
                    </View>
                    <Card transparent>
                        <CardItem bordered>
                            <Text style={{ fontSize: 15, color: '#555D65', paddingBottom: 5, flex: 2 }}>Phone Number</Text>
                            <Right style={{ flex: 2 }}>
                                <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>{farmer.org.phone}</Text>
                            </Right>
                        </CardItem>
                        <CardItem bordered>
                            <Text style={{ fontSize: 15, color: '#555D65', paddingBottom: 5, flex: 2 }}>Address</Text>
                            <Right style={{ flex: 2 }}>
                                <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>{farmer.org.address}</Text>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Text style={{ fontSize: 15, color: '#555D65', paddingBottom: 5, flex: 2 }}>Email</Text>
                            <Right style={{ flex: 2 }}>
                                <Text style={{ fontSize: 16, color: '#1e272e', fontWeight: '500' }}>{farmer.org.email}</Text>
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

export default FarmerOrg;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#27ae60', 
        height: 80, 
        alignItems: 'center', 
        flexDirection: 'row', 
        justifyContent: 'center'
    }
})