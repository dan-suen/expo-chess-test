import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import  ImageProvider from '@/app/context/ImageContext';



export default function RootLayout() {
  return (
    <ImageProvider>
      <ImageLayout />
    </ImageProvider>
  );
}

function ImageLayout() {
  return (
    <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#0000f0',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? 'home-sharp' : 'home-outline'}
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? 'settings-sharp' : 'settings-outline'}
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: 'About',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={
                  focused ? 'information-circle' : 'information-circle-outline'
                }
                color={color}
                size={24}
              />
            ),
          }}
        />
      </Tabs>
  );
}
