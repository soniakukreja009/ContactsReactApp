import React, { useState, useEffect } from 'react';
import {
View,
Text,
StyleSheet,
SafeAreaView,
StatusBar,
Keyboard,
BackHandler,
FlatList,
Alert,
ActivityIndicator,
Image,
TouchableOpacity
} from 'react-native';

import {
Container, Header, Title, Left, Icon,
Right, Button, Body, Content, Card, CardItem, Fab } from "native-base";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';



import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { Appbar } from 'react-native-paper';


const ContactListScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [contacts, setContacts] = useState([]);

    const getProducts = () => {
      let products = [];
      db.listProduct().then((data) => {
        products = data;
        this.setState({
          products,
          isLoading: false,
        });
      }).catch((err) => {
        console.log(err);
        this.setState = {
          isLoading: false
        }
      })
    };

    const renderItem = ({item}) => (
            <Item
                name = {item.name}
            />
        );

    const moveToNewContactScreen = () => {
        navigation.navigate('New Contact');
    };

    return(
        <Container>
            <Header transparent/>
            <View style={{ flex: 1 }}>
              <Fab
                active={true}
                containerStyle={{ }}
                style={{ backgroundColor: 'white' }}
                position="bottomRight"
                onPress= {moveToNewContactScreen}>
               <Icon name = "md-bandage" style = {{color: 'blue'}}/>
              </Fab>
            </View>
         </Container>
/*         <SafeAreaView>
            <FlatList
                                         data={contacts}
                                         keyExtractor={item => item.id.toString()}
                                         renderItem={renderItem}
                                       />
         </SafeAreaView>*/
    );
};

const Item = ({name}) => (
    <View style = {styles.item}>
        <Image
            style = {styles.imageStyle}
            source = {require('../assets/camera_icon.png')}
            />

        <Text style = {styles.title}>
            {name}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems : 'center',
        justifyContent : 'center',
        padding: 8
    },
    item : {
        flexDirection : "row",
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 10,
        backgroundColor : Colors.white,
        elevation: 3

    },
    title : {
        fontSize : 16,
        paddingBottom: 6,
        color : Colors.black
    },
    imageStyle : {
        width: 20,
        height: 20,
        resizeMode: 'stretch',
    },
    errorView : {
        alignItems : "center",
    },
    errorMainTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    errorSubTitle: {
        fontSize: 14,
        marginTop:5,
    },
    reloadText :{
        fontSize: 14,
        color: "#147EFB",
        fontWeight: 'bold'
    },
    reloadBtn:{
        marginTop: 5,
    },

});

export default ContactListScreen;