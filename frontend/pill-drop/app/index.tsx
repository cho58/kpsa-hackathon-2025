import { Redirect } from 'expo-router';

export default function Index() {
  // 가이드 페이지로 리다이렉트
  return <Redirect href="/guide" />;
}
