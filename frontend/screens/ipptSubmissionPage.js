import React from 'react';
import {useTailwind} from 'tailwind-rn';
import { Button, Icon, List, ListItem, Layout, Input, Text } from '@ui-kitten/components';
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { StyleSheet } from 'react-native';

export default SubmitIpptPage = () => {
    const tailwind = useTailwind();
    const title = ["2.4 km run", "Sit-ups", "Push-ups"];

    const LayoutForRun = (
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
                            value={''}
                            // onChangeText={handleChange("weight")}
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
                            value={''}
                            // onChangeText={handleChange("weight")}
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

    const LayoutForSitupAndPushup = (
        <Layout style={tailwind("flex-row h-20 items-center left-28 w-0")}>
            <Layout style={tailwind('flex-row left-2 w-20')}>
                <Text style={tailwind('text-center text-lg')}>Reps:</Text>
            </Layout>

            <Layout style={tailwind('w-0 flex-row items-center right-44')}>
                <Input
                    style={tailwind("w-14 mx-40")}
                    keyboardType="numeric"
                    value={''}
                    // onChangeText={handleChange("weight")}
                    maxLength={5}
                />
            </Layout>

        </Layout>
    )

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
                        {item == '2.4 km run' ? LayoutForRun : LayoutForSitupAndPushup}
                        <Layout style={tailwind('flex-col')}>
                            <Layout style={tailwind('h-10')}>
                                <Text style={tailwind('text-center text-lg')}>Choose file to upload:</Text>
                            </Layout>
                            <Button 
                                style={tailwind('mx-36')}
                                size='small'>Upload </Button>
                        </Layout>
                    </Layout>
                </Layout>
            </TouchableWithoutFeedback>
        )
    }
    
    // const renderItemAccessory = (props) => (
    //     <Layout >
    //         <Button 
    //             style={tailwind('m-1')}
    //             size='tiny'>Upload</Button>
    //     </Layout>
    // );

        
    // const renderItemIcon = (props) => (
    //     <Icon {...props} name='person'/>
    // );

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
            <Layout> 
                <List
                    style={styles.container}
                    data={title}
                    renderItem={renderItem}
                />
            </Layout>
            <Layout style={tailwind('bg-[#d9d9d9] h-40')}>
                <Button 
                    style={tailwind('mx-36 top-2')}
                    size='small'>Submit </Button>
            </Layout>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        maxHeight: 490,
    },
    element: {
        height: 100,
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
