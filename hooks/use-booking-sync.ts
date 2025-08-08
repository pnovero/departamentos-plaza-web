'use client'

import { useState, useEffect } from 'react'
import { BookingSyncService, BookingData, CalendarEvent } from '@/lib/booking-sync'

export function useBookingSync(apartmentId?: string) {
  const [bookings, setBookings] = useState<BookingData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastSync, setLastSync] = useState<Date | null>(null)
  const [error, setError] = useState<string | null>(null)

  const syncService = BookingSyncService.getInstance()

  useEffect(() => {
    // Subscribe to booking updates
    const unsubscribe = syncService.subscribe((updatedBookings) => {
      setBookings(updatedBookings)
      setLastSync(new Date())
      setIsLoading(false)
    })

    // Initial sync
    syncAll()

    // Set up periodic sync (every 15 minutes)
    const interval = setInterval(syncAll, 15 * 60 * 1000)

    return () => {
      unsubscribe()
      clearInterval(interval)
    }
  }, [])

  const syncAll = async () => {
    try {
      setError(null)
      await syncService.syncAll()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sync failed')
    }
  }

  const getCalendarEvents = (apartmentId: string): CalendarEvent[] => {
    return syncService.getCalendarEvents(apartmentId)
  }

  const addDirectBooking = async (booking: Omit<BookingData, 'id' | 'createdAt' | 'platform'>) => {
    try {
      setError(null)
      return await syncService.addDirectBooking(booking)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Booking failed')
      throw err
    }
  }

  return {
    bookings: apartmentId ? bookings.filter(b => b.apartmentId === apartmentId) : bookings,
    isLoading,
    lastSync,
    error,
    syncAll,
    getCalendarEvents,
    addDirectBooking
  }
}
