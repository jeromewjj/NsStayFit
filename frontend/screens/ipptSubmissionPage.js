import React, { useState, useEffect, useCallback } from 'react';
import {useTailwind} from 'tailwind-rn';
import { Button, List, ListItem, Layout, Input, Text, Divider, Spinner  } from '@ui-kitten/components';
import { setNestedObjectValues, useFormik } from "formik";
import { Alert, Keyboard, TouchableWithoutFeedback, Image, View  } from "react-native";
import { StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Dimensions } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { ipptSchema } from "./validationSchema.js"
import { calculateIppt } from '../compenents/ippt.js';
import { updateIpptScore } from '../../firebase.js';

export default SubmitIpptPage = () => {
    const tailwind = useTailwind();
    const title = ["2.4 km run", "Sit-up", "Push-up"];    
    const [pushupVideo, setPushupVideo] = useState("");
    const [situpVideo, setSitupVideo] = useState("");
    const [runVideo, setRunVideo] = useState("");
    const navigation = useNavigation();

    const { values, handleChange, errors, touched, handleSubmit, setValues } = useFormik({
        initialValues: {
            runningMin: "",
            runningSec: "",
            situp: "",
            pushup: "",
            ipptPoints: "",
        },

        onSubmit: () => {
            //TODO: upload data to database
            formSubmissionVerification()
        },

        validationSchema: ipptSchema,
    });

    const LoadingIndicator = (props) => (
        <View style={[props.style, styles.indicator]}>
          <Spinner size='small'/>
        </View>
      );

    const handleNavigation = () => {
        navigation.navigate("View Ippt");
    }

    const getIpptScore = () => {
        const runTime =
            parseInt(values.runningMin) * 60 +
            parseInt(values.runningSec);

        const ipptPoints = calculateIppt(21, parseInt(values.pushup), parseInt(values.situp), runTime)

        // update ipptPoints
        setValues({ ...values, ipptPoints})
        console.log("This is the ippt score: " + values.ipptPoints)

        updateIpptScore(values.ipptPoints);
    }

    const formSubmissionVerification = () => {
        if (values.runningMin != "" && values.runningSec != "" && values.situp != "" & values.pushup != "" && pushupVideo && situpVideo && runVideo) {
            Alert.alert(
                "Confirm Submission?",
                "Are you sure you want to submit?",
                [
                    {
                        text: "Confirm",
                        onPress: () => {console.log("Submitting to database!!"), getIpptScore(), handleNavigation()},
                    },
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancelled!!"),
                        style:"cancel"
                    },
                ],
                { cancelable: true }
            );
        } else {
            Alert.alert(
                "Warning!",
                "Please fill in all details before submitting!"
            )
        }

    }

    const pickImage = async (item) => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled) {
            if (item == 'Push-up') {
                setPushupVideo(result.uri)
            } else if (item == 'Sit-up') {
                setSitupVideo(result.uri)
            } else {
                setRunVideo(result.uri)
            }
        }
    };

    // const sleep = (milliseconds) => {
    //     return new Promise(resolve => setTimeout(resolve, milliseconds))
    // }

    const layoutForRun = (
        <Layout style={tailwind('')}>
            
            <Layout style={tailwind('flex-row h-20 items-center left-8 w-0 h-16 left-10')}>

                <Layout style={tailwind('flex-row left-2 w-20')}>
                    <Text style={tailwind('font-bold text-lg')}>Timing:</Text>
                </Layout>

                <Layout style={tailwind('flex-row items-center')}>
                    <Layout style={tailwind('w-0 right-40')}>
                        <Input
                            textStyle={tailwind('text-center')}
                            style={tailwind('mx-40 w-14')}
                            keyboardType="numeric"
                            size = 'small'
                            value={values.runningMin}
                            placeholder= {"0"}
                            onChangeText={handleChange("runningMin")}
                            maxLength={2}
                        />
                    </Layout>

                    <Layout style={tailwind('w-10 left-16')}>
                        <Text 
                            style={tailwind('font-bold text-center text-lg w-12')}>mins</Text>
                    </Layout>

                    <Layout style={tailwind('w-0 ')}>
                        <Input
                            textStyle={tailwind('text-center')}
                            style={tailwind('mx-40 w-14 right-20')}
                            keyboardType="numeric"
                            size = 'small'
                            placeholder= {"0"}
                            value={values.runningSec}
                            onChangeText={handleChange("runningSec")}
                            maxLength={2}
                        />
                    </Layout>

                    <Layout style={tailwind('w-10 left-36')}>
                        <Text style={tailwind('font-bold text-center text-lg')}>sec</Text>
                    </Layout>

                    

                </Layout>
            
            </Layout>
        </Layout>
    )

    const layoutForSitupAndPushup = (props) => {
        return (
            <Layout style={tailwind("flex-row h-20 items-center left-28 w-0 h-16")}>
                <Layout style={tailwind('flex-row left-2 w-20')}>
                    <Text style={tailwind('font-bold text-center text-lg')}>Reps:</Text>
                </Layout>
                <Layout style={tailwind('w-0 flex-row items-center right-44')}>
                    <Input
                        textStyle={tailwind('text-center')}
                        style={tailwind("w-14 mx-40")}
                        keyboardType="numeric"
                        size = 'small'
                        placeholder= {"0"}
                        value={props == 'Sit-up' ? values.situp : values.pushup}
                        onChangeText={handleChange(props == 'Sit-up' ? "situp" : "pushup")}
                        maxLength={2}
                    />
                </Layout>

            </Layout>
        )
    }

    const tileView = (item) => {
        let videoStatus = "";
        let adj = ""
        item == '2.4 km run' ? (videoStatus = runVideo, adj = 'left-6') : 
        item == 'Sit-up' ? (videoStatus = situpVideo, adj = 'left-6') : 
        (videoStatus = pushupVideo, adj = 'left-6')
        return (
            <TouchableWithoutFeedback onPress = { () => {Keyboard.dismiss();}}>
                <Layout style={tailwind()}>
                    <Layout style={tailwind('flex-col items-center top-1 h-14')}>
                        <Layout style={tailwind('border-2 border-red-800 w-40 rounded flex-row content-center items-center left-2 h-10')}>
                            { item == '2.4 km run' ?
                            <FontAwesome5 
                                style= {tailwind('left-3')}
                                name="running"
                                size={22}
                                color="#a12427" /> : item == 'Push-up' ?
                                <Image
                                    source={require('../images/pushup.png')}
                                    fadeDuration={0}
                                    tintColor = "#a12427"
                                    style={tailwind("h-6 w-8 left-3")}
                                /> : item == 'Sit-up' ?
                                <Image
                                    source={require('../images/situp.png')}
                                    fadeDuration={0}
                                    tintColor = "#a12427"
                                    style={tailwind("h-6 w-8 left-3")}
                                /> : null}
                            <Text style={tailwind(`${adj} text-lg font-bold text-center text-red-800 text-xl`)}>{item}</Text>  
                        </Layout>
                    </Layout>
                    <Layout style={tailwind('flex-col')}>
                        {item == '2.4 km run' ? layoutForRun : layoutForSitupAndPushup(item)}
                        {item == '2.4 km run' && ((errors.runningMin && touched.runningMin) ||
                        (errors.runningSec && touched.runningSec)) ? (
                        <Text style={tailwind("font-bold text-red-600 left-28")}>Must be a valid duration</Text>
                        ) : null}
                        {item == 'Sit-up' && (errors.situp && touched.situp) ? (
                        <Text style={tailwind("font-bold text-red-600 left-28")}>{errors.situp}</Text>
                        ) : null}
                        {item == 'Push-up' && (errors.pushup && touched.pushup) ? (
                        <Text style={tailwind("text-red-600 left-28 font-bold")}>{errors.pushup}</Text>
                        ) : null}
                        <Layout style={tailwind('flex-col')}>
                            <Layout style={tailwind('h-10 flex-row items-center left-16 w-20')}>
                                <Text style={tailwind('font-bold text-center text-lg w-60 left-4')}>Choose file to upload:</Text>
                                {videoStatus ? 
                                    <MaterialCommunityIcons 
                                        style={tailwind('right-1')} 
                                        name="check-circle-outline" 
                                        size={24} 
                                        color="green" /> : null}
                            </Layout>
                            <Button 
                                // accessoryLeft = {LoadingIndicator}
                                style={tailwind('mx-36 border-red-800 bg-red-800 border-0')}
                                onPress={()=>pickImage(item)} size='small'>Upload </Button>
                        </Layout>
                    </Layout>
                </Layout>
            </TouchableWithoutFeedback>
        )
    }

    const renderItem = ({ item, index }) => (
        <ListItem
            style={{height: 230}}
            description={tileView(item)}
        />
    );

    return (
        <Layout style={tailwind('flex-grow')}>
            <Layout style={tailwind('bg-red-800 h-20 flex-row justify-center')}>
                    <MaterialCommunityIcons
                        style={tailwind('top-9 right-1')}
                        name="clipboard-outline" 
                        size={24} 
                        color="white" />
                <Text style={tailwind('font-bold text-white text-2xl text-center top-8 ')}> Submit Your Scores</Text>
                    <MaterialCommunityIcons
                        style={tailwind('top-9 left-2')}
                        name="clipboard-outline" 
                        size={24} 
                        color="white"/>
            </Layout>
            <Layout style={tailwind('flex-1')}>
                <List
                    style={tailwind('flex-1')}
                    data={title}
                    ItemSeparatorComponent={Divider}
                    renderItem={renderItem}
                />
                <Layout style={tailwind('flex-col bg-red-800 h-16')}> 
                    <Button 
                        style={tailwind('mx-36 top-2 border-white bg-white border text-red-800 h-12 items-center rounded')}
                        onPress={handleSubmit}>
                            {evaProps => <Text {...evaProps} style={tailwind('text-red-800 font-bold text-lg text-center bottom-1')}>Submit</Text>}
                    </Button>
                </Layout>
            </Layout>
        </Layout>
    );
};

// const styles = StyleSheet.create({
//     container: {
//       flexDirection: 'row',
//       flexWrap: 'wrap',
//     },
//     button: {
//       margin: 2,
//     },
//     indicator: {
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//   });