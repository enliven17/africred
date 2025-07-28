import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@/screens/main/HomeScreen';
import MissionsScreen from '@/screens/main/MissionsScreen';
import CoursesScreen from '@/screens/main/CoursesScreen';
import CommunityScreen from '@/screens/main/CommunityScreen';
import ProfileScreen from '@/screens/main/ProfileScreen';
import MissionDetailScreen from '@/screens/main/MissionDetailScreen';
import CourseDetailScreen from '@/screens/main/CourseDetailScreen';
import WalletScreen from '@/screens/main/WalletScreen';
import SettingsScreen from '@/screens/main/SettingsScreen';
import { MainTabParamList, RootStackParamList } from '@/types';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#F5A323',
        tabBarInactiveTintColor: '#737373',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Missions" component={MissionsScreen} />
      <Tab.Screen name="Courses" component={CoursesScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="Mission" component={MissionDetailScreen} />
      <Stack.Screen name="Course" component={CourseDetailScreen} />
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator; 