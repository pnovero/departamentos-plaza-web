'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { X, Calendar, Users, CreditCard, ExternalLink } from 'lucide-react'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  apartmentName: string
  checkIn: Date
  checkOut: Date
  guests: number
  totalPrice: number
  pricePerNight: number
}

export function BookingModal({
  isOpen,
  onClose,
  apartmentName,
  checkIn,
  checkOut,
  guests,
  totalPrice,
  pricePerNight
}: BookingModalProps) {
  const [bookingStep, setBookingStep] = useState<'details' | 'payment' | 'confirmation'>('details')
  const [guestInfo, setGuestInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })

  if (!isOpen) return null

  const calculateNights = () => {
    const timeDiff = checkOut.getTime() - checkIn.getTime()
    return Math.ceil(timeDiff / (1000 * 3600 * 24))
  }

  const handleBookingSubmit = () => {
    // In a real app, this would process the booking
    setBookingStep('confirmation')
  }

  const handleExternalBooking = (platform: 'booking' | 'airbnb') => {
    // In a real app, this would redirect to the booking platform with pre-filled dates
    const url = platform === 'booking' 
      ? 'https://booking.com' 
      : 'https://airbnb.com'
    window.open(url, '_blank')
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {bookingStep === 'details' && 'Booking Details'}
            {bookingStep === 'payment' && 'Payment Information'}
            {bookingStep === 'confirmation' && 'Booking Confirmed!'}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Booking Summary */}
          <div className="p-4 bg-muted rounded-lg space-y-3">
            <h3 className="font-semibold">{apartmentName}</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <div>
                  <div className="font-medium">Check-in</div>
                  <div className="text-muted-foreground">{checkIn.toLocaleDateString()}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <div>
                  <div className="font-medium">Check-out</div>
                  <div className="text-muted-foreground">{checkOut.toLocaleDateString()}</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{guests} guests</span>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">
                  {calculateNights()} nights × ${pricePerNight}
                </div>
                <div className="font-bold text-lg">${totalPrice}</div>
              </div>
            </div>
          </div>

          {bookingStep === 'details' && (
            <div className="space-y-6">
              {/* Guest Information */}
              <div className="space-y-4">
                <h3 className="font-semibold">Guest Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={guestInfo.firstName}
                      onChange={(e) => setGuestInfo({...guestInfo, firstName: e.target.value})}
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={guestInfo.lastName}
                      onChange={(e) => setGuestInfo({...guestInfo, lastName: e.target.value})}
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={guestInfo.email}
                    onChange={(e) => setGuestInfo({...guestInfo, email: e.target.value})}
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={guestInfo.phone}
                    onChange={(e) => setGuestInfo({...guestInfo, phone: e.target.value})}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <Separator />

              {/* Booking Options */}
              <div className="space-y-4">
                <h3 className="font-semibold">Complete Your Booking</h3>
                <p className="text-sm text-muted-foreground">
                  Choose how you'd like to complete your reservation:
                </p>
                
                <div className="grid gap-3">
                  <Button 
                    onClick={() => setBookingStep('payment')}
                    className="justify-between h-auto p-4"
                    disabled={!guestInfo.firstName || !guestInfo.lastName || !guestInfo.email}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium">Book Direct</div>
                        <div className="text-xs opacity-80">Secure payment processing</div>
                      </div>
                    </div>
                    <Badge variant="secondary">Best Rate</Badge>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => handleExternalBooking('booking')}
                    className="justify-between h-auto p-4"
                  >
                    <div className="flex items-center gap-3">
                      <ExternalLink className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium">Book on Booking.com</div>
                        <div className="text-xs text-muted-foreground">Redirects to Booking.com</div>
                      </div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => handleExternalBooking('airbnb')}
                    className="justify-between h-auto p-4"
                  >
                    <div className="flex items-center gap-3">
                      <ExternalLink className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium">Book on Airbnb</div>
                        <div className="text-xs text-muted-foreground">Redirects to Airbnb</div>
                      </div>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {bookingStep === 'payment' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Payment Information</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" placeholder="John Doe" />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setBookingStep('details')}>
                  Back
                </Button>
                <Button onClick={handleBookingSubmit} className="flex-1">
                  Complete Booking - ${totalPrice}
                </Button>
              </div>
            </div>
          )}

          {bookingStep === 'confirmation' && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Booking Confirmed!</h3>
                <p className="text-muted-foreground">
                  Your reservation has been confirmed. You'll receive a confirmation email shortly.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-left">
                <div className="font-medium mb-2">Booking Reference: #URB-2024-001</div>
                <div className="text-sm space-y-1">
                  <div>Guest: {guestInfo.firstName} {guestInfo.lastName}</div>
                  <div>Email: {guestInfo.email}</div>
                  <div>Dates: {checkIn.toLocaleDateString()} - {checkOut.toLocaleDateString()}</div>
                  <div>Total: ${totalPrice}</div>
                </div>
              </div>
              <Button onClick={onClose} className="w-full">
                Close
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
