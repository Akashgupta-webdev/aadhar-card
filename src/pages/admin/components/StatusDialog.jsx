import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertTriangle, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { supabase } from '../../../lib/supabaseClient';

export default function StatusDialog({ open, onOpenChange, user, onSuccess }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleStatusChange = async () => {
        setIsLoading(true);
        const newStatus = user.status === 'active' ? 'inactive' : 'active';

        try {
            const { error } = await supabase
                .from('user')
                .update({
                    status: newStatus,
                    updated_at: new Date().toISOString()
                })
                .eq('user_id', user.user_id);

            if (error) throw error;

            // Log the status change
            await supabase
                .from('admin_logs')
                .insert({
                    user_id: user.user_id,
                    action: `account_${newStatus}`,
                    details: `Account ${newStatus}d by admin`,
                    admin_id: 'current_admin_id' // Replace with actual admin ID
                });

            toast.success(`Account ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
            onSuccess(newStatus);
            onOpenChange(false);
        } catch (error) {
            console.error('Error changing status:', error);
            toast.error(`Failed to ${newStatus === 'active' ? 'activate' : 'deactivate'} account`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {user?.status === 'active' ? (
                            <>
                                <AlertTriangle className="h-5 w-5 text-amber-600" />
                                Deactivate Account
                            </>
                        ) : (
                            <>
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                Activate Account
                            </>
                        )}
                    </DialogTitle>
                    <DialogDescription>
                        {user?.status === 'active'
                            ? `Are you sure you want to deactivate ${user.name}'s account? They will not be able to access the system.`
                            : `Activate ${user.name}'s account to restore their access to the system.`
                        }
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${user?.status === 'active' ? 'bg-green-100' : 'bg-red-100'}`}>
                                {user?.status === 'active' ? (
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                ) : (
                                    <XCircle className="h-5 w-5 text-red-600" />
                                )}
                            </div>
                            <div>
                                <p className="font-medium">{user?.name}</p>
                                <p className="text-sm text-gray-500">{user?.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <AlertCircle className="h-4 w-4 text-amber-500" />
                            <span className="text-amber-600 font-medium">
                                {user?.status === 'active'
                                    ? 'This action is reversible'
                                    : 'User will regain full access'
                                }
                            </span>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant={user?.status === 'active' ? 'destructive' : 'default'}
                        onClick={handleStatusChange}
                        disabled={isLoading}
                    >
                        {isLoading
                            ? 'Processing...'
                            : user?.status === 'active'
                                ? 'Deactivate Account'
                                : 'Activate Account'
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}