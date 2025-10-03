import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Calendar,
  Tag,
  FileText,
  Wallet
} from 'lucide-react';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: '',
    notes: '',
    profit: '',
    loss: ''
  });

  // Load expenses from localStorage on component mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.date || (!formData.profit && !formData.loss)) {
      alert('Please fill in required fields: Date and at least one of Profit/Loss');
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      date: formData.date,
      category: formData.category || 'Uncategorized',
      notes: formData.notes,
      profit: parseFloat(formData.profit) || 0,
      loss: parseFloat(formData.loss) || 0,
      createdAt: new Date().toISOString()
    };

    setExpenses(prev => [newExpense, ...prev]);
    
    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      category: '',
      notes: '',
      profit: '',
      loss: ''
    });
  };

  const deleteExpense = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setExpenses(prev => prev.filter(expense => expense.id !== id));
    }
  };

  // Calculate totals
  const totals = expenses.reduce((acc, expense) => {
    acc.totalProfit += expense.profit;
    acc.totalLoss += expense.loss;
    acc.net = acc.totalProfit - acc.totalLoss;
    return acc;
  }, { totalProfit: 0, totalLoss: 0, net: 0 });

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Salary',
    'Freelance',
    'Investment',
    'Other'
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Wallet className="text-blue-600" size={32} />
            Expense Tracker
          </h1>
          <p className="text-gray-600 mt-2">Manage your income and expenses effectively</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Profit Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Profit</p>
                <p className="text-2xl font-bold text-green-600 mt-2">
                  {formatCurrency(totals.totalProfit)}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <TrendingUp size={24} className="text-green-600" />
              </div>
            </div>
          </div>

          {/* Total Loss Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Loss</p>
                <p className="text-2xl font-bold text-red-600 mt-2">
                  {formatCurrency(totals.totalLoss)}
                </p>
              </div>
              <div className="p-3 bg-red-50 rounded-xl">
                <TrendingDown size={24} className="text-red-600" />
              </div>
            </div>
          </div>

          {/* Net Profit/Loss Card */}
          <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${
            totals.net >= 0 ? 'border-green-200' : 'border-red-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Balance</p>
                <p className={`text-2xl font-bold mt-2 ${
                  totals.net >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatCurrency(totals.net)}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${
                totals.net >= 0 ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <DollarSign 
                  size={24} 
                  className={totals.net >= 0 ? 'text-green-600' : 'text-red-600'} 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Plus size={20} />
                Add New Entry
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Date Input */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Calendar size={16} />
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Category Select */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Tag size={16} />
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Profit Input */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Profit (Income)
                  </label>
                  <input
                    type="number"
                    name="profit"
                    value={formData.profit}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                {/* Loss Input */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Loss (Expense)
                  </label>
                  <input
                    type="number"
                    name="loss"
                    value={formData.loss}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                {/* Notes Input */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FileText size={16} />
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Add any additional notes..."
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  Add Entry
                </button>
              </form>
            </div>
          </div>

          {/* Table Section */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Expense History ({expenses.length} entries)
              </h2>
              
              {expenses.length === 0 ? (
                <div className="text-center py-12">
                  <Wallet size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 text-lg">No expenses recorded yet</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Add your first income or expense using the form
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Category</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Notes</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-green-600">Profit</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-red-600">Loss</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {expenses.map((expense) => (
                        <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 text-sm text-gray-900">
                            {formatDate(expense.date)}
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {expense.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate">
                            {expense.notes || '-'}
                          </td>
                          <td className="py-3 px-4 text-sm text-green-600 text-right font-medium">
                            {expense.profit > 0 ? formatCurrency(expense.profit) : '-'}
                          </td>
                          <td className="py-3 px-4 text-sm text-red-600 text-right font-medium">
                            {expense.loss > 0 ? formatCurrency(expense.loss) : '-'}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => deleteExpense(expense.id)}
                              className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                              title="Delete entry"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;