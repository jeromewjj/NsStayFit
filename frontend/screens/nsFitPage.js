import React from 'react';
import {useTailwind} from 'tailwind-rn';
import { Layout, Text, Button, ViewPager, Modal, Card, Input} from '@ui-kitten/components';
import { Alert, Animated, View, ScrollView } from 'react-native';
import { Video } from 'expo-av';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export default NsFitPage = () => {

    const tailwind = useTailwind();

    const [status, setStatus] = React.useState({});
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    
    // set modal visible or not
    const [visible, setVisible] = React.useState(false);
    
    // varaibles used in forms
    const [burpeesValue, setburpeesValue] = React.useState(''); 
    const [weightLiftingValue, setweightLiftingValue] = React.useState(''); 
    const [pushupsValue, setpushupsValue] = React.useState('');  
    const [squatsValue, setsquatsValue] = React.useState(''); 
    const [startExcerciseValue, setstartExcerciseValue] = React.useState('');  
    const [endExcerciseValue, setendExcerciseValue] = React.useState('');  
    
    // get current day-month-date-time-year
    const getDate = () => {
      const currentDate = new Date;
      const localDate = currentDate.toLocaleString('en-US', 'Asia/Singapore')
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

    const Header = () => {
        return  (     
          <Layout style={tailwind('bg-[#a12427] items-center justify-center h-20 flex-row')}> 
            <MaterialIcons
            name="fitness-center" 
            size={30} 
            style={{transform: [{rotateY: '180deg'}]}}
            color="white" />

            <Text style={tailwind('font-bold text-3xl text-white')}>     NS Fit     </Text>  

            <MaterialIcons
            name="fitness-center" 
            size={30} 
            color="white" />

          </Layout>
        )
    }

    const Instructions  = () => {
      return  ( 
      <Layout style={tailwind('items-center justify-center mt-5')}> 
        <Text style={tailwind('font-semibold text-red-800 text-xl')}> Swipe for exercise videos and follow along</Text>  
        <Text style={tailwind('font-semibold text-red-800 text-2xl mt-2')}> Tap video to play </Text>  
      </Layout>
      )
    }

    return (
    <Layout style= {tailwind('flex-col flex-grow')} >    
     
      <Header/>
      
      <Instructions/>

      <View style= {tailwind('flex-col flex-1 mt-8')}> 
        <ViewPager selectedIndex={selectedIndex} onSelect={index => setSelectedIndex(index)} style={{ flex:1,flexGrow:1, position: 'absolute'}}>
          <Layout style={tailwind('flex items-center justify-center mb-3')}>

          <Layout style={tailwind('flex-row flex-grow items-center justify-center')}> 
              <Text style={tailwind('text-red-800 font-bold text-3xl')}> Workout Session Plan </Text>

              <MaterialCommunityIcons
              name="clipboard-outline" 
              size={30} 
              color="#a12427" />

          </Layout>
              <Text style={{ lineHeight: 30 }}>{ }</Text>
    
              <Card style={tailwind('bg-red-200 border-2')}>
                <Text style={tailwind('text-[#a12427] font-bold')}> Burpees Reps  :  {burpeesValue} </Text>
                <Text style={tailwind('text-[#a12427] font-bold')}> Weights Reps  :  {weightLiftingValue} </Text>
                <Text style={tailwind('text-[#a12427] font-bold')}> Pushups Reps :  {pushupsValue} </Text>
                <Text style={tailwind('text-[#a12427] font-bold')}> Squats Reps    :  {squatsValue} </Text>
                <Text style={tailwind('text-[#a12427] font-bold')}> Start Time        :  {startExcerciseValue} </Text>
                <Text style={tailwind('text-[#a12427] font-bold')}> End Time          :  {endExcerciseValue} </Text>
              </Card>

              <Text style={{ lineHeight: 40 }}>{ }</Text>

              <Layout style={tailwind('flex-row flex-1')}> 
                <Button 
                  onPress={() => {resetVerification()}} style={tailwind('border-[#a12427] bg-[#a12427] border-0 flex-1 mt-4 mx-8 rounded-lg p-2')}>
                  Reset Plan
                </Button>
                <Button onPress={() => {formSubmissionVerification()}} style={tailwind('border-[#a12427] bg-[#a12427] border-0 flex-1 mt-4 mx-8 rounded-lg p-2')}>
                  Submit Workout
                </Button>
              </Layout>
          </Layout>
        
          <Layout style={tailwind('items-center justify-center')} >
            <Text style={tailwind('font-bold text-3xl mb-3 text-[#a12427]')}> Burpees </Text>
            <Video source={ require("../../assets/videos/burpeesVideo.mp4") }   // Can be a URL or a local file.
              rate={0.6}
              volume={1.0}
              isMuted={false}
              useNativeControls
              resizeMode="contain"
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              isLooping
              style={{ width: 250, height: 250, }}
            /> 
          </Layout>

          <Layout style={tailwind('items-center justify-center')}>
            <Text style={tailwind('font-bold text-3xl mb-3 text-[#a12427]')}> Weight Lifting </Text>
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

          <Layout style={tailwind('items-center justify-center')}>
            <Text style={tailwind('font-bold text-3xl mb-3 text-[#a12427]')}> Pushups </Text>

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

          <Layout style={tailwind('items-center justify-center')}>
            <Text style={tailwind('font-bold text-3xl mb-3 text-[#a12427]')}> Squats </Text>

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
        <Button style={tailwind('border-[#a12427] bg-[#a12427] border-0 text-3xl mx-4 rounded-lg p-4 ')} onPress={() => setVisible(true)} > Plan Workout </Button>  
        <Button style={tailwind('border-[#a12427] bg-[#a12427] border-0 text-3xl mx-4 rounded-lg p-4')} onPress={() => valEndExercise()} > End Workout </Button>    
      </View>
 
      <Modal visible={visible} style={tailwind('mb-28 w-4/5 bg-red-100 border-2')}>
      <ScrollView >
        <Card disabled={true} style={tailwind('bg-red-100 border-0')}>
            <Layout style={tailwind('bg-red-100 flex-row items-center justify-center content-center')}> 
              <MaterialCommunityIcons
              name="clipboard-outline" 
              size={20} 
             
              color="#a12427" />
              
              <Text style={tailwind('font-bold text-xl text-center text-[#a12427]')}> Plan Your Exercise </Text> 

              <MaterialCommunityIcons
              name="clipboard-outline" 
              size={20} 
              color="#a12427" />
            </Layout>

            <Text style={tailwind('text-center text-sm text-[#a12427]')}>  Enter the number of reps you want to perform for each exercise </Text>
            
            <Input
            style={tailwind('bg-red-50')}
            value={burpeesValue}
            keyboardType = 'numeric'
            label='Burpees'
            placeholder='Leave blank if unrequired'
            onChangeText={nextValue =>setburpeesValue(nextValue.replace(/[^0-9]/g, ''))}
            maxLength={2}
            
            />
            
            <Input
            style={tailwind('bg-red-50')}
            value={weightLiftingValue}
            keyboardType = 'numeric'
            label='Weight Lifting'
            placeholder='Leave blank if unrequired'
            onChangeText={nextValue =>setweightLiftingValue(nextValue.replace(/[^0-9]/g, ''))}
            maxLength={2}
            />

            <Input
            style={tailwind('bg-red-50')}
            value={pushupsValue}
            keyboardType = 'numeric'
            label='Pushups'
            placeholder='Leave blank if unrequired'
            onChangeText={nextValue =>setpushupsValue(nextValue.replace(/[^0-9]/g, ''))}
            maxLength={2}
            />

            <Input
            style={tailwind('bg-red-50')}
            value={squatsValue}
            keyboardType = 'numeric'
            label='Squats'
            placeholder='Leave blank if unrequired'
            onChangeText={nextValue =>setsquatsValue(nextValue.replace(/[^0-9]/g, ''))}
            maxLength={2}
            />

            <Text style={{ lineHeight: 30 }}>{ }</Text>

            <Text style={tailwind('font-semibold text-red-600 text-center text-xs')}> Warning: Time starts 30s after pressing Begin </Text>
            <Text style={{ lineHeight: 30 }}>{ }</Text>
            <Text style={tailwind('text-center text-sm')}> Please get into positon </Text>
            
            <Text style={{ lineHeight: 30 }}>{ }</Text>
     

            <Layout style={tailwind('flex-1 flex-row bg-red-100 border-0')}>
              <Button onPress={() => {formBeginWorkoutVerification()}} style={tailwind('border-[#a12427] bg-[#a12427] items-center justify-center flex-1 mt-4 mx-4 rounded-lg p-2 border-0')}>
                <Text style={tailwind('items-center justify-center')}>   Begin Workout </Text>
              </Button>
              <Button onPress={() => {setVisible(false); resetExcercisePlan()}} style={tailwind('border-[#a12427] bg-[#a12427] flex-1 mt-4 mx-4 rounded-lg p-2 border-0')}>
                Dismiss
              </Button>
            </Layout>

        </Card>
        </ScrollView>
      </Modal>
      
    </Layout>
   );
};