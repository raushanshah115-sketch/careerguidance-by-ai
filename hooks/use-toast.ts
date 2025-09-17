"use client"

import { useState, useCallback } from "react"
import type { ToastType } from "@/components/ui/notification-toast"

interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { ...toast, id }])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const toast = {
    success: (title: string, message?: string, duration?: number) =>
      addToast({ type: "success", title, message, duration }),
    error: (title: string, message?: string, duration?: number) =>
      addToast({ type: "error", title, message, duration }),
    info: (title: string, message?: string, duration?: number) => addToast({ type: "info", title, message, duration }),
    warning: (title: string, message?: string, duration?: number) =>
      addToast({ type: "warning", title, message, duration }),
  }

  return {
    toasts,
    toast,
    removeToast,
  }
}
