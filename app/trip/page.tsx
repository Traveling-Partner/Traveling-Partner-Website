import { Calendar, MapPin, Users, Clock } from 'lucide-react'

export default function Trip() {
  const trips = [
    {
      id: 1,
      title: 'European Backpacking Adventure',
      destination: 'Paris, Rome, Barcelona',
      date: 'April 10 - May 5, 2024',
      duration: '26 days',
      travelers: 12,
      image: '🗼',
      price: '$1,299',
    },
    {
      id: 2,
      title: 'Tropical Paradise Escape',
      destination: 'Bali, Indonesia',
      date: 'May 1 - May 15, 2024',
      duration: '15 days',
      travelers: 8,
      image: '🏝️',
      price: '$899',
    },
    {
      id: 3,
      title: 'Mountain Hiking Expedition',
      destination: 'Swiss Alps',
      date: 'June 15 - July 1, 2024',
      duration: '17 days',
      travelers: 10,
      image: '⛰️',
      price: '$1,199',
    },
    {
      id: 4,
      title: 'Asian Cultural Tour',
      destination: 'Thailand, Vietnam, Cambodia',
      date: 'July 10 - August 5, 2024',
      duration: '27 days',
      travelers: 15,
      image: '🏯',
      price: '$1,099',
    },
    {
      id: 5,
      title: 'Amazon Jungle Adventure',
      destination: 'Peru, Ecuador',
      date: 'August 20 - September 5, 2024',
      duration: '17 days',
      travelers: 6,
      image: '🌿',
      price: '$1,599',
    },
    {
      id: 6,
      title: 'Northern Lights Journey',
      destination: 'Iceland, Norway, Finland',
      date: 'September 10 - October 1, 2024',
      duration: '22 days',
      travelers: 11,
      image: '🌌',
      price: '$1,799',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Organize Your Trip</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from curated group trips or create your own adventure. Connect with fellow travelers and make memories together.
          </p>
        </div>

        {/* Search/Filter Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input type="text" placeholder="Destination" className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="date" className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="number" placeholder="Budget" className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow duration-200">
              Search Trips
            </button>
          </div>
        </div>
      </section>

      {/* Trips Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden border border-gray-100"
            >
              <div className="w-full h-40 bg-gradient-to-br from-blue-400 via-green-400 to-orange-400 flex items-center justify-center text-5xl">
                {trip.image}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{trip.title}</h3>
                <p className="text-gray-600 mb-4 flex items-center gap-2">
                  <MapPin size={18} className="text-blue-600 flex-shrink-0" />
                  {trip.destination}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Calendar size={18} className="text-green-600" />
                    <span>{trip.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Clock size={18} className="text-orange-500" />
                    <span>{trip.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Users size={18} className="text-blue-600" />
                    <span>{trip.travelers} travelers interested</span>
                  </div>
                </div>

                <div className="border-t pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Starting from</p>
                    <p className="text-2xl font-bold text-blue-600">{trip.price}</p>
                  </div>
                  <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-shadow duration-200">
                    Join Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Create Trip CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Have Your Own Trip Idea?</h2>
          <p className="text-blue-100 mb-8 text-lg">Create a custom trip and find travelers who share your vision.</p>
          <button className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-shadow duration-200">
            Create a Trip
          </button>
        </div>
      </section>
    </main>
  )
}
