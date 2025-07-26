import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet } from 'react-native';

const storeItems = [
  {
    id: 1,
    name: '아메리카노 쿠폰',
    points: 200,
    description: '스타벅스/이디야 아메리카노 쿠폰',
    icon: '☕',
    category: 'beverage'
  },
  {
    id: 2,
    name: '편의점 1000원 쿠폰',
    points: 150,
    description: 'GS25/CU/세븐일레븐 1000원 할인',
    icon: '🏪',
    category: 'discount'
  },
  {
    id: 3,
    name: '치킨 3000원 쿠폰',
    points: 500,
    description: '교촌치킨/굽네치킨 3000원 할인',
    icon: '🍗',
    category: 'food'
  },
  {
    id: 4,
    name: '배달앱 2000원 쿠폰',
    points: 300,
    description: '배달의민족/요기요 2000원 할인',
    icon: '🚚',
    category: 'delivery'
  },
  {
    id: 5,
    name: '영화관람권',
    points: 800,
    description: 'CGV/롯데시네마 영화관람권',
    icon: '🎬',
    category: 'entertainment'
  },
  {
    id: 6,
    name: '기부하기 (유니세프)',
    points: 100,
    description: '100포인트로 취약계층 아동 지원',
    icon: '❤️',
    category: 'donation'
  }
];

export default function PointStoreScreen() {
  const handlePurchase = (item: typeof storeItems[0]) => {
    // 포인트 구매 로직 (실제로는 서버 연동 필요)
    alert(`${item.name}을(를) ${item.points} 포인트로 구매하시겠습니까?`);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.infoSection}>
          <ThemedText style={styles.infoTitle}>🎁 포인트로 다양한 혜택을 받으세요!</ThemedText>
          <ThemedText style={styles.infoText}>
            폐의약품 수거함 인증으로 얻은 포인트로{'\n'}다양한 쿠폰과 혜택을 교환할 수 있습니다.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.itemsContainer}>
          {storeItems.map((item) => (
            <ThemedView key={item.id} style={styles.itemCard}>
              <ThemedView style={styles.itemHeader}>
                <ThemedText style={styles.itemIcon}>{item.icon}</ThemedText>
                <ThemedView style={styles.itemInfo}>
                  <ThemedText style={styles.itemName}>{item.name}</ThemedText>
                  <ThemedText style={styles.itemDescription}>{item.description}</ThemedText>
                </ThemedView>
              </ThemedView>
              
              <ThemedView style={styles.itemFooter}>
                <ThemedText style={styles.itemPoints}>{item.points}P</ThemedText>
                <Pressable 
                  style={styles.purchaseButton}
                  onPress={() => handlePurchase(item)}
                >
                  <ThemedText style={styles.purchaseButtonText}>교환하기</ThemedText>
                </Pressable>
              </ThemedView>
            </ThemedView>
          ))}
        </ThemedView>

        <ThemedView style={styles.footerSection}>
          <ThemedText style={styles.footerText}>
            * 포인트 교환은 최대 3-5일이 소요될 수 있습니다.{'\n'}
            * 교환된 쿠폰은 마이페이지에서 확인하실 수 있습니다.
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  infoSection: {
    backgroundColor: 'white',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  itemsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  itemCard: {
    backgroundColor: 'white',
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemPoints: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#35C8BA',
  },
  purchaseButton: {
    backgroundColor: '#35C8BA',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  purchaseButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  footerSection: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    margin: 16,
    marginTop: 0,
    borderRadius: 8,
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
});
