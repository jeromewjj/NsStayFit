import React, { useState, useCallback } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import {useTailwind} from 'tailwind-rn';
import { Text, Card, TopNavigationAction } from '@ui-kitten/components';
import { View } from 'react-native';
import { StyleSheet } from 'react-native'
import QueryIpptDatabase from '../../backend/homepage/GetIpptScore';

export default HomePage = () => {

    const [ipptScore, setIpptScore] = useState(0);
    const [ipptIncentives, setIpptIncentives] = useState(0);
    const [ipptAward, setIpptAward] = useState("");

    useFocusEffect(
        useCallback(() => {

            // To be replaced with the HTTP Request to query the database
            var updatedIpptScore = new QueryIpptDatabase().getUserIpptScoreStub();

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

        }, [])
    );

    return (
        <View style={styles.layoutStyles}>
            <View>
                <Text style={styles.title}>Welcome Back!</Text>
            </View>

            <View style={styles.circle}>
                <Text style={styles.score}>{ipptScore}</Text>
                <Text style={styles.ipptScoreHeader}>IPPT Score</Text>
            </View>
            
            <View>
                <Text style={styles.awardIncentives}>Award: {ipptAward}{'\n'}Expected Incentives: ${ipptIncentives}</Text>
            </View>

            <View>
                <Card style={styles.tab}>
                    <Text category='h5'>“All progress takes place outside the comfort zone.”- Michal Joan Bobak</Text>
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

    title: {
      fontSize: 45,
      fontWeight: 'bold',
      marginTop: 50,
      textAlign: 'center',
    },

    circle: {
        width: 250,
        height: 250,
        borderRadius: 125,
        borderWidth: 2,
        borderColor: 'black',
        borderStyle: 'solid',
        justifyContent: 'center',
        backgroundColor: "#add8e6",
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
