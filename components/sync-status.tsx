'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, CheckCircle, AlertCircle, Clock } from 'lucide-react'
import { useBookingSync } from '@/hooks/use-booking-sync'

export function SyncStatus() {
  const { bookings, isLoading, lastSync, error, syncAll } = useBookingSync()
  const [isSyncing, setIsSyncing] = useState(false)

  const handleManualSync = async () => {
    setIsSyncing(true)
    await syncAll()
    setIsSyncing(false)
  }

  const getBookingsByPlatform = () => {
    const platforms = {
      'booking.com': bookings.filter(b => b.platform === 'booking.com').length,
      'airbnb': bookings.filter(b => b.platform === 'airbnb').length,
      'direct': bookings.filter(b => b.platform === 'direct').length
    }
    return platforms
  }

  const platformStats = getBookingsByPlatform()

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Booking Sync Status
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleManualSync}
            disabled={isSyncing || isLoading}
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Sync Status */}
        <div className="flex items-center gap-2">
          {error ? (
            <>
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-600">Sync Error</span>
            </>
          ) : isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />
              <span className="text-sm">Syncing...</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">Up to date</span>
            </>
          )}
        </div>

        {/* Last Sync Time */}
        {lastSync && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Last sync: {lastSync.toLocaleString()}</span>
          </div>
        )}

        {/* Platform Statistics */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Active Bookings</h4>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm">Booking.com</span>
              <Badge variant="secondary">{platformStats['booking.com']}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Airbnb</span>
              <Badge variant="secondary">{platformStats.airbnb}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Direct</span>
              <Badge variant="secondary">{platformStats.direct}</Badge>
            </div>
          </div>
        </div>

        {/* Error Details */}
        {error && (
          <div className="p-2 bg-red-50 rounded text-sm text-red-700">
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
