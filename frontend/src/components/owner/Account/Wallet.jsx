import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OwnerWallet = () => {
        const navigate = useNavigate();
   const [walletBalance, setWalletBalance] = useState(0);
  const [amountToAdd, setAmountToAdd] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [transactions, setTransactions] = useState([]);


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ownerId = queryParams.get('ownerId');

  useEffect(() => {
  const fetchBalance = async () => {
    if (!ownerId) return;

    try {
      const res = await fetch(`http://localhost:5000/api/owner/${ownerId}`);
      const data = await res.json();
      setWalletBalance(data.walletBalance || 0);
      setTransactions(data.walletTransactions || []);
    } catch (err) {
      console.error('Failed to fetch wallet balance:', err);
    }
  };

  fetchBalance();
}, [ownerId]);


  const handleAddBalance = async () => {
    if (!amountToAdd || isNaN(amountToAdd) || amountToAdd <= 0) {
      return setMessage('Please enter a valid amount');
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/wallet/add-balance/${ownerId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseFloat(amountToAdd) }),
      });

      const data = await res.json();

      if (res.ok) {
        setWalletBalance(data.walletBalance);
        setMessage('Balance added successfully!');
        setAmountToAdd('');
      } else {
        setMessage(data.message || 'Failed to add balance');
      }
    } catch (err) {
      setMessage('Server error. Try again.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-2 p-4 bg-white rounded-xl shadow-md">
       <div className="flex items-center mb-4 ">
                <button onClick={() => navigate(-1)} className="mr-2">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-bold">Wallet</h1>
                <div className="ml-auto">
                </div>
            </div>
      <div className="mb-4">
        <p className="text-lg">Wallet Balance:</p>
        <p className="text-green-600 text-2xl font-bold">₹{walletBalance}</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Add Amount (₹)</label>
        <input
          type="number"
          value={amountToAdd}
          onChange={(e) => setAmountToAdd(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter amount"
        />
      </div>

      <button
        onClick={handleAddBalance}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        {loading ? 'Adding...' : 'Add Balance'}
      </button>


      {message && (
        <div className="mt-4 text-center text-sm text-gray-700">{message}</div>
      )}
      <div className="mt-8">
  <h3 className="text-xl font-semibold mb-2">Transaction History</h3>
  {transactions.length === 0 ? (
    <p className="text-gray-600">No transactions yet.</p>
  ) : (
    <ul className="space-y-2 max-h-64 overflow-y-auto">
      {transactions
        .slice() // shallow copy
        .reverse() // latest first
        .map((txn, index) => (
          <li
            key={index}
            className="p-3 bg-gray-100 rounded-md shadow-sm flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{txn.reason || txn.type}</p>
              <p className="text-sm text-gray-500">
                {new Date(txn.date).toLocaleString()}
              </p>
            </div>
            <span
              className={
                txn.type === 'credit' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'
              }
            >
              ₹{txn.amount}
            </span>
          </li>
        ))}
    </ul>
  )}
</div>

    </div>
  );
};

export default OwnerWallet;
