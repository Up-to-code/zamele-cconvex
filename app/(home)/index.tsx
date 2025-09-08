import UniversityPostCard from '@/components/common/UniversityPostCard';
import TopTabs from '@/components/layout/TopTabs';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, ViewStyle } from 'react-native';

const Index = () => {
  const [active, setActive] = useState(0);
  const tabs = ['الرئيسية', 'الأحداث', 'الأنشطة'];

  return (
    <SafeAreaView style={styles.container}>
      <TopTabs tabs={tabs} activeIndex={active} onChange={setActive} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.grid as ViewStyle}>
          <UniversityPostCard
            post={{
              id: '1',
              user: { id: 'u1', name: 'جامعة المستقبل', verified: true },
              createdAt: 'منذ 2 ساعة',
              text: 'صور من فعالية الأمس في الحرم الجامعي.',
              images: [
                'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?q=80&w=1600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1462536943532-57a629f6cc60?q=80&w=1600&auto=format&fit=crop',
              ],
              likesCount: 12,
              commentsCount: 3,
              likedByMe: false,
            }}
          />
          <View style={{ height: 12 }} />
          <UniversityPostCard
            post={{
              id: '2',
              user: { id: 'u2', name: 'جامعة السلام', verified: true },
              createdAt: 'منذ 5 ساعات',
              text: 'مهرجان طلابي رائع!',
              images: [
                'https://images.unsplash.com/photo-1531266752426-501a7e8a38ac?q=80&w=1600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop',
              ],
              likesCount: 5,
              commentsCount: 1,
              likedByMe: true,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  content: { padding: 16 },
  grid: { gap: 12 },
})

export default Index;
