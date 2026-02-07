import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Edit,
  Wallet,
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  CheckCircle,
  XCircle,
  Plus,
  RefreshCw,
  ChevronLeft,
  Activity,
  CreditCard,
  MoreVertical,
  ExternalLink,
  Lock,
  Unlock,
  History,
  BarChart,
  Settings,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import AddBalanceDialog from './components/AddBalanceDialog';
import EditUserDialog from './components/EditUserDialog';
import StatusDialog from './components/StatusDialog';
import { supabase } from '../../lib/supabaseClient';

export default function UserDetailPage() {
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showAddBalance, setShowAddBalance] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [showStatusDialog, setShowStatusDialog] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchUserDetail();
    }
  }, [userId]);

  const fetchUserDetail = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) {
        console.error("Error fetching user:", error);
        toast.error("Failed to load user details");
      } else {
        setUser(data);
        toast.success("User details loaded successfully");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while loading user details");
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatBalance = (balance) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(balance);
  };

  const handleBalanceAdded = (newBalance) => {
    setUser(prev => ({ ...prev, balance: newBalance }));
    toast.success("Balance updated successfully");
  };

  const handleUserUpdated = (updatedUser) => {
    setUser(updatedUser);
    toast.success("User details updated successfully");
  };

  const handleStatusChanged = (newStatus) => {
    setUser(prev => ({ ...prev, status: newStatus }));
    toast.success(`User ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-10 w-48 mb-4" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>User Not Found</CardTitle>
            <CardDescription>
              The user you're looking for doesn't exist or has been removed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8">
              <User className="h-16 w-16 text-gray-400 mb-4" />
              <p className="text-gray-600 mb-6 text-center">
                User ID: {userId}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => window.history.back()}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => window.history.back()}
              className="h-10 w-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                User Details
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and view complete information for {user.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={fetchUserDetail}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button
              onClick={() => setShowEditUser(true)}
              className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Edit className="h-4 w-4" />
              Edit User
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Information Card */}
          <Card className="lg:col-span-2 shadow-lg">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-100 to-indigo-200 text-blue-700">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-2xl">{user.name}</CardTitle>
                      <Badge
                        variant={user.status === 'active' ? 'default' : 'destructive'}
                        className="text-sm"
                      >
                        {user.status === 'active' ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Active
                          </>
                        ) : (
                          <>
                            <XCircle className="h-3 w-3 mr-1" />
                            Inactive
                          </>
                        )}
                      </Badge>
                      {user.admin && (
                        <Badge variant="outline" className="text-sm">
                          <Shield className="h-3 w-3 mr-1" />
                          Admin
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="mt-2">
                      User ID: {user.user_id}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-3xl font-bold text-gray-900">
                    {formatBalance(user.balance)}
                  </div>
                  <Badge
                    variant={user.balance > 50 ? 'outline' : 'destructive'}
                    className="text-xs"
                  >
                    {user.balance > 50 ? 'Sufficient Balance' : 'Low Balance'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="info" className="gap-2">
                    <User className="h-4 w-4" />
                    Information
                  </TabsTrigger>
                  <TabsTrigger value="activity" className="gap-2">
                    <Activity className="h-4 w-4" />
                    Activity
                  </TabsTrigger>
                  <TabsTrigger value="transactions" className="gap-2">
                    <CreditCard className="h-4 w-4" />
                    Transactions
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-6 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Info */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <User className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Full Name</p>
                            <p className="font-medium">{user.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Mail className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email Address</p>
                            <p className="font-medium">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Phone className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Contact Number</p>
                            <p className="font-medium">{user.contact}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Account Info */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Calendar className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Joined Date</p>
                            <p className="font-medium">{formatDate(user.created_at)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Shield className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Account Type</p>
                            <p className="font-medium">
                              {user.admin ? 'Administrator' : 'Regular User'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Wallet className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Current Balance</p>
                            <p className="font-medium text-2xl">
                              {formatBalance(user.balance)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="activity" className="pt-6">
                  <div className="text-center py-12">
                    <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Activity Log
                    </h3>
                    <p className="text-gray-600">
                      User activity tracking will be available soon
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="transactions" className="pt-6">
                  <div className="text-center py-12">
                    <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Transaction History
                    </h3>
                    <p className="text-gray-600">
                      Transaction records will be displayed here
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="pt-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Account Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-500">Enhanced security for login</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Enable
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-500">Receive updates via email</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">API Access</p>
                          <p className="text-sm text-gray-500">Manage API keys and permissions</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Quick Actions & Stats */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Manage user account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => setShowAddBalance(true)}
                  className="w-full gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  <Plus className="h-4 w-4" />
                  Add Balance
                </Button>
                <Button
                  onClick={() => setShowStatusDialog(true)}
                  variant="outline"
                  className="w-full gap-2"
                >
                  {user.status === 'active' ? (
                    <>
                      <Lock className="h-4 w-4" />
                      Deactivate Account
                    </>
                  ) : (
                    <>
                      <Unlock className="h-4 w-4" />
                      Activate Account
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Full History
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Send Email
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                >
                  <History className="h-4 w-4" />
                  Reset Password
                </Button>
              </CardContent>
            </Card>

            {/* Account Stats */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Account Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Account Status</span>
                    <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                      {user.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Admin Privileges</span>
                    <Badge variant={user.admin ? 'outline' : 'secondary'}>
                      {user.admin ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Last Updated</span>
                    <span className="font-medium">
                      {formatDate(user.created_at)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">User ID</span>
                    <span className="font-medium text-xs truncate max-w-[120px]">
                      {user.user_id}
                    </span>
                  </div>
                </div>
                <Separator />
                <div className="pt-2">
                  <p className="text-sm text-gray-600 mb-2">Balance Status</p>
                  <div className={`text-2xl font-bold ${user.balance > 50 ? 'text-green-600' : 'text-amber-600'}`}>
                    {formatBalance(user.balance)}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {user.balance > 50 ? 'Sufficient funds available' : 'Low balance warning'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <CardDescription>Last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <BarChart className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Balance Updated</p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Profile Updated</p>
                      <p className="text-xs text-gray-500">5 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Login Alert</p>
                      <p className="text-xs text-gray-500">1 week ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <AddBalanceDialog
        open={showAddBalance}
        onOpenChange={setShowAddBalance}
        user={user}
        onSuccess={handleBalanceAdded}
      />

      <EditUserDialog
        open={showEditUser}
        onOpenChange={setShowEditUser}
        user={user}
        onSuccess={handleUserUpdated}
      />

      <StatusDialog
        open={showStatusDialog}
        onOpenChange={setShowStatusDialog}
        user={user}
        onSuccess={handleStatusChanged}
      />
    </div>
  );
}