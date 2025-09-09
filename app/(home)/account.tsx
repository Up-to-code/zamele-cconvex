import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Platform,
  I18nManager
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Force RTL layout if not already enabled
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

const colors = {
  primary: "#4A6FFF",
  secondary: "#FF7D4A",
  tertiary: "#6B7280",
  background: "#F8FAFF",
  card: "#FFFFFF",
}

const ProfileScreen = () => {
  // User data
  const userData = {
    name: 'محمد أحمد',
    email: 'mohamed.ahmed@example.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
  };

  // Menu items
  const menuItems = [
    { id: '1', title: 'مجموعاتي', icon: 'people', color: '#4A6FFF' },
    { id: '2', title: 'الأصدقاء', icon: 'person', color: '#FF7D4A' },
    { id: '3', title: 'الإعدادات', icon: 'settings', color: '#10B981' },
    { id: '4', title: 'تعديل الملف', icon: 'pencil', color: '#8B5CF6' },
    { id: '5', title: 'المساعدة', icon: 'help-circle', color: '#EC4899' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Header with decorative elements */}
      <View style={styles.headerDecoration}>
        <View style={[styles.decorationCircle, styles.circle1]} />
        <View style={[styles.decorationCircle, styles.circle2]} />
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: userData.avatar }} style={styles.avatar} />
            <View style={styles.onlineIndicator} />
          </View>
          
          <View style={styles.userInfo}>
            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.email}>{userData.email}</Text>
          </View>
          
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>42</Text>
            <Text style={styles.statLabel}>مجموعة</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>128</Text>
            <Text style={styles.statLabel}>صديق</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>16</Text>
            <Text style={styles.statLabel}>نشاط</Text>
          </View>
        </View>
        
        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <View style={[styles.menuIconContainer, { backgroundColor: `${item.color}15` }]}>
                <Ionicons name={item.icon} size={20} color={item.color} />
              </View>
              <Text style={styles.menuText}>{item.title}</Text>
              <Ionicons name="chevron-back" size={16} color="#D1D5DB" />
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>الإجراءات السريعة</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: '#10B981' }]}>
                <Ionicons name="add" size={24} color="white" />
              </View>
              <Text style={styles.actionText}>جديد</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: colors.secondary }]}>
                <Ionicons name="person-add" size={24} color="white" />
              </View>
              <Text style={styles.actionText}>إضافة</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: '#8B5CF6' }]}>
                <Ionicons name="share" size={24} color="white" />
              </View>
              <Text style={styles.actionText}>مشاركة</Text>
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
  headerDecoration: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: 0,
  },
  decorationCircle: {
    position: 'absolute',
    borderRadius: 100,
    opacity: 0.1,
  },
  circle1: {
    width: 200,
    height: 200,
    backgroundColor: colors.primary,
    top: -80,
    right: -50,
  },
  circle2: {
    width: 150,
    height: 150,
    backgroundColor: colors.secondary,
    top: -30,
    left: -50,
  },
  scrollView: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 60,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16, // Changed from marginLeft
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'white',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: 'white',
  },
  userInfo: {
    flex: 1,
    alignItems: 'flex-end', // Right align for RTL
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
    textAlign: 'right', // RTL support
  },
  email: {
    fontSize: 15,
    color: colors.tertiary,
    textAlign: 'right', // RTL support
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  statCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.tertiary,
  },
  menuContainer: {
    backgroundColor: colors.card,
    borderRadius: 20,
    marginHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row-reverse', // Reverse order for RTL
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12, // Changed from marginLeft
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    textAlign: 'right', // RTL support
  },
  actionsContainer: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'right', // RTL support
  },
  actionsRow: {
    flexDirection: 'row-reverse', // Reverse order for RTL
    justifyContent: 'space-around',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: colors.tertiary,
    fontWeight: '500',
  },
});

export default ProfileScreen;