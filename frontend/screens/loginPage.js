import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import { useTailwind } from 'tailwind-rn';
import { Layout } from '@ui-kitten/components';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signup, login, logout } from '../../firebase';
//import { registerUser } from '../../database'
import { loginSchema } from "./validationSchema.js";
import { useFormik } from "formik";

export default LoginPage = () => {
    const tailwind = useTailwind();
    const [loginError, setLoginError] = useState("");
    const { handleSubmit, values, errors, touched, handleChange } = useFormik({
      initialValues: {
        email: "",
        password: "",
      },

      onSubmit: async (values) => {
        try {
          await login(values.email, values.password);

          // Remove error message and proceed to Homepage
          setLoginError("");
        } catch (e) {
          setLoginError("Email or password is incorrect!");
        }
      },

      validationSchema: loginSchema,
    });

    const navigation = useNavigation()

    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          navigation.navigate("HomeNavigator")
        }
      })
  
      return unsubscribe
    }, [])
    
    
    const handleSignUp = () => {
        navigation.navigate("Register")
    }
    
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <Image
                source={require('../images/ns_stayfit_icon.png')}
                fadeDuration={0}
                // tintColor = "#a12427"
                style={{height:200, width:220}}
            /> 
            <View style={styles.inputContainer}>
            <TextInput
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange("email")}
                style={styles.input}
            />

            {errors.email && touched.email ? (
            <Text style={tailwind("left-32 text-red-600")}>{errors.email}</Text>
            ) : null}

            <TextInput
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange("password")}
                style={styles.input}
                secureTextEntry
            />
            </View>
            
            {errors.password && touched.password ? (
            <Text style={tailwind("text-red-600 right-2")}>{errors.password}</Text>
            ) : null}

           <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={handleSubmit}
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
            {loginError ? (
              <Text style={tailwind("text-red-600")}>{loginError}</Text>
            ) : null}
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