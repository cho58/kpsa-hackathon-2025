// index.mjs
import fetch from "node-fetch";

// ★ 여기에는 실제 REST API 키(“abcdef012345…” 등)만 넣으세요.
//    접두어 “KakaoAK ”는 아래 헤더 설정에서 붙입니다.
const KAKAO_KEY = "847fefa128b5e77190a9385507ca1450";

const lon = 126.718741;
const lat = 37.366246;
const radius = 2000;

// 공통: 에러 핸들링 강화
async function fetchKakao(url) {
  const res = await fetch(url, {
    headers: {
      // 반드시 "KakaoAK " + 키 형태로 보내야 합니다.
      Authorization: `KakaoAK ${KAKAO_KEY}`,
    },
  });

  // HTTP 상태코드 확인
  if (!res.ok) {
    console.error(`HTTP Error: ${res.status} ${res.statusText}`);
    // 가능하다면 응답 내용을 로그로 찍어 봅니다.
    try {
      const errJson = await res.json();
      console.error("Error body:", errJson);
    } catch (_) {
      // JSON 파싱 실패 시 무시
    }
    return null;
  }

  const data = await res.json();
  // documents 필드 유무 확인
  if (!Array.isArray(data.documents)) {
    console.error("Unexpected response format:", data);
    return null;
  }
  return data.documents;
}

async function fetchPharmacies() {
  const url =
    `https://dapi.kakao.com/v2/local/search/category.json` +
    `?category_group_code=PM9` +
    `&x=${lon}&y=${lat}&radius=${radius}`;
  const docs = await fetchKakao(url);
  if (!docs) return []; // 에러 시 빈 배열 반환
  return docs.map((d) => ({
    name: d.place_name,
    address: d.address_name,
    lat: parseFloat(d.y),
    lng: parseFloat(d.x),
  }));
}

async function fetchMailboxes() {
  const url =
    `https://dapi.kakao.com/v2/local/search/keyword.json` +
    `?query=우체통` +
    `&x=${lon}&y=${lat}&radius=${radius}`;
  const docs = await fetchKakao(url);
  if (!docs) return [];
  return docs.map((d) => ({
    name: d.place_name,
    address: d.address_name,
    lat: parseFloat(d.y),
    lng: parseFloat(d.x),
  }));
}

(async () => {
  try {
    const [약국, 우체통] = await Promise.all([
      fetchPharmacies(),
      fetchMailboxes(),
    ]);
    const result = { 약국, 우체통 };
    console.log(JSON.stringify(result, null, 2));
  } catch (e) {
    console.error("스크립트 실행 중 예외 발생:", e);
  }
})();
