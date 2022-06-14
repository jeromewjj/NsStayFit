import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { signup } from '../../firebase';
import { Alert, Button, Text, View, KeyboardAvoidingView, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
//import { DateTimePicker  from '@react-native-community/datetimepicker'
import DateTimePickerModal from "react-native-modal-datetime-picker";
export default RegistrationPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddr, setEmailAddr] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());
    const [dateString, setDateString] = useState("");

    const registrationValidation = () => {
        if ( password.length >= 8 && password.length <= 50 ) {
            Alert.alert(
                "Confirm Registration?",
                "Are you sure you want to submit?",
                [
                    {
                        text: "Confirm",
                        onPress: () => {handleSignUp()},
                    },
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancelled!!"),
                        style:"cancel"
                    },
                ],
                { cancelable: true }
            );
        } else if (password.length < 8 || password.length > 50) {
            Alert.alert(
                "Warning invalid password!",
                "Password must contain minimum 8 characters and maximum 50 characters. Please fill in the valid password!"
            )
        } else {
            Alert.alert(
                "Warning invalid password!",
                "Passwords are not the same! Please fill in the valid password!"
            )
        }
      }
  

    const returnBack = () => {
        navigation.navigate("Login");
    }

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDate(date);
        setDateString(
            date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
        )
        hideDatePicker();
    };

    const handleSignUp = () => {
        //returnBack();
        signup(firstName, lastName, emailAddr, contactNo, password, date);
        navigation.navigate("Login");
    }
    
    return (
        <ScrollView>
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <Text style={styles.title}>Registration</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.fieldTitle}>First Name</Text>
                <TextInput style={styles.input} 
                    placeholder="Enter first name" 
                    value={firstName} 
                    onChangeText={(text) => setFirstName(text)} />
                <Text style={styles.fieldTitle}>Last Name</Text>
                <TextInput style={styles.input} 
                    placeholder="Enter last name" 
                    value={lastName} 
                    onChangeText={(text) => setLastName(text)}/>
                <Text style={styles.fieldTitle}>Date Of Birth</Text>
                <Text style={styles.date}>{dateString}</Text>
                <View>
                <TouchableOpacity
                    onPress={showDatePicker}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Select Date of Birth</Text>
                </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </View>
                <Text style={styles.fieldTitle}>Email Address</Text>
                <TextInput style={styles.input} 
                    placeholder="Enter email address" 
                    value={emailAddr} 
                    onChangeText={(text) => setEmailAddr(text)}/>
                <Text style={styles.fieldTitle}>Contact Number</Text>
                <TextInput style={styles.input} 
                    placeholder="Enter contact number" 
                    value={contactNo} 
                    onChangeText={(text) => setContactNo(text)}/>
                <Text style={styles.fieldTitle}>Password</Text>
                <TextInput style={styles.input} 
                    placeholder="Enter password" 
                    secureTextEntry = {true}
                    value={password} 
                    onChangeText={(text) => setPassword(text)}/>
                    
                <Text style={styles.fieldTitle}>Confirm Password</Text>
                <TextInput style={styles.input} 
                    placeholder="Confirm password" 
                    secureTextEntry = {true} 
                    value={confirmPassword} 
                    onChangeText={(text) => setConfirmPassword(text)}/>
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={registrationValidation}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={returnBack}
                style={[styles.button, styles.buttonOutline]}
            >
                <Text style={styles.buttonOutlineText}>Back</Text>
            </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        </ScrollView>
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
    datePickerStyle: {
        width: 200,
        marginTop: 20,
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
    fieldTitle: {
        color: 'black',
        fontSize: 16,
        textAlign: 'left',
    },
    title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 32,
        textAlign: 'center',
    }, 
    date: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
    }
});