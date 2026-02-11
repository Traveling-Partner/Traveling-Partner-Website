import { ArrowRight, MapPin, Users, Zap } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const features = [
    {
      icon: MapPin,
      title: 'Smart Trip Planning',
      description: 'Plan your perfect trip with AI-powered recommendations tailored to your preferences.',
    },
    {
      icon: Users,
      title: 'Find Travel Partners',
      description: 'Connect with like-minded travelers and share unforgettable experiences.',
    },
    {
      icon: Zap,
      title: 'Seamless Booking',
      description: 'Book rides, accommodations, and activities all in one place.',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Your Journey
              </span>
              <br />
              Starts Here
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover amazing destinations, connect with travel partners, and create unforgettable memories with TravelingPartner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow duration-200 flex items-center justify-center gap-2">
                Start Exploring <ArrowRight size={20} />
              </button>
              <Link
                href="/about"
                className="border-2 border-blue-500 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-blue-400 via-green-400 to-orange-400 rounded-2xl shadow-2xl opacity-10"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">✈️</div>
                <p className="text-gray-400 font-semibold">Discover the World</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose TravelingPartner?</h2>
          <p className="text-xl text-gray-600">Everything you need for the perfect travel experience</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-100"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Adventure?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of travelers discovering new places and making lasting connections.
          </p>
          <button className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-shadow duration-200">
            Get Started Today
          </button>
        </div>
      </section>
    </main>
  )
}
