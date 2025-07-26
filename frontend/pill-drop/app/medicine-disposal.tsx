import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const medicineTypes = [
  {
    id: 1,
    title: '처방전 의약품',
    subtitle: '병원에서 처방받은 약물',
    description: '항생제, 진통제, 혈압약 등 의사의 처방전이 필요한 모든 의약품',
    disposal: '• 약국 또는 보건소 폐의약품 수거함에 투입\n• 포장지와 함께 버리지 말고 약물만 분리\n• 액체류는 용기째 버리기',
    icon: '💊',
    color: '#FF6B6B'
  },
  {
    id: 2,
    title: '일반의약품',
    subtitle: '약국에서 구입한 의약품',
    description: '해열제, 감기약, 소화제 등 처방전 없이 구입 가능한 의약품',
    disposal: '• 동네 약국 폐의약품 수거함 이용\n• 유효기간이 지난 약도 동일하게 처리\n• 약물과 포장재 분리 후 배출',
    icon: '🏥',
    color: '#4ECDC4'
  },
  {
    id: 3,
    title: '액체류 의약품',
    subtitle: '시럽, 안약, 연고류',
    description: '기침시럽, 안약, 연고, 로션 등 액체 또는 반고체 상태의 의약품',
    disposal: '• 용기를 열지 말고 그대로 수거함에 투입\n• 내용물이 새지 않도록 주의\n• 플라스틱 용기는 별도 분리배출',
    icon: '🧴',
    color: '#45B7D1'
  },
  {
    id: 4,
    title: '주사기/바늘류',
    subtitle: '인슐린 펜, 주사바늘',
    description: '당뇨 환자용 인슐린 펜, 일회용 주사기, 의료용 바늘류',
    disposal: '• 전용 폐기물 용기에 수거\n• 바늘은 절대 일반쓰레기로 배출 금지\n• 병원이나 약국에 직접 반납',
    icon: '💉',
    color: '#F7DC6F'
  },
  {
    id: 5,
    title: '외용제',
    subtitle: '파스, 밴드, 의료기기',
    description: '파스, 의료용 테이프, 일회용 의료기기, 체온계 등',
    disposal: '• 일반 폐의약품 수거함 이용 불가\n• 의료폐기물로 분류하여 처리\n• 병원이나 보건소에 문의 후 처리',
    icon: '🩹',
    color: '#BB8FCE'
  },
  {
    id: 6,
    title: '건강기능식품',
    subtitle: '비타민, 영양제',
    description: '비타민, 미네랄, 프로바이오틱스 등 건강보조식품',
    disposal: '• 유효기간 확인 후 폐기\n• 캡슐은 내용물과 껍질 분리\n• 포장재는 재질별로 분리배출',
    icon: '🌿',
    color: '#52C41A'
  }
];

export default function MedicineDisposalScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.content}>
          <ThemedText style={styles.subtitle}>
            약물 종류별 올바른 분리배출 방법을 확인하세요
          </ThemedText>

          {medicineTypes.map((medicine) => (
            <ThemedView key={medicine.id} style={[styles.card, { borderLeftColor: medicine.color }]}>
              <ThemedView style={styles.cardHeader}>
                <ThemedView style={styles.iconContainer}>
                  <ThemedText style={styles.cardIcon}>{medicine.icon}</ThemedText>
                </ThemedView>
                <ThemedView style={styles.cardTitleContainer}>
                  <ThemedText style={styles.cardTitle}>{medicine.title}</ThemedText>
                  <ThemedText style={styles.cardSubtitle}>{medicine.subtitle}</ThemedText>
                </ThemedView>
              </ThemedView>
              
              <ThemedText style={styles.cardDescription}>{medicine.description}</ThemedText>
              
              <ThemedView style={styles.disposalSection}>
                <ThemedText style={styles.disposalTitle}>🗑️ 분리배출 방법</ThemedText>
                <ThemedText style={styles.disposalText}>{medicine.disposal}</ThemedText>
              </ThemedView>
            </ThemedView>
          ))}

          <ThemedView style={styles.footerInfo}>
            <ThemedText style={styles.footerTitle}>💡 추가 정보</ThemedText>
            <ThemedText style={styles.footerText}>
              • 폐의약품 수거함 위치: 가까운 약국이나 보건소{'\n'}
              • 수거 시간: 운영시간 내 언제든지{'\n'}
              • 문의사항: 지역 보건소 또는 약사회
            </ThemedText>
          </ThemedView>
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
  content: {
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardIcon: {
    fontSize: 24,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  cardDescription: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
    marginBottom: 16,
  },
  disposalSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
  },
  disposalTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  disposalText: {
    fontSize: 13,
    color: '#495057',
    lineHeight: 18,
  },
  footerInfo: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 20,
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976d2',
    marginBottom: 8,
  },
  footerText: {
    fontSize: 14,
    color: '#1976d2',
    lineHeight: 20,
  },
});
