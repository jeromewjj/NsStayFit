import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import { Button, Text, View, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
//import { DateTimePicker  from '@react-native-community/datetimepicker'
import DateTimePickerModal from "react-native-modal-datetime-picker";
export default RegistrationPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddr, setEmailAddr] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [open, setOpen] = useState(false)
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());
    const [dateString, setDateString] = useState('');
    const returnBack = () => {
        navigation.navigate("Register")
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
    
    return (
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
                    onChange={(text) => setFirstName(text)} />
                <Text style={styles.fieldTitle}>Last Name</Text>
                <TextInput style={styles.input} 
                    placeholder="Enter last name" 
                    value={lastName} 
                    onChange={(text) => setLastName(text)}/>
                <Text style={styles.fieldTitle}>Date Of Birth</Text>
                <Text style={styles.date}>{dateString}</Text>
                <View>
                    <Button title="Select Date of Birth" onPress={showDatePicker} />
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
                    onChange={(text) => setEmailAddr(text)}/>
                <Text style={styles.fieldTitle}>Contact Number</Text>
                <TextInput style={styles.input} 
                    placeholder="Enter contact number" 
                    value={contactNo} 
                    onChange={(text) => setContactNo(text)}/>
                <Text style={styles.fieldTitle}>Username</Text>
                <TextInput style={styles.input} 
                    placeholder="Enter username" 
                    value={username} 
                    onChange={(text) => setUsername(text)}/>
                <Text style={styles.fieldTitle}>Password</Text>
                <TextInput style={styles.input} 
                    placeholder="Enter password" 
                    secureTextEntry = {true}
                    value={password} 
                    onChange={(text) => setPassword(text)}/>
                <Text style={styles.fieldTitle}>Confirm Password</Text>
                <TextInput style={styles.input} 
                    placeholder="Confirm password" 
                    secureTextEntry = {true} 
                    value={confirmPassword} 
                    onChange={(text) => setConfirmPassword(text)}/>
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity
                //onPress={createAccount}
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