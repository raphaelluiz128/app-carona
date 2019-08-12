import {createStackNavigator, createAppContainer} from 'react-navigation';

import Home from './screens/Home/Home';
import Driver from './screens/Driver/Driver';
import Passenger from './screens/Passenger/Passenger';

const AppNavigator = createStackNavigator({
   Home,
   Driver,
   Passenger,
},{ initialRouteName: 'Home' });

// const AppNavigator = createStackNavigator({
//     Home:{
//         screen:Home
//     },
//     Driver:{
//         screen:Driver
//     },
//     Passenger:{
//         screen:Passenger
//     },
// },{ initialRouteName: 'Home' });


const AppContainer = createAppContainer (AppNavigator);

export default AppContainer;