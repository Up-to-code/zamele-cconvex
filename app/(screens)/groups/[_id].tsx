import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Platform,
  FlatList,
  I18nManager,
  SafeAreaView,
  TextStyle,
  ViewStyle,
  ImageStyle,
  Alert,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

// Force RTL layout for Arabic
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

// Define the FeedPost and FileAttachment types
export interface FeedPost {
  id: string;
  user: {
    name: string;
    avatarUrl?: string;
    verified?: boolean;
  };
  text: string;
  images?: string[];
  files?: FileAttachment[];
  likesCount: number;
  commentsCount: number;
  likedByMe: boolean;
  createdAt: string;
}

export interface FileAttachment {
  uri: string;
  name: string;
  type: string;
  size?: number;
}

// Theme configuration - PayPal-inspired
const theme = {
  colors: {
    primary: "#0070BA",
    secondary: "#003087",
    tertiary: "#001C45",
    background: "#F5F7FA",
    white: "#FFFFFF",
    lightGray: "#F5F5F5",
    gray: "#8E8E93",
    success: "#34C759",
    border: "#E0E0E0",
    textPrimary: "#2D2D2D",
    textSecondary: "#6C6C6C",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 6,
    md: 12,
    lg: 20,
  },
  typography: {
    h1: {
      fontSize: 24,
      fontWeight: "700" as const,
    },
    h2: {
      fontSize: 20,
      fontWeight: "600" as const,
    },
    body: {
      fontSize: 16,
      fontWeight: "400" as const,
    },
    caption: {
      fontSize: 14,
      fontWeight: "400" as const,
    },
  },
};

// Types
interface User {
  id: string;
  name: string;
  avatar: string;
  verified?: boolean;
}

interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
  online: number;
  lastActive: string;
  image: string;
  isPrivate: boolean;
  isMember: boolean;
  admin: User;
}

interface Post {
  id: string;
  user: User;
  content: string;
  time: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  files?: FileAttachment[];
  images?: string[];
}

// Helper to get file icon based on type
const getFileIcon = (fileType: string): keyof typeof Ionicons.glyphMap => {
  const type = fileType.toLowerCase();
  if (type.includes("pdf")) return "document-text";
  if (type.includes("word") || type.includes("doc")) return "document";
  if (type.includes("code") || type.includes("txt")) return "code";
  if (type.includes("sheet") || type.includes("excel")) return "stats-chart";
  if (type.includes("zip") || type.includes("rar")) return "archive";
  if (type.includes("image")) return "image";
  if (type.includes("video")) return "videocam";
  if (type.includes("audio")) return "musical-notes";
  return "document";
};

