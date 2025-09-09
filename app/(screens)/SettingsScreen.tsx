import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  Switch,
  I18nManager
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
  success: "#34C759",
  danger: "#FF3B30",
  warning: "#FF9500"
}

// Define TypeScript interfaces for our settings items
interface BaseSettingsItem {
  id: string;
  title: string;
  icon: string;
  color: string;
  type: string;
}

interface LinkSettingsItem extends BaseSettingsItem {
  type: 'link';
}

interface ActionSettingsItem extends BaseSettingsItem {
  type: 'action';
}

interface ToggleSettingsItem extends BaseSettingsItem {
  type: 'toggle';
  value: boolean;
  onValueChange: (value: boolean) => void;
}

type SettingsItem = LinkSettingsItem | ActionSettingsItem | ToggleSettingsItem;

interface SettingsSection {
  title: string;
  items: SettingsItem[];
}

const SettingsScreen = () => {
  // State for toggles
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [autoUpdate, setAutoUpdate] = React.useState(true);
  const [wifiOnly, setWifiOnly] = React.useState(false);

  // Settings sections with proper typing
  const settingsSections: SettingsSection[] = [
    {
      title: "الحساب",
      items: [
        { 
          id: '1', 
          title: 'معلومات الحساب', 
          icon: 'person', 
          color: colors.primary,
          type: 'link'
        },
        { 
          id: '2', 
          title: 'خصوصية الحساب', 
          icon: 'lock-closed', 
          color: colors.primary,
          type: 'link'
        },
        { 
          id: '3', 
          title: 'تغيير كلمة المرور', 
          icon: 'key', 
          color: colors.primary,
          type: 'link'
        },
      ]
    },
    {
      title: "التفضيلات",
      items: [
        { 
          id: '4', 
          title: 'الإشعارات', 
          icon: 'notifications', 
          color: colors.success,
          type: 'toggle',
          value: notifications,
          onValueChange: setNotifications
        },
        { 
          id: '5', 
          title: 'الوضع الليلي', 
          icon: 'moon', 
          color: colors.tertiary,
          type: 'toggle',
          value: darkMode,
          onValueChange: setDarkMode
        },
        { 
          id: '6', 
          title: 'التحديث التلقائي', 
          icon: 'refresh', 
          color: colors.warning,
          type: 'toggle',
          value: autoUpdate,
          onValueChange: setAutoUpdate
        },
        { 
          id: '13', 
          title: 'التحديث عبر Wi-Fi فقط', 
          icon: 'wifi', 
          color: colors.primary,
          type: 'toggle',
          value: wifiOnly,
          onValueChange: setWifiOnly
        },
      ]
    },
    {
      title: "عام",
      items: [
        { 
          id: '7', 
          title: 'المساعدة والدعم', 
          icon: 'help-circle', 
          color: colors.primary,
          type: 'link'
        },
        { 
          id: '8', 
          title: 'عن التطبيق', 
          icon: 'information', 
          color: colors.primary,
          type: 'link'
        },
        { 
          id: '9', 
          title: 'شارك التطبيق', 
          icon: 'share', 
          color: colors.primary,
          type: 'link'
        },
        { 
          id: '10', 
          title: 'تقييم التطبيق', 
          icon: 'star', 
          color: colors.warning,
          type: 'link'
        },
      ]
    },
    {
      title: "الإجراءات",
      items: [
        { 
          id: '11', 
          title: 'تسجيل الخروج', 
          icon: 'log-out', 
          color: colors.danger,
          type: 'action'
        },
        { 
          id: '12', 
          title: 'حذف الحساب', 
          icon: 'trash', 
          color: colors.danger,
          type: 'action'
        },
      ]
    }
  ];

  const handleAction = (itemId: string) => {
    // Handle different actions based on itemId
    console.log(`Action triggered for item: ${itemId}`);
  };

  // Type guard to check if an item is a toggle item
  const isToggleItem = (item: SettingsItem): item is ToggleSettingsItem => {
    return item.type === 'toggle';
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>الإعدادات</Text>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.sectionContainer}>
            {section.title && <Text style={styles.sectionTitle}>{section.title}</Text>}
            <View style={styles.menuContainer}>
              {section.items.map((item, itemIndex) => (
                <View key={item.id}>
                  <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={() => {
                      if (item.type === 'link' || item.type === 'action') {
                        handleAction(item.id);
                      }
                    }}
                  >
                    <View style={[styles.menuIconContainer, {backgroundColor: `${item.color}15`}]}>
                      <Ionicons name={item.icon as any} size={20} color={item.color} />
                    </View>
                    
                    <Text style={styles.menuText}>{item.title}</Text>
                    
                    <View style={styles.spacer} />
                    
                    {isToggleItem(item) ? (
                      <Switch
                        value={item.value}
                        onValueChange={item.onValueChange}
                        trackColor={{ false: "#E5E7EB", true: `${item.color}` }}
                        thumbColor={"#FFFFFF"}
                      />
                    ) : (
                      <Ionicons name="chevron-back" size={16} color={colors.border} />
                    )}
                  </TouchableOpacity>
                  
                  {/* Separator line - don't show after last item */}
                  {itemIndex < section.items.length - 1 && (
                    <View style={styles.separator} />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}
        
        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>الإصدار 1.0.0</Text>
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
  header: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 20 : 60,
    paddingBottom: 16,
    backgroundColor: colors.background,
  },
  headerTitle: {
    fontSize: 34,
    color: colors.tertiary,
    textAlign: 'right',
    fontWeight: '700',
    fontFamily: 'Cairo_Bold',
  },
  scrollView: {
    flex: 1,
  },
  sectionContainer: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 8,
    paddingHorizontal: 20,
    textAlign: 'right',
    fontWeight: '500',
    letterSpacing: -0.2,
    fontFamily: 'Cairo_Medium',
  },
  menuContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 44,
  },
  menuIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  menuText: {
    fontSize: 17,
    color: colors.tertiary,
    textAlign: 'right',
    fontFamily: 'Cairo_Medium',
  },
  spacer: {
    flex: 1,
  },
  separator: {
    height: 0.5,
    backgroundColor: colors.border,
    marginLeft: 60, // Align with text
  },
  versionContainer: {
    alignItems: 'center',
    marginVertical: 24,
    marginBottom: 40,
  },
  versionText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default SettingsScreen;