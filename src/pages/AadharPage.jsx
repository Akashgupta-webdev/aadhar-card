import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../hooks/useAuth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  RefreshCw,
  User,
  CreditCard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Todo: add edit and delete option
export default function AadharPage() {
  const { user } = useAuth();
  const [aadhaarData, setAadhaarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();

  const fetchAadhaar = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("adhaar_store")
        .select("id, name, aadhaar_no, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching Aadhaar data:", error);
        return;
      }

      setAadhaarData(data || []);
    } catch (error) {
      console.error("Error fetching Aadhaar data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAadhaar();
    }
  }, [user]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchAadhaar();
  };

  const handleOpen = (id) => {
    navigate(`/aadhar-detail/${id}`);
  };

  const handleEdit = (aadhaar) => {
    console.log("Editing Aadhaar:", aadhaar);
    // Implement edit functionality
  };

  const handleDelete = (aadhaar) => {
    if (
      confirm(
        `Are you sure you want to delete Aadhaar record for ${aadhaar.name}?`
      )
    ) {
      console.log("Deleting Aadhaar:", aadhaar);
      // Implement delete functionality
    }
  };

  const formatAadhaarNumber = (aadhaarNo) => {
    // Format as XXXX-XXXX-XXXX
    return aadhaarNo.replace(/(\d{4})(\d{4})(\d{4})/, "$1-$2-$3");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 flex-1" />
                  <Skeleton className="h-12 flex-1" />
                  <Skeleton className="h-12 flex-1" />
                  <Skeleton className="h-12 w-20" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <CreditCard className="h-8 w-8 text-blue-600" />
            Aadhaar Records
          </h1>
          <p className="text-muted-foreground">
            Manage and view your Aadhaar card information securely
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw
              className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button className="flex items-center gap-2" onClick={() => navigate("/aadhar-form")}>
            <Plus className="h-4 w-4" />
            Add Aadhaar
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Records
                </p>
                <p className="text-2xl font-bold">{aadhaarData.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Last Added
                </p>
                <p className="text-sm font-semibold">
                  {aadhaarData.length > 0
                    ? formatDate(aadhaarData[0].created_at)
                    : "N/A"}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <User className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Aadhaar Information</CardTitle>
          <CardDescription>
            Your stored Aadhaar records with secure access controls
          </CardDescription>
        </CardHeader>
        <CardContent>
          {aadhaarData.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <CreditCard className="h-16 w-16 text-muted-foreground mx-auto" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  No Aadhaar records found
                </h3>
                <p className="text-muted-foreground">
                  Get started by adding your first Aadhaar record.
                </p>
              </div>
              <Button className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Aadhaar
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Name</TableHead>
                    <TableHead className="w-[200px]">Aadhaar Number</TableHead>
                    <TableHead className="w-[150px]">Created Date</TableHead>
                    <TableHead className="w-[100px] text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {aadhaarData.map((aadhaar) => (
                    <TableRow key={aadhaar.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          {aadhaar.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="font-mono text-sm"
                        >
                          {formatAadhaarNumber(aadhaar.aadhaar_no)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(aadhaar.created_at)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem
                              onClick={() => handleOpen(aadhaar.id)}
                              className="flex items-center gap-2"
                            >
                              <Eye className="h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleEdit(aadhaar)}
                              className="flex items-center gap-2"
                            >
                              <Edit className="h-4 w-4" />
                              Edit Record
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(aadhaar)}
                              className="flex items-center gap-2 text-destructive focus:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
