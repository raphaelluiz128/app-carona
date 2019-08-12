import React, { Component } from 'react';
import {
    StyleSheet, Text, View, ImageBackground,
    Alert, TextInput, Button
} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import todayImage from '../../assets/imgs/month.jpg';
import commonStyles from '../commonStyles';
import Nav from '../components/Navigator';
import { logicalExpression } from '@babel/types';
import api from '../services/api';
import {AsyncStorage} from 'react-native';
import {requestCamera, requestLocation, requestCLocation} from '../services/permissions';




export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            enableMenu: false,
            enableLogin: true,
            name: '',
            id:'',
            messageLogin: 'xx'
        };
    }

    async componentDidMount() {
        requestCamera();
        requestLocation();
        requestCLocation();
      }

    async storeItem(key, item) {
        try {
            var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
            return jsonOfItem;
        } catch (error) {
          console.log(error.message);
        }
    }

    info() {
        Alert.alert(
            'Atenção',
            this.state.messageLogin,
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        );
    }

    async login() {        
        if (this.state.name != '') {
                const response = await api.post('/users/login',
                    { name: this.state.name });
                    console.log(response);
                if (response.data.user.length > 0) {
                    let enableMenu = !this.state.enableMenu;
                    let enableLogin = !this.state.enableLogin;
                    await AsyncStorage.setItem('idUser', JSON.stringify(response.data['user'][0]['id']));
                    await AsyncStorage.setItem('nameUser',response.data['user'][0]['name']);
                    const date =  (moment().locale('pt-br').format('ddd D [de] MMMM YYYY'));
                    await AsyncStorage.setItem('date',date);
                    this.setState({
                        enableMenu: enableMenu,
                        enableLogin: enableLogin,
                    });
                } else {
                    this.setState({messageLogin: "Usuário não encontrado, informe novamente."},() => this.info());   
                }
        } else {
            this.setState({messageLogin: "Dados em branco, informe novamente."},() => this.info());
        }
    }

    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <ImageBackground source={todayImage}
                    style={styles.background}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>
                            APP Carona
                        </Text>
                        <Text style={styles.subtitle}>
                            {moment().locale('pt-br').format('ddd, D [de] MMMM')}
                        </Text>
                    </View>
                </ImageBackground>
                {this.state.enableLogin ?
                    <View style={styles.login}>
                        <TextInput style={styles.textLogin} placeholder="Digite o seu nome" onChangeText={(value) => this.setState({ name: value })}
                            value={this.state.name}></TextInput>
                        <Button title="Login" onPress={() => this.login()}></Button>
                    </View>
                    :
                    <View style={styles.loginOk}>
                        <Text style={styles.textLoginOk}> Seja bem vindo {this.state.name}</Text>
                        <Text style={styles.avisoLoginOk}> Por favor escolha uma opção abaixo</Text>
                    </View>
                }
                {this.state.enableMenu ?
                    <View style={styles.taksContainer} >
                        <Nav navigation={navigation} />
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
        flex: 3,
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
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
    login: {
        flex: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: 26,
    },
    loginOk: {
        flex: 2,
        flexDirection: "column",
        alignItems: "center",
        justifyContent:"center",
        marginTop: 60,
    },
    avisoLoginOk: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 18,
        marginTop: 15,
    },
    textLogin: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 18,
        borderColor: 'gray',
        borderBottomWidth: 1
    },
    textLoginOk: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 22,
    },
    taksContainer: {
        flex: 5,
        marginTop: 35,
        flexDirection:'row',
        alignItems: "center",
        justifyContent: "space-around",
       

    }
})

