"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"

type ToastType = "default" | "destructive" | "success" | "info" | "warning"

type Toast = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: ToastType
  duration?: number
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback(
    ({ title, description, action, variant = "default", duration = 5000 }: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substring(2, 9)
      const newToast = {
        id,
        title,
        description,
        action,
        variant,
        duration,
      }

      setToasts((prevToasts) => [...prevToasts, newToast])

      return id
    },
    [],
  )

  const dismiss = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  const dismissAll = useCallback(() => {
    setToasts([])
  }, [])

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    toasts.forEach((toast) => {
      if (toast.duration) {
        const timer = setTimeout(() => {
          dismiss(toast.id)
        }, toast.duration)
        timers.push(timer)
      }
    })

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [toasts, dismiss])

  return {
    toasts,
    toast,
    dismiss,
    dismissAll,
  }
}

