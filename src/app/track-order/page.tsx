'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Loader } from '@/components/ui/Loader';
import PageContainer from '@/components/layout/PageContainer';

interface TrackingStatus {
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  location: string;
  timestamp: string;
  description: string;
}

interface OrderDetails {
  orderId: string;
  trackingNumber: string;
  status: TrackingStatus['status'];
  estimatedDelivery: string;
  timeline: TrackingStatus[];
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

const mockTrackingData: Record<string, OrderDetails> = {
  'ORD-2024-001': {
    orderId: 'ORD-2024-001',
    trackingNumber: 'TRK123456789',
    status: 'shipped',
    estimatedDelivery: '2024-01-15',
    timeline: [
      {
        status: 'pending',
        location: 'Warehouse',
        timestamp: '2024-01-10 10:30 AM',
        description: 'Order received and confirmed'
      },
      {
        status: 'processing',
        location: 'Warehouse',
        timestamp: '2024-01-11 02:15 PM',
        description: 'Order is being processed and packed'
      },
      {
        status: 'shipped',
        location: 'Shipping Center',
        timestamp: '2024-01-12 09:45 AM',
        description: 'Package has been shipped'
      }
    ],
    items: [
      { name: 'Educational Building Blocks Set', quantity: 1, price: 49.99 },
      { name: 'Plush Teddy Bear', quantity: 2, price: 19.99 }
    ]
  },
  'ORD-2024-002': {
    orderId: 'ORD-2024-002',
    trackingNumber: 'TRK987654321',
    status: 'delivered',
    estimatedDelivery: '2024-01-08',
    timeline: [
      {
        status: 'pending',
        location: 'Warehouse',
        timestamp: '2024-01-05 11:20 AM',
        description: 'Order received and confirmed'
      },
      {
        status: 'processing',
        location: 'Warehouse',
        timestamp: '2024-01-06 03:30 PM',
        description: 'Order is being processed and packed'
      },
      {
        status: 'shipped',
        location: 'Shipping Center',
        timestamp: '2024-01-07 08:15 AM',
        description: 'Package has been shipped'
      },
      {
        status: 'delivered',
        location: 'Your Address',
        timestamp: '2024-01-08 02:45 PM',
        description: 'Package has been delivered'
      }
    ],
    items: [
      { name: 'Art & Craft Kit', quantity: 1, price: 34.99 }
    ]
  }
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
};

const statusIcons = {
  pending: '⏳',
  processing: '⚙️',
  shipped: '📦',
  delivered: '✅',
  cancelled: '❌'
};

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [error, setError] = useState('');

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setOrderDetails(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const foundOrder = mockTrackingData[orderId] || 
                     Object.values(mockTrackingData).find(order => 
                       order.trackingNumber === trackingNumber
                     );

    if (foundOrder) {
      setOrderDetails(foundOrder);
    } else {
      setError('Order not found. Please check your order ID or tracking number.');
    }

    setIsLoading(false);
  };

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
          <p className="text-gray-600">Enter your order ID or tracking number to get real-time updates</p>
        </div>

        <Card className="p-6 mb-8">
          <form onSubmit={handleTrackOrder} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-2">
                  Order ID
                </label>
                <Input
                  id="orderId"
                  type="text"
                  placeholder="e.g., ORD-2024-001"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="trackingNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Tracking Number
                </label>
                <Input
                  id="trackingNumber"
                  type="text"
                  placeholder="e.g., TRK123456789"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                />
              </div>
            </div>
            <Button 
              type="submit" 
              disabled={isLoading || (!orderId && !trackingNumber)}
              className="w-full md:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader className="w-4 h-4 mr-2" />
                  Tracking...
                </>
              ) : (
                'Track Order'
              )}
            </Button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </Card>

        {orderDetails && (
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
                  <p className="text-gray-600">Order #{orderDetails.orderId}</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <Badge className={`${statusColors[orderDetails.status]} text-sm font-medium`}>
                    {statusIcons[orderDetails.status]} {orderDetails.status.charAt(0).toUpperCase() + orderDetails.status.slice(1)}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Tracking Number</p>
                  <p className="font-medium">{orderDetails.trackingNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Estimated Delivery</p>
                  <p className="font-medium">{new Date(orderDetails.estimatedDelivery).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Items</p>
                  <p className="font-medium">{orderDetails.items.length}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Order Items</h3>
                <div className="space-y-2">
                  {orderDetails.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.name} (x{item.quantity})</span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Tracking Timeline */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tracking Timeline</h2>
              <div className="space-y-4">
                {orderDetails.timeline.map((event, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      index === orderDetails.timeline.length - 1 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge className={`${statusColors[event.status]} text-xs`}>
                          {statusIcons[event.status]} {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </Badge>
                        <span className="text-sm text-gray-500">{event.location}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-900">{event.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{event.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Sample Data Info */}
        {!orderDetails && !isLoading && (
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="font-medium text-blue-900 mb-2">Sample Data for Testing</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p><strong>Order ID:</strong> ORD-2024-001 or ORD-2024-002</p>
              <p><strong>Tracking Number:</strong> TRK123456789 or TRK987654321</p>
            </div>
          </Card>
        )}
      </div>
    </PageContainer>
  );
} 