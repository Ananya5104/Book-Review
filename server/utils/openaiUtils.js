const axios = require('axios');

const refineReview = async (reviewText) => {
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-1.3B',
      { inputs: `Refine this review: ${reviewText}` },
      {
        headers: {
          Authorization: `Bearer YOUR_HUGGINGFACE_API_KEY`,
        },
      }
    );

    return response.data[0]?.generated_text || reviewText;
  } catch (error) {
    console.error('Error refining review:', error);
    return reviewText;
  }
};

module.exports = {
  refineReview,
};
