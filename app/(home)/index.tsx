import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import React, { useEffect } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { api } from "../../convex/_generated/api";
import { useUserStore } from "../../lib/store/userStore";

export default function Home() {
  const {
    name,
    email,
    year,
    userType,
    universityId,
    sectionId,
    setName,
    setEmail,
    setYear,
    setUserType,
    setUniversity,
    setSection,
  } = useUserStore();
  const { user } = useUser();
  const convexUser = useQuery(api.users.getByClerkId, user?.id ? { clerkUserId: user.id } : ("skip" as any));

  useEffect(() => {
    if (convexUser) {
      if (convexUser.name && convexUser.name !== name) setName(convexUser.name);
      if (convexUser.email && convexUser.email !== email) setEmail(convexUser.email);
      if (convexUser.year && convexUser.year !== year) setYear(convexUser.year);
      if (convexUser.userType && convexUser.userType !== userType) setUserType(convexUser.userType);
      if (convexUser.universityId && convexUser.universityId !== universityId) setUniversity(convexUser.universityId);
      if (convexUser.sectionId && convexUser.sectionId !== sectionId) setSection(convexUser.sectionId);
    }
  }, [convexUser, name, email, year, userType, universityId, sectionId, setName, setEmail, setYear, setUserType, setUniversity, setSection]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {!convexUser ? (
          <View style={{ paddingTop: 32, alignItems: "center" }}>
            <ActivityIndicator />
          </View>
        ) : null}
        <Text style={styles.header}>الملف الشخصي</Text>

        <View style={styles.field}>
          <Text style={styles.label}>الاسم</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="اسمك" placeholderTextColor="#9AA0A6" />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>البريد الإلكتروني</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="email@example.com" placeholderTextColor="#9AA0A6" />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>السنة الدراسية</Text>
          <TextInput style={styles.input} value={year} onChangeText={setYear} placeholder="1 - 5" placeholderTextColor="#9AA0A6" />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>النوع</Text>
          <View style={styles.segment}>
            <Text onPress={() => setUserType("student")} style={[styles.segmentItem, userType === "student" && styles.segmentItemActive]}>طالب</Text>
            <Text onPress={() => setUserType("teacher")} style={[styles.segmentItem, userType === "teacher" && styles.segmentItemActive]}>معلم</Text>
          </View>
        </View>

        <View style={styles.fieldRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>الجامعة</Text>
            <TextInput style={styles.input} value={universityId ?? ""} onChangeText={setUniversity} placeholder="ID" placeholderTextColor="#9AA0A6" />
          </View>
          <View style={{ width: 12 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>القسم</Text>
            <TextInput style={styles.input} value={sectionId ?? ""} onChangeText={setSection} placeholder="ID" placeholderTextColor="#9AA0A6" />
          </View>
        </View>

        <Text style={styles.help}>يتم حفظ التغييرات تلقائيًا.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F2F7" },
  content: { padding: 16, gap: 14 },
  header: { fontSize: 24, color: "#111", fontFamily: "Cairo_Bold", textAlign: "center", marginBottom: 4 },
  field: { gap: 6 },
  fieldRow: { flexDirection: "row-reverse", alignItems: "flex-start", marginTop: 6 },
  label: { color: "#6B7280", fontSize: 14, fontFamily: "Cairo_Medium", textAlign: "right" },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111",
    textAlign: "right",
    fontFamily: "Cairo_Medium",
  },
  segment: {
    flexDirection: "row-reverse",
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    overflow: "hidden",
  },
  segmentItem: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 10,
    color: "#111",
    fontFamily: "Cairo_Medium",
  },
  segmentItemActive: {
    backgroundColor: "#fff",
    color: "#007AFF",
  },
  help: { textAlign: "center", color: "#8E8E93", marginTop: 4, fontFamily: "Cairo_Medium" },
});