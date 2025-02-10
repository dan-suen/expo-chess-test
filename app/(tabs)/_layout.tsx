import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import  SettingsProvider, { useSettings } from '@/app/context/SettingsContext';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text, Dimensions } from 'react-native';

export default function RootLayout() {
  return (
    <SettingsProvider>
      <ImageLayout />
    </SettingsProvider>
  );
}

function ImageLayout() {
  const textSize = Dimensions.get('window').width / 10;
  const {appReady, setAppReady} = useSettings(); 
  SplashScreen.preventAutoHideAsync();
  useEffect(() => {
    const prepareApp = async () => {
      await new Promise((resolve) => setTimeout(resolve, 7000));
      await SplashScreen.hideAsync();
    };

    prepareApp().then(() => setAppReady(true));
  }, []);
  console.log("App Ready: " + appReady)
  if (!appReady) {
    return (
      <View
        style={{
          flex: 1,
          height: '100%',
          justifyContent:'center',
          alignItems:"center"
        }}
      >
        <Text
          style={{
            fontSize: textSize,
            textAlign: 'justify',
            fontFamily: 'Arial',
            fontWeight: 900,
          }}
        >
          Chess EXPO
        </Text>
        <Text
          style={{
            fontSize: textSize,
            textAlign: 'justify',
            fontFamily: 'Arial',
            fontWeight: 900,
            paddingLeft: 40,
            color: 'gray',
          }}
        >
          Chess EXPO
        </Text>
        <Text
          style={{
            fontSize: textSize,
            textAlign: 'justify',
            fontFamily: 'Arial',
            fontWeight: 900,
            paddingLeft: 80,
            color: 'blue',
          }}
        >
          Chess EXPO
        </Text>
        <Text
          style={{
            fontSize: textSize,
            textAlign: 'justify',
            fontFamily: 'Arial',
            fontWeight: 900,
          }}
        >
          Chess EXPO
        </Text>
        <Text
          style={{
            fontSize: textSize,
            textAlign: 'justify',
            fontFamily: 'Arial',
            fontWeight: 900,
            paddingLeft: 40,
            color: 'gray',
          }}
        >
          Chess EXPO
        </Text>
        <Text
          style={{
            fontSize: textSize,
            textAlign: 'justify',
            fontFamily: 'Arial',
            fontWeight: 900,
            paddingLeft: 80,
            color: 'blue',
          }}
        >
          Chess EXPO
        </Text>
        <Text
          style={{
            fontSize: textSize,
            textAlign: 'justify',
            fontFamily: 'Arial',
            fontWeight: 900,
          }}
        >
          Chess EXPO
        </Text>
        <Text
          style={{
            fontSize: textSize,
            textAlign: 'justify',
            fontFamily: 'Arial',
            fontWeight: 900,
            paddingLeft: 40,
            color: 'gray',
          }}
        >
          Chess EXPO
        </Text>
        <Text
          style={{
            fontSize: textSize,
            textAlign: 'justify',
            fontFamily: 'Arial',
            fontWeight: 900,
            paddingLeft: 80,
            color: 'blue',
          }}
        >
          Chess EXPO
        </Text>
        <Text
          style={{
            fontSize: textSize,
            textAlign: 'justify',
            fontFamily: 'Arial',
            fontWeight: 900,
          }}
        >
          Chess EXPO
        </Text>
        <Text
          style={{
            fontSize: textSize,
            textAlign: 'justify',
            fontFamily: 'Arial',
            fontWeight: 900,
            paddingLeft: 40,
            color: 'gray',
          }}
        >
          Chess EXPO
        </Text>
        <Text
          style={{
            fontSize: textSize,
            textAlign: 'justify',
            fontFamily: 'Arial',
            fontWeight: 900,
            paddingLeft: 80,
            color: 'blue',
          }}
        >
          Chess EXPO
        </Text>
        <Text
          style={{
            fontSize: textSize,
            textAlign: 'justify',
            fontFamily: 'Arial',
            fontWeight: 900,
          }}
        >
          Chess EXPO
        </Text>
        <Text
          style={{
            fontSize: textSize,
            textAlign: 'justify',
            fontFamily: 'Arial',
            fontWeight: 900,
            paddingLeft: 40,
            color: 'gray',
          }}
        >
          Chess EXPO
        </Text>
        <Text
          style={{
            fontSize: textSize,
            textAlign: 'justify',
            fontFamily: 'Arial',
            fontWeight: 900,
            paddingLeft: 80,
            color: 'blue',
          }}
        >
          Chess EXPO
        </Text>
      </View>
    );
  }

  return (
    <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#0000f0',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Chess EXPO",
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
