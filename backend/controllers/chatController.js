const handleChat = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: 'Please provide a message.' });
  }

  try {
    const lowerMessage = message.toLowerCase();
    
    // Hardcoded mock responses based on user input
    let reply = "I'm a simulated AI for this portfolio project! I don't have real-time data, but I'm here to make this platform look awesome.";

    if (lowerMessage.includes('market cap') || lowerMessage.includes('apple')) {
      reply = "Market Cap (Market Capitalization) is the total value of all a company's shares of stock. Apple's market cap is so high because it generates massive hardware sales and has a highly profitable services ecosystem!";
    } else if (lowerMessage.includes('buy') || lowerMessage.includes('trade')) {
      reply = "To buy a stock, simply search for a ticker symbol (like AAPL or TSLA) in the search bar, click on it to view the chart, and use the 'Buy' button to execute a paper trade!";
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      reply = "Hello there! I am your AI Financial Advisor. How can I help you navigate the markets today?";
    } else if (lowerMessage.includes('portfolio') || lowerMessage.includes('money') || lowerMessage.includes('balance')) {
      reply = "Your portfolio tracks all your current stock holdings. You started with $100,000 in simulated cash. Try buying some stocks to see it grow!";
    } else if (lowerMessage.includes('stock') || lowerMessage.includes('invest') || lowerMessage.includes('market')) {
      reply = "Investing in stocks carries risk, but historically the stock market has returned about 7-10% per year on average. Diversifying your portfolio is key!";
    }

    // Simulate network delay to make it feel like AI
    setTimeout(() => {
      res.json({ reply });
    }, 1000);

  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ reply: 'Sorry, I encountered an error while processing your request.' });
  }
};

module.exports = { handleChat };
