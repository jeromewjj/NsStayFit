import React from 'react';
import {useTailwind} from 'tailwind-rn';
import { Layout, Text, Button, ViewPager, ModalService } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

import { Video } from 'expo-av';

export default NsFitPage = () => {

    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const tailwind = useTailwind();
    
    return (
    <Layout style= {tailwind('flex-col flex-grow')} >    

      <View style={tailwind('bg-slate-200 items-center justify-center')}> 
        <Text style={tailwind('font-bold text-3xl')}> NS Fit </Text>  
      </View>
      
      <View style={tailwind('items-center justify-center mt-5')}> 
        <Text style={tailwind('text-xl')}> Swipe to select exercise and follow along</Text>  
        <Text style={tailwind('text-2xl mt-2')}> Tap video to play it </Text>  
      </View>

      <View style= {tailwind('flex-col flex-1 mt-8')}> 
        <ViewPager selectedIndex={selectedIndex} onSelect={index => setSelectedIndex(index)} style={{ flex:1,flexGrow:1}}>
          <Layout style={tailwind('items-center justify-center')} >

            <Text style={tailwind('font-bold text-3xl mb-3')}> Burpees </Text>

            <Video source={ require("../../assets/videos/burpeesVideo.mp4") }   // Can be a URL or a local file.
              rate={0.6}
              volume={1.0}
              isMuted={false}
              useNativeControls
              resizeMode="contain"
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              isLooping
              style={{ width: 250, height: 250,  }}
            /> 
            
          </Layout>

          <Layout style={tailwind('items-center justify-center mb-3')}>
            <Text style={tailwind('font-bold text-3xl')}> Weight Lifting </Text>

              <Video source={ require("../../assets/videos/weightLiftingVideo.mp4") }   // Can be a URL or a local file.
                rate={0.8}
                volume={1.0}
                isMuted={false}
                useNativeControls
                resizeMode="contain"
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                isLooping
                style={{ width: 250, height: 250 }}
              /> 
          
          </Layout>

          <Layout style={tailwind('items-center justify-center mb-3')}>
            <Text style={tailwind('font-bold text-3xl')}> Pushups </Text>

            <Video source={ require("../../assets/videos/pushupsVideo.mp4") }   // Can be a URL or a local file.
              rate={1.0}
              volume={1.0}
              isMuted={false}
              useNativeControls
              resizeMode="contain"
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              isLooping
              style={{ width: 250, height: 250 }}
            /> 
          
          </Layout>

          <Layout style={tailwind('items-center justify-center mb-3')}>
            <Text style={tailwind('font-bold text-3xl')}> Squats </Text>

            <Video source={ require("../../assets/videos/squatsVideo.mp4") }   // Can be a URL or a local file.
              rate={1.0}
              volume={1.0}
              isMuted={false}
              useNativeControls
              resizeMode="contain"
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              isLooping
              style={{ width:250, height: 250 }}
            />  
          </Layout>

        </ViewPager>
      </View>          
      
      <View style={tailwind(' flex-grow items-center justify-center flex-row')}>
        <Button style={tailwind('text-3xl mx-4')}> Start Workout </Button>  
        <Button style={tailwind('text-3xl mx-4')}> End Workout </Button>    
      </View>
    </Layout>

    );
};