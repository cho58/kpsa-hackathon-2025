import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet } from 'react-native';

export default function MoreScreen() {
  const handleOneOnOneInquiry = () => {
    Alert.alert('1대1 문의', '문의 기능은 준비 중입니다.');
  };

  const handleAIChatbot = () => {
    Alert.alert('AI 챗봇', 'AI 챗봇 기능은 준비 중입니다.');
  };

  const handleServiceGuide = () => {
    Alert.alert('서비스 이용 안내', '서비스 안내 페이지로 이동합니다.');
  };

  const handleFAQ = () => {
    Alert.alert('자주 묻는 질문', 'FAQ 페이지로 이동합니다.');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 헤더 */}
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerTitle}>마이페이지</ThemedText>
      </ThemedView>

      {/* 사용자 정보 섹션 */}
      <ThemedView style={styles.userSection}>
        <ThemedView style={styles.avatar}>
          <ThemedText style={styles.avatarText}>🧑‍💻</ThemedText>
        </ThemedView>
        <ThemedView style={styles.userInfo}>
          <ThemedText style={styles.userName}>환경지킴이</ThemedText>
          <ThemedText style={styles.userEmail}>eco.keeper@example.com</ThemedText>
        </ThemedView>
        <ThemedView style={styles.pointBox}>
          <ThemedText style={styles.pointLabel}>보유 포인트</ThemedText>
          <ThemedText style={styles.pointValue}>P 1,250</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* 활동 기록 섹션 */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>내 활동</ThemedText>
        
        <ThemedView style={styles.activityCard}>
          <ThemedView style={styles.activityHeader}>
            <ThemedText style={styles.activityTitle}>폐의약품 수거 기록</ThemedText>
            <ThemedText style={styles.activityCount}>15회</ThemedText>
          </ThemedView>
          <ThemedText style={styles.activityDescription}>
            지금까지 15번의 폐의약품 수거함 인증을 완료했습니다.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.activityCard}>
          <ThemedView style={styles.activityHeader}>
            <ThemedText style={styles.activityTitle}>내가 모은 뱃지</ThemedText>
            <ThemedText style={styles.badgeCount}>3개</ThemedText>
          </ThemedView>
          <ThemedView style={styles.badgeContainer}>
            <ThemedView style={styles.badge}>
              <ThemedText style={styles.badgeIcon}>🌱</ThemedText>
              <ThemedText style={styles.badgeText}>첫 인증</ThemedText>
            </ThemedView>
            <ThemedView style={styles.badge}>
              <ThemedText style={styles.badgeIcon}>⭐</ThemedText>
              <ThemedText style={styles.badgeText}>10회 달성</ThemedText>
            </ThemedView>
            <ThemedView style={styles.badge}>
              <ThemedText style={styles.badgeIcon}>🏆</ThemedText>
              <ThemedText style={styles.badgeText}>환경지킴이</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.activityCard}>
          <ThemedView style={styles.activityHeader}>
            <ThemedText style={styles.activityTitle}>교환한 리워드</ThemedText>
            <ThemedText style={styles.rewardCount}>5개</ThemedText>
          </ThemedView>
          <ThemedView style={styles.rewardList}>
            <ThemedView style={styles.rewardItem}>
              <ThemedText style={styles.rewardIcon}>☕</ThemedText>
              <ThemedText style={styles.rewardText}>멸균 주사침 x2</ThemedText>
            </ThemedView>
            <ThemedView style={styles.rewardItem}>
              <ThemedText style={styles.rewardIcon}>🏪</ThemedText>
              <ThemedText style={styles.rewardText}>알콜 스왑 x3</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {/* 고객 지원 섹션 */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>고객 지원</ThemedText>
        
        <Pressable style={styles.menuItem} onPress={handleServiceGuide}>
          <ThemedText style={styles.menuIcon}>📋</ThemedText>
          <ThemedText style={styles.menuText}>서비스 이용 안내</ThemedText>
          <ThemedText style={styles.menuArrow}>›</ThemedText>
        </Pressable>

        <Pressable style={styles.menuItem} onPress={handleFAQ}>
          <ThemedText style={styles.menuIcon}>❓</ThemedText>
          <ThemedText style={styles.menuText}>자주 묻는 질문(FAQ)</ThemedText>
          <ThemedText style={styles.menuArrow}>›</ThemedText>
        </Pressable>

        <ThemedView style={styles.supportCard}>
          <ThemedText style={styles.supportTitle}>고객 행복 센터</ThemedText>
          <ThemedText style={styles.supportTime}>평일 오전 10:00 ~ 오후 5:00</ThemedText>
          
          <ThemedView style={styles.supportButtons}>
            <Pressable style={styles.supportButton} onPress={handleOneOnOneInquiry}>
              <ThemedText style={styles.supportButtonText}>1대1 문의</ThemedText>
            </Pressable>
            <Pressable style={styles.supportButton} onPress={handleAIChatbot}>
              <ThemedText style={styles.supportButtonText}>AI 챗봇</ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {/* 하단 여백 */}
      <ThemedView style={styles.bottomSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#35C8BA',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userSection: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  pointBox: {
    backgroundColor: '#35C8BA',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  pointLabel: {
    color: 'white',
    fontSize: 12,
    marginBottom: 2,
  },
  pointValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 20,
    marginBottom: 12,
  },
  activityCard: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  activityCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#35C8BA',
  },
  activityDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  badgeCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#35C8BA',
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  badge: {
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  badgeIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  badgeText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  rewardCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#35C8BA',
  },
  rewardList: {
    marginTop: 8,
    gap: 8,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 8,
    borderRadius: 6,
  },
  rewardIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  rewardText: {
    fontSize: 14,
    color: '#333',
  },
  menuItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  menuArrow: {
    fontSize: 18,
    color: '#999',
  },
  supportCard: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  supportTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  supportButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  supportButton: {
    flex: 1,
    backgroundColor: '#35C8BA',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  supportButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomSpace: {
    height: 40,
  },
});
