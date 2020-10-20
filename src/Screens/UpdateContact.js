import React, { useState, useEffect } from 'react';
import {
View,
Text,
TextInput,
StyleSheet,
SafeAreaView,
Keyboard,
Button,
TouchableOpacity,
BackHandler,
Alert
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


const UpdateContactScreen = ({navigation}) => {
    const [name, setName] = useState(' ');
    const [mobile, setMobile] = useState(' ');
    const [landline, setLandline] = useState(' ');

    const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to go back?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
          BackHandler.removeEventListener("hardwareBackPress", backAction);
      }, []);

    const handleSaveButton = () => {
        if (!name.trim()) {
            alert('Please fill the name');
            return;
        }
        if (!mobile.trim()) {
            alert('Please fill the mobile number');
            return;
        }

        if (!landline.trim()) {
            alert('Please fill the landline number');
            return;
        }

        if (email === "3" && password === "12345") {

        } else {
            alert('Invalid Email and Password');
        }
    };

    return(
        <SafeAreaView style = {styles.container}>
            <View style = {styles.textView}>
                style = {styles.imageStyle}
                source = require('../assets/camera_icon.png')/>
            </View>
            <View style = {styles.textView}>
                <TextInput style = {styles.textInput}
                    onChangeText={text => setEmail(text)}
                    placeholder="Enter Name"
                    placeholderTextColor="gray"
                />
            </View>
            <View style = {styles.textView}>
                <TextInput style = {styles.textInput}
                    onChangeText={text => setPassword(text)}
                    placeholder="Enter Mobile Number"
                    placeholderTextColor="gray"
                />
            </View>
            <View style = {styles.textView}>
                <TextInput style = {styles.textInput}
                    onChangeText={text => setPassword(text)}
                    placeholder="Enter Landline Number"
                    placeholderTextColor="gray"
                />
            </View>
            <TouchableOpacity
                style={styles.saveBtn}
                onPress = {handleLoginButton}>
               <Text style={styles.saveText}>FAVOURITE</Text>
             </TouchableOpacity>
            <TouchableOpacity
                style={styles.saveBtn}
                onPress = {handleLoginButton}>
               <Text style={styles.saveText}>UPDATE</Text>
             </TouchableOpacity>
            <TouchableOpacity
                style={styles.saveBtn}
                onPress = {handleLoginButton}>
               <Text style={styles.saveText}>DELETE</Text>
             </TouchableOpacity>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : 'white'
    },
     imageStyle : {
         width: 20,
         height: 20,
         resizeMode: 'stretch',
     },
    textView : {
        flexDirection : 'row',
        width:"80%",
        borderColor:"#465881",
        borderRadius:25,
        borderWidth :2,
        height:50,
        marginBottom:20,
        justifyContent:"center",

    },
    textInput : {
        height:50,
        color: "black",
        alignItems:"center",
    },
    saveBtn:{
        width:"100%",
        backgroundColor:"red",
        borderRadius:25,
        height:50,
        alignItems:"flex-end",
        justifyContent:"center",
        marginTop:20,
     },
     saveText: {
        color : "white"
     }


});

export default UpdateContactScreen;
