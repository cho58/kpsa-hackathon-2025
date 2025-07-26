import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { WebView } from "react-native-webview";
import locationData from "../assets/data/location.json";
import * as ExpoLocation from "expo-location";

// 타입 정의
type Location = {
  name: string;
  address: string;
  lat: number;
  lng: number;
};

type LocationData = {
  [key: string]: Location[];
};

const BUTTONS = [
  { label: "전체", keyword: null }, // 모든 데이터를 표시
  { label: "약국", keyword: "약국" },
  { label: "우체통", keyword: "우체통" },
  { label: "공공기관", keyword: "공공기관" },
  { label: "어린이집", keyword: "어린이집" },
];

export default function KakaoMapScreen() {
  const [selected, setSelected] = useState<number>(0);
  const webViewRef = useRef<WebView>(null);

  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: 37.364049,
    lng: 126.718033,
  });
  const [detail, setDetail] = useState<{
    name: string;
    address: string;
    lat: number;
    lng: number;
  } | null>(null);
  const [distance, setDistance] = useState<number>(0);

  const DETAIL_CARD_HEIGHT = 130;
  const DETAIL_CARD_BOTTOM = 20;
  const BUTTON_MARGIN = 10;
  const DEFAULT_BUTTON_BOTTOM = 60;

  useEffect(() => {
    const all = Object.values(locationData).flat();
    webViewRef.current?.postMessage(
      JSON.stringify({
        type: "locations",
        payload: all,
      })
    );
  }, []);

  // 현위치 버튼 핸들러
  const handleCurrentLocationPress = async () => {
    // 1) 권한 요청
    const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("위치 권한이 필요합니다");
      return;
    }
    // 2) 현재 위치 가져오기
    const loc = await ExpoLocation.getCurrentPositionAsync({});
    const payload = {
      type: "currentLocation",
      lat: loc.coords.latitude,
      lng: loc.coords.longitude,
    };
    // 3) WebView로 메시지 보내기
    webViewRef.current?.postMessage(JSON.stringify(payload));
  };

  // handleButtonPress 수정
  const handleButtonPress = (keyword: string | null, idx: number) => {
    setSelected(idx);

    const locations =
      keyword === null
        ? Object.values(locationData).flat()
        : (locationData as LocationData)[keyword];

    webViewRef.current?.postMessage(
      JSON.stringify({
        type: "locations", // ← 중요!
        payload: locations, // ← 마커 데이터
      })
    );
  };

  const onWebViewMessage = (e: any) => {
    try {
      const msg = JSON.parse(e.nativeEvent.data);
      if (msg.type === "markerClick") {
        // markerClick payload: { type, name, address, lat, lng }
        setDetail({
          name: msg.name,
          address: msg.address,
          lat: msg.lat,
          lng: msg.lng,
        });
        // 거리 계산
        const d = calculateDistance(
          currentLocation.lat,
          currentLocation.lng,
          msg.lat,
          msg.lng
        );
        setDistance(d);
      }
      if (msg.type === "currentLocation") {
        setCurrentLocation({ lat: msg.lat, lng: msg.lng });
        // 지도 중앙 이동은 이미 WebView script에서 처리
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const calculateDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ) => {
    const R = 6371; // 지구 반지름 (km)
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // 거리 (km)
  };

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        html, body, #map {
          height: 100%;
          margin: 0;
          padding: 0;
        }
      </style>
      <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=98aa55cc0691e15498051fef4f56cd0a&libraries=services&autoload=false"></script>
    </head>
    <body>
      <div id="map"></div>
        <script>
          kakao.maps.load(function() {
            var map = new kakao.maps.Map(
              document.getElementById('map'),
              { center: new kakao.maps.LatLng(37.364049,126.718033), level:3 }
            );
            var markers = [];

            function clearMarkers() {
              markers.forEach(function(m){ m.setMap(null); });
              markers = [];
            }

            function addMarkers(list) {
              clearMarkers();
              list.forEach(function(loc) {
                var marker = new kakao.maps.Marker({
                  position: new kakao.maps.LatLng(loc.lat, loc.lng),
                  map: map
                });
                kakao.maps.event.addListener(marker,'click',function(){
                  window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'markerClick',
                    name: loc.name,
                    address: loc.address,
                    lat: loc.lat,
                    lng: loc.lng
                  }));
                });
                markers.push(marker);
              });
            }

            function onMessage(event) {
              try {
                var msg = JSON.parse(event.data);

                // 1) 현위치 요청일 때만 센터 이동
                if (msg.type === 'currentLocation') {
                  map.setCenter(new kakao.maps.LatLng(msg.lat,msg.lng));
                  return;
                }

                // 2) locations 메시지면 마커만 교체 (절대 센터 변경 없음)
                if (msg.type === 'locations') {
                  addMarkers(msg.payload);
                  return;
                }
              } catch (e) {
                console.error(e);
              }
            }

            // Android/iOS 둘 다 듣기
            window.addEventListener('message', onMessage);
            document.addEventListener('message', onMessage);
          });
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      {/* 헤더 추가 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>내 주변 폐의약품 수거함</Text>
        <Text style={styles.headerSubtitle}>가까운 수거함을 찾아보세요</Text>
      </View>

      {/* 버튼 컨테이너 */}
      <View style={styles.buttonOverlay}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.buttonContainer}
        >
          {BUTTONS.map((btn, idx) => (
            <TouchableOpacity
              key={btn.label}
              style={[styles.button, selected === idx && styles.buttonSelected]}
              onPress={() => handleButtonPress(btn.keyword, idx)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selected === idx && styles.buttonTextSelected,
                ]}
              >
                {btn.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 디테일 카드 */}
      {detail && (
        <View style={styles.detailCard}>
          <View style={styles.thumbPlaceholder} />
          <View style={styles.detailInfo}>
            <Text style={styles.detailName}>{detail.name}</Text>
            <Text style={styles.detailDistance}>{distance.toFixed(2)}km</Text>
            <Text style={styles.detailAddress}>{detail.address}</Text>
          </View>
        </View>
      )}

      {/* WebView */}
      <WebView
        ref={webViewRef}
        originWhitelist={["*"]}
        source={{ html }}
        javaScriptEnabled
        domStorageEnabled
        onMessage={onWebViewMessage}
        style={styles.webview}
      />

      {/* 현위치 버튼 */}
      <TouchableOpacity
        style={[
          styles.currentLocationButton,
          {
            bottom: detail
              ? DETAIL_CARD_BOTTOM + DETAIL_CARD_HEIGHT + BUTTON_MARGIN
              : DEFAULT_BUTTON_BOTTOM,
          },
        ]}
        onPress={handleCurrentLocationPress}
      >
        <Text style={styles.currentLocationButtonText}>현위치</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 15,
    backgroundColor: "#35C8BA",
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  headerSubtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
  },
  webview: {
    flex: 1,
  },
  buttonOverlay: {
    position: "absolute",
    top: 130, // 헤더 아래로 배치
    left: 0,
    right: 0,
    paddingVertical: 10,
    backgroundColor: "transparent",
    zIndex: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 5, // 버튼 간격
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 7,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 2,
  },
  buttonSelected: {
    backgroundColor: "#fff",
    borderColor: "#444",
    elevation: 4,
  },
  buttonText: {
    color: "#444",
    fontWeight: "bold",
    fontSize: 15,
  },
  buttonTextSelected: {
    color: "#444",
  },
  currentLocationButton: {
    position: "absolute",
    right: 40,
    backgroundColor: "#fff",
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  currentLocationButtonText: {
    color: "#444",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  detailCard: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    height: 130,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    zIndex: 10, // ✅ 카드가 WebView 위에 그려지도록
    elevation: 10, // Android 에서는 elevation 도 추가
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  thumbPlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginRight: 12,
  },
  detailInfo: {
    flex: 1,
    justifyContent: "center",
  },
  detailName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  detailDistance: {
    fontSize: 14,
    color: "#007AFF",
    marginBottom: 4,
  },
  detailAddress: {
    fontSize: 12,
    color: "#555",
  },
});
