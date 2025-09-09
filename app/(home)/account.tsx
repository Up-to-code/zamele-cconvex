import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Platform,
  I18nManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Force RTL layout for Arabic
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

const colors = {
  primary: "#007AFF",
  secondary: "#5856D6",
  tertiary: "#000000",
  background: "#F2F2F7",
  card: "#FFFFFF",
  border: "#C6C6C8",
  textSecondary: "#8E8E93",
};

const ProfileScreen = () => {
  // User data
  const userData = {
    name: "محمد أحمد",
    email: "mohamed.ahmed@example.com",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
  };

  // Menu items
  const menuItems = [
    { id: "1", title: "مجموعاتي", icon: "people", color: colors.primary },
    { id: "2", title: "الأصدقاء", icon: "person", color: colors.primary },
    { id: "3", title: "الإعدادات", icon: "settings", color: colors.primary },
    { id: "4", title: "تعديل الملف", icon: "pencil", color: colors.primary },
    { id: "5", title: "المساعدة", icon: "help-circle", color: colors.primary },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>

          <View style={styles.userInfo}>
            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.email}>{userData.email}</Text>
          </View>          <View style={styles.avatarContainer}>
            <Image source={{ uri: userData.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={16} color="white" />
            </TouchableOpacity>
          </View>
          
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>128</Text>
            <Text style={styles.statLabel}>صديق</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>42</Text>
            <Text style={styles.statLabel}>مجموعة</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <View
                style={[
                  styles.menuIconContainer,
                  { backgroundColor: `${item.color}15` },
                ]}
              >
                <Ionicons
                  name={item.icon}
                  size={20}
                  color={item.color}
                />
              </View>
              <Text style={styles.menuText}>{item.title}</Text>
              <View style={styles.spacer} />
              <Ionicons name="chevron-back" size={16} color={colors.border} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>الإجراءات السريعة</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionButton}>
              <View
                style={[styles.actionIcon, { backgroundColor: colors.primary }]}
              >
                <Ionicons name="share" size={20} color="white" />
              </View>
              <Text style={styles.actionText}>مشاركة</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View
                style={[styles.actionIcon, { backgroundColor: colors.primary }]}
              >
                <Ionicons name="person-add" size={20} color="white" />
              </View>
              <Text style={styles.actionText}>إضافة</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View
                style={[styles.actionIcon, { backgroundColor: colors.primary }]}
              >
                <Ionicons name="add" size={20} color="white" />
              </View>
              <Text style={styles.actionText}>جديد</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 20 : 60,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  avatarContainer: {
    position: "relative",
    marginLeft: 16,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: colors.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.card,
  },
  userInfo: {
    flex: 1,
    alignItems: "flex-end",
  },
  name: {
    fontSize: 22,
    color: colors.tertiary,
    marginBottom: 4,
    fontFamily: "Cairo_Medium",
    fontWeight: "700",
  },
  email: {
    fontSize: 15,
    color: colors.textSecondary,
    fontFamily: "Cairo_Medium",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  statCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 6,
  },
  statNumber: {
    fontSize: 20,
    color: colors.primary,
    marginBottom: 4,
    fontFamily: "Cairo_Medium",
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: "Cairo_Medium",
  },
  menuContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  menuText: {
    fontSize: 16,
    color: colors.tertiary,
    fontFamily: "Cairo_Medium",
    marginRight: 12,
  },
  spacer: {
    flex: 1,
  },
  actionsContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    color: colors.tertiary,
    marginBottom: 16,
    textAlign: "right",
    fontFamily: "Cairo_Medium",
    fontWeight: "700",
  },
  actionsRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-around",
  },
  actionButton: {
    alignItems: "center",
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: colors.tertiary,
    fontFamily: "Cairo_Medium",
  },
});

export default ProfileScreen;