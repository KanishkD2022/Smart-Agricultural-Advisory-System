// DOM Elements
const cropForm = document.getElementById('crop-form');
const cropResult = document.getElementById('crop-result');
const weatherForm = document.getElementById('weather-form');
const weatherResult = document.getElementById('weather-result');
const questionForm = document.getElementById('question-form');
const forumPosts = document.getElementById('forum-posts');
const practicesList = document.getElementById('practices-list');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Dark Mode Toggle
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
}

// Crop Recommendation
cropForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const soilType = document.getElementById('soil-type').value;
    const climate = document.getElementById('climate').value;

    try {
        const response = await fetch('/api/crop-recommendation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ soilType, climate }),
        });

        const data = await response.json();
        cropResult.innerHTML = `<p>Recommended crop: <strong>${data.crop}</strong></p>`;
    } catch (error) {
        console.error('Error:', error);
        cropResult.innerHTML = '<p>Error fetching crop recommendation. Please try again.</p>';
    }
});

// Weather Updates
weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = document.getElementById('location').value;

    try {
        const response = await fetch(`/api/weather?location=${encodeURIComponent(location)}`);
        const data = await response.json();
        weatherResult.innerHTML = `
            <h3>Weather for ${data.location}</h3>
            <p>Temperature: ${data.temperature}°C</p>
            <p>Conditions: ${data.conditions}</p>
            <p>Humidity: ${data.humidity}%</p>
        `;
    } catch (error) {
        console.error('Error:', error);
        weatherResult.innerHTML = '<p>Error fetching weather data. Please try again.</p>';
    }
});

// Farmer Forum
questionForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const question = document.getElementById('question').value;

    try {
        await fetch('/api/forum', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question }),
        });

        await loadForumPosts();
        document.getElementById('question').value = '';
    } catch (error) {
        console.error('Error:', error);
        alert('Error posting question. Please try again.');
    }
});

async function loadForumPosts() {
    try {
        const response = await fetch('/api/forum');
        const posts = await response.json();
        forumPosts.innerHTML = posts.map(post => `
            <div class="forum-post">
                <h4>${post.question}</h4>
                <p>${post.answer || 'Awaiting expert answer...'}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error:', error);
        forumPosts.innerHTML = '<p>Error loading forum posts. Please try again.</p>';
    }
}

// Sustainable Practices
async function loadSustainablePractices() {
    try {
        const response = await fetch('/api/sustainable-practices');
        const practices = await response.json();
        practicesList.innerHTML = practices.map(practice => `<li>${practice}</li>`).join('');
    } catch (error) {
        console.error('Error:', error);
        practicesList.innerHTML = '<li>Error loading sustainable practices. Please try again.</li>';
    }
}

// Market Prices Fetching
async function loadMarketPrices() {
    const priceList = document.getElementById('price-list');

    try {
        const response = await fetch('/api/market-prices');
        const prices = await response.json();
        priceList.innerHTML = prices.map(price => `
            <div class="card">
                <h4>${price.crop}</h4>
                <p>Price: ${price.price} per kg</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error:', error);
        priceList.innerHTML = '<p>Error loading market prices.</p>';
    }
}

// Success Stories Submission
const storyForm = document.getElementById('story-form');
const storiesList = document.getElementById('stories-list');

storyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const story = document.getElementById('story').value;

    try {
        await fetch('/api/success-stories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ story }),
        });

        await loadSuccessStories();
        document.getElementById('story').value = '';
    } catch (error) {
        console.error('Error:', error);
        alert('Error submitting story.');
    }
});

async function loadSuccessStories() {
    try {
        const response = await fetch('/api/success-stories');
        const stories = await response.json();
        storiesList.innerHTML = stories.map(story => `
            <div class="card">
                <p>${story}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error:', error);
        storiesList.innerHTML = '<p>Error loading success stories.</p>';
    }
}

// Expert AI Chat System
const chatForm = document.getElementById('chat-form');
const adviceQuery = document.getElementById('advice-query');
const adviceResponse = document.getElementById('advice-response');

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = adviceQuery.value;
    
    try {
        const response = await fetch('/api/ai-expert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        });

        const data = await response.json();
        adviceResponse.innerHTML = `<p>${data.response}</p>`;
        adviceQuery.value = '';
    } catch (error) {
        console.error('Error:', error);
        adviceResponse.innerHTML = '<p>Error fetching AI response.</p>';
    }
});

// Initial Data Load
loadForumPosts();
loadSustainablePractices();
loadMarketPrices();
loadSuccessStories();
