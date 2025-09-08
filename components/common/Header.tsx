import { useUserStore } from '@/lib/store/userStore';
import { useRouter } from 'expo-router';
import React from 'react';
import { I18nManager, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  showSearchButton?: boolean;
  onSearchPress?: () => void;
  showNotificationsButton?: boolean;
  onNotificationsPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  onBackPress,
  showSearchButton = true,
  onSearchPress,
  showNotificationsButton = true,
  onNotificationsPress,
}) => {
  const router = useRouter();
  const { name, avatarUrl, plan } = useUserStore();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
      return;
    }
    if (router.canGoBack()) router.back();
  };

  return (
    <View style={[styles.container, I18nManager.isRTL && styles.containerRtl]}>
      <View style={[styles.leftArea, I18nManager.isRTL && styles.alignEnd]}>
        {showBackButton ? (
          <TouchableOpacity onPress={handleBack} style={styles.backButton} accessibilityRole="button" accessibilityLabel="Back" hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.backText}>{I18nManager.isRTL ? '›' : '‹'}</Text>
          </TouchableOpacity>
        ) : (
          <View style={[styles.userInfo, I18nManager.isRTL && styles.rtlRow]}>
            {avatarUrl ? (
              <Image source={{ uri: avatarUrl }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarInitial}>{name?.[0]?.toUpperCase() || 'U'}</Text>
              </View>
            )}
            <View style={styles.namePlan}>
              <Text style={styles.nameText} numberOfLines={1}>
                {name || 'المستخدم'}
              </Text>
              {!!plan && (
                <Text style={styles.planText}>{plan}</Text>
              )}
            </View>
          </View>
        )}
      </View>

      <View style={styles.centerArea}>
        {!!title && (
          <Text style={[styles.titleText, I18nManager.isRTL && styles.rtlText]} numberOfLines={1}>
            {title}
          </Text>
        )}
      </View>

      <View style={[styles.rightArea, I18nManager.isRTL && styles.alignStart]}>
        {showSearchButton && (
          <TouchableOpacity onPress={onSearchPress} style={styles.iconButton} accessibilityRole="button" accessibilityLabel="Search" hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.iconText}>🔍</Text>
          </TouchableOpacity>
        )}
        {showNotificationsButton && (
          <TouchableOpacity onPress={onNotificationsPress} style={styles.iconButton} accessibilityRole="button" accessibilityLabel="Notifications" hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.iconText}>🔔</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5EA',
  },
  containerRtl: {
    flexDirection: 'row-reverse',
  },
  leftArea: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  centerArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightArea: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 80,
  },
  alignStart: {
    justifyContent: 'flex-start',
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  backText: {
    fontSize: 28,
    color: '#007AFF',
  },
  titleText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Cairo_Bold',
  },
  rtlText: {
    textAlign: 'right',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rtlRow: {
    flexDirection: 'row-reverse',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E5EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'Cairo_Bold',
  },
  namePlan: {
    maxWidth: '75%',
  },
  nameText: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Cairo_Bold',
  },
  planText: {
    fontSize: 12,
    color: '#8E8E93',
    fontFamily: 'Cairo_Medium',
    textTransform: 'uppercase',
  },
  rightAction: {
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  rightActionText: {
    fontSize: 16,
    color: '#007AFF',
    fontFamily: 'Cairo_Bold',
  },
  iconButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  iconText: {
    fontSize: 18,
  },
});

export default Header;

