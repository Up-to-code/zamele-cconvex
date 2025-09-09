import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
  Platform,
  ScrollView,
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

// Mock data for groups
const groupsData = [
  {
    id: "1",
    name: "مطوري React Native",
    members: 128,
    lastActive: "نشط الآن",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    isPrivate: false,
    unreadCount: 3,
  },
  {
    id: "2",
    name: "مصممي UI/UX",
    members: 86,
    lastActive: "نشط منذ ٢ ساعة",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    isPrivate: true,
    unreadCount: 0,
  },
  {
    id: "3",
    name: "متعلمي اللغة الإنجليزية",
    members: 245,
    lastActive: "نشط منذ ٥ دقائق",
    image:
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    isPrivate: false,
    unreadCount: 12,
  },
  {
    id: "4",
    name: "مجموعة القراءة",
    members: 72,
    lastActive: "نشط أمس",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    isPrivate: true,
    unreadCount: 0,
  },
  {
    id: "5",
    name: "مجموعة الرياضة",
    members: 156,
    lastActive: "نشط منذ ساعة",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    isPrivate: false,
    unreadCount: 5,
  },
];

const GroupsScreen = () => {
  const [groups, setGroups] = useState(groupsData);

  const renderGroupItem = ({ item }) => (
    <TouchableOpacity style={styles.groupCard}>
      <Image source={{ uri: item.image }} style={styles.groupImage} />
      
      <View style={styles.groupInfo}>
        <View style={styles.groupHeader}>
          <Text style={styles.groupName} numberOfLines={1}>
            {item.name}
          </Text>
          {item.isPrivate && (
            <Ionicons
              name="lock-closed"
              size={16}
              color={colors.textSecondary}
              style={styles.lockIcon}
            />
          )}
        </View>
        
        <View style={styles.groupDetails}>
          <Text style={styles.memberCount}>{item.members} أعضاء</Text>
          <Text style={styles.groupActivity}>{item.lastActive}</Text>
        </View>
      </View>
      
      <View style={styles.groupRightSection}>
        {item.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unreadCount}</Text>
          </View>
        )}
        <Ionicons name="chevron-back" size={20} color={colors.border} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>المجموعات</Text>
        <TouchableOpacity style={styles.createButton}>
          <Ionicons name="add" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={groups}
        renderItem={renderGroupItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.promoSection}>
            <View style={styles.promoCard}>
              <View style={styles.promoContent}>
                <Text style={styles.promoTitle}>انضم إلى مجتمعنا</Text>
                <Text style={styles.promoText}>
                  اكتشف مجموعات جديدة تناسب اهتماماتك
                </Text>
                <TouchableOpacity style={styles.promoButton}>
                  <Text style={styles.promoButtonText}>استكشف الآن</Text>
                </TouchableOpacity>
              </View>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
                }}
                style={styles.promoImage}
              />
            </View>
            
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{groups.length}</Text>
                <Text style={styles.statLabel}>المجموعات</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>
                  {groups.reduce((total, group) => total + group.members, 0)}
                </Text>
                <Text style={styles.statLabel}>الأعضاء</Text>
              </View>
            </View>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 20 : 60,
    paddingBottom: 16,
    backgroundColor: colors.background,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.tertiary,
  },
  createButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.primary}15`,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  promoSection: {
    marginBottom: 24,
  },
  promoCard: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  promoContent: {
    flex: 1,
    alignItems: "flex-end",
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 4,
  },
  promoText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
    textAlign: "right",
  },
  promoButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  promoButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  promoImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginLeft: 12,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  groupCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  groupImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginLeft: 12,
  },
  groupInfo: {
    flex: 1,
    justifyContent: "center",
  },
  groupHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 8,
  },
  groupName: {
    fontSize: 17,
    color: colors.tertiary,
    fontWeight: "600",
  },
  lockIcon: {
    marginLeft: 6,
  },
  groupDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  memberCount: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  groupActivity: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  groupRightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  unreadBadge: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    minWidth: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  unreadText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default GroupsScreen;