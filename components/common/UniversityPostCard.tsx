import type { FeedPost } from '@/types/feed';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface UniversityPostCardProps {
  post: FeedPost;
  onLikePress?: (postId: string) => void;
  onCommentPress?: (postId: string) => void;
}

const UniversityPostCard: React.FC<UniversityPostCardProps> = ({ post, onLikePress, onCommentPress }) => {
  const {
    id,
    user,
    text,
    images = [],
    likesCount = 0,
    commentsCount = 0,
    likedByMe,
    createdAt,
  } = post;
  return (
    <View style={styles.card}>
      <View style={[styles.headerRow, styles.rtlRow]}>
        {user.avatarUrl ? (
          <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="school" size={18} color="#007AFF" />
          </View>
        )}
        <View style={styles.titleWrap}>
          <View style={[styles.nameRow, styles.rtlRow]}>
            <Text style={[styles.name, styles.rtlText]} numberOfLines={1}>{user.name}</Text>
            {user.verified && <Ionicons name="checkmark-circle" size={16} color="#34C759" />}
          </View>
          <Text style={[styles.subtitle, styles.rtlText]} numberOfLines={1}>{createdAt}</Text>
        </View>
      </View>

      {!!text && <Text style={[styles.text, styles.rtlText]}>{text}</Text>}

      {images.length > 0 && (
        <View style={[styles.imagesGrid, styles.rtlRow]}>
          {images.slice(0, 2).map((uri, idx) => (
            <Image key={`${uri}-${idx}`} source={{ uri }} style={styles.image} />
          ))}
        </View>
      )}

      <View style={[styles.actionsRow, styles.rtlRow]}>
        <TouchableOpacity onPress={() => onLikePress?.(id)} style={styles.actionBtn} activeOpacity={0.7}>
          <Ionicons name={likedByMe ? 'heart' : 'heart-outline'} size={18} color={likedByMe ? '#FF2D55' : '#8E8E93'} />
          <Text style={styles.actionText}>{likesCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onCommentPress?.(id)} style={styles.actionBtn} activeOpacity={0.7}>
          <Ionicons name={'chatbubble-outline'} size={18} color={'#8E8E93'} />
          <Text style={styles.actionText}>{commentsCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
    backgroundColor: '#E5F1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrap: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  name: { fontSize: 14, color: '#111', fontFamily: 'Cairo_Bold', flexShrink: 1 },
  subtitle: { fontSize: 12, color: '#8E8E93', fontFamily: 'Cairo_Medium' },
  text: { fontSize: 13, color: '#111', fontFamily: 'Cairo_Medium', lineHeight: 20 },
  imagesGrid: { flexDirection: 'row', gap: 10 },
  image: { flex: 1, height: 150, borderRadius: 12, backgroundColor: '#F2F2F7' },
  actionsRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 2 },
  actionText: { fontSize: 12, color: '#6B7280', fontFamily: 'Cairo_Medium' },
  rtlRow: { flexDirection: 'row-reverse' },
  rtlText: { textAlign: 'right' },
});

export default UniversityPostCard;


