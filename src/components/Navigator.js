import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import commonStyles from '../commonStyles';
import Home from '../screens/Home';
import Driver from '../screens/Driver';
import Passenger from '../screens/Passenger';

export default class Nav extends Component {
    render(){
        return(
            <View style = {{flex:1, justifyContent:'center'}}>
                <Button
                title = 'Motorista'
                onPress = {() => this.props.navigation.navigate('Driver')}></Button>
                   <Button
                title = 'Caroneiro'
                onPress = {() => this.props.navigation.navigate('Passenger')}></Button>
            </View>)
    }
}

const AppNavigator = createStackNavigator({
    Home:{
        screen:() => <Home></Home>
    },
    Driver:{
        screen:() => <Driver></Driver>
    },
    Passenger:{
        screen:() => <Passenger></Passenger>
    },
},{ initialRouteName: 'Home' });

const AppContainer = createAppContainer (AppNavigator);
