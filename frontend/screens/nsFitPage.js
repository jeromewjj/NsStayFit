import React from 'react';
import tailwind from 'tailwind-rn';
import { Layout, Text, Button } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

import { Video } from 'expo-av';

export default NsFitPage = () => {

    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    return (
        <Layout >    
            <View style={styles.container}>
                
                <View style={styles.TopContainer}> 
                    <Text style={styles.text}> NS Fit </Text>  
                </View>
                
                <View style={styles.container}> 
                    <Video source={ require("../../assets/videos/burpeesVideo.mp4") }   // Can be a URL or a local file.
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    useNativeControls
                    resizeMode="contain"
                    onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                    isLooping
                    style={{ width: 500, height: 500 }}
                    /> 
                </View>

                <View style={styles.container} >
                        <Button > Start Workout </Button>
                        <Button> End Workout </Button>
                </View>
                    
            </View>
        </Layout>
    );
};


  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    text: {
      marginHorizontal: 8,
      fontWeight: 'bold',
      fontSize: 30,
    },
    TopContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#909090',
        height: '15%',
        width: '100%'
      },
      backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },
  });