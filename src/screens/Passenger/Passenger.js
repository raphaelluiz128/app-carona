import React, { Component } from 'react';
import {
    StyleSheet, Text, View, ImageBackground,
    Alert, Button
} from 'react-native';
import commonStyles from '../../commonStyles';
import todayImage from '../../../assets/imgs/month.jpg';
import QRCode from 'react-native-qrcode-svg';
import api from '../../services/api';
import Map from '../../components/Map';
import { AsyncStorage } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import QRCodeScanner from "react-native-qrcode-scanner";

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: null,
            lat: 19.15384,
            lng: 72.92902,
            latDriver: 19.15384,
            lngDriver: 72.92902,
            distance: 0,
            successQrcode: null,
            content: null,
            idDriver: null,
            idUser: null,
            showButton: false,
            showQrCode: true,
        };
    }

    async componentDidMount() {
        const nameUser = await AsyncStorage.getItem('nameUser');
        const idUser = await AsyncStorage.getItem('idUser');
        const date = await AsyncStorage.getItem('date');
        this.setState(
            {
                idUser: idUser,
            });
    }
    //take user coords
    async findCoordinates() {
        try {
            await Geolocation.getCurrentPosition(info =>
                this.setState({
                    lat: info.coords.latitude,
                    lng: info.coords.longitude,
                }, () => this.findCloseDriver()));
        } catch (err) {
            console.log(err);
        }
    };

    async alertShare(message) {
        Alert.alert(
            'Atenção',
            message,
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        );
    }

    //include ride
    async informRide() {
        try {
            const response = await api.post('/rides',
                { id_driver: this.state.idDriver, id_passenger: this.state.idUser });
            this.alertShare("Carona registrada com sucesso");
        } catch (error) {
            console.log(error);
        }
    }

    //find driver
    // 1 milha é igual a 1,609km, ou 1 milha = 1609 metros
    //distancia em milhas * 1609m

    async findCloseDriver() {
        
        try {
            const lat = this.state.lat;
            const lng = this.state.lng;
            const response = await api.post('/users/drivers/',
                { lat: lat, lng: lng });
            //Aqui é a fórmula pego a distância em milhas já calculadas no sql e multiplico por 1609, depois fixo em 1 número após a vírgula
            let distance = (response.data.drivers[0][0].distance*1609).toFixed(1);  
            lngDriverF = parseFloat(response.data.drivers[0][0].lng);
            latDriverF = parseFloat(response.data.drivers[0][0].lat); 
        this.setState({
                lngDriver: lngDriverF,
                latDriver: latDriverF,
                distance: distance,
                showButton: true,
                showQrCode: false,
            },() => this.alertShare('Dados encontrados'));
        } catch (error) {
            console.log(error);
        }
    }
    //take data of qrcode drivers
    takeQrcode = async (e) => {
        try {
            const idDriver = e.data.split(',')[0];
            this.setState({ successQrcode: true, content: e.data, idDriver: idDriver }, () => this.findCoordinates());
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={todayImage}
                    style={styles.background}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>
                            APP Carona
                        </Text>
                        <Text style={styles.subtitle}>
                            Passageiro
                        </Text>
                    </View>
                </ImageBackground>
                {this.state.showQrCode ?
                    <View style={styles.mapQrCode}>
                        <QRCodeScanner onRead={this.takeQrcode} showMarker={true} checkAndroid6Permissions={true} />
                    </View>
                    : <View style={styles.mapQrCode}>
                        <Map lat={this.state.lat} lng={this.state.lng} latDriver={this.state.latDriver} lngDriver={this.state.lngDriver}></Map>
                    </View>}
                {this.state.showButton ?
                    <View style={styles.taksContainer}>
                        <Text style={styles.text}> {this.state.distance} metros de distância até o motorista</Text>
                        <Button
                            title='Compartilhar localização'
                            onPress={() => this.informRide()}>
                        </Button>
                    </View>
                    : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 2,
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
        fontSize: 30,
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
        marginTop: 5,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 2,
    },
    mapQrCode: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flex: 3,
    },
    text: {
        fontSize: 12,
        color: "rgb(0,0,0)"
    },

})