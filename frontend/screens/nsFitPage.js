import React from 'react';
import tailwind from 'tailwind-rn';
import { Layout, Text, Button, ViewPager, ModalService } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

import { Video } from 'expo-av';


export default NsFitPage = () => {

    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    // const devices = useCameraDevices();
    // const device = devices.front;

    return (
    <Layout style={{flexDirection:'column', flexGrow: 1}}>    


      <View style={styles.TopContainer}> 
        <Text style={styles.text}> NS Fit </Text>  
      </View>
      
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20,}}> 
        <Text style={{ marginHorizontal: 8, fontSize: 30,}}> Swipe to select your exercise and follow along</Text>  
      </View>

      <View style={{ flexDirection:'column', flexGrow:2, marginTop: 50,}}> 
        <ViewPager selectedIndex={selectedIndex} onSelect={index => setSelectedIndex(index)} style={{ flex:1,flexGrow:1}}>
          <Layout style={styles.tab} >

            <Text style= {styles.exerciseText}> Burpees </Text>

            <Video source={ require("../../assets/videos/burpeesVideo.mp4") }   // Can be a URL or a local file.
              rate={0.6}
              volume={1.0}
              isMuted={false}
              useNativeControls
              resizeMode="contain"
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              isLooping
              style={{ width: 450, height: 450,  }}
            /> 
            
          </Layout>

          <Layout style={styles.tab} >
            <Text style= {styles.exerciseText}> Weight Lifting </Text>

              <Video source={ require("../../assets/videos/weightLiftingVideo.mp4") }   // Can be a URL or a local file.
                rate={0.8}
                volume={1.0}
                isMuted={false}
                useNativeControls
                resizeMode="contain"
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                isLooping
                style={{ width: 450, height: 450 }}
              /> 
          
          </Layout>

          <Layout style={styles.tab} >
            <Text style={styles.exerciseText}> Pushups </Text>

            <Video source={ require("../../assets/videos/pushupsVideo.mp4") }   // Can be a URL or a local file.
              rate={1.0}
              volume={1.0}
              isMuted={false}
              useNativeControls
              resizeMode="contain"
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              isLooping
              style={{ width: 450, height: 450 }}
            /> 
          
          </Layout>

          <Layout style={styles.tab} >
            <Text style= {styles.exerciseText}> Squats </Text>

            <Video source={ require("../../assets/videos/squatsVideo.mp4") }   // Can be a URL or a local file.
              rate={1.0}
              volume={1.0}
              isMuted={false}
              useNativeControls
              resizeMode="contain"
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              isLooping
              style={{ width:450, height: 450 }}
            />  
          </Layout>

        </ViewPager>
      </View>          
      
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20,}}> 
      <Text style={{ marginHorizontal: 8, fontSize: 30,}}> Tap video to play it </Text>  
      </View>

      <View style={styles.buttoncontainer} >
        <Button style={styles.buttonStyle}> Start Workout </Button>  
        <Button style={styles.buttonStyle}> End Workout </Button>    
      </View>
    </Layout>

    );
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

  },
  buttoncontainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex:1,
    flexDirection: 'row',
  },
  text: {
    marginHorizontal: 8,
    fontWeight: 'bold',
    fontSize: 30,
  },
  buttonStyle: {
    marginBottom: 20,
    padding: 30
  },
  exerciseText:{
    marginBottom: 10,      
    marginHorizontal: 8,
    fontWeight: 'bold',
    fontSize: 30,

  },
  TopContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#909090',
      height: '10%',
      width: '100%'
    },
    tab: {
    
      alignItems: 'center',
      justifyContent: 'center',
    },
});