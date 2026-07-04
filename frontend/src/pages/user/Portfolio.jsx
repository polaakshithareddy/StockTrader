import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Button, Snackbar, Alert, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import api from '../../services/api';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');

  // Sell modal state
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [selectedHolding, setSelectedHolding] = useState(null);
  const [sellQuantity, setSellQuantity] = useState(1);

  const showToast = (msg, severity = 'error') => {
    setToastMessage(msg);
    setToastSeverity(severity);
    setToastOpen(true);
  };

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') return;
    setToastOpen(false);
  };

  const fetchPortfolio = async () => {
    try {
      const { data } = await api.get('/portfolio');
      setPortfolio(data);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const openSellModal = (holding) => {
    setSelectedHolding(holding);
    setSellQuantity(1);
    setSellModalOpen(true);
  };

  const closeSellModal = () => {
    setSellModalOpen(false);
    setSelectedHolding(null);
  };

  const handleSellQuantityChange = (val) => {
    const parsed = parseInt(val);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= selectedHolding?.quantity) {
      setSellQuantity(parsed);
    } else if (val === '') {
      setSellQuantity('');
    }
  };

  const handleSellQuantityBlur = () => {
    if (!sellQuantity || sellQuantity < 1) setSellQuantity(1);
  };

  const handleSell = async () => {
    const qty = parseInt(sellQuantity);
    if (!qty || qty < 1) return showToast('Please enter a valid quantity.', 'error');
    if (qty > selectedHolding?.quantity) return showToast(`You only own ${selectedHolding?.quantity} shares.`, 'error');

    setActionLoading(true);
    try {
      await api.post('/trade/sell', { stockId: selectedHolding.stockId?._id, quantity: qty });
      showToast(`Successfully sold ${qty} share${qty > 1 ? 's' : ''} of ${selectedHolding.stockId?.symbol}!`, 'success');
      closeSellModal();
      fetchPortfolio();
    } catch (error) {
      showToast(error.response?.data?.message || 'Transaction failed', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>;
  }

  const sellTotal = selectedHolding ? (selectedHolding.stockId?.currentPrice * (parseInt(sellQuantity) || 0)).toFixed(2) : '0.00';

  return (
    <Box className="py-4">
      <Typography variant="h4" className="font-bold text-slate-800 dark:text-white mb-6">
        Your Portfolio
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white dark:bg-slate-800 shadow-sm border-l-4 border-indigo-500">
          <CardContent className="p-6">
            <Typography className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Total Investment</Typography>
            <Typography variant="h5" className="font-bold text-slate-800 dark:text-white">${portfolio?.totalInvestment?.toFixed(2) || '0.00'}</Typography>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-slate-800 shadow-sm border-l-4 border-indigo-500">
          <CardContent className="p-6">
            <Typography className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Current Value</Typography>
            <Typography variant="h5" className="font-bold text-slate-800 dark:text-white">${portfolio?.currentValue?.toFixed(2) || '0.00'}</Typography>
          </CardContent>
        </Card>
        <Card className={`bg-white dark:bg-slate-800 shadow-sm border-l-4 ${portfolio?.totalProfitLoss >= 0 ? 'border-green-500' : 'border-red-500'}`}>
          <CardContent className="p-6">
            <Typography className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Profit / Loss</Typography>
            <Typography variant="h5" className={`font-bold ${portfolio?.totalProfitLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {portfolio?.totalProfitLoss >= 0 ? '+' : ''}${portfolio?.totalProfitLoss?.toFixed(2) || '0.00'}
            </Typography>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden shadow-sm">
        <TableContainer>
          <Table>
            <TableHead className="bg-slate-50 dark:bg-slate-900/50">
              <TableRow>
                <TableCell className="font-bold text-slate-500 dark:text-slate-400">Symbol</TableCell>
                <TableCell className="font-bold text-slate-500 dark:text-slate-400">Company</TableCell>
                <TableCell align="right" className="font-bold text-slate-500 dark:text-slate-400">Quantity</TableCell>
                <TableCell align="right" className="font-bold text-slate-500 dark:text-slate-400">Avg. Price</TableCell>
                <TableCell align="right" className="font-bold text-slate-500 dark:text-slate-400">Current Price</TableCell>
                <TableCell align="right" className="font-bold text-slate-500 dark:text-slate-400">Total Value</TableCell>
                <TableCell align="right" className="font-bold text-slate-500 dark:text-slate-400">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {portfolio?.holdings?.map((row) => (
                <TableRow key={row._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <TableCell component="th" scope="row">
                    <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-bold tracking-wider">
                      {row.stockId?.symbol}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium text-slate-700 dark:text-slate-300">{row.stockId?.companyName}</TableCell>
                  <TableCell align="right" className="font-bold text-slate-800 dark:text-white">{row.quantity}</TableCell>
                  <TableCell align="right" className="text-slate-600 dark:text-slate-400">${row.averagePrice?.toFixed(2)}</TableCell>
                  <TableCell align="right" className="text-slate-600 dark:text-slate-400">${row.stockId?.currentPrice?.toFixed(2)}</TableCell>
                  <TableCell align="right" className="font-bold text-slate-800 dark:text-white">${(row.quantity * row.stockId?.currentPrice)?.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => openSellModal(row)}
                      size="small"
                      className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/30"
                    >
                      Sell
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {(!portfolio?.holdings || portfolio.holdings.length === 0) && (
                <TableRow>
                  <TableCell colSpan={7} align="center" className="py-12 text-slate-500">
                    <Typography className="text-lg">You don't own any stocks yet. Head to the Market to buy some!</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Sell Modal */}
      <Dialog open={sellModalOpen} onClose={closeSellModal} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Box>
            <Typography variant="h6" fontWeight="bold">Sell Shares</Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedHolding?.stockId?.companyName} ({selectedHolding?.stockId?.symbol})
            </Typography>
          </Box>
          <IconButton onClick={closeSellModal} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {/* Stock Info */}
          <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg mb-4">
            <Typography variant="body2" color="text.secondary">Current Price</Typography>
            <Typography fontWeight="bold">${selectedHolding?.stockId?.currentPrice?.toFixed(2)}</Typography>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg mb-5">
            <Typography variant="body2" color="text.secondary">Shares Owned</Typography>
            <Typography fontWeight="bold">{selectedHolding?.quantity}</Typography>
          </div>

          {/* Quantity Selector */}
          <Typography className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Quantity to Sell
          </Typography>
          <div className="flex items-center gap-3 mb-4">
            <IconButton
              onClick={() => setSellQuantity(q => Math.max(1, parseInt(q || 1) - 1))}
              size="small"
              sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '8px' }}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            <TextField
              value={sellQuantity}
              onChange={(e) => handleSellQuantityChange(e.target.value)}
              onBlur={handleSellQuantityBlur}
              inputProps={{ min: 1, max: selectedHolding?.quantity, style: { textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' } }}
              size="small"
              sx={{ width: '80px' }}
            />
            <IconButton
              onClick={() => setSellQuantity(q => Math.min(selectedHolding?.quantity || 1, parseInt(q || 1) + 1))}
              size="small"
              sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '8px' }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
            <Button
              size="small"
              variant="text"
              onClick={() => setSellQuantity(selectedHolding?.quantity)}
              sx={{ ml: 'auto', textTransform: 'none', color: 'primary.main' }}
            >
              Sell All
            </Button>
          </div>

          {/* Total Value Preview */}
          <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <Typography className="text-slate-600 dark:text-slate-400 text-sm font-medium">You will receive</Typography>
            <Typography className="font-bold text-red-600 dark:text-red-400 text-lg">${sellTotal}</Typography>
          </div>
        </DialogContent>

        <DialogActions sx={{ p: 2, pt: 1, gap: 1 }}>
          <Button onClick={closeSellModal} variant="outlined" fullWidth sx={{ borderRadius: '10px' }}>
            Cancel
          </Button>
          <Button
            onClick={handleSell}
            variant="contained"
            color="error"
            fullWidth
            disabled={actionLoading}
            sx={{ borderRadius: '10px', fontWeight: 'bold' }}
          >
            {actionLoading ? 'Selling...' : `Sell ${sellQuantity} Share${parseInt(sellQuantity) > 1 ? 's' : ''}`}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={toastOpen} autoHideDuration={4000} onClose={handleCloseToast} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleCloseToast} severity={toastSeverity} sx={{ width: '100%' }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Portfolio;
