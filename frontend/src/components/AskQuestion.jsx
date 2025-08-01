import { useState } from 'react';

function AskQuestion() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Function to format Gemini response
  const formatResponse = (text) => {
    // Split text into paragraphs
    let paragraphs = text.split('\n\n').map(p => p.trim()).filter(p => p);

    // Process each paragraph for lists and bold text
    paragraphs = paragraphs.map(paragraph => {
      // Handle unordered lists (starting with -, *, or •)
      if (paragraph.match(/^[-*•]\s/)) {
        const items = paragraph.split('\n').map(item => item.replace(/^[-*•]\s/, '').trim()).filter(item => item);
        return (
          <ul className="list-disc pl-5 space-y-1">
            {items.map((item, index) => (
              <li key={index} className="text-gray-700">{formatBold(item)}</li>
            ))}
          </ul>
        );
      }
      // Handle ordered lists (starting with number and period)
      if (paragraph.match(/^\d+\.\s/)) {
        const items = paragraph.split('\n').map(item => item.replace(/^\d+\.\s/, '').trim()).filter(item => item);
        return (
          <ol className="list-decimal pl-5 space-y-1">
            {items.map((item, index) => (
              <li key={index} className="text-gray-700">{formatBold(item)}</li>
            ))}
          </ol>
        );
      }
      // Regular paragraph
      return <p className="text-gray-700">{formatBold(paragraph)}</p>;
    });

    return paragraphs;
  };

  // Function to format bold text (e.g., **text** or __text__)
  const formatBold = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*|__[^_]+__)/);
    return parts.map((part, index) => {
      if (part.match(/^\*\*[^*]+\*\*$/) || part.match(/^__[^_]+__$/)) {
        const cleanText = part.replace(/^\*\*|\*\*$/g, '').replace(/^__|_+$/g, '');
        return <strong key={index} className="font-bold">{cleanText}</strong>;
      }
      return part;
    });
  };

  const askQuestion = async () => {
    if (!question.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });
      const data = await res.json();
      setAnswer(data.answer);
      setQuestion('');
    } catch (err) {
      console.error('Error asking question:', err);
      setAnswer('Failed to get response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
          <div className="flex flex-col items-center">
            <div className="animate-spin w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full"></div>
            <p className="mt-2 text-gray-600 text-sm">Asking Gemini...</p>
          </div>
        </div>
      )}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ask a Question</h2>
      <div className="space-y-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
          disabled={isLoading}
        />
        <button
          onClick={askQuestion}
          disabled={isLoading}
          className={`w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Submit Question
        </button>
        {answer && (
          <div className="p-4 bg-gray-50 rounded-lg space-y-2">
            <p className="font-semibold text-gray-800">Answer:</p>
            <div>{formatResponse(answer)}</div>
          </div>
        )}
      </div>
    </section>
  );
}

export default AskQuestion;