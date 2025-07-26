import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const guideData = [
  {
    title: "폐의약품 안전 처리",
    description: "사용하지 않는 의약품을\n안전하게 처리하세요",
    image: require('@/assets/images/Icons/App_info/pill.png'),
  },
  {
    title: "수거함 위치 찾기",
    description: "내 주변 폐의약품 수거함을\n쉽게 찾을 수 있어요",
    image: require('@/assets/images/Icons/App_info/map.png'),
  },
  {
    title: "포인트 적립",
    description: "인증하고 포인트를 모아\n다양한 혜택을 받으세요",
    image: require('@/assets/images/Icons/App_info/gift.png'),
  },
  {
    title: "분리배출 가이드",
    description: "올바른 분리배출 방법을\n자세히 알려드려요",
    image: require('@/assets/images/Icons/App_info/news.png'),
  },
  {
    title: "환경 보호",
    description: "올바른 의약품 처리로\n깨끗한 환경을 만들어요",
    image: require('@/assets/images/Icons/App_info/earth.png'),
  },
];

export default function GuideScreen() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < guideData.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // 마지막 단계에서 로그인 페이지로 이동
      router.replace('/login');
    }
  };

  const handleSkip = () => {
    router.replace('/login');
  };

  const currentGuide = guideData[currentStep];
  const isLastStep = currentStep === guideData.length - 1;

  return (
    <ThemedView style={styles.container}>
      {/* Skip 버튼 */}
      <View style={styles.header}>
        <Pressable onPress={handleSkip} style={styles.skipButton}>
          <ThemedText style={styles.skipText}>SKIP</ThemedText>
        </Pressable>
      </View>

      {/* 가이드 콘텐츠 */}
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image 
            key={currentStep}
            source={currentGuide.image} 
            style={styles.guideImage} 
            contentFit="contain"
            cachePolicy="memory-disk"
            transition={200}
          />
        </View>
        
        <View style={styles.textContainer}>
          <ThemedText style={styles.title}>{currentGuide.title}</ThemedText>
          <ThemedText style={styles.description}>{currentGuide.description}</ThemedText>
        </View>
      </View>

      {/* 하단 네비게이션 */}
      <View style={styles.footer}>
        {/* 단계 표시 */}
        <View style={styles.stepIndicator}>
          {guideData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.stepDot,
                index === currentStep ? styles.stepDotActive : styles.stepDotInactive,
              ]}
            />
          ))}
        </View>

        {/* Next/시작하기 버튼 */}
        <Pressable onPress={handleNext} style={styles.nextButton}>
          <ThemedText style={styles.nextButtonText}>
            {isLastStep ? '시작하기' : 'Next'}
          </ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  imageContainer: {
    marginBottom: 60,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#f8f9fa',
  },
  guideImage: {
    width: 100,
    height: 100,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 40,
    paddingBottom: 60,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
    gap: 8,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  stepDotActive: {
    backgroundColor: '#35C8BA',
  },
  stepDotInactive: {
    backgroundColor: '#e0e0e0',
  },
  nextButton: {
    backgroundColor: '#35C8BA',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});
