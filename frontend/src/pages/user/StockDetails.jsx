import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Card, CardContent, Snackbar, Alert, IconButton, TextField, Chip } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const StockDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [stock, setStock] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [walletBalance, setWalletBalance] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');

  const showToast = (msg, severity = 'error') => {
    setToastMessage(msg);
    setToastSeverity(severity);
    setToastOpen(true);
  };

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') return;
    setToastOpen(false);
  };

  const handleQuantityChange = (val) => {
    const parsed = parseInt(val);
    if (!isNaN(parsed) && parsed >= 1) setQuantity(parsed);
    else if (val === '') setQuantity('');
  };

  const handleQuantityBlur = () => {
    if (!quantity || quantity < 1) setQuantity(1);
  };

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const [stockRes, chartRes, userRes] = await Promise.all([
          api.get(`/stocks/${id}`),
          api.get(`/stocks/${id}/chart`),
          api.get('/users/profile')
        ]);

        setStock(stockRes.data);
        setWalletBalance(userRes.data.walletBalance);

        const formattedData = chartRes.data.map((item) => ({
          date: new Date(item.date).toLocaleDateString(),
          price: item.close
        }));
        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching stock details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStockData();
  }, [id]);

  const handleBuy = async () => {
    const qty = parseInt(quantity);
    if (!qty || qty < 1) return showToast('Please enter a valid quantity.', 'error');

    // Frontend balance check
    const totalCostNum = stock.currentPrice * qty;
    if (walletBalance !== null && totalCostNum > walletBalance) {
      return showToast(`Insufficient balance! You need $${totalCostNum.toFixed(2)} but only have $${walletBalance.toFixed(2)}.`, 'error');
    }

    setActionLoading(true);
    try {
      await api.post('/trade/buy', { stockId: id, quantity: qty });
      setWalletBalance(prev => prev - totalCostNum);
      showToast(`Successfully purchased ${qty} share${qty > 1 ? 's' : ''} of ${stock.symbol}!`, 'success');
    } catch (error) {
      showToast(error.response?.data?.message || 'Transaction failed', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>;
  }

  if (!stock) {
    return <Typography variant="h5" sx={{ mt: 4 }}>Stock not found.</Typography>;
  }

  const totalCost = (stock.currentPrice * (parseInt(quantity) || 0)).toFixed(2);

  return (
    <Box className="py-4">
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/market')}
        className="mb-6 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
      >
        Back to Market
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Column */}
        <div className="lg:col-span-2">
          <Card className="bg-white dark:bg-slate-800 shadow-sm h-full">
            <CardContent className="p-6">
              <Typography variant="h5" className="font-bold text-slate-800 dark:text-white mb-6">
                {stock.companyName} ({stock.symbol}) - 30 Day History
              </Typography>
              <Box className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" className="dark:opacity-20" />
                    <XAxis dataKey="date" stroke="#64748b" tick={{ fill: '#64748b' }} />
                    <YAxis domain={['auto', 'auto']} tickFormatter={(value) => `$${value.toFixed(2)}`} stroke="#64748b" tick={{ fill: '#64748b' }} />
                    <Tooltip
                      formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                      itemStyle={{ color: '#818cf8' }}
                    />
                    <Line type="monotone" dataKey="price" stroke="#6366f1" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#4f46e5', stroke: '#fff', strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </div>

        {/* Info & Buy Column */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Card className="bg-white dark:bg-slate-800 shadow-sm border-t-4 border-indigo-500">
            <CardContent className="p-6">
              <Typography className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Current Price</Typography>
              <Typography variant="h3" className="font-bold text-slate-800 dark:text-white mb-3">
                ${stock.currentPrice?.toFixed(2)}
              </Typography>

              {/* Wallet Balance */}
              {walletBalance !== null && (
                <Chip
                  icon={<AccountBalanceWalletIcon fontSize="small" />}
                  label={`Balance: $${walletBalance.toFixed(2)}`}
                  color={walletBalance >= stock.currentPrice * (parseInt(quantity) || 1) ? 'success' : 'error'}
                  variant="outlined"
                  size="small"
                  className="mb-5"
                />
              )}

              <div className="space-y-4 mb-6">
                <div className="flex justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                  <Typography className="text-slate-600 dark:text-slate-400">Sector</Typography>
                  <Typography className="font-semibold text-slate-800 dark:text-slate-200">{stock.sector}</Typography>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                  <Typography className="text-slate-600 dark:text-slate-400">Market Cap</Typography>
                  <Typography className="font-semibold text-slate-800 dark:text-slate-200">${(stock.marketCap / 1e9).toFixed(2)}B</Typography>
                </div>
                <div className="flex justify-between pb-2">
                  <Typography className="text-slate-600 dark:text-slate-400">Volume</Typography>
                  <Typography className="font-semibold text-slate-800 dark:text-slate-200">{(stock.volume / 1e6).toFixed(2)}M</Typography>
                </div>
              </div>

              {/* Quantity Selector */}
              <Typography className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                Quantity
              </Typography>
              <div className="flex items-center gap-2 mb-4">
                <IconButton
                  onClick={() => setQuantity(q => Math.max(1, parseInt(q || 1) - 1))}
                  size="small"
                  sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '8px' }}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <TextField
                  value={quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  onBlur={handleQuantityBlur}
                  inputProps={{ min: 1, style: { textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' } }}
                  size="small"
                  sx={{ width: '80px' }}
                />
                <IconButton
                  onClick={() => setQuantity(q => parseInt(q || 1) + 1)}
                  size="small"
                  sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '8px' }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </div>

              {/* Total Cost Preview */}
              <div className="flex justify-between items-center mb-6 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <Typography className="text-slate-600 dark:text-slate-400 text-sm font-medium">Total Cost</Typography>
                <Typography className="font-bold text-indigo-700 dark:text-indigo-300 text-lg">${totalCost}</Typography>
              </div>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={handleBuy}
                disabled={actionLoading || (walletBalance !== null && stock.currentPrice * (parseInt(quantity) || 1) > walletBalance)}
                className="py-3 font-bold text-lg shadow-md hover:shadow-lg transition-shadow bg-indigo-600 hover:bg-indigo-700"
              >
                {actionLoading ? 'Processing...' : `Buy ${quantity} Share${quantity > 1 ? 's' : ''}`}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Snackbar open={toastOpen} autoHideDuration={4000} onClose={handleCloseToast} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleCloseToast} severity={toastSeverity} className="w-full">
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StockDetails;
