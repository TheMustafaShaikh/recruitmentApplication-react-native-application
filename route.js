import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screens/login';
import AdminLogin from './screens/adminLogin';
import RegisterationStudent from './screens/registerStudent';
import RegisterationCompany from './screens/registerCompany';
import CompanyLogin from './screens/companyLogin';
import Details from './screens/viewDetails';
import Adminview from './screens/adminView';

const Stack = createStackNavigator();

function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="adminLogin" component={AdminLogin} />
        <Stack.Screen name="adminView" component={Adminview} />
        <Stack.Screen name="companyLogin" component={CompanyLogin} />
        <Stack.Screen name="details" component={Details} />
        <Stack.Screen name="registerStudent" component={RegisterationStudent} />
        <Stack.Screen name="registerCompany" component={RegisterationCompany} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Route;
