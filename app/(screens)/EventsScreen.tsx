import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Image, SafeAreaView, I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';

// Force RTL layout
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

// Minimal color palette
const colors = {
    primary: "#0070BA",  // PayPal blue
    secondary: "#003087", // Darker blue
    tertiary: "#2C2C2C",  // Dark text
    light: "#F5F7FA",     // Light background
    background: "#FFFFFF", // White background
    border: "#E6E8EB",    // Border color
}

const EventsScreen = () => {
    // Sample events data
    const events = [
        {
            id: '1',
            title: 'ندوة التكنولوجيا الحديثة',
            date: '١٥ أكتوبر ٢٠٢٣',
            time: '٥:٠٠ مساءً',
            location: 'القاعة الرئيسية',
            image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            category: 'أكاديمي'
        },
        {
            id: '2',
            title: 'معرض الابتكار الطلابي',
            date: '١٧ أكتوبر ٢٠٢٣',
            time: '١٠:٠٠ صباحاً',
            location: 'الساحة الجامعية',
            image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            category: 'طلابي'
        },
        {
            id: '3',
            title: 'مسابقة كرة السلة',
            date: '٢٠ أكتوبر ٢٠٢٣',
            time: '٤:٠٠ عصراً',
            location: 'ملعب الجامعة',
            image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            category: 'رياضي'
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>الفعاليات</Text>
                <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="options-outline" size={20} color={colors.tertiary} />
                </TouchableOpacity>
            </View>

            {/* Events List */}
            <ScrollView 
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {events.map((event) => (
                    <TouchableOpacity key={event.id} style={styles.eventCard}>
                        {/* Image at the top */}
                        <Image 
                            source={{ uri: event.image }} 
                            style={styles.eventImage}
                            resizeMode="cover"
                        />
                        
                        {/* Content below image */}
                        <View style={styles.cardContent}>
                            <View style={styles.categoryContainer}>
                                <Text style={styles.categoryText}>{event.category}</Text>
                            </View>
                            
                            <Text style={styles.eventTitle}>{event.title}</Text>
                            
                            <View style={styles.eventDetails}>
                                <View style={styles.detailRow}>
                                    <Ionicons name="calendar-outline" size={14} color={colors.tertiary} />
                                    <Text style={styles.detailText}>{event.date}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Ionicons name="time-outline" size={14} color={colors.tertiary} />
                                    <Text style={styles.detailText}>{event.time}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Ionicons name="location-outline" size={14} color={colors.tertiary} />
                                    <Text style={styles.detailText}>{event.location}</Text>
                                </View>
                            </View>
                            
                            <View style={styles.footer}>
                                <TouchableOpacity style={styles.registerButton}>
                                    <Text style={styles.registerText}>سجل الآن</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: colors.background,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'Cairo_Medium',
        color: colors.tertiary,
    },
    filterButton: {
        padding: 4,
    },
    scrollView: {
        flex: 1,
        padding: 12,
    },
    eventCard: {
        backgroundColor: colors.background,
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.border,
    },
    eventImage: {
        width: '100%',
        height: 160,
    },
    cardContent: {
        padding: 16,
    },
    categoryContainer: {
        alignSelf: 'flex-start',
        backgroundColor: colors.light,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginBottom: 12,
    },
    categoryText: {
        fontSize: 11,
        fontFamily: 'Cairo_Medium',
        color: colors.primary,
    },
    eventTitle: {
        fontSize: 16,
        fontFamily: 'Cairo_Medium',
        color: colors.tertiary,
        marginBottom: 12,
        textAlign: 'right',
        lineHeight: 24,
    },
    eventDetails: {
        marginBottom: 16,
    },
    detailRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginBottom: 8,
    },
    detailText: {
        fontSize: 13,
        fontFamily: 'Cairo_Medium',
        color: colors.tertiary,
        marginRight: 8,
        textAlign: 'right',
    },
    footer: {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    registerButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 6,
    },
    registerText: {
        color: '#FFF',
        fontFamily: 'Cairo_Medium',
        fontSize: 13,
    },
});

export default EventsScreen;