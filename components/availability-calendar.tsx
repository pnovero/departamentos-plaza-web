'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Calendar, Users } from 'lucide-react'
import { useBookingSync } from '@/hooks/use-booking-sync'

interface AvailabilityCalendarProps {
  apartmentId: string
  apartmentName: string
  pricePerNight: number
  onBookingSelect: (checkIn: Date, checkOut: Date, apartmentId: string) => void
}

interface BookedDate {
  date: string
  type: 'booked' | 'checkout' | 'checkin'
}

export function AvailabilityCalendar({ 
  apartmentId, 
  apartmentName, 
  pricePerNight,
  onBookingSelect 
}: AvailabilityCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedCheckIn, setSelectedCheckIn] = useState<Date | null>(null)
  const [selectedCheckOut, setSelectedCheckOut] = useState<Date | null>(null)
  const [guests, setGuests] = useState(2)

  const { getCalendarEvents, isLoading, lastSync, error } = useBookingSync()
  const calendarEvents = getCalendarEvents(apartmentId)

  const isDateBooked = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return calendarEvents.some(event => event.date === dateString && event.type === 'booked')
  }

  const isDateInPast = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const isDateInRange = (date: Date) => {
    if (!selectedCheckIn || !selectedCheckOut) return false
    return date >= selectedCheckIn && date <= selectedCheckOut
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const handleDateClick = (date: Date) => {
    if (isDateBooked(date) || isDateInPast(date)) return

    if (!selectedCheckIn || (selectedCheckIn && selectedCheckOut)) {
      // Start new selection
      setSelectedCheckIn(date)
      setSelectedCheckOut(null)
    } else if (selectedCheckIn && !selectedCheckOut) {
      // Set checkout date
      if (date > selectedCheckIn) {
        // Check if any dates in range are booked
        const daysBetween = []
        const current = new Date(selectedCheckIn)
        while (current <= date) {
          if (isDateBooked(current) && current.getTime() !== selectedCheckIn.getTime()) {
            // Can't select this range, reset
            setSelectedCheckIn(date)
            setSelectedCheckOut(null)
            return
          }
          daysBetween.push(new Date(current))
          current.setDate(current.getDate() + 1)
        }
        setSelectedCheckOut(date)
      } else {
        // Selected date is before check-in, make it the new check-in
        setSelectedCheckIn(date)
        setSelectedCheckOut(null)
      }
    }
  }

  const handleBooking = () => {
    if (selectedCheckIn && selectedCheckOut) {
      onBookingSelect(selectedCheckIn, selectedCheckOut, apartmentId)
    }
  }

  const calculateNights = () => {
    if (!selectedCheckIn || !selectedCheckOut) return 0
    const timeDiff = selectedCheckOut.getTime() - selectedCheckIn.getTime()
    return Math.ceil(timeDiff / (1000 * 3600 * 24))
  }

  const calculateTotal = () => {
    return calculateNights() * pricePerNight
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{apartmentName}</span>
          <Badge variant="secondary">${pricePerNight}/night</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Calendar Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={prevMonth}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="text-center">
            <h3 className="font-semibold">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            {lastSync && (
              <p className="text-xs text-muted-foreground">
                Last updated: {lastSync.toLocaleTimeString()}
              </p>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={nextMonth}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Show loading or error state */}
        {isLoading && (
          <div className="text-center text-sm text-muted-foreground">
            Syncing availability...
          </div>
        )}

        {error && (
          <div className="text-center text-sm text-red-600">
            Sync error: {error}
          </div>
        )}

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
          {dayNames.map(day => (
            <div key={day} className="p-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {getDaysInMonth(currentMonth).map((date, index) => {
            if (!date) {
              return <div key={index} className="p-2" />
            }

            const isBooked = isDateBooked(date)
            const isPast = isDateInPast(date)
            const isCheckIn = selectedCheckIn?.toDateString() === date.toDateString()
            const isCheckOut = selectedCheckOut?.toDateString() === date.toDateString()
            const isInRange = isDateInRange(date) && !isCheckIn && !isCheckOut

            return (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                disabled={isBooked || isPast}
                className={`
                  p-2 text-xs rounded-md transition-colors relative
                  ${isPast ? 'text-muted-foreground cursor-not-allowed' : ''}
                  ${isBooked ? 'bg-red-100 text-red-800 cursor-not-allowed' : ''}
                  ${isCheckIn ? 'bg-primary text-primary-foreground' : ''}
                  ${isCheckOut ? 'bg-primary text-primary-foreground' : ''}
                  ${isInRange ? 'bg-primary/20' : ''}
                  ${!isBooked && !isPast && !isCheckIn && !isCheckOut && !isInRange ? 'hover:bg-muted' : ''}
                `}
              >
                {date.getDate()}
                {isBooked && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1 h-1 bg-red-600 rounded-full" />
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Guest Selection */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="text-sm">Guests:</span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setGuests(Math.max(1, guests - 1))}
            >
              -
            </Button>
            <span className="w-8 text-center">{guests}</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setGuests(guests + 1)}
            >
              +
            </Button>
          </div>
        </div>

        {/* Booking Summary */}
        {selectedCheckIn && selectedCheckOut && (
          <div className="space-y-2 p-3 bg-muted rounded-md">
            <div className="flex justify-between text-sm">
              <span>Check-in:</span>
              <span>{selectedCheckIn.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Check-out:</span>
              <span>{selectedCheckOut.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{calculateNights()} nights:</span>
              <span>${calculateTotal()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Guests:</span>
              <span>{guests}</span>
            </div>
          </div>
        )}

        {/* Booking Button */}
        <Button 
          className="w-full gap-2" 
          disabled={!selectedCheckIn || !selectedCheckOut}
          onClick={handleBooking}
        >
          <Calendar className="w-4 h-4" />
          {selectedCheckIn && selectedCheckOut ? 
            `Book for $${calculateTotal()}` : 
            'Select Dates'
          }
        </Button>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-100 rounded border" />
            <span>Booked</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-primary rounded" />
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-muted rounded border" />
            <span>Available</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
