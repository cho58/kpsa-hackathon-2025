const mongoose = require('mongoose');
const News = require('./models/News');

const initialNews = [
  {
    title: '폐의약품 올바른 처리, 환경보호의 첫걸음',
    subtitle: '환경부 새로운 가이드라인 발표',
    content: `환경부가 폐의약품의 올바른 처리 방법에 대한 새로운 가이드라인을 발표했습니다. 

가정에서 발생하는 폐의약품은 일반 쓰레기와 함께 버리면 안 되며, 전용 수거함을 이용해야 합니다. 

주요 처리 방법:
1. 약국 및 보건소 폐의약품 수거함 이용
2. 액체류는 용기째 버리기
3. 주사기나 바늘류는 전용 용기에 수거

잘못된 폐의약품 처리는 토양과 수질 오염의 원인이 될 수 있어 각별한 주의가 필요합니다.`,
    summary: '환경부가 발표한 폐의약품 올바른 처리 방법과 환경보호 가이드라인을 소개합니다.',
    image: '/assets/images/news/news_01.png',
    category: 'environment',
    author: '환경부',
    tags: ['폐의약품', '환경보호', '가이드라인', '수거함'],
    publishedAt: new Date('2025-01-15'),
    views: 245,
    likes: 18
  },
  {
    title: '디지털 헬스케어 시대, 스마트 약물 관리 시스템',
    subtitle: 'AI 기술을 활용한 개인 맞춤형 약물 관리',
    content: `최근 디지털 헬스케어 기술의 발전으로 개인 맞춤형 약물 관리 시스템이 주목받고 있습니다.

주요 기능:
- AI 기반 복용 알림 시스템
- 약물 상호작용 경고
- 개인별 건강 데이터 분석
- 의료진과의 실시간 연동

이러한 시스템을 통해 환자들은 더욱 안전하고 효과적인 약물 치료를 받을 수 있게 되었습니다. 

특히 고령자나 만성질환자의 경우 복용해야 할 약물이 많아 관리가 어려웠는데, 스마트 시스템을 통해 이러한 문제를 해결할 수 있습니다.`,
    summary: 'AI 기술을 활용한 스마트 약물 관리 시스템의 등장과 그 장점들을 살펴봅니다.',
    image: '/assets/images/news/news_02.png',
    category: 'technology',
    author: '디지털헬스케어협회',
    tags: ['디지털헬스케어', 'AI', '약물관리', '스마트시스템'],
    publishedAt: new Date('2025-01-20'),
    views: 189,
    likes: 25
  },
  {
    title: '2025년 의약품 안전 관리 강화 방안',
    subtitle: '식약처 새로운 정책 시행',
    content: `식품의약품안전처가 2025년부터 시행하는 의약품 안전 관리 강화 방안을 발표했습니다.

주요 내용:
1. 의약품 유통과정 투명성 강화
2. 부작용 신고 시스템 개선
3. 온라인 의약품 판매 규제 강화
4. 가정용 의약품 보관 가이드라인 제공

특히 가정에서의 의약품 보관과 관련해서는 다음과 같은 지침을 제시했습니다:
- 직사광선을 피한 서늘한 곳에 보관
- 어린이 손이 닿지 않는 곳에 보관
- 유효기간 정기적 확인
- 폐의약품 적절한 처리

이번 방안을 통해 국민들이 더욱 안전하게 의약품을 사용할 수 있을 것으로 기대됩니다.`,
    summary: '식약처가 발표한 2025년 의약품 안전 관리 강화 방안의 주요 내용을 안내합니다.',
    image: '/assets/images/news/news_03.png',
    category: 'policy',
    author: '식품의약품안전처',
    tags: ['의약품안전', '정책', '식약처', '관리방안'],
    publishedAt: new Date('2025-01-25'),
    views: 312,
    likes: 42
  },
  {
    title: '겨울철 감기약 복용 시 주의사항',
    subtitle: '올바른 감기약 사용법과 부작용 예방',
    content: `겨울철 감기가 유행하는 시기, 감기약을 올바르게 복용하는 방법을 알아보겠습니다.

감기약 복용 시 주의사항:

1. 용법·용량 준수
- 정해진 시간과 양을 반드시 지키기
- 증상이 호전되어도 임의로 중단하지 않기

2. 약물 상호작용 주의
- 다른 약물과 함께 복용 시 의사나 약사와 상담
- 특히 진통제, 해열제 중복 복용 주의

3. 부작용 모니터링
- 졸음, 어지러움 등의 부작용 주의
- 운전이나 기계 조작 시 특별히 주의

4. 특수 환자군 주의
- 임산부, 수유부는 반드시 전문의 상담
- 어린이는 연령에 맞는 제형과 용량 사용

감기 예방이 최우선이지만, 감기에 걸렸을 때는 올바른 약물 사용으로 빠른 회복을 도모하시기 바랍니다.`,
    summary: '겨울철 감기약 복용 시 알아두어야 할 주의사항과 올바른 사용법을 안내합니다.',
    image: '/assets/images/news/news_04.png',
    category: 'health',
    author: '대한약사회',
    tags: ['감기약', '복용법', '주의사항', '겨울철건강'],
    publishedAt: new Date('2025-01-27'),
    views: 156,
    likes: 33
  }
];

async function seedNews() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/kpsa-hackathon');
    console.log('MongoDB connected');

    // Clear existing news
    await News.deleteMany({});
    console.log('Cleared existing news');

    // Insert initial news
    const createdNews = await News.insertMany(initialNews);
    console.log(`Created ${createdNews.length} news articles`);

    console.log('News seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding news:', error);
    process.exit(1);
  }
}

seedNews();
