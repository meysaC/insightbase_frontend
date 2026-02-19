import React from 'react'
import { Dialog,
        DialogContent,
 } from "@/components/ui/dialog-1"
 import { SignInForm } from '@/components/account/SignInForm'

export const AuthModal = ({ open, onOpenChange }) => {
    const handleSuccess = () => {
        onOpenChange(false);
    }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <SignInForm onSuccess={handleSuccess}/>
        </DialogContent>
    </Dialog>
)
}
