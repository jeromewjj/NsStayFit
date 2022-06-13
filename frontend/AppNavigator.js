import React from "react";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomePage from "./screens/homePage";
import SubmitIpptPage from "./screens/ipptSubmissionPage";
import LoginPage from "./screens/loginPage";
import RegistrationPage from "./screens/registrationPage";
import NsFitPage from "./screens/nsFitPage";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const  HomeNavigator = () => {
    return(
// put login and registration into into a startup page

    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="View Ippt">
        <Tab.Screen name="Submit Ippt" component={SubmitIpptPage}  options={{ tabBarIcon: () => (
          <MaterialCommunityIcons 
          name="file-upload" 
          size={24} 
          color="red" /> )}
      }/>
        <Tab.Screen name="View Ippt" component={HomePage} options={{ tabBarIcon: () => (
          <MaterialCommunityIcons 
          name="home" 
          size={24} 
          color="red" /> )}
      }/>
        <Tab.Screen name="NsFit" component={NsFitPage} options={{ tabBarIcon: () => (
          <MaterialIcons
          name="fitness-center" 
          size={24} 
          color="red" /> )}
      }/>
    </Tab.Navigator>
  );
}

export const AppNavigator = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginPage} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={RegistrationPage} options={{headerShown: false}}/>
        <Stack.Screen name="HomeNavigator" component={HomeNavigator} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
    )
}