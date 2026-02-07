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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Wallet, Plus, CreditCard } from "lucide-react";
import { supabase } from '../../../lib/supabaseClient';

export default function AddBalanceDialog({ open, onOpenChange, user, onSuccess }) {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!amount || parseFloat(amount) <= 0) {
            toast.error('Please enter a valid amount');
            return;
        }

        setIsLoading(true);
        try {
            const newBalance = user.balance + parseFloat(amount);

            const { error } = await supabase
                .from('user')
                .update({ balance: newBalance })
                .eq('user_id', user.user_id);

            if (error) throw error;

            // Record transaction
            await supabase
                .from('transactions')
                .insert({
                    user_id: user.user_id,
                    type: 'credit',
                    amount: parseFloat(amount),
                    description: description || 'Balance added by admin',
                    new_balance: newBalance,
                    created_by: 'admin'
                });

            toast.success(`Successfully added ₹${amount} to balance`);
            onSuccess(newBalance);
            onOpenChange(false);
            resetForm();
        } catch (error) {
            console.error('Error adding balance:', error);
            toast.error('Failed to add balance');
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setAmount('');
        setDescription('');
    };

    const handleOpenChange = (open) => {
        if (!open) resetForm();
        onOpenChange(open);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Wallet className="h-5 w-5" />
                        Add Balance
                    </DialogTitle>
                    <DialogDescription>
                        Add funds to {user?.name}'s account. Current balance: ₹{user?.balance}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount (INR)</Label>
                            <Input
                                id="amount"
                                type="number"
                                step="0.01"
                                min="0.01"
                                placeholder="Enter amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                                className="text-lg"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description (Optional)</Label>
                            <Input
                                id="description"
                                placeholder="Reason for adding balance"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-600">Current Balance</span>
                                <span className="font-semibold">₹{user?.balance?.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-600">Amount to Add</span>
                                <span className="font-semibold">
                                    {amount ? `+₹${parseFloat(amount).toFixed(2)}` : '₹0.00'}
                                </span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between text-lg font-bold">
                                <span>New Balance</span>
                                <span className="text-green-600">
                                    ₹{((user?.balance || 0) + (parseFloat(amount) || 0)).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleOpenChange(false)}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Processing...' : (
                                <>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Balance
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}