import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import  SettingsProvider from '@/app/context/SettingsContext';



export default function RootLayout() {
  return (
    <SettingsProvider>
      <ImageLayout />
    </SettingsProvider>
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
            title: "",
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
