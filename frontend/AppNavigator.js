import React from "react";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomePage from "./screens/homePage";
import SubmitIpptPage from "./screens/ipptSubmissionPage";
import LoginPage from "./screens/loginPage";
import RegistrationPage from "./screens/registrationPage";
import NsFitPage from "./screens/nsFitPage";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// BottomNavigator Bar
const  BottomNavigator = () => {
    return(
    <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName="View Ippt">
        <Tab.Screen name="Submit Ippt" component={SubmitIpptPage}  options={{ tabBarIcon: () => (
          <MaterialCommunityIcons 
          name="file-upload" 
          size={24} 
          color="#a12427" /> )}
        }/>
        <Tab.Screen name="View Ippt" component={HomePage} options={{ tabBarIcon: () => (
          <MaterialCommunityIcons 
          name="home" 
          size={24} 
          color="#a12427" /> )}
       }/>
        <Tab.Screen name="NsFit" component={NsFitPage} options={{ tabBarIcon: () => (
          <MaterialIcons
          name="fitness-center" 
          size={24} 
          color="#a12427" /> )}
        }/>
    </Tab.Navigator>
  );
}

export const AppNavigator = () => {
  return(
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginPage} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={RegistrationPage} options={{headerShown: false}}/>
        <Stack.Screen name="HomeNavigator" component={BottomNavigator} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
    )
}