import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

export default function LoginScreen() {
  const handleKakaoLogin = () => {
    // 카카오 로그인 로직 (실제로는 카카오 SDK 필요)
    router.replace('/(tabs)');
  };

  const handleNaverLogin = () => {
    // 네이버 로그인 로직 (실제로는 네이버 SDK 필요)
    router.replace('/(tabs)');
  };

  const handleGuestLogin = () => {
    // 비회원으로 입장
    router.replace('/(tabs)');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.logoSection}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logoImage}
        />
        <ThemedText style={styles.subtitle}>폐의약품 안전 수거 서비스</ThemedText>
      </ThemedView>

      <ThemedView style={styles.buttonSection}>
        <Pressable style={styles.kakaoButton} onPress={handleKakaoLogin}>
          <ThemedText style={styles.kakaoButtonText}>카카오로 시작하기</ThemedText>
        </Pressable>

        <Pressable style={styles.naverButton} onPress={handleNaverLogin}>
          <ThemedText style={styles.naverButtonText}>네이버로 시작하기</ThemedText>
        </Pressable>

        <Pressable style={styles.guestButton} onPress={handleGuestLogin}>
          <ThemedText style={styles.guestButtonText}>비회원으로 입장하기</ThemedText>
        </Pressable>
        
        <Pressable style={styles.serviceAreaLink} onPress={() => {
          // 서비스 지역 확인 로직
          alert('서비스 지역 확인 페이지로 이동합니다.');
        }}>
          <ThemedText style={styles.serviceAreaText}>서비스 지역 확인하기</ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoImage: {
    width: 200,
    height: 80,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  buttonSection: {
    width: '100%',
  },
  kakaoButton: {
    backgroundColor: '#FEE500',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  kakaoButtonText: {
    color: '#3C1E1E',
    fontSize: 16,
    fontWeight: '600',
  },
  naverButton: {
    backgroundColor: '#03C75A',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  naverButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  guestButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  guestButtonText: {
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.8,
  },
  serviceAreaLink: {
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 8,
  },
  serviceAreaText: {
    fontSize: 14,
    color: '#666666',
    textDecorationLine: 'underline',
  },
});
