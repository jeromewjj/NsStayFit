import React from 'react';
import {useTailwind} from 'tailwind-rn';
import { Layout, Text, Button, ViewPager, Modal, Card, Input} from '@ui-kitten/components';
import { Alert, Animated, View, ScrollView } from 'react-native';
import { Video } from 'expo-av';

export default NsFitPage = () => {

    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const tailwind = useTailwind();
    const [visible, setVisible] = React.useState(false);
    
    const [burpeesValue, setburpeesValue] = React.useState('');  // value of input from popup
    const [weightLiftingValue, setweightLiftingValue] = React.useState('');  // value of input from popup
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

    const valEndExercise = () => {
      if (startExcerciseValue === '') {
        return 
      }
      setendExcerciseValue(getDate());

    };

    // submission validation
    const formSubmissionVerification = () => {
      if ( startExcerciseValue != "" && endExcerciseValue != "") {
          Alert.alert(
              "Confirm Submission?",
              "Are you sure you want to submit?",
              [
                  {
                      text: "Confirm",
                      onPress: () => {sendData()},
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
              "Warning invalid form entered!",
              "Form contains invalid or missing values. Please fill in details correctly before submitting!"
          )
      }
    }

    // begin workout form validation
    const formBeginWorkoutVerification = () => {
      if  (parseInt(burpeesValue) === 0 ) {
        console.log(parseInt(burpeesValue))
        setburpeesValue('')
      }
      if  (  parseInt(weightLiftingValue) === 0 ) {
        setweightLiftingValue('')
      }
      if  (  parseInt(pushupsValue) === 0  ) {
        setpushupsValue('')
      }
      if  ( parseInt(squatsValue) === 0 ) {
        setsquatsValue('')
      }

      if ( (burpeesValue == '' &&  weightLiftingValue == '' && pushupsValue == '' && squatsValue == '')  || ( parseInt(burpeesValue) === 0 || parseInt(weightLiftingValue) === 0) ||  parseInt(pushupsValue) === 0 ||parseInt(squatsValue) === 0 ) {
          Alert.alert(
            "Warning invalid form entered!",
            "Form contains invalid or missing values. Please fill in details correctly before submitting!"
        )
      } else {
        Alert.alert(
          "Confirm start of workout?",
          "Ready to start?",
          [
              {
                  text: "Yes",
                  onPress: () => {setVisible(false); setstartExcerciseValue(getDate())},
              },
              {
                  text: "Cancel",
                  onPress: () => console.log("Cancelled!!"),
                  style:"cancel"
              },
          ],
          { cancelable: true }
      );
      }
    }
 
    // reset button validation
    const resetVerification = () => {

      if ( true ) {
        Alert.alert(
          "Confirm reset?",
          "Are you sure you want to reset? Resetting would clear all exercise details for this session without submission",
          [
              {
                  text: "Yes",
                  onPress: () => {resetExcercisePlan()},
              },
              {
                  text: "Cancel",
                  onPress: () => console.log("Cancelled!!"),
                  style:"cancel"
              },
          ],
          { cancelable: true }
      );

      }
    }

    // get data to backend
    const sendData = () => {
      const burpeesValue = burpeesValue;
      const weightLiftingValue = weightLiftingValue;
      const pushupsValue = pushupsValue;
      const squatsValue = squatsValue;
      const startExcerciseValue = startExcerciseValue;
      const endExcerciseValue =  endExcerciseValue;

      console.log("Sending data over!!");
      // pass in as props? and send to database whatever is releavant
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
          <Layout style={tailwind('flex items-center justify-center mb-3')}>
              <Text style={tailwind('font-bold text-3xl')}> Workout Session Plan </Text>

              <Text style={{ lineHeight: 30 }}>{ }</Text>
    
              <Card>
                <Text> Burpees Reps  :  {burpeesValue} </Text>
                <Text> Weights Reps  :  {weightLiftingValue} </Text>
                <Text> Pushups Reps :  {pushupsValue} </Text>
                <Text> Squats Reps    :  {squatsValue} </Text>
                <Text> Start Time        :  {startExcerciseValue} </Text>
                <Text> End Time          :  {endExcerciseValue} </Text>
              </Card>

              <Text style={{ lineHeight: 30 }}>{ }</Text>

              <Layout style={tailwind('flex-row flex-1')}> 
                <Button 
                  onPress={() => {resetVerification()}} style={tailwind('flex-1 mt-4 mx-8 rounded-lg p-2')}>
                  Reset Plan
                </Button>

                <Button onPress={() => {formSubmissionVerification()}} style={tailwind('flex-1 mt-4 mx-8 rounded-lg p-2')}>
                  Submit Workout
                </Button>
              </Layout>

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
            placeholder='Leave blank if not required'
            onChangeText={nextValue =>setburpeesValue(nextValue.replace(/[^0-9]/g, ''))}
            maxLength={2}
            />
            
            <Text style={{ lineHeight: 30 }}>{ }</Text>

            <Input
            value={weightLiftingValue}
            keyboardType = 'numeric'
            label='Weight Lifting'
            placeholder='Leave blank if not required'
            onChangeText={nextValue =>setweightLiftingValue(nextValue.replace(/[^0-9]/g, ''))}
            maxLength={2}
            />

            <Text style={{ lineHeight: 30 }}>{ }</Text>

            <Input
            value={pushupsValue}
            keyboardType = 'numeric'
            label='Pushups'
            placeholder='Leave blank if not required'
            onChangeText={nextValue =>setpushupsValue(nextValue.replace(/[^0-9]/g, ''))}
            maxLength={2}
            />

            <Text style={{ lineHeight: 30 }}>{ }</Text>

            <Input
            value={squatsValue}
            keyboardType = 'numeric'
            label='Squats'
            placeholder='Leave blank if not required'
            onChangeText={nextValue =>setsquatsValue(nextValue.replace(/[^0-9]/g, ''))}
            maxLength={2}
            />

            <Text style={{ lineHeight: 30 }}>{ }</Text>

            <Text style={tailwind('font-semibold text-red-600 text-center text-xs')}> Warning: Time starts 30s after pressing Begin </Text>
            <Text style={tailwind('text-center text-sm')}> Please get into positon </Text>
            
            <Layout style={tailwind('flex-1 flex-row')}>
              <Button onPress={() => {formBeginWorkoutVerification()}} style={tailwind('items-center justify-center flex-1 mt-4 mx-4 rounded-lg p-2')}>
                <Text style={tailwind('items-center justify-center')}>   Begin Workout </Text>
              </Button>
              <Button onPress={() => {setVisible(false); resetExcercisePlan()}} style={tailwind('flex-1 mt-4 mx-4 rounded-lg p-2')}>
                Dismiss
              </Button>
            </Layout>

        </Card>
        </ScrollView>
      </Modal>
      
    </Layout>
   );
};