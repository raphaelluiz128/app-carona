import React, { Component } from 'react';
import {
    StyleSheet, Text, View, ImageBackground,
    Alert, TextInput, Button
} from 'react-native';
import commonStyles from '../commonStyles';
import todayImage from '../../assets/imgs/month.jpg';
import QRCode from 'react-native-qrcode-svg';
import api from '../services/api';
import { AsyncStorage } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            qrtext: 'user',
            message: '',
            lat: '',
            lng: '',
            idUser:'',
        };
    }

    async componentDidMount() {
        const nameUser = await AsyncStorage.getItem('nameUser');
        const idUser = await AsyncStorage.getItem('idUser');
        const date = await AsyncStorage.getItem('date');
       this.setState(
           {qrtext:  idUser+','+nameUser+','+date,
           idUser: idUser,
        });
      }

    async findCoordinates() {
        try {
            await Geolocation.getCurrentPosition(info =>
                this.setState({
                    lat: info.coords.latitude,
                    lng: info.coords.longitude,
                    message: "Coordenadas enviadas"
                },() => this.shareLocal()));
        } catch (err) {
            console.log(err);
        }
    };

    async alertShare() {
        Alert.alert(
            'Atenção',
            this.state.message,
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        );
    }

    async shareLocal() {
        const response = await api.put('/users/isDriver/' + this.state.idUser,
            { driver : 1, lat : this.state.lat, lng : this.state.lng});
            this.alertShare();
    }

    render() {
        let base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';
        return (
            <View style={styles.container}>
                <ImageBackground source={todayImage}
                    style={styles.background}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>
                            APP Carona
                        </Text>
                        <Text style={styles.subtitle}>
                            Motorista
                        </Text>
                    </View>
                </ImageBackground>
                <View style={styles.taksContainer}>
                    <QRCode value={this.state.qrtext}
                        logo={{ uri: base64Logo }}
                        size={200}
                        logoSize={40}
                        logoBackgroundColor='transparent' />
                    <Button
                        title='Compartilhar localização'
                        onPress={() => this.findCoordinates()}></Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 3,
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    text: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 18,
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
    },
    taksContainer: {
        marginTop: 20,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        flex: 6,
    },


})