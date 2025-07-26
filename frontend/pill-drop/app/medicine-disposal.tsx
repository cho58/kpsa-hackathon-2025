import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image } from 'expo-image';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const medicineTypes = [
  {
    id: 1,
    title: 'Prescription Pills',
    subtitle: '처방전 알약 (항생제, 진통제 등)',
    description: '의사의 처방전이 필요한 알약 형태의 의약품 (항생제, 진통제, 혈압약 등)',
    disposal: '• 약국 또는 보건소 폐의약품 수거함에 투입\n• 포장지와 함께 버리지 말고 약물만 분리\n• PTP 포장지는 별도 분리배출',
    image: require('@/assets/images/medicine-disposal/pills.png'),
    color: '#FF6B6B'
  },
  {
    id: 2,
    title: 'Capsules',
    subtitle: '캡슐형 의약품',
    description: '캡슐 형태의 일반의약품 및 건강기능식품 (해열제, 감기약, 비타민 등)',
    disposal: '• 동네 약국 폐의약품 수거함 이용\n• 캡슐 껍질과 내용물 분리하지 말고 통째로 배출\n• 포장재는 재질별로 분리배출',
    image: require('@/assets/images/medicine-disposal/capsule.png'),
    color: '#4ECDC4'
  },
  {
    id: 3,
    title: 'Liquid Medicine',
    subtitle: '액체류 의약품 (시럽, 안약)',
    description: '기침시럽, 안약, 구강청결제 등 액체 상태의 의약품',
    disposal: '• 용기를 열지 말고 그대로 수거함에 투입\n• 내용물이 새지 않도록 주의\n• 플라스틱 용기는 별도 분리배출',
    image: require('@/assets/images/medicine-disposal/liquid_medicine.png'),
    color: '#45B7D1'
  },
  {
    id: 4,
    title: 'Injections & Syringes',
    subtitle: '주사기/바늘류',
    description: '당뇨 환자용 인슐린 펜, 일회용 주사기, 의료용 바늘류',
    disposal: '• 전용 폐기물 용기에 수거\n• 바늘은 절대 일반쓰레기로 배출 금지\n• 병원이나 약국에 직접 반납',
    image: require('@/assets/images/medicine-disposal/injection_syringe.png'),
    color: '#F7DC6F'
  },
  {
    id: 5,
    title: 'Topical Medicine',
    subtitle: '외용제 (연고, 크림)',
    description: '연고, 크림, 로션 등 피부에 바르는 형태의 의약품',
    disposal: '• 튜브나 용기째 폐의약품 수거함에 투입\n• 내용물을 짜내지 말고 그대로 배출\n• 플라스틱 용기는 별도 분리배출 가능',
    image: require('@/assets/images/medicine-disposal/ointment_topical.png'),
    color: '#BB8FCE'
  },
  {
    id: 6,
    title: 'Patches',
    subtitle: '패치형 의약품 (파스, 니코틴패치)',
    description: '파스, 니코틴 패치, 의료용 테이프 등 부착형 의약품',
    disposal: '• 사용한 패치는 일반쓰레기로 배출\n• 미사용 패치는 폐의약품 수거함 이용\n• 포장지는 재질별로 분리배출',
    image: require('@/assets/images/medicine-disposal/patches.png'),
    color: '#52C41A'
  },
  {
    id: 7,
    title: 'Inhalers',
    subtitle: '흡입제 (천식, 호흡기 질환용)',
    description: '천식, 만성폐쇄성폐질환 등 호흡기 질환 치료용 흡입제',
    disposal: '• 내용물이 남아있어도 그대로 수거함에 투입\n• 플라스틱 용기는 별도 분리배출\n• 압축가스 용기는 구멍을 뚫지 말 것',
    image: require('@/assets/images/medicine-disposal/inhaler.png'),
    color: '#FFA726'
  },
  {
    id: 8,
    title: 'Powder Medicine',
    subtitle: '가루약 (항생제, 해열제)',
    description: '분말 형태의 항생제, 해열제, 소화제 등',
    disposal: '• 포장지를 제거하고 가루약만 수거함에 투입\n• 개봉하지 않은 경우 포장째 배출 가능\n• 종이 포장지는 일반쓰레기로 배출',
    image: require('@/assets/images/medicine-disposal/powder_medicine.png'),
    color: '#66BB6A'
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
            <ThemedView key={medicine.id} style={[styles.card, { borderTopColor: medicine.color }]}>
              <ThemedView style={styles.imageContainer}>
                <Image 
                  source={medicine.image} 
                  style={styles.cardImage}
                  contentFit="contain"
                />
              </ThemedView>
              
              <ThemedView style={styles.cardContent}>
                <ThemedText style={styles.cardTitle}>{medicine.title}</ThemedText>
                <ThemedText style={styles.cardSubtitle}>{medicine.subtitle}</ThemedText>
                <ThemedText style={styles.cardDescription}>{medicine.description}</ThemedText>
                
                <ThemedView style={styles.disposalSection}>
                  <ThemedText style={styles.disposalTitle}>🗑️ 분리배출 방법</ThemedText>
                  <ThemedText style={styles.disposalText}>{medicine.disposal}</ThemedText>
                </ThemedView>
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
    marginBottom: 20,
    borderTopWidth: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 180,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  cardImage: {
    width: 120,
    height: 120,
  },
  cardContent: {
    padding: 20,
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
    width: 32,
    height: 32,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 6,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  cardDescription: {
    fontSize: 15,
    color: '#495057',
    lineHeight: 22,
    marginBottom: 18,
    textAlign: 'center',
  },
  disposalSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#35C8BA',
  },
  disposalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 10,
  },
  disposalText: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
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
