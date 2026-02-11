import { Heart, Target, Users } from 'lucide-react'

export default function AboutUs() {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To connect travelers worldwide and make trip planning effortless and enjoyable.',
    },
    {
      icon: Heart,
      title: 'Our Passion',
      description: 'We believe travel transforms lives and creates meaningful connections between people.',
    },
    {
      icon: Users,
      title: 'Our Community',
      description: 'Join a thriving community of adventurers, explorers, and travel enthusiasts.',
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">About TravelingPartner</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to revolutionize how people travel. By connecting travelers and simplifying trip planning, we make the world more accessible to everyone.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-xl border border-blue-200"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-gradient-to-r from-blue-50 to-green-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Story</h2>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              TravelingPartner was founded by a group of travel enthusiasts who believed that the world's best experiences come from connecting with fellow travelers. What started as a simple idea has grown into a vibrant community dedicated to making travel more accessible and enjoyable.
            </p>
            <p>
              Our platform combines cutting-edge technology with human-centered design to create an experience that feels natural and intuitive. Whether you're planning your first international trip or you're a seasoned globetrotter, TravelingPartner is here to support your journey.
            </p>
            <p>
              We're committed to sustainability, cultural respect, and responsible travel. Every journey taken through our platform contributes to our mission of creating a more connected and understanding world.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
            <p className="text-gray-600">Active Travelers</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600 mb-2">150+</div>
            <p className="text-gray-600">Countries Covered</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-orange-500 mb-2">1M+</div>
            <p className="text-gray-600">Trips Completed</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">4.9/5</div>
            <p className="text-gray-600">User Rating</p>
          </div>
        </div>
      </section>
    </main>
  )
}
