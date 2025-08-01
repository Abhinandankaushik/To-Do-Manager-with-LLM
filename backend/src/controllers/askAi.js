import model from "../utils/AiModel.js";

const askAi =  async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: 'Question is required' });

  try {
    const result = await model.generateContent(question);
    const answer = await result.response.text();
    res.json({ answer });
  } catch (error) {
    console.error('Error calling Google Gemini API:', error);
    res.status(500).json({ error: 'Failed to get response from LLM' });
  }
}

export default askAi;