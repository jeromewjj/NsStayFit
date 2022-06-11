import React, { useState, useEffect } from 'react';
import {useTailwind} from 'tailwind-rn';
import { Button, List, ListItem, Layout, Input, Text, Popover } from '@ui-kitten/components';
import { useFormik } from "formik";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// import {pickImage} from './imagePicker';
import { Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;
export default SubmitIpptPage = () => {
    const tailwind = useTailwind();
    const title = ["2.4 km run", "Sit-up", "Push-up"];    
    const [visible, setVisible] = React.useState(false);

    const { values, handleChange, errors, touched, handleSubmit } = useFormik({
        initialValues: {
            runningMin: "",
            runningSec: "",
            situp: "",
            pushup: "",
            situpVideo: "",
            pushUpVideo: "",
            runVideo: "",
        },

        onSubmit: () => {
            //TODO: upload data to database
            formSubmissionVerification()
            
        },
    });

    const formSubmissionVerification = () => {

        const renderToggleButton = () => (
            <Button onPress={() => setVisible(true)}>
              TOGGLE POPOVER
            </Button>
        );

        <Popover
            backdropStyle={styles.backdrop}
            visible={visible}
            anchor={renderToggleButton}
            onBackdropPress={() => setVisible(false)}>
            <Layout style={styles.content}>
                <Text>
                    Welcome to UI Kitten 😻
                </Text>
            </Layout>
        </Popover>
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
                values.pushUpVideo = result.uri
            } else if (item == 'Sit-up') {
                values.situpVideo = result.uri
            } else {
                values.runVideo = result.uri
            }
        }
    };

    const layoutForRun = (
        <Layout style={tailwind('')}>
            
            <Layout style={tailwind('flex-row h-20 items-center left-8 w-0')}>

                <Layout style={tailwind('flex-row left-2 w-20')}>
                    <Text style={tailwind('text-lg')}>Timing:</Text>
                </Layout>

                <Layout style={tailwind('flex-row items-center')}>
                    <Layout style={tailwind('w-0 right-40')}>
                        <Input
                            style={tailwind('mx-40 w-14')}
                            keyboardType="numeric"
                            value={values.runningMin}
                            placeholder= {"0"}
                            onChangeText={handleChange("runningMin")}
                            maxLength={5}
                        />
                    </Layout>

                    <Layout style={tailwind('w-10 left-16')}>
                        <Text 
                            style={tailwind('text-center text-lg')}>mins</Text>
                    </Layout>

                    <Layout style={tailwind('w-0 ')}>
                        <Input
                            style={tailwind('mx-40 w-14 right-20')}
                            keyboardType="numeric"
                            placeholder= {"0"}
                            value={values.runningSec}
                            onChangeText={handleChange("runningSec")}
                            maxLength={5}
                        />
                    </Layout>

                    <Layout style={tailwind('w-10 left-36')}>
                        <Text style={tailwind('text-center text-lg')}>sec</Text>
                    </Layout>
                </Layout>

            </Layout>
        </Layout>
    )

    const layoutForSitupAndPushup = (props) => {
        return (
            <Layout style={tailwind("flex-row h-20 items-center left-28 w-0")}>
                <Layout style={tailwind('flex-row left-2 w-20')}>
                    <Text style={tailwind('text-center text-lg')}>Reps:</Text>
                </Layout>
                <Layout style={tailwind('w-0 flex-row items-center right-44')}>
                    <Input
                        style={tailwind("w-14 mx-40")}
                        keyboardType="numeric"
                        placeholder= {"0"}
                        value={props == 'Sit-up' ? values.situp : values.pushup}
                        onChangeText={handleChange(props == 'Sit-up' ? "situp" : "pushup")}
                        maxLength={5}
                    />
                </Layout>

            </Layout>
        )
    }

    const tileView = (item) => {
        return (
            <TouchableWithoutFeedback onPress = { () => {Keyboard.dismiss();}}>
                <Layout style={tailwind('flex-grow border-2 border-black ')}>
                    <Layout style={tailwind('flex-col items-center top-1  h-10')}>
                        <Layout style={tailwind('bg-[#d9d9d9] border border-black w-40 rounded')}>
                            <Text style={tailwind('text-lg font-bold text-center text-xl')}>{item}</Text>  
                        </Layout>
                    </Layout>
                    <Layout style={tailwind('flex-col')}>
                        {item == '2.4 km run' ? layoutForRun : layoutForSitupAndPushup(item)}
                        <Layout style={tailwind('flex-col')}>
                            <Layout style={tailwind('h-10')}>
                                <Text style={tailwind('text-center text-lg')}>Choose file to upload:</Text>
                            </Layout>
                            <Button 
                                style={tailwind('mx-36')}
                                onPress={()=>pickImage(item)}
                                size='small'>Upload </Button>
                        </Layout>
                    </Layout>
                </Layout>
            </TouchableWithoutFeedback>
        )
    }

    const renderItem = ({ item, index }) => (
        <ListItem
            style={{height: 230}}
            // title={`${item}`}
            description={tileView(item)}
        />
    );

    return (
        <Layout>
            <Layout style={tailwind('bg-[#d9d9d9] h-16')}>
                <Text style={tailwind('font-bold text-2xl text-center top-4')}> Submit Your Scores!</Text>
            </Layout>
            <List
                style={styles.container}
                data={title}
                renderItem={renderItem}
            />
            <Layout style={tailwind('bg-[#d9d9d9] h-40')}>
                <Button 
                    style={tailwind('mx-36 top-2')}
                    size='small'
                    onPress={handleSubmit}>
                        Submit 
                </Button>
                    
            </Layout>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        maxHeight: windowHeight-190,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 4,
        paddingVertical: 8,
      },
      avatar: {
        marginHorizontal: 4,
      },
      backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
});
