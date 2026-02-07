import React, { useState, useEffect, useMemo } from 'react'
import { supabase } from '../../lib/supabaseClient';
import {
  Search,
  Users,
  AlertCircle,
  Edit,
  Mail,
  Phone,
  User,
  Wallet,
  Download,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  // Calculate metrics
  const metrics = useMemo(() => {
    const totalUsers = users.length;
    const lowBalanceUsers = users.filter(user => user.balance < 50).length;
    const averageBalance = users.length > 0
      ? users.reduce((sum, user) => sum + (user.balance || 0), 0) / users.length
      : 0;
    const totalBalance = users.reduce((sum, user) => sum + (user.balance || 0), 0);

    return {
      totalUsers,
      lowBalanceUsers,
      averageBalance: Math.round(averageBalance * 100) / 100,
      totalBalance: Math.round(totalBalance * 100) / 100
    };
  }, [users]);

  // Filter users based on search
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;

    const term = searchTerm.toLowerCase();
    return users.filter(user =>
      user.name?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term) ||
      user.contact?.toString().toLowerCase().includes(term) ||
      user.id?.toString().includes(term)
    );
  }, [users, searchTerm]);

  // Pagination
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("user")
        .select("*")
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users");
      } else {
        setUsers(data || []);
        toast.success(`Loaded ${data?.length || 0} users`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while loading users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (userId) => {
    toast.info(`Edit user ${userId} clicked`);
    // Implement edit functionality here
  };

  const handleViewDetails = (user) => {
    // toast.info(`Viewing details for ${user.name}`);
    // Implement view details functionality here
    navigate(`/user-detail/${user.user_id}`)

  };

  const handleExport = () => {
    toast.success("Exporting user data...");
    // Implement export functionality here
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getBalanceColor = (balance) => {
    if (balance < 0) return 'text-red-600';
    if (balance < 50) return 'text-amber-600';
    if (balance < 100) return 'text-blue-600';
    return 'text-green-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-2">Manage and monitor all user accounts</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={fetchUsers}
              disabled={isLoading}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              onClick={handleExport}
              className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white border-l-4 border-l-blue-500 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{metrics.totalUsers}</div>
              <CardDescription className="mt-2">
                All registered users in the system
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-l-amber-500 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Low Balance Users</CardTitle>
                <div className="p-2 bg-amber-100 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{metrics.lowBalanceUsers}</div>
              <CardDescription className="mt-2">
                Users with balance less than ₹50
              </CardDescription>
            </CardContent>
            <CardFooter className="pt-2">
              <Progress
                value={(metrics.lowBalanceUsers / Math.max(metrics.totalUsers, 1)) * 100}
                className="h-2"
              />
            </CardFooter>
          </Card>

          <Card className="bg-white border-l-4 border-l-green-500 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Average Balance</CardTitle>
                <div className="p-2 bg-green-100 rounded-lg">
                  <Wallet className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">₹{metrics.averageBalance}</div>
              <CardDescription className="mt-2">
                Average user balance
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-l-purple-500 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Total Balance</CardTitle>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Wallet className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">₹{metrics.totalBalance}</div>
              <CardDescription className="mt-2">
                Combined balance of all users
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-auto md:flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users by name, email, phone, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11 w-full"
                />
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <div className="text-sm text-gray-500">
                  Showing {filteredUsers.length} of {users.length} users
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"> */}
        {/* Users Table */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">User Accounts</CardTitle>
                <CardDescription>
                  Manage user information and balance
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-sm">
                {isLoading ? 'Loading...' : `${users.length} users`}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="font-semibold">User</TableHead>
                    <TableHead className="font-semibold">Contact</TableHead>
                    <TableHead className="font-semibold">Balance</TableHead>
                    <TableHead className="font-semibold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        <div className="flex flex-col items-center gap-2">
                          <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
                          <p className="text-gray-500">Loading users...</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : paginatedUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        <div className="flex flex-col items-center gap-2">
                          <Users className="h-8 w-8 text-gray-400" />
                          <p className="text-gray-500">No users found</p>
                          {searchTerm && (
                            <Button
                              variant="ghost"
                              onClick={() => setSearchTerm("")}
                              className="text-sm"
                            >
                              Clear search
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9 border">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700">
                                {getInitials(user.name || 'UU')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-gray-900">{user.name || 'Unknown User'}</div>
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {user.email || 'No email'}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {/* <div className="text-sm text-gray-900">{user.contact || 'No contact'}</div> */}
                          <div className="text-sm text-gray-900 flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {user.contact || 'No phone'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={`font-semibold ${getBalanceColor(user.balance)}`}>
                            ₹{user.balance?.toFixed(2) || '0.00'}
                          </div>
                          {user.balance < 50 && (
                            <Badge variant="destructive" className="mt-1 text-xs">
                              Low Balance
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="ghost cursor-pointer">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleViewDetails(user)}>Detail</DropdownMenuItem>
                                <DropdownMenuItem>Wallet Topup</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  Deactivate User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {filteredUsers.length > 0 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className="w-8 h-8 p-0"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Low Balance Users Card */}
        {/* <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Low Balance Alert</CardTitle>
                  <CardDescription>
                    Users with balance less than ₹50
                  </CardDescription>
                </div>
                <Badge variant="destructive">{metrics.lowBalanceUsers}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              {metrics.lowBalanceUsers === 0 ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                    <Wallet className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-gray-600">No users with low balance</p>
                  <p className="text-sm text-gray-500 mt-1">All users have sufficient balance</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {users
                    .filter(user => user.balance < 50)
                    .slice(0, 5)
                    .map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-amber-100 text-amber-700">
                              {getInitials(user.name || 'UU')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">{user.name || 'Unknown User'}</div>
                            <div className="text-xs text-gray-500 truncate max-w-[120px]">
                              {user.email}
                            </div>
                          </div>
                        </div>
                        <div className="text-amber-700 font-semibold">
                          ₹{user.balance?.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  
                  {metrics.lowBalanceUsers > 5 && (
                    <Button variant="ghost" className="w-full text-sm">
                      View all {metrics.lowBalanceUsers} users
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t pt-6">
              <div className="w-full space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Low Balance Users</span>
                  <span className="font-medium">{metrics.lowBalanceUsers} users</span>
                </div>
                <Progress 
                  value={(metrics.lowBalanceUsers / Math.max(metrics.totalUsers, 1)) * 100} 
                  className="h-2"
                  indicatorClassName="bg-amber-500"
                />
                <p className="text-xs text-gray-500 mt-2">
                  {(metrics.lowBalanceUsers / Math.max(metrics.totalUsers, 1) * 100).toFixed(1)}% of total users
                </p>
              </div>
            </CardFooter>
          </Card> */}
        {/* </div> */}

        {/* Quick Stats */}
        {/* <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Quick Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{users.filter(u => u.balance > 100).length}</div>
                <div className="text-sm text-gray-600">High Balance Users</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {users.filter(u => u.email && u.email.includes('@')).length}
                </div>
                <div className="text-sm text-gray-600">Valid Emails</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {users.filter(u => u.contact).length}
                </div>
                <div className="text-sm text-gray-600">With Contact Info</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{users.length - filteredUsers.length}</div>
                <div className="text-sm text-gray-600">Filtered Out</div>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  )
}