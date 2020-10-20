/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
Image,
Text,
TouchableOpacity
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import NewContactScreen from "./src/Screens/NewContact";
import FavouriteListScreen from "./src/Screens/FavouriteContactList";
import ContactListScreen from "./src/Screens/ContactList";
import UpdateContactScreen from "./src/Screens/UpdateContact";

import { Provider } from 'react-redux';
import store from './src/Store/Store.js';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const ContactStack = createStackNavigator();
const FavouriteStack = createStackNavigator();

const drawerOpenCloseHandling = () => {
    return (props.navigation.openDrawer());
};

const Nav = () => {
    return (
        <TouchableOpacity
            style = {{marginLeft:15}}
            onPress = {drawerOpenCloseHandling}>
            <Image
               style={{  width: 20, height: 20 }}
               source={require('./src/assets/nav-icon.png')}
             />
        </TouchableOpacity>
    );
};

const ContactNavigation = () => {
    return (
        <ContactStack.Navigator>
            <ContactStack.Screen name="Contact List" component= {ContactListScreen}
                    options={{
                              headerLeft : props => <Nav {...props} />,
                              title: 'Contact List'
                      }}
            />
        </ContactStack.Navigator>
    );
};
const FavouriteNavigation = () => {
        return (
            <FavouriteStack.Navigator>
                <FavouriteStack.Screen name="Favourite List" component= {FavouriteListScreen}
                        options={{
                                  headerLeft : props => <Nav {...props} />,
                                  title: 'Favourite List'
                          }}
                />
            </FavouriteStack.Navigator>
        );
};

const drawerNav = () => {
    return (
            <Drawer.Navigator initialRouteName="Contacts">
                <Drawer.Screen name="Contacts" component={ContactNavigation} />
                <Drawer.Screen name="Favourites" component={FavouriteNavigation} />
              </Drawer.Navigator>
        );
};

const App = () => {
    return(
            <NavigationContainer >
                        <Stack.Navigator >
                            <Stack.Screen name="Contacts"
                                          component={drawerNav}
                                          options={{
                                                  headerLeft : props => <Nav {...props} />,
                                                  title: 'Contact List'
                                          }}
                             />
                            <Stack.Screen name="New Contact" component={NewContactScreen} />
                            <Stack.Screen name="Update Contact" component={UpdateContactScreen} />
                          </Stack.Navigator>
                    </NavigationContainer>
    );
};


export default App;
