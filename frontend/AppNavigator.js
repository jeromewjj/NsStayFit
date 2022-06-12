import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from "@react-navigation/stack";


import HomePage from "./screens/homePage";
import SubmitIpptPage from "./screens/ipptSubmissionPage";
import LoginPage from "./screens/loginPage";
import RegistrationPage from "./screens/registrationPage";
import NsFitPage from "./screens/nsFitPage";


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeNavigator = () => {
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Register" component={RegistrationPage} />
            <Stack.Screen name="ViewIpptScore" component={HomePage} />
            <Stack.Screen name="SubmitIppt" component={SubmitIpptPage} />
            <Stack.Screen name="NsFit" component={NsFitPage} />
        </Stack.Navigator>
    )
}

export const AppNavigator = () => {
    return(
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Login" screenOptions={{ headerShown: true }}>
                <Drawer.Screen name="Login" component={LoginPage} />
                <Drawer.Screen name="Register" component={RegistrationPage} />
                <Drawer.Screen name="View Ippt Score" component={HomePage} options={{headerShown: false}}/>
                <Drawer.Screen name="Submit Ippt" component={SubmitIpptPage}/>
                <Drawer.Screen name="Do Ns Fit" component={NsFitPage} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}