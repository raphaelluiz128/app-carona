import React,{Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView,{ PROVIDER_GOOGLE, Marker } from 'react-native-maps';
const styles = StyleSheet.create({

  container:{
    ...StyleSheet.absoluteFillObject,
    height:400,
    width:400,
    justifyContent:'flex-end',
    alignItems:'center',
  },
  map:{
    ...StyleSheet.absoluteFillObject,
  }
})

export default class Nav extends Component {
  render(){
    const { lat,lng,latDriver,lngDriver } = this.props;
      return(
  
  <View style={styles.container}>
    <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      region={{
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121, }}>
      <MapView.Marker
            coordinate={{latitude: lat,longitude: lng}} title="Você - caroneiro" description="desc" pinColor ="yellow" />
<MapView.Marker coordinate={{latitude: latDriver, longitude:lngDriver }} title="Motorista" description="desc" pinColor = "red"/>
    </MapView>
  </View>
)}};