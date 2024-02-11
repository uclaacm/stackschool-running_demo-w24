import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Post from './components/Post';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
					initialRouteName="Home"
					screenOptions={{
						headerShown: false,
					}}
			>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
			</Stack.Navigator>
		</NavigationContainer>
	);
}