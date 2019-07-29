import React, {Component} from 'react';
import {View, Text, Button,StyleSheet} from 'react-native';


export default class Nav extends Component {
    render(){
        const { navigation } = this.props
        return(
            <View style = {styles.container}>
                <Button style = {styles.button}
                title = 'Motorista'
                onPress = {() => navigation.navigate('Driver')}></Button>
                
                   <Button style = {styles.button}
                title = 'Caroneiro'
                onPress = {() => navigation.navigate('Passenger')}></Button>
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent:'space-around', 
        alignItems:'center',
        marginTop: 20,
    },
    button:{
        height:390,
    }

})
