import { Header } from "@/components/common";
import { BottomTabBar } from "@/components/layout/BottomTabBar";
import colors from "@/config/color";
import { Tabs } from "expo-router";
import React from "react";
import { SafeAreaView, View } from "react-native";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        header: () => (
          <SafeAreaView>
            <View>
              <Header />
            </View>
          </SafeAreaView>
        ),
        tabBarStyle: { display: "none", backgroundColor: colors.background },
      }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "الرئيسية",
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "إنشاء",
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "الحساب",
        }}
      />
    </Tabs>
  );
}
