const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow frontend to make API requests
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect('mongodb://localhost/smart_agriculture', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Models
const Post = mongoose.model('Post', { question: String, answer: String });
const SuccessStory = mongoose.model('SuccessStory', { story: String });
const MarketPrice = mongoose.model('MarketPrice', { crop: String, price: Number });

// ✅ Crop Recommendation API (Dynamic)
app.post('/api/crop-recommendation', async (req, res) => {
    const { soilType, climate } = req.body;
    try {
        const crops = {
            'sandy-hot': 'Watermelon',
            'clay-cool': 'Wheat',
            'loam-moderate': 'Corn',
            'black-moderate': 'Cotton',
        };
        const recommendation = crops[`${soilType}-${climate}`] || 'Unable to determine';
        res.json({ crop: recommendation });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching crop recommendation' });
    }
});

// ✅ Weather API (Uses OpenWeatherMap for real-time data)
app.get('/api/weather', async (req, res) => {
    const { location } = req.query;
    try {
        const apiKey = process.env.WEATHER_API_KEY;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        const data = response.data;

        res.json({
            location: data.name,
            temperature: data.main.temp,
            conditions: data.weather[0].description,
            humidity: data.main.humidity,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

// ✅ Farmer Forum: Post Question
app.post('/api/forum', async (req, res) => {
    const { question } = req.body;
    try {
        const post = new Post({ question, answer: '' });
        await post.save();
        res.json({ success: true, message: 'Question posted successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error posting question' });
    }
});

// ✅ Farmer Forum: Fetch Recent Posts
app.get('/api/forum', async (req, res) => {
    try {
        const posts = await Post.find().sort({ _id: -1 }).limit(10);
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching forum posts' });
    }
});

// ✅ Sustainable Farming Practices API
app.get('/api/sustainable-practices', (req, res) => {
    const practices = [
        'Use organic fertilizers',
        'Implement crop rotation',
        'Practice water conservation',
        'Utilize integrated pest management',
        'Plant cover crops',
        'Reduce chemical pesticide usage',
        'Adopt precision farming techniques',
    ];
    res.json(practices);
});

// ✅ Market Prices API (Stores & Fetches Latest Prices)
app.get('/api/market-prices', async (req, res) => {
    try {
        const prices = await MarketPrice.find().sort({ _id: -1 }).limit(5);
        res.json(prices);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching market prices' });
    }
});

app.post('/api/market-prices', async (req, res) => {
    const { crop, price } = req.body;
    try {
        const newPrice = new MarketPrice({ crop, price });
        await newPrice.save();
        res.json({ success: true, message: 'Market price added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding market price' });
    }
});

// ✅ Success Stories API
app.post('/api/success-stories', async (req, res) => {
    const { story } = req.body;
    try {
        const newStory = new SuccessStory({ story });
        await newStory.save();
        res.json({ success: true, message: 'Success story added!' });
    } catch (error) {
        res.status(500).json({ error: 'Error posting success story' });
    }
});

app.get('/api/success-stories', async (req, res) => {
    try {
        const stories = await SuccessStory.find().sort({ _id: -1 }).limit(10);
        res.json(stories);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching success stories' });
    }
});

// ✅ AI Chat Assistant for Farming Advice (Mocked)
app.post('/api/ai-expert', async (req, res) => {
    const { query } = req.body;
    try {
        const responses = {
            'best fertilizer': 'Use organic compost and nitrogen-based fertilizers for better crop growth.',
            'pest control': 'Consider using neem oil spray or biological pest control methods.',
            'irrigation techniques': 'Drip irrigation is efficient and conserves water better than flood irrigation.',
        };

        const reply = responses[query.toLowerCase()] || "I'm sorry, I don't have an answer for that. Please consult an expert.";
        res.json({ response: reply });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching AI response' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
