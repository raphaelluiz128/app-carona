import React, { Component } from 'react';
import {
    StyleSheet, Text, View, ImageBackground,
    Alert, TextInput, Button
} from 'react-native';
import commonStyles from '../commonStyles';
import todayImage from '../../assets/imgs/month.jpg';
import QRCode from 'react-native-qrcode-svg';
import api from '../services/api';
import {AsyncStorage} from 'react-native';

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            idUser : await AsyncStorage.getItem('idUser'),
            nameUser : await AsyncStorage.getItem('nameUser'),
            qrtext:  await AsyncStorage.getItem('idUser') +'-'+
            await AsyncStorage.getItem('nameUser'),
            message:''
        };
    }

async alertShare(){
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
  
    
            const response = await api.put('/users/isDriver/'+id,
                { driver: 1 });
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
   logo={{uri: base64Logo}}
   size={200}
   logoSize={40}
   logoBackgroundColor='transparent'/>
<Button 
                title = 'Compartilhar localização'
                onPress = {() => this.shareLocal()}></Button>
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
        marginTop:20,
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"space-around",
        flex: 6,
    },
    

})