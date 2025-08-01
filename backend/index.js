const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/User')
const StoreItem = require('./models/StoreItem')
const News = require('./models/News')

const app = express()
const port = 3000

// Middleware
app.use(express.json())

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/kpsa-hackathon')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err))

app.get('/ping', (req, res) => {
  res.send('pong')
})

app.post('/user', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    
    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    
    const user = new User({ name, email, age });
    await user.save();
    
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(400).json({ error: error.message });
  }
})

app.get('/user', async (req, res) => {
  try {
    const users = await User.find({});
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.get('/user/:id/point', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      success: true,
      data: {
        userId: user._id,
        point: user.point
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// Additional CRUD endpoints

// Get user by ID
app.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// Update user
app.put('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const user = await User.findByIdAndUpdate(
      id, 
      updates, 
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(400).json({ error: error.message });
  }
})

// Update user points
app.patch('/user/:id/point', async (req, res) => {
  try {
    const { id } = req.params;
    const { point } = req.body;
    
    if (typeof point !== 'number') {
      return res.status(400).json({ error: 'Point must be a number' });
    }
    
    const user = await User.findByIdAndUpdate(
      id,
      { point },
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      success: true,
      data: {
        userId: user._id,
        point: user.point
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

// Delete user
app.delete('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// ========== Store Items CRUD API ==========

// Get all store items
app.get('/store-items', async (req, res) => {
  try {
    const { category, isActive } = req.query;
    const filter = {};
    
    if (category) {
      filter.category = category;
    }
    
    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }
    
    const storeItems = await StoreItem.find(filter).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: storeItems
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// Get store item by ID
app.get('/store-items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const storeItem = await StoreItem.findById(id);
    
    if (!storeItem) {
      return res.status(404).json({ error: 'Store item not found' });
    }
    
    res.json({
      success: true,
      data: storeItem
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// Create new store item
app.post('/store-items', async (req, res) => {
  try {
    const { name, points, description, icon, category, stock } = req.body;
    
    // Validate required fields
    if (!name || !points || !description || !icon || !category) {
      return res.status(400).json({ 
        error: 'Name, points, description, icon, and category are required' 
      });
    }
    
    const storeItem = new StoreItem({
      name,
      points,
      description,
      icon,
      category,
      stock
    });
    
    await storeItem.save();
    
    res.status(201).json({
      success: true,
      data: storeItem
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

// Update store item
app.put('/store-items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const storeItem = await StoreItem.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );
    
    if (!storeItem) {
      return res.status(404).json({ error: 'Store item not found' });
    }
    
    res.json({
      success: true,
      data: storeItem
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

// Update store item stock
app.patch('/store-items/:id/stock', async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;
    
    if (typeof stock !== 'number') {
      return res.status(400).json({ error: 'Stock must be a number' });
    }
    
    const storeItem = await StoreItem.findByIdAndUpdate(
      id,
      { stock },
      { new: true, runValidators: true }
    );
    
    if (!storeItem) {
      return res.status(404).json({ error: 'Store item not found' });
    }
    
    res.json({
      success: true,
      data: storeItem
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

// Toggle store item active status
app.patch('/store-items/:id/toggle-active', async (req, res) => {
  try {
    const { id } = req.params;
    
    const storeItem = await StoreItem.findById(id);
    
    if (!storeItem) {
      return res.status(404).json({ error: 'Store item not found' });
    }
    
    storeItem.isActive = !storeItem.isActive;
    await storeItem.save();
    
    res.json({
      success: true,
      data: storeItem
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

// Delete store item
app.delete('/store-items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const storeItem = await StoreItem.findByIdAndDelete(id);
    
    if (!storeItem) {
      return res.status(404).json({ error: 'Store item not found' });
    }
    
    res.json({
      success: true,
      message: 'Store item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// Purchase store item (deduct points from user)
app.post('/store-items/:id/purchase', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    // Get store item and user concurrently
    const [storeItem, user] = await Promise.all([
      StoreItem.findById(id),
      User.findById(userId)
    ]);
    
    if (!storeItem) {
      return res.status(404).json({ error: 'Store item not found' });
    }
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    if (!storeItem.isActive) {
      return res.status(400).json({ error: 'Store item is not available' });
    }
    
    if (storeItem.stock !== -1 && storeItem.stock <= 0) {
      return res.status(400).json({ error: 'Store item is out of stock' });
    }
    
    if (user.point < storeItem.points) {
      return res.status(400).json({ error: 'Insufficient points' });
    }
    
    // Deduct points from user
    user.point -= storeItem.points;
    
    // Decrease stock if not unlimited
    if (storeItem.stock !== -1) {
      storeItem.stock -= 1;
    }
    
    // Save both user and store item
    await Promise.all([user.save(), storeItem.save()]);
    
    res.json({
      success: true,
      message: 'Purchase successful',
      data: {
        purchasedItem: storeItem,
        remainingPoints: user.point,
        remainingStock: storeItem.stock
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// ========== News CRUD API ==========

// Get all news
app.get('/news', async (req, res) => {
  try {
    const { category, isPublished, page = 1, limit = 10, search } = req.query;
    const filter = {};
    
    if (category) {
      filter.category = category;
    }
    
    if (isPublished !== undefined) {
      filter.isPublished = isPublished === 'true';
    }
    
    // Text search in title and content
    if (search) {
      filter.$text = { $search: search };
    }
    
    const skip = (page - 1) * limit;
    
    const [news, total] = await Promise.all([
      News.find(filter)
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      News.countDocuments(filter)
    ]);
    
    res.json({
      success: true,
      data: news,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// Get news by ID
app.get('/news/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findById(id);
    
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    
    // Increment views
    news.views += 1;
    await news.save();
    
    res.json({
      success: true,
      data: news
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// Create new news
app.post('/news', async (req, res) => {
  try {
    const { title, subtitle, content, summary, image, category, author, tags, publishedAt } = req.body;
    
    // Validate required fields
    if (!title || !content || !summary || !image || !category || !author) {
      return res.status(400).json({ 
        error: 'Title, content, summary, image, category, and author are required' 
      });
    }
    
    const news = new News({
      title,
      subtitle,
      content,
      summary,
      image,
      category,
      author,
      tags: tags || [],
      publishedAt: publishedAt || new Date()
    });
    
    await news.save();
    
    res.status(201).json({
      success: true,
      data: news
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

// Update news
app.put('/news/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const news = await News.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );
    
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    
    res.json({
      success: true,
      data: news
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

// Toggle news published status
app.patch('/news/:id/toggle-published', async (req, res) => {
  try {
    const { id } = req.params;
    
    const news = await News.findById(id);
    
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    
    news.isPublished = !news.isPublished;
    await news.save();
    
    res.json({
      success: true,
      data: news
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

// Like news
app.patch('/news/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    
    const news = await News.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    
    res.json({
      success: true,
      data: {
        newsId: news._id,
        likes: news.likes
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

// Get news by category
app.get('/news/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    const skip = (page - 1) * limit;
    
    const [news, total] = await Promise.all([
      News.find({ category, isPublished: true })
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      News.countDocuments({ category, isPublished: true })
    ]);
    
    res.json({
      success: true,
      data: news,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// Get trending news (most viewed)
app.get('/news/trending/top', async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    
    const news = await News.find({ isPublished: true })
      .sort({ views: -1, publishedAt: -1 })
      .limit(parseInt(limit));
    
    res.json({
      success: true,
      data: news
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// Delete news
app.delete('/news/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findByIdAndDelete(id);
    
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    
    res.json({
      success: true,
      message: 'News deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

