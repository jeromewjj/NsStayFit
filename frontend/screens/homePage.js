import React, { useState, useCallback } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { Text, Card, Button, Layout } from '@ui-kitten/components';
import { Alert, View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FireBaseStub from '../../backend/homepage/fireBaseStub';
import {useTailwind} from 'tailwind-rn';
import { useNavigation } from "@react-navigation/native";
import { getIpptScore, logout } from '../../firebase.js';
import FitnessQuote from "../../backend/homepage/GetRandomFitnessQuote";

export default HomePage = () => {

    const [ipptScore, setIpptScore] = useState(0);
    const [ipptIncentives, setIpptIncentives] = useState(0);
    const [ipptAward, setIpptAward] = useState("");
    const [fitnessQuote, setFitnessQuote] = useState("");
    const [authorQuote, setAuthorQuote] = useState("");
    const tailwind = useTailwind();

    const navigation = useNavigation();

    const redirectToLoginPageHandle = () => {
        navigation.navigate("Login");
    }

    useFocusEffect(

        useCallback(() => {
            
            // Firebase database query to get ippt score of logged in user
            async function checkIpptScore() {
                var updatedIpptScore = await getIpptScore();
                setIpptScore(updatedIpptScore);
            }

            checkIpptScore();

            ipptScore <= 50
                ? (setIpptIncentives(0), setIpptAward("Fail"))
                : ipptScore <= 60
                    ? (setIpptIncentives(0), setIpptAward("Pass")) // Passed but without incentives
                    : ipptScore <= 74
                        ? (setIpptIncentives(200), setIpptAward("Pass with Incentive"))
                        : ipptScore <= 84
                            ? (setIpptIncentives(300), setIpptAward("Sliver"))
                            : (setIpptIncentives(500), setIpptAward("Gold"))

            // get random quotes
            var updatedQuote = new FitnessQuote().getRandomFitnessQuoteAuthor();
            setFitnessQuote(updatedQuote[0]);
            setAuthorQuote(updatedQuote[1]);
        }, [])
    );
    
    return (
        <View style={tailwind('flex-grow')}>

            {/* <View style={styles.topContainer}> */}
            <Layout style={tailwind('bg-red-800 h-20 flex-row justify-center')}>

                <Text style={tailwind('font-bold text-white text-2xl text-center top-8 left-20')}>Welcome Back!</Text>
                <Button style={styles.logoutButton} appearance='ghost' accessoryRight={
                    <MaterialCommunityIcons
                    style={{alignItems: 'center', justifyContent: 'center', color: "#a12427"}}
                    name="exit-to-app"
                    size={22} 
                    color="white" />
                }
                onPress={() =>
                    Alert.alert("Logout?",
                        "Are you sure that you want to logout?",
                        [
                            {
                                text: "Yes",
                                // Replace stub with actual logout
                                onPress: () => {logout(); redirectToLoginPageHandle()},
                            },
                            {
                                text: "Cancel",
                                onPress: () => console.log("Cancelled logout action"),
                                style:"cancel"
                            },
                        ])
                }
                ></Button>
            </Layout>

            <Layout style={tailwind('flex-1 justify-center items-center')}>

                { ipptScore <= 50
                
                    ? <View style={styles.failCircle}>
                    <Text style={styles.score}>{ipptScore}</Text>
                    <Text style={styles.ipptScoreHeader}>IPPT Score</Text></View>

                    : <View style={styles.passCircle}>
                    <Text style={styles.score}>{ipptScore}</Text>
                    <Text style={styles.ipptScoreHeader}>IPPT Score</Text></View>
                }
                
                <View>
                    <Text style={styles.awardIncentives}>Award: {ipptAward}{'\n'}Expected Incentives: ${ipptIncentives}</Text>
                </View>

                <View>
                    <Card style={styles.tab}>
                        <Text category='h5'>“{fitnessQuote}” - {authorQuote}</Text>
                    </Card>
                </View>
            </Layout>
        </View>
    );
};

const styles = StyleSheet.create({

    layoutStyles: {
        flexGrow: 1,
        alignItems: 'center',
    },

    topContainer: {
        flexDirection: 'row',
    },
    logoutButton: {
        width: 60,
        height: 60,
        borderRadius: 150,
        marginLeft:110,
        marginTop: 15
    },

    title: {
      fontSize: 45,
      fontWeight: 'bold',
      marginTop: 60,
      textAlign: 'center',
      marginLeft: 45,
      color: "#a12427"
    },

    failCircle: {
        width: 250,
        height: 250,
        borderRadius: 125,
        borderWidth: 2,
        borderColor: 'transparent',
        borderStyle: 'solid',
        justifyContent: 'center',
        backgroundColor: "#FAA0A0",
        marginTop: 5,
    },

    passCircle: {
        width: 250,
        height: 250,
        borderRadius: 125,
        borderWidth: 2,
        borderColor: 'transparent',
        borderStyle: 'solid',
        justifyContent: 'center',
        backgroundColor: "#83F52C",
        marginTop: 5,
    },

    score: {
        fontSize: 100,
        textAlign: 'center'
    },

    ipptScoreHeader: {
        fontSize: 20,
        textAlign: 'center'
    },

    awardIncentives: {
        marginTop: 10,
        marginBottom: 30,
        fontSize: 25,
        textAlign: 'center'
    },

    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        backgroundColor: "transparent",
    },
  })