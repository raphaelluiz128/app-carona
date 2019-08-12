import React, {Component} from 'react';
import {View, Text, Button,StyleSheet} from 'react-native';


export default class Nav extends Component {
    render(){
        const { navigation } = this.props
        return(
            <View style = {styles.container}>
                <Button
                title = 'Motorista'
                onPress = {() => navigation.navigate('Driver')}></Button>
                   <Button
                title = 'Caroneiro'
                onPress = {() => navigation.navigate('Passenger')}></Button>
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex:1,
        justifyContent:'space-around', 
        alignItems:'center',
        marginTop: 26,
    },
   

})
