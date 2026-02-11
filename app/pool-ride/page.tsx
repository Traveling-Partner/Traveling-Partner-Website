import { MapPin, Users, Clock, DollarSign, MapPinIcon } from 'lucide-react'

export default function PoolRide() {
  const rides = [
    {
      id: 1,
      from: 'New York City',
      to: 'Boston',
      date: 'March 20, 2024',
      time: '09:00 AM',
      seats: 3,
      price: '$45',
      driver: 'John Davis',
      image: '🚗',
    },
    {
      id: 2,
      from: 'Los Angeles',
      to: 'San Diego',
      date: 'March 22, 2024',
      time: '02:00 PM',
      seats: 2,
      price: '$35',
      driver: 'Maria Garcia',
      image: '🚙',
    },
    {
      id: 3,
      from: 'Chicago',
      to: 'Milwaukee',
      date: 'March 21, 2024',
      time: '11:00 AM',
      seats: 4,
      price: '$28',
      driver: 'Alex Thompson',
      image: '🚕',
    },
    {
      id: 4,
      from: 'San Francisco',
      to: 'Oakland',
      date: 'March 23, 2024',
      time: '07:30 AM',
      seats: 1,
      price: '$12',
      driver: 'Emma Wilson',
      image: '🚗',
    },
    {
      id: 5,
      from: 'Seattle',
      to: 'Portland',
      date: 'March 24, 2024',
      time: '03:00 PM',
      seats: 2,
      price: '$40',
      driver: 'Michael Brown',
      image: '🚙',
    },
    {
      id: 6,
      from: 'Miami',
      to: 'Fort Lauderdale',
      date: 'March 20, 2024',
      time: '06:00 PM',
      seats: 3,
      price: '$18',
      driver: 'Lisa Anderson',
      image: '🚕',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Ride Sharing</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Save money and reduce emissions by sharing rides with fellow travelers. Find or offer rides for your next journey.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <MapPin size={18} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="From"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="relative">
              <MapPinIcon size={18} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="To"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <input
              type="date"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow duration-200">
              Find Rides
            </button>
          </div>
        </div>
      </section>

      {/* Rides Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Available Rides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rides.map((ride) => (
            <div
              key={ride.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-4xl">{ride.image}</div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{ride.driver}</h3>
                        <p className="text-sm text-gray-500">Driver</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-green-600">{ride.price}</p>
                    <p className="text-sm text-gray-500">per person</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6 border-y py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <div>
                      <p className="text-sm text-gray-500">From</p>
                      <p className="font-semibold text-gray-900">{ride.from}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                    <div>
                      <p className="text-sm text-gray-500">To</p>
                      <p className="font-semibold text-gray-900">{ride.to}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={16} className="text-blue-600" />
                    <div>
                      <p className="text-gray-500 text-xs">Time</p>
                      <p className="font-semibold text-gray-900">{ride.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users size={16} className="text-green-600" />
                    <div>
                      <p className="text-gray-500 text-xs">Seats</p>
                      <p className="font-semibold text-gray-900">{ride.seats} left</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign size={16} className="text-orange-500" />
                    <div>
                      <p className="text-gray-500 text-xs">Date</p>
                      <p className="font-semibold text-gray-900 truncate">{ride.date.split(',')[0]}</p>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow duration-200">
                  Book This Ride
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Offer Ride CTA */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Have Empty Seats?</h2>
          <p className="text-green-100 mb-8 text-lg">Offer a ride and earn money while helping other travelers save on transport costs.</p>
          <button className="bg-white text-green-600 px-10 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-shadow duration-200">
            Offer a Ride
          </button>
        </div>
      </section>
    </main>
  )
}
