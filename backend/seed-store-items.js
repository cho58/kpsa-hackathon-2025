const mongoose = require('mongoose');
const StoreItem = require('./models/StoreItem');

const initialStoreItems = [
  {
    name: '멸균 주사침',
    points: 200,
    description: '일회용 멸균 주사침 (21G, 10개입)',
    icon: '/assets/images/gift/gift_01.png',
    category: 'medical',
    stock: 100
  },
  {
    name: '멸균 채혈침',
    points: 150,
    description: '당뇨 혈당측정용 멸균 채혈침 (30G)',
    icon: '/assets/images/gift/gift_02.png',
    category: 'medical',
    stock: 150
  },
  {
    name: '알콜 스왑',
    points: 500,
    description: '소독용 알콜 스왑 패드 (70% 알콜, 100매)',
    icon: '/assets/images/gift/gift_03.png',
    category: 'hygiene',
    stock: 50
  },
  {
    name: '의료용 장갑',
    points: 300,
    description: '일회용 니트릴 의료용 장갑 (M사이즈, 50매)',
    icon: '/assets/images/gift/gift_04.png',
    category: 'protective',
    stock: 80
  },
];

async function seedStoreItems() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/kpsa-hackathon');
    console.log('MongoDB connected');

    // Clear existing store items
    await StoreItem.deleteMany({});
    console.log('Cleared existing store items');

    // Insert initial store items
    const createdItems = await StoreItem.insertMany(initialStoreItems);
    console.log(`Created ${createdItems.length} store items`);

    console.log('Store items seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding store items:', error);
    process.exit(1);
  }
}

seedStoreItems();
