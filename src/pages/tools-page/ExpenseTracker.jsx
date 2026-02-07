import React, { useState, useEffect, useContext } from "react";
import {
  Plus,
  Trash2,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Tag,
  FileText,
  Wallet,
  Search,
  Filter,
  Download,
  MoreVertical,
  Edit,
} from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../hooks/useAuth";
import { exportToExcel } from "../../lib/exportToExcel";
import { Button } from "@/components/ui/button";
import { UserContext } from "../../contexts/UserProvider";

const ExpenseTracker = () => {
  const { user } = useContext(UserContext)
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
    notes: "",
    profit: "",
    loss: "",
  });

  const categories = [
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Bills & Utilities",
    "Healthcare",
    "Education",
    "Travel",
    "Salary",
    "Freelance",
    "Investment",
    "Other",
  ];

  // Fetch user-specific expenses
  useEffect(() => {
    const fetchExpenses = async () => {
      if (!user.id) return;

      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("expenses")
          .select("*")
          .eq("user_id", user.id)
          .order("date", { ascending: false });

        if (error) console.error("Error fetching expenses:", error);
        else {
          setExpenses(data || []);
          setFilteredExpenses(data || []);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpenses();
  }, [user]);

  // Filter expenses based on search and category
  useEffect(() => {
    let filtered = expenses;

    if (searchTerm) {
      filtered = filtered.filter(
        (expense) =>
          expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          expense.notes?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (expense) => expense.category === selectedCategory
      );
    }

    setFilteredExpenses(filtered);
  }, [searchTerm, selectedCategory, expenses]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please log in first!");
      return;
    }

    if (!formData.title || !formData.date) {
      alert("Please provide a title and date.");
      return;
    }

    setIsLoading(true);
    const newExpense = {
      title: formData.title,
      category: formData.category || "Uncategorized",
      date: formData.date,
      notes: formData.notes,
      profit: parseFloat(formData.profit) || 0,
      loss: parseFloat(formData.loss) || 0,
      created_at: new Date().toISOString(),
      user_id: user.id,
    };

    try {
      const { data, error } = await supabase
        .from("expenses")
        .insert([newExpense]);

      if (error) {
        console.error("Error adding expense:", error);
        alert("Failed to add expense. Check console for details.");
        return;
      }

      setExpenses((prev) => [newExpense, ...prev]);
      setFormData({
        title: "",
        date: new Date().toISOString().split("T")[0],
        category: "",
        notes: "",
        profit: "",
        loss: "",
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteExpense = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?"))
      return;

    try {
      const { error } = await supabase.from("expenses").delete().eq("id", id);

      if (error) {
        console.error("Delete error:", error);
        alert("Failed to delete expense");
        return;
      }

      setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Totals calculation
  const totals = expenses.reduce(
    (acc, expense) => {
      acc.totalProfit += expense.profit;
      acc.totalLoss += expense.loss;
      acc.net = acc.totalProfit - acc.totalLoss;
      return acc;
    },
    { totalProfit: 0, totalLoss: 0, net: 0 }
  );

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const getCategoryColor = (category) => {
    const colors = {
      "Food & Dining": "bg-orange-100 text-orange-800",
      Transportation: "bg-blue-100 text-blue-800",
      Shopping: "bg-purple-100 text-purple-800",
      Entertainment: "bg-pink-100 text-pink-800",
      "Bills & Utilities": "bg-gray-100 text-gray-800",
      Healthcare: "bg-red-100 text-red-800",
      Education: "bg-indigo-100 text-indigo-800",
      Travel: "bg-cyan-100 text-cyan-800",
      Salary: "bg-emerald-100 text-emerald-800",
      Freelance: "bg-lime-100 text-lime-800",
      Investment: "bg-amber-100 text-amber-800",
      Other: "bg-slate-100 text-slate-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const handleExport = () => {
    if (expenses.length > 0) {
      exportToExcel(expenses);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-xl">
                  <Wallet className="text-white" size={28} />
                </div>
                Expense Tracker
              </h1>
              <p className="text-gray-600 mt-2">
                Track your income and expenses in one place
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={handleExport} className="cursor-pointer">
                <Download size={18} />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Income
                </p>
                <p className="text-2xl font-bold text-green-600 mt-2">
                  {formatCurrency(totals.totalProfit)}
                </p>
                <p className="text-xs text-gray-500 mt-1">All time</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <TrendingUp size={24} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Expenses
                </p>
                <p className="text-2xl font-bold text-red-600 mt-2">
                  {formatCurrency(totals.totalLoss)}
                </p>
                <p className="text-xs text-gray-500 mt-1">All time</p>
              </div>
              <div className="p-3 bg-red-50 rounded-xl">
                <TrendingDown size={24} className="text-red-600" />
              </div>
            </div>
          </div>

          <div
            className={`bg-white rounded-2xl p-6 shadow-lg border hover:shadow-xl transition-shadow ${
              totals.net >= 0 ? "border-green-200" : "border-red-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Balance</p>
                <p
                  className={`text-2xl font-bold mt-2 ${
                    totals.net >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {formatCurrency(totals.net)}
                </p>
                <p
                  className={`text-xs mt-1 ${
                    totals.net >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {totals.net >= 0 ? "Positive" : "Negative"} balance
                </p>
              </div>
              <div
                className={`p-3 rounded-xl ${
                  totals.net >= 0 ? "bg-green-50" : "bg-red-50"
                }`}
              >
                <DollarSign
                  size={24}
                  className={
                    totals.net >= 0 ? "text-green-600" : "text-red-600"
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Add New Entry Form - Now above the history */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Plus size={20} className="text-blue-600" />
            </div>
            Add New Transaction
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Transaction Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Grocery Shopping, Salary"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Calendar size={16} />
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Tag size={16} />
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Profit */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Income Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  type="number"
                  name="profit"
                  value={formData.profit}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                />
              </div>
            </div>

            {/* Loss */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Expense Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  type="number"
                  name="loss"
                  value={formData.loss}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2 md:col-span-2 lg:col-span-1">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FileText size={16} />
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Add any additional notes..."
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 lg:col-span-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <Plus size={20} />
                )}
                {isLoading ? "Adding..." : "Add Transaction"}
              </button>
            </div>
          </form>
        </div>

        {/* Expense History Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Transaction History
                <span className="text-sm font-normal text-gray-600 ml-2">
                  ({filteredExpenses.length} of {expenses.length} entries)
                </span>
              </h2>

              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredExpenses.length === 0 ? (
            <div className="text-center py-12">
              <Wallet size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg mb-2">
                {expenses.length === 0
                  ? "No transactions recorded yet"
                  : "No transactions found"}
              </p>
              <p className="text-gray-400 text-sm">
                {expenses.length === 0
                  ? "Add your first transaction above"
                  : "Try adjusting your search or filter"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Transaction
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Notes
                    </th>
                    <th className="text-right py-4 px-6 text-sm font-semibold text-green-600 uppercase tracking-wider">
                      Income
                    </th>
                    <th className="text-right py-4 px-6 text-sm font-semibold text-red-600 uppercase tracking-wider">
                      Expense
                    </th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredExpenses.map((expense) => (
                    <tr
                      key={expense.id}
                      className="hover:bg-gray-50 transition-colors group"
                    >
                      <td className="py-4 px-6">
                        <div className="text-sm font-medium text-gray-900">
                          {formatDate(expense.date)}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm font-semibold text-gray-900">
                          {expense.title}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                            expense.category
                          )}`}
                        >
                          {expense.category}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-600 max-w-xs truncate">
                          {expense.notes || "-"}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        {expense.profit > 0 ? (
                          <div className="text-sm font-semibold text-green-600">
                            +{formatCurrency(expense.profit)}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-400">-</div>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        {expense.loss > 0 ? (
                          <div className="text-sm font-semibold text-red-600">
                            -{formatCurrency(expense.loss)}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-400">-</div>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => deleteExpense(expense.id)}
                          className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                          title="Delete transaction"
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
  );
};

export default ExpenseTracker;
