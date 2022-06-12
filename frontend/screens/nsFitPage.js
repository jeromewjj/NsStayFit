import React from 'react';
import {useTailwind} from 'tailwind-rn';
import { Layout, Text, Button, ViewPager, Modal, Card, Input} from '@ui-kitten/components';
import { Animated, View, ScrollView } from 'react-native';
import { Video } from 'expo-av';

export default NsFitPage = () => {

    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const tailwind = useTailwind();
    const [visible, setVisible] = React.useState(false);
    
    const [burpeesValue, setburpeesValue] = React.useState('');  // value of input from popup
    const [weightLiftingvalue, setweightLiftingValue] = React.useState('');  // value of input from popup
    const [pushupsValue, setpushupsValue] = React.useState('');  // value of input from popup
    const [squatsValue, setsquatsValue] = React.useState('');  // value of input from popup

    const [startExcerciseValue, setstartExcerciseValue] = React.useState('');  // value of input from popup
    const [endExcerciseValue, setendExcerciseValue] = React.useState('');  // value of input from popup
    
    // get current day-month-date-time-year
    const getDate = () => {
      const currentDate = new Date;
      const localDate = currentDate.toLocaleString('en-US', 'Asia/Singapore')
      console.log(localDate);
      return localDate;
    };

    // reset all data
    const resetExcercisePlan = () => {
      setburpeesValue('');
      setweightLiftingValue('');
      setpushupsValue('');
      setsquatsValue('');
      setstartExcerciseValue('');
      setendExcerciseValue('');
    };

    // get data to backend
    const sendData = () => {
      const burpeesValue = burpeesValue;
      const weightLiftingValue = weightLiftingValue;
      const pushupsValue = pushupsValue;
      const squatsValue = squatsValue;
      const startExcerciseValue = startExcerciseValue;
      const endExcerciseValue =  endExcerciseValue;

      // pass in as props? and send to database whatever is releavant
    };

    const valEndExercise = () => {
      if (startExcerciseValue === '') {
        return 
      }
      setendExcerciseValue(getDate());

    };

    return (
    <Layout style= {tailwind('flex-col flex-grow')} >    
     
      <Layout style={tailwind('bg-slate-200 items-center justify-center h-16')}> 
        <Text style={tailwind('font-bold text-3xl')}> NS Fit </Text>  
      </Layout>
      
      <Layout style={tailwind('items-center justify-center mt-5')}> 
        <Text style={tailwind('text-xl')}> Swipe for exercise videos and follow along</Text>  
        <Text style={tailwind('text-2xl mt-2')}> Tap video to play </Text>  
      </Layout>

      <View style= {tailwind('flex-col flex-1 mt-8')}> 
        <ViewPager selectedIndex={selectedIndex} onSelect={index => setSelectedIndex(index)} style={{ flex:1,flexGrow:1}}>
          <Layout style={tailwind('items-center justify-center mb-3')}>
              <Text style={tailwind('font-bold text-3xl')}> Workout Session Plan </Text>

              <Text style={{ lineHeight: 30 }}>{ }</Text>

              <Card>
                <Text> Burpees Reps  :  {burpeesValue} </Text>
                <Text> Weights Reps  :  {burpeesValue} </Text>
                <Text> Pushups Reps :  {pushupsValue} </Text>
                <Text> Squats Reps    :  {squatsValue} </Text>
                <Text> Start Time        :  {startExcerciseValue} </Text>
                <Text> End Time          :  {endExcerciseValue} </Text>
              </Card>

              <Text style={{ lineHeight: 30 }}>{ }</Text>

              <Button 
                onPress={() => {setVisible(false); resetExcercisePlan()}} style={tailwind('mt-4 mx-4 rounded-lg p-2')}>
                Reset Plan
              </Button>

          </Layout>
        
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
      
      <View style={tailwind(' flex-grow items-center justify-center flex-row mt-8 ')}>
        <Button style={tailwind('text-3xl mx-4 rounded-lg p-4 ')} onPress={() => setVisible(true)} > Plan Workout </Button>  
        <Button style={tailwind('text-3xl mx-4 rounded-lg p-4')} onPress={() => valEndExercise()} > End Workout </Button>    
      </View>


 
      <Modal visible={visible} style={tailwind('h-4/5 w-4/5 mt-16 mb-0')}>
      <ScrollView >
        <Card disabled={true}>

            <Text style={tailwind('font-bold text-xl text-center')}> Plan Your Exercise </Text> 
            
            <Text style={{ lineHeight: 30 }}>{ }</Text>

            <Text style={tailwind('text-center')}>  Enter the number reps you want to perform for each exercise </Text>

            <Text style={{ lineHeight: 30 }}>{ }</Text>
            
            <Input
            value={burpeesValue}
            keyboardType = 'numeric'
            label='Burpees'
            placeholder='Enter desired number of reps'
            onChangeText={nextValue =>setburpeesValue(nextValue)}
            maxLength={2}
            />
            
            <Text style={{ lineHeight: 30 }}>{ }</Text>

            <Input
            value={weightLiftingvalue}
            keyboardType = 'numeric'
            label='Weight Lifting'
            placeholder='Enter desired number of reps'
            onChangeText={nextValue =>setweightLiftingValue(nextValue)}
            maxLength={2}
            />

            <Text style={{ lineHeight: 30 }}>{ }</Text>

            <Input
            value={pushupsValue}
            keyboardType = 'numeric'
            label='Pushups'
            placeholder='Enter desired number of reps'
            onChangeText={nextValue =>setpushupsValue(nextValue)}
            maxLength={2}
            />

            <Text style={{ lineHeight: 30 }}>{ }</Text>

            <Input
            value={squatsValue}
            keyboardType = 'numeric'
            label='Squats'
            placeholder='Enter desired number of reps'
            onChangeText={nextValue =>setsquatsValue(nextValue)}
            maxLength={2}
            />

            <Text style={{ lineHeight: 30 }}>{ }</Text>

            <Text style={tailwind('font-semibold text-red-600 text-center text-xs')}> Warning: Time starts 30s after pressing Begin </Text>
            <Text style={tailwind('text-center text-sm')}> Please get into positon </Text>
            
            <Button 
              onPress={() => {setVisible(false); setstartExcerciseValue(getDate())}} style={tailwind('mt-4 mx-4 rounded-lg p-4')}>
              Begin Workout
            </Button>

        </Card>
        </ScrollView>
      </Modal>
      
    </Layout>
   );
};