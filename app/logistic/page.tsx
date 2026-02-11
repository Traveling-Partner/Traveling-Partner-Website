import { Truck, Package, MapPin, Clock, Shield } from 'lucide-react'

export default function Logistic() {
  const services = [
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Get your packages delivered quickly and safely to your destination.',
    },
    {
      icon: Package,
      title: 'Package Handling',
      description: 'Professional packing and handling of your belongings with care.',
    },
    {
      icon: Shield,
      title: 'Full Insurance',
      description: 'Complete insurance coverage for peace of mind during transit.',
    },
    {
      icon: MapPin,
      title: 'Real-time Tracking',
      description: 'Track your shipment in real-time from pickup to delivery.',
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Travel Logistics</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Seamless shipping and logistics solutions for all your travel needs. Send packages, move belongings, or arrange special cargo delivery.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-gradient-to-r from-blue-50 to-green-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Request Shipment</h3>
              <p className="text-gray-600">Fill in your shipment details and destination.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Get Quote</h3>
              <p className="text-gray-600">Receive instant pricing for your shipment.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Schedule Pickup</h3>
              <p className="text-gray-600">Choose a convenient pickup time.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Track & Receive</h3>
              <p className="text-gray-600">Monitor delivery in real-time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Transparent Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-blue-500 transition-colors duration-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Light Package</h3>
            <p className="text-gray-600 mb-6">Up to 5kg</p>
            <p className="text-3xl font-bold text-blue-600 mb-6">$15</p>
            <ul className="space-y-3 mb-8 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Standard delivery
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Basic insurance
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Tracking
              </li>
            </ul>
            <button className="w-full bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200">
              Select Plan
            </button>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-green-500 text-white rounded-xl p-8 shadow-xl">
            <h3 className="text-xl font-bold mb-2">Medium Package</h3>
            <p className="opacity-90 mb-6">5kg - 20kg</p>
            <p className="text-3xl font-bold mb-6">$35</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <span>✓</span> Express delivery
              </li>
              <li className="flex items-center gap-2">
                <span>✓</span> Full insurance
              </li>
              <li className="flex items-center gap-2">
                <span>✓</span> Real-time tracking
              </li>
              <li className="flex items-center gap-2">
                <span>✓</span> 24/7 support
              </li>
            </ul>
            <button className="w-full bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Select Plan
            </button>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-green-500 transition-colors duration-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Heavy Package</h3>
            <p className="text-gray-600 mb-6">20kg+</p>
            <p className="text-3xl font-bold text-green-600 mb-6">$75+</p>
            <ul className="space-y-3 mb-8 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Premium delivery
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Premium insurance
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Priority handling
              </li>
            </ul>
            <button className="w-full bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200">
              Select Plan
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ship Your Packages Today</h2>
          <p className="text-blue-100 mb-8 text-lg">Reliable, fast, and affordable shipping solutions for travelers.</p>
          <button className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-shadow duration-200">
            Request a Shipment
          </button>
        </div>
      </section>
    </main>
  )
}