// Helper to format file size
const formatFileSize = (bytes: number): string => {
  if (!bytes || bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// File attachment component
const FileAttachmentItem: React.FC<{
  file: FileAttachment;
  onPress: (uri: string, name: string) => void;
}> = ({ file, onPress }) => {
  const iconName = getFileIcon(file.type);

  return (
    <TouchableOpacity
      style={styles.fileItem}
      onPress={() => onPress(file.uri, file.name)}
      activeOpacity={0.7}
    >
      <View style={styles.fileIconContainer}>
        <Ionicons name={iconName} size={20} color={theme.colors.primary} />
      </View>
      <View style={styles.fileInfo}>
        <Text style={styles.fileName} numberOfLines={1}>
          {file.name}
        </Text>
        <Text style={styles.fileMeta} numberOfLines={1}>
          {file.type.toUpperCase()}{" "}
          {file.size ? `• ${formatFileSize(file.size)}` : ""}
        </Text>
      </View>
      <Ionicons name="download-outline" size={18} color={theme.colors.gray} />
    </TouchableOpacity>
  );
};

const UniversityPostCard: React.FC<{
  post: FeedPost;
  onLikePress?: (postId: string) => void;
  onCommentPress?: (postId: string) => void;
  onFilePress?: (fileUrl: string, fileName: string) => void;
}> = ({ post, onLikePress, onCommentPress, onFilePress }) => {
  const {
    id,
    user,
    text,
    images = [],
    files = [],
    likesCount = 0,
    commentsCount = 0,
    likedByMe,
    createdAt,
  } = post;

  const handleFilePress = (uri: string, name: string) => {
    if (onFilePress) {
      onFilePress(uri, name);
    } else {
      // Default behavior: try to open the file
      Linking.openURL(uri).catch((err) =>
        console.error("Failed to open file:", err)
      );
    }
  };

  return (
    <View style={styles.card}>
      <View style={[styles.headerRow, styles.rtlRow]}>
        {user.avatarUrl ? (
          <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={18} color={theme.colors.primary} />
          </View>
        )}
        <View style={styles.titleWrap}>
          <View style={[styles.nameRow, styles.rtlRow]}>
            <Text style={[styles.name, styles.rtlText]} numberOfLines={1}>
              {user.name}
            </Text>
            {user.verified && (
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={theme.colors.success}
                style={styles.verifiedIcon}
              />
            )}
          </View>
          <Text style={[styles.subtitle, styles.rtlText]} numberOfLines={1}>
            {createdAt}
          </Text>
        </View>
      </View>

      {!!text && <Text style={[styles.text, styles.rtlText]}>{text}</Text>}

      {images.length > 0 && (
        <View style={[styles.imagesGrid, styles.rtlRow]}>
          {images.slice(0, 4).map((uri, idx) => (
            <Image
              key={`${id}-image-${idx}`}
              source={{ uri }}
              style={[
                styles.image,
                images.length === 1 && styles.singleImage,
                images.length >= 3 && idx === 0 && styles.wideImage,
              ]}
              resizeMode="cover"
            />
          ))}
        </View>
      )}

      {files && files.length > 0 && (
        <View style={styles.filesContainer}>
          {files.map((file, index) => (
            <FileAttachmentItem
              key={`${id}-file-${index}`}
              file={file}
              onPress={handleFilePress}
            />
          ))}
        </View>
      )}

      <View style={[styles.actionsRow, styles.rtlRow]}>
        <TouchableOpacity
          onPress={() => onLikePress?.(id)}
          style={styles.actionBtn}
          activeOpacity={0.7}
        >
          <Ionicons
            name={likedByMe ? "heart" : "heart-outline"}
            size={18}
            color={likedByMe ? "#FF2D55" : theme.colors.gray}
          />
          <Text style={styles.actionText}>{likesCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onCommentPress?.(id)}
          style={styles.actionBtn}
          activeOpacity={0.7}
        >
          <Ionicons name="chatbubble-outline" size={18} color={theme.colors.gray} />
          <Text style={styles.actionText}>{commentsCount}</Text>
        </TouchableOpacity>

        {/* Share button */}
        <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
          <Ionicons name="share-social-outline" size={18} color={theme.colors.gray} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Header Component
const GroupHeader = ({ group, onBack }: { group: Group; onBack: () => void }) => (
  <View style={styles.groupHeader}>
    <Image source={{ uri: group.image }} style={styles.groupCover} />
    
    <View style={styles.headerActions}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color={theme.colors.white} />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.headerButton}>
        <Ionicons name="search" size={24} color={theme.colors.white} />
      </TouchableOpacity>
    </View>

    <View style={styles.groupInfo}>
      <Text style={styles.groupName}>{group.name}</Text>
      <Text style={styles.groupDescription}>{group.description}</Text>
      
      <View style={styles.groupStats}>
        <View style={styles.statItem}>
          <Ionicons name="people" size={16} color={theme.colors.gray} />
          <Text style={styles.statText}>{group.members} أعضاء</Text>
        </View>
        <View style={styles.statItem}>
          <View style={styles.onlineIndicator} />
          <Text style={styles.statText}>{group.online} متصل الآن</Text>
        </View>
      </View>

      <View style={styles.groupActions}>
        {group.isMember ? (
          <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
            <Ionicons name="chatbubble" size={16} color="white" />
            <Text style={styles.primaryButtonText}>المحادثة</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
            <Ionicons name="person-add" size={16} color="white" />
            <Text style={styles.primaryButtonText}>انضم إلى المجموعة</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
          <Ionicons name="notifications" size={16} color={theme.colors.primary} />
          <Text style={styles.secondaryButtonText}>الإشعارات</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

// Tab Navigation Component
const TabNavigation = ({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) => {
  const tabs = [
    { id: "posts", label: "المنشورات", icon: "document-text" as const },
    { id: "members", label: "الأعضاء", icon: "people" as const },
    { id: "info", label: "المعلومات", icon: "information-circle" as const },
  ];

  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, activeTab === tab.id && styles.activeTab]}
          onPress={() => onTabChange(tab.id)}
        >
          <Ionicons 
            name={tab.icon} 
            size={20} 
            color={activeTab === tab.id ? theme.colors.primary : theme.colors.gray} 
          />
          <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Members Tab Component
const MembersTab = () => (
  <View style={styles.tabContent}>
    <Ionicons name="people" size={48} color={theme.colors.gray} />
    <Text style={styles.tabPlaceholderText}>قائمة الأعضاء ستظهر هنا</Text>
  </View>
);

// Info Tab Component
const InfoTab = () => (
  <View style={styles.tabContent}>
    <Ionicons name="information-circle" size={48} color={theme.colors.gray} />
    <Text style={styles.tabPlaceholderText}>معلومات المجموعة ستظهر هنا</Text>
  </View>
);

// Create Post Button Component
const CreatePostButton = ({ visible, onPress }: { visible: boolean; onPress: () => void }) => {
  if (!visible) return null;
  
  return (
    <TouchableOpacity style={styles.createPostButton} onPress={onPress}>
      <Ionicons name="create" size={24} color="white" />
    </TouchableOpacity>
  );
};

// Main Component
const GroupDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [group, setGroup] = useState(groupData);
  const [posts, setPosts] = useState(postsData);
  const [activeTab, setActiveTab] = useState("posts");

  const toggleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.likes + (post.isLiked ? -1 : 1) }
          : post
      )
    );
  };

  const handleFilePress = (fileUrl: string, fileName: string) => {
    Alert.alert(
      "فتح الملف",
      `ما الذي تريد فعله مع الملف ${fileName}؟`,
      [
        {
          text: "فتح",
          onPress: () => Linking.openURL(fileUrl).catch(err => 
            console.error("Failed to open file:", err)
          ),
        },
        {
          text: "تحميل",
          onPress: () => {
            // Add download functionality here
            console.log("Download file:", fileUrl);
          },
        },
        {
          text: "إلغاء",
          style: "cancel",
        },
      ]
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "posts":
        return (
          <View style={styles.postsContainer}>
            <FlatList
              data={posts}
              renderItem={({ item }) => (
                <UniversityPostCard
                  post={{
                    id: item.id,
                    user: {
                      name: item.user.name,
                      avatarUrl: item.user.avatar,
                      verified: item.user.verified,
                    },
                    text: item.content,
                    images: item.images || [],
                    files: item.files || [],
                    likesCount: item.likes,
                    commentsCount: item.comments,
                    likedByMe: item.isLiked,
                    createdAt: item.time,
                  }}
                  onLikePress={() => toggleLike(item.id)}
                  onCommentPress={() => console.log("Comment pressed:", item.id)}
                  onFilePress={handleFilePress}
                />
              )}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        );
      case "members":
        return <MembersTab />;
      case "info":
        return <InfoTab />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <GroupHeader group={group} onBack={() => router.back()} />
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        {renderTabContent()}
      </ScrollView>

      <CreatePostButton 
        visible={activeTab === "posts" && group.isMember} 
        onPress={() => console.log("Create post")} 
      />
    </SafeAreaView>
  );
};

// Mock data
const groupData: Group = {
  id: "1",
  name: "مطوري React Native",
  description: "مجموعة مخصصة لمطوري React Native لمشاركة المعرفة والخبرات",
  members: 128,
  online: 23,
  lastActive: "نشط الآن",
  image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
  isPrivate: false,
  isMember: true,
  admin: {
    id: "1",
    name: "أحمد محمد",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
    verified: true,
  },
};

const postsData: Post[] = [
  {
    id: "1",
    user: {
      id: "2",
      name: "سارة عبدالله",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
      verified: true,
    },
    content: "ما هي أفضل المكتبات لإدارة الحالة في React Native؟",
    time: "منذ ساعتين",
    likes: 24,
    comments: 8,
    isLiked: false,
    files: [
      {
        uri: "https://example.com/document.pdf",
        name: "دليل React Native.pdf",
        type: "application/pdf",
        size: 2048576,
      },
    ],
  },
  {
    id: "2",
    user: {
      id: "3",
      name: "محمد علي",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
    },
    content: "شاركني تجربتك مع React Native في تطبيقات الإنتاج الكبيرة",
    time: "منذ ٥ ساعات",
    likes: 42,
    comments: 12,
    isLiked: true,
    files: [
      {
        uri: "https://example.com/presentation.pptx",
        name: "عرض تقديمي.pptx",
        type: "application/vnd.ms-powerpoint",
        size: 5048576,
      },
      {
        uri: "https://example.com/image.jpg",
        name: "لقطة شاشة.jpg",
        type: "image/jpeg",
        size: 1024576,
      },
    ],
  },
  {
    id: "3",
    user: {
      id: "4",
      name: "فاطمة إبراهيم",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
      verified: true,
    },
    content: "كيف يمكن تحسين أداء التطبيقات في React Native؟",
    time: "منذ يوم",
    likes: 37,
    comments: 5,
    isLiked: false,
    images: [
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1566837945700-30057527ade0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    ],
  },
];

// Styles - PayPal-inspired design with RTL support
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  groupHeader: {
    position: "relative",
    marginBottom: theme.spacing.md,
  },
  groupCover: {
    width: "100%",
    height: 200,
  },
  headerActions: {
    position: "absolute",
    top: Platform.OS === "android" ? (StatusBar.currentHeight || 0) + theme.spacing.md : theme.spacing.xl,
    left: theme.spacing.md,
    right: theme.spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  groupInfo: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
    marginTop: -theme.borderRadius.lg,
  },
  groupName: {
    fontSize: theme.typography.h1.fontSize,
    fontWeight: theme.typography.h1.fontWeight,
    color: theme.colors.tertiary,
    marginBottom: theme.spacing.sm,
    textAlign: "right",
  },
  groupDescription: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.fontWeight,
    color: theme.colors.gray,
    marginBottom: theme.spacing.md,
    textAlign: "right",
    lineHeight: 24,
  },
  groupStats: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: theme.spacing.md,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: theme.spacing.md,
  },
  onlineIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.success,
    marginRight: theme.spacing.xs,
  },
  statText: {
    fontSize: theme.typography.caption.fontSize,
    fontWeight: theme.typography.caption.fontWeight,
    color: theme.colors.gray,
    marginRight: theme.spacing.xs,
  },
  groupActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    marginLeft: theme.spacing.sm,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
  },
  secondaryButton: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  primaryButtonText: {
    fontSize: theme.typography.caption.fontSize,
    fontWeight: "600" as const,
    color: theme.colors.white,
    marginRight: theme.spacing.sm,
  },
  secondaryButtonText: {
    fontSize: theme.typography.caption.fontSize,
    fontWeight: "600" as const,
    color: theme.colors.primary,
    marginRight: theme.spacing.sm,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: theme.colors.white,
    marginHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  activeTab: {
    backgroundColor: `${theme.colors.primary}15`,
  },
  tabText: {
    fontSize: theme.typography.caption.fontSize,
    fontWeight: "600" as const,
    color: theme.colors.gray,
    marginRight: theme.spacing.xs,
  },
  activeTabText: {
    color: theme.colors.primary,
  },
  postsContainer: {
    marginHorizontal: theme.spacing.md,
  },
  separator: {
    height: theme.spacing.sm,
  },
  tabContent: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.xl,
    marginHorizontal: theme.spacing.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  tabPlaceholderText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.gray,
    textAlign: "center",
    marginTop: theme.spacing.md,
  },
  createPostButton: {
    position: "absolute",
    bottom: theme.spacing.lg,
    left: theme.spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // UniversityPostCard styles
  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5F1FF",
    alignItems: "center",
    justifyContent: "center",
  },
  titleWrap: {
    flex: 1,
    justifyContent: "center",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  name: {
    fontSize: 15,
    color: theme.colors.textPrimary,
    fontWeight: "600",
    flexShrink: 1,
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  subtitle: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  text: {
    fontSize: 14,
    color: theme.colors.textPrimary,
    lineHeight: 22,
  },
  imagesGrid: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  image: {
    height: 120,
    borderRadius: 10,
    backgroundColor: "#F2F2F7",
    flex: 1,
    minWidth: 100,
    maxWidth: "100%",
  },
  singleImage: {
    flex: 1,
    height: 200,
  },
  wideImage: {
    flex: 2,
  },
  filesContainer: {
    gap: 10,
  },
  fileItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  fileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#E7F3FF",
    alignItems: "center",
    justifyContent: "center",
    marginEnd: 12,
  },
  fileInfo: {
    flex: 1,
    gap: 4,
    marginEnd: 8,
  },
  fileName: {
    fontSize: 14,
    color: theme.colors.textPrimary,
    fontWeight: "500",
  },
  fileMeta: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: "#F2F2F7",
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  actionText: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    minWidth: 20,
    textAlign: "center",
  },
  rtlRow: { flexDirection: "row-reverse" },
  rtlText: { textAlign: "right" },
});

export default GroupDetailScreen;