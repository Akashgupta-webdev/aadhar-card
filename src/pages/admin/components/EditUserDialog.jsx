import React, { useState, useEffect } from 'react';
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
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { User, Mail, Phone, Shield } from "lucide-react";
import { supabase } from '../../../lib/supabaseClient';

export default function EditUserDialog({ open, onOpenChange, user, onSuccess }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        admin: false,
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                contact: user.contact || '',
                admin: user.admin || false,
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { error } = await supabase
                .from('user')
                .update({
                    name: formData.name,
                    email: formData.email,
                    contact: formData.contact,
                    admin: formData.admin,
                    updated_at: new Date().toISOString(),
                })
                .eq('user_id', user.user_id);

            if (error) throw error;

            toast.success('User updated successfully');
            onSuccess({ ...user, ...formData });
            onOpenChange(false);
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Failed to update user');
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                contact: user.contact || '',
                admin: user.admin || false,
            });
        }
    };

    const handleOpenChange = (open) => {
        if (!open) resetForm();
        onOpenChange(open);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Edit User Details
                    </DialogTitle>
                    <DialogDescription>
                        Update the information for {user?.name}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter full name"
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contact">Contact Number</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="contact"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    placeholder="Enter contact number"
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Shield className="h-5 w-5 text-gray-600" />
                                <div>
                                    <Label htmlFor="admin" className="font-medium">
                                        Administrator Privileges
                                    </Label>
                                    <p className="text-sm text-gray-500">
                                        Grant admin access to this user
                                    </p>
                                </div>
                            </div>
                            <Switch
                                id="admin"
                                checked={formData.admin}
                                onCheckedChange={(checked) =>
                                    setFormData(prev => ({ ...prev, admin: checked }))
                                }
                            />
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
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}