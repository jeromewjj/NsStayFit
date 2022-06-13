import React, { useState, useCallback } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { Text, Card, Button } from '@ui-kitten/components';
import { Alert, View } from 'react-native';
import { StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FireBaseStub from '../../backend/homepage/fireBaseStub';
import { useNavigation } from "@react-navigation/native";
import { getIpptScore } from '../../firebase.js';
import FitnessQuote from "../../backend/homepage/GetRandomFitnessQuote";

export default HomePage = () => {

    const [ipptScore, setIpptScore] = useState(0);
    const [ipptIncentives, setIpptIncentives] = useState(0);
    const [ipptAward, setIpptAward] = useState("");
    const [fitnessQuote, setFitnessQuote] = useState("");
    const [authorQuote, setAuthorQuote] = useState("");


    const navigation = useNavigation();

    const redirectToLoginPageHandle = () => {
        navigation.navigate("Login");
    }

    useFocusEffect(

        useCallback(() => {
            
            // To be replaced with the HTTP Request to query the database
            var updatedIpptScore = new FireBaseStub().getUserIpptScoreStub();

            // var updatedIpptScore = getIpptScore();
            setIpptScore(updatedIpptScore);

            updatedIpptScore <= 50
                ? (setIpptIncentives(0), setIpptAward("Fail"))
                : updatedIpptScore <= 60
                    ? (setIpptIncentives(0), setIpptAward("Pass")) // Passed but without incentives
                    : updatedIpptScore <= 74
                        ? (setIpptIncentives(200), setIpptAward("Pass with Incentive"))
                        : updatedIpptScore <= 84
                            ? (setIpptIncentives(300), setIpptAward("Sliver"))
                            : (setIpptIncentives(500), setIpptAward("Gold"))

            // get random quotes
            var updatedQuote = new FitnessQuote().getRandomFitnessQuoteAuthor();
            setFitnessQuote(updatedQuote[0]);
            setAuthorQuote(updatedQuote[1]);
        }, [])
    );
    
    return (
        <View style={styles.layoutStyles}>

            <View style={styles.topContainer}>
                <Text style={styles.title}>Welcome Back!</Text>
                <Button style={styles.logoutButton} appearance='ghost' accessoryRight={
                    <MaterialCommunityIcons
                    style={{alignItems: 'center', justifyContent: 'center', color: "#a12427"}}
                    name="exit-to-app"
                    size={22} 
                    color="red" />
                }
                onPress={ () =>
                    Alert.alert("Logout?",
                        "Are you sure that you want to logout?",
                        [
                            {
                                text: "Yes",
                                // Replace stub with actual logout
                                onPress: () => {new FireBaseStub().logoutUserStub(); redirectToLoginPageHandle()},
                            },
                            {
                                text: "Cancel",
                                onPress: () => console.log("Cancelled logout action"),
                                style:"cancel"
                            },
                        ])
                }
                ></Button>
            </View>


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
        marginRight: 10,
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
        borderColor: 'black',
        borderStyle: 'solid',
        justifyContent: 'center',
        backgroundColor: "#FAA0A0",
        marginTop: 30,
    },

    passCircle: {
        width: 250,
        height: 250,
        borderRadius: 125,
        borderWidth: 2,
        borderColor: 'black',
        borderStyle: 'solid',
        justifyContent: 'center',
        backgroundColor: "#83F52C",
        marginTop: 30,
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