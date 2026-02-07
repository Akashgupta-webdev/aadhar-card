import React, { useContext, useState } from 'react';
import { 
  Bell, 
  CreditCard, 
  TrendingUp, 
  ShoppingCart, 
  Coffee, 
  Music, 
  Zap,
  User,
  Settings,
  Shield,
  LogOut,
  Calendar,
  DollarSign,
  Activity,
  PieChart,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { UserContext } from '../../contexts/UserProvider';

// Mock data for the dashboard
const mockUserData = {
  profile: {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    joinDate: "January 2023"
  },
  balance: {
    current: 2845.50,
    income: 1250.00,
    expenses: 465.75
  },
  recentActivity: [
    { id: 1, type: 'shopping', description: 'Amazon Purchase', amount: -89.99, date: '2024-01-15', icon: ShoppingCart },
    { id: 2, type: 'income', description: 'Freelance Payment', amount: 1200.00, date: '2024-01-14', icon: DollarSign },
    { id: 3, type: 'food', description: 'Starbucks Coffee', amount: -5.75, date: '2024-01-14', icon: Coffee },
    { id: 4, type: 'entertainment', description: 'Spotify Premium', amount: -9.99, date: '2024-01-13', icon: Music },
    { id: 5, type: 'utilities', description: 'Electricity Bill', amount: -45.50, date: '2024-01-12', icon: Zap }
  ],
  quickStats: [
    { title: 'Monthly Budget', value: '$1,200', change: '+12%', positive: true, icon: PieChart },
    { title: 'Savings Rate', value: '24%', change: '+5%', positive: true, icon: TrendingUp },
    { title: 'Transactions', value: '42', change: '-3%', positive: false, icon: Activity }
  ]
};

const UserDashboard = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(mockUserData);
  const [activeTab, setActiveTab] = useState('overview');

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric'
    });
  };

  // Get activity icon color based on type
  const getActivityColor = (type) => {
    const colors = {
      income: 'text-green-500',
      shopping: 'text-blue-500',
      food: 'text-orange-500',
      entertainment: 'text-purple-500',
      utilities: 'text-yellow-500'
    };
    return colors[type] || 'text-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50/30 transition-all duration-300">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 text-sm">Welcome back, {user?.name}</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
              {user.name.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Balance Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-blue-100 text-sm font-medium">Total Balance</h3>
              <CreditCard size={20} className="text-blue-200" />
            </div>
            <p className="text-3xl font-bold mb-2">{formatCurrency(user.balance)}</p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <ArrowUpRight size={16} className="text-green-300 mr-1" />
                <span className="text-green-300">+{formatCurrency(1000)}</span>
              </div>
              <div className="flex items-center">
                <ArrowDownRight size={16} className="text-red-300 mr-1" />
                <span className="text-red-300">{formatCurrency(500)}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          {/* {userData.quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
                <stat.icon size={20} className="text-gray-400" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
              <div className={`flex items-center text-sm ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                <span>{stat.change}</span>
              </div>
            </div>
          ))} */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {userData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl bg-gray-50 ${getActivityColor(activity.type)}`}>
                        <activity.icon size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.description}</p>
                        <p className="text-sm text-gray-500">{formatDate(activity.date)}</p>
                      </div>
                    </div>
                    <div className={`text-right ${activity.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      <p className="font-semibold">
                        {activity.amount > 0 ? '+' : ''}{formatCurrency(activity.amount)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Card */}
          <div className="space-y-6">
            {/* User Profile */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <img
                    src={userData.profile.avatar}
                    alt={user.name }
                    className="w-20 h-20 rounded-full mx-auto border-4 border-white shadow-lg"
                  />
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-500 text-sm mb-2">{user.email}</p>
                <p className="text-gray-400 text-xs">Member since {userData.profile.joinDate}</p>
              </div>
              
              <div className="mt-6 space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                  <User size={18} />
                  <span>Edit Profile</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                  <Settings size={18} />
                  <span>Settings</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                  <Shield size={18} />
                  <span>Privacy</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors text-center">
                  <CreditCard className="mx-auto mb-2 text-blue-600" size={20} />
                  <span className="text-sm font-medium text-blue-700">Transfer</span>
                </button>
                <button className="p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors text-center">
                  <TrendingUp className="mx-auto mb-2 text-green-600" size={20} />
                  <span className="text-sm font-medium text-green-700">Invest</span>
                </button>
                <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors text-center">
                  <PieChart className="mx-auto mb-2 text-purple-600" size={20} />
                  <span className="text-sm font-medium text-purple-700">Budget</span>
                </button>
                <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors text-center">
                  <Calendar className="mx-auto mb-2 text-orange-600" size={20} />
                  <span className="text-sm font-medium text-orange-700">Schedule</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;