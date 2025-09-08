import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function AccountScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>الملف الشخصي</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F2F7" },
  content: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18, color: "#111", fontFamily: "Cairo_Bold" },
});


