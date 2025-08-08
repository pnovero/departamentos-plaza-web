'use client'

// Types for booking data
export interface BookingData {
  id: string
  apartmentId: string
  checkIn: string
  checkOut: string
  platform: 'booking.com' | 'airbnb' | 'direct'
  guestName: string
  guestCount: number
  status: 'confirmed' | 'pending' | 'cancelled'
  totalPrice: number
  createdAt: string
}

export interface CalendarEvent {
  date: string
  type: 'booked' | 'checkout' | 'checkin' | 'blocked'
  bookingId?: string
  platform?: string
}

// Mock API service - in real app, this would connect to your backend
export class BookingSyncService {
  private static instance: BookingSyncService
  private bookings: BookingData[] = []
  private listeners: ((bookings: BookingData[]) => void)[] = []

  static getInstance(): BookingSyncService {
    if (!BookingSyncService.instance) {
      BookingSyncService.instance = new BookingSyncService()
    }
    return BookingSyncService.instance
  }

  // Subscribe to booking updates
  subscribe(callback: (bookings: BookingData[]) => void) {
    this.listeners.push(callback)
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback)
    }
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.bookings))
  }

  // Sync with Booking.com calendar feed
  async syncBookingCom(apartmentId: string): Promise<BookingData[]> {
    try {
      // In real implementation, you'd use Booking.com's XML calendar feed
      // Example: https://admin.booking.com/hotel/hoteladmin/ical_calendars.html
      
      const response = await fetch(`/api/sync/booking-com/${apartmentId}`)
      const bookings = await response.json()
      
      // Update local bookings
      this.bookings = this.bookings.filter(b => b.apartmentId !== apartmentId || b.platform !== 'booking.com')
      this.bookings.push(...bookings)
      this.notifyListeners()
      
      return bookings
    } catch (error) {
      console.error('Failed to sync Booking.com:', error)
      return []
    }
  }

  // Sync with Airbnb calendar feed
  async syncAirbnb(apartmentId: string): Promise<BookingData[]> {
    try {
      // In real implementation, you'd use Airbnb's iCal calendar export
      // Users can get this from their Airbnb hosting dashboard
      
      const response = await fetch(`/api/sync/airbnb/${apartmentId}`)
      const bookings = await response.json()
      
      // Update local bookings
      this.bookings = this.bookings.filter(b => b.apartmentId !== apartmentId || b.platform !== 'airbnb')
      this.bookings.push(...bookings)
      this.notifyListeners()
      
      return bookings
    } catch (error) {
      console.error('Failed to sync Airbnb:', error)
      return []
    }
  }

  // Add direct booking
  async addDirectBooking(booking: Omit<BookingData, 'id' | 'createdAt' | 'platform'>): Promise<BookingData> {
    const newBooking: BookingData = {
      ...booking,
      id: `direct-${Date.now()}`,
      platform: 'direct',
      createdAt: new Date().toISOString()
    }

    this.bookings.push(newBooking)
    this.notifyListeners()

    // In real app, also sync this booking to external platforms
    await this.pushToExternalPlatforms(newBooking)

    return newBooking
  }

  // Push booking to external platforms to prevent double bookings
  private async pushToExternalPlatforms(booking: BookingData) {
    try {
      // Block dates on Booking.com
      await fetch('/api/sync/booking-com/block', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apartmentId: booking.apartmentId,
          checkIn: booking.checkIn,
          checkOut: booking.checkOut
        })
      })

      // Block dates on Airbnb
      await fetch('/api/sync/airbnb/block', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apartmentId: booking.apartmentId,
          checkIn: booking.checkIn,
          checkOut: booking.checkOut
        })
      })
    } catch (error) {
      console.error('Failed to block dates on external platforms:', error)
    }
  }

  // Get bookings for specific apartment
  getBookingsForApartment(apartmentId: string): BookingData[] {
    return this.bookings.filter(booking => booking.apartmentId === apartmentId)
  }

  // Get calendar events for apartment
  getCalendarEvents(apartmentId: string): CalendarEvent[] {
    const bookings = this.getBookingsForApartment(apartmentId)
    const events: CalendarEvent[] = []

    bookings.forEach(booking => {
      if (booking.status === 'confirmed') {
        const checkIn = new Date(booking.checkIn)
        const checkOut = new Date(booking.checkOut)
        const current = new Date(checkIn)

        while (current < checkOut) {
          events.push({
            date: current.toISOString().split('T')[0],
            type: 'booked',
            bookingId: booking.id,
            platform: booking.platform
          })
          current.setDate(current.getDate() + 1)
        }
      }
    })

    return events
  }

  // Sync all platforms for all apartments
  async syncAll(): Promise<void> {
    const apartments = ['studio', 'onebedroom', 'twobedroom']
    
    for (const apartmentId of apartments) {
      await Promise.all([
        this.syncBookingCom(apartmentId),
        this.syncAirbnb(apartmentId)
      ])
    }
  }
}
