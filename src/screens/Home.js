import React, { Component } from 'react';
import {
    StyleSheet, Text, View, ImageBackground,
    Alert, TextInput, Button
} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import todayImage from '../../assets/imgs/today.jpg';
import commonStyles from '../commonStyles';
import Nav from '../components/Navigator';
import { logicalExpression } from '@babel/types';
import api from '../services/api';



export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            enableMenu: false,
            enableLogin: true,
            name: '',
            messageLogin: 'xx'
        };
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
                    console.warn(response.data);
                if (response.data.user.length > 0) {
                    let enableMenu = !this.state.enableMenu;
                    let enableLogin = !this.state.enableLogin;
                    this.setState({
                        enableMenu: enableMenu,
                        enableLogin: enableLogin
                    });
                    console.warn(response);
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
    login: {
        flex: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 26,
        marginLeft: 80,
        marginRight: 80,
    },
    loginOk: {
        flex: 2,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 30,
    },
    avisoLoginOk: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 22,
        marginTop: 15,
    },
    textLogin: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 16,
        borderColor: 'gray',
        borderBottomWidth: 1
    },
    textLoginOk: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 28,
    },
    taksContainer: {
        flex: 6,
        marginTop: 35
    }

})

