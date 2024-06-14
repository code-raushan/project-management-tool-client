import { Toaster } from "@/components/ui/toaster"
import React from "react"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='min-h-[80vh] grid place-content-center'>
            {children}
            <Toaster />
        </div>
    )
}