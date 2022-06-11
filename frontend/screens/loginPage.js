import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {useTailwind} from 'tailwind-rn';
import { Layout } from '@ui-kitten/components';

export default LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    const handleLogin = () => {
    }
    
    const handleSignUp = () => {
        navigation.navigate("Register")
    }
    
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.inputContainer}>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={text => setUsername(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
            />
            </View>
    
            <View style={styles.buttonContainer}>
            <TouchableOpacity
                //onPress={handleLogin}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleSignUp}
                style={[styles.button, styles.buttonOutline]}
            >
                <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
  }



const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContainer: {
      width: '80%'
    },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
    },
    buttonContainer: {
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    button: {
      backgroundColor: '#a12427',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#a12427',
      borderWidth: 2,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    buttonOutlineText: {
      color: '#a12427',
      fontWeight: '700',
      fontSize: 16,
    },
});