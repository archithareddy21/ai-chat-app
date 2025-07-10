import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

// Sleep function for retrying requests
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getAIResponse = async (prompt, retries = 3, delay = 5000) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo', 
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
     
    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content.trim(); 
    } else {
      return "Sorry, I couldn't understand your request.";
    }
  } catch (error) {
    // Handle the 429 rate limit error
    if (error.response && error.response.status === 429 && retries > 0) {
      console.log(`Rate limit hit, retrying in ${delay / 1000} seconds...`);
      await sleep(delay); // Retry after the specified delay
      return await getAIResponse(prompt, retries - 1, delay * 2); // Retry with exponential backoff
    }

    console.error('Error making API request:', error.response?.data);
    console.error('Error status:', error.response?.status);
    console.error('Error headers:', error.response?.headers);
    return `Error ${error.response?.status}: ${error.response?.data?.error?.message || error.message}`;
  }
};


