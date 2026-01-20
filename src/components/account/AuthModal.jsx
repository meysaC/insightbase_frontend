import React from 'react'
import { Dialog,
        DialogContent,
        DialogHeader,
        DialogTitle,
        DialogDescription,
        DialogFooter,
        Button,
        Input,
        Label,
 } from "@/components/ui/dialog-1"
 import { SignInForm } from '@/components/account/SignInForm'

export const AuthModal = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <SignInForm />
        </DialogContent>
    </Dialog>
)
}
