const Stock = require('../models/Stock');

const YahooFinance = require('yahoo-finance2').default;
const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

const getStocks = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          $or: [
            { symbol: { $regex: req.query.keyword, $options: 'i' } },
            { companyName: { $regex: req.query.keyword, $options: 'i' } },
          ],
        }
      : {};

    let stocks = await Stock.find({ ...keyword });
    
    // If the user searched for a specific symbol that isn't in our DB, try to fetch it from Yahoo Finance
    if (stocks.length === 0 && req.query.keyword) {
      try {
        const symbol = req.query.keyword.toUpperCase();
        const quote = await yahooFinance.quote(symbol);
        
        if (quote && quote.regularMarketPrice) {
          // It's a valid stock on Yahoo Finance, so let's add it to our local database!
          const newStock = await Stock.create({
            symbol: quote.symbol,
            companyName: quote.longName || quote.shortName || quote.symbol,
            sector: 'Other', // Yahoo quote doesn't always provide sector easily in the basic quote
            currentPrice: quote.regularMarketPrice,
            marketCap: quote.marketCap || 0,
            volume: quote.regularMarketVolume || 0
          });
          stocks = [newStock];
        }
      } catch (err) {
        // Not a valid symbol on Yahoo, ignore
      }
    }

    // We will skip live updating every single stock via Yahoo Finance here to prevent the 
    // "Market page is stuck loading forever" bug caused by API rate limits/latency.
    // The live price will still be fetched when viewing a specific stock's Chart or executing a Trade.

    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStockById = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);

    if (stock) {
      try {
        const quote = await yahooFinance.quote(stock.symbol);
        if (quote && quote.regularMarketPrice) {
          stock.currentPrice = quote.regularMarketPrice;
          await stock.save();
        }
      } catch (err) {
        console.error(`Failed to fetch live price for ${stock.symbol}`, err);
      }
      
      res.json(stock);
    } else {
      res.status(404);
      throw new Error('Stock not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getStockChart = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) {
      res.status(404);
      throw new Error('Stock not found');
    }

    // Get historical data for the last 30 days
    const queryOptions = { 
      period1: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 
      period2: new Date(),
      interval: '1d' 
    };
    const result = await yahooFinance.historical(stock.symbol, queryOptions);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const seedStocks = async (req, res) => {
  try {
    const initialStocks = [
      { symbol: 'AAPL', companyName: 'Apple Inc.', sector: 'Technology', currentPrice: 175.50, marketCap: 2800000000000, volume: 55000000 },
      { symbol: 'GOOGL', companyName: 'Alphabet Inc.', sector: 'Technology', currentPrice: 135.20, marketCap: 1700000000000, volume: 25000000 },
      { symbol: 'MSFT', companyName: 'Microsoft Corp.', sector: 'Technology', currentPrice: 330.10, marketCap: 2500000000000, volume: 22000000 },
      { symbol: 'TSLA', companyName: 'Tesla Inc.', sector: 'Automotive', currentPrice: 245.80, marketCap: 800000000000, volume: 110000000 },
      { symbol: 'AMZN', companyName: 'Amazon.com Inc.', sector: 'Retail', currentPrice: 130.00, marketCap: 1300000000000, volume: 45000000 },
    ];
    
    // Clear existing
    await Stock.deleteMany({});
    
    const createdStocks = await Stock.insertMany(initialStocks);
    res.status(201).json(createdStocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStocks, getStockById, getStockChart, seedStocks };
