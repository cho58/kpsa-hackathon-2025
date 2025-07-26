import { Image } from 'expo-image';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('@/assets/images/Icons/Bottom_nav/home_icon_A.png')
                  : require('@/assets/images/Icons/Bottom_nav/home_icon_I.png')
              }
              style={{ width: 28, height: 28 }}
              contentFit="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: '수거함',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('@/assets/images/Icons/Bottom_nav/point_icon_A.png')
                  : require('@/assets/images/Icons/Bottom_nav/point_icon_I.png')
              }
              style={{ width: 28, height: 28 }}
              contentFit="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: '마이페이지',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('@/assets/images/Icons/Bottom_nav/user_icon_A.png')
                  : require('@/assets/images/Icons/Bottom_nav/user_icon_I.png')
              }
              style={{ width: 28, height: 28 }}
              contentFit="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
}
