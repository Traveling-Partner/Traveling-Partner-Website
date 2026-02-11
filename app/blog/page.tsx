import { Calendar, User, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: '10 Must-Visit Destinations in 2024',
      excerpt: 'Discover the most beautiful and exciting destinations to visit this year. From tropical islands to mountain peaks, we have it all covered.',
      author: 'Sarah Johnson',
      date: 'March 15, 2024',
      category: 'Destinations',
      image: '🌴',
    },
    {
      id: 2,
      title: 'Budget Travel Tips That Actually Work',
      excerpt: 'Learn how to travel the world without breaking the bank. Our expert tips will help you save money while enjoying amazing experiences.',
      author: 'Mike Chen',
      date: 'March 10, 2024',
      category: 'Tips & Tricks',
      image: '💰',
    },
    {
      id: 3,
      title: 'The Art of Packing Light',
      excerpt: 'Master the skill of packing light and traveling smart. Tips and tricks from experienced travelers around the world.',
      author: 'Emma Wilson',
      date: 'March 5, 2024',
      category: 'How-to',
      image: '🧳',
    },
    {
      id: 4,
      title: 'Cultural Etiquette Around the World',
      excerpt: 'Respect local customs and traditions. Learn essential cultural etiquette tips for your next international adventure.',
      author: 'David Kumar',
      date: 'February 28, 2024',
      category: 'Culture',
      image: '🌍',
    },
    {
      id: 5,
      title: 'Best Travel Apps for 2024',
      excerpt: 'Explore the latest and greatest travel apps that will transform your journey. From navigation to accommodation, we cover it all.',
      author: 'Lisa Anderson',
      date: 'February 20, 2024',
      category: 'Technology',
      image: '📱',
    },
    {
      id: 6,
      title: 'Solo Travel: Finding Confidence and Connection',
      excerpt: 'Everything you need to know about traveling solo. Learn how to stay safe, make friends, and enjoy your own adventure.',
      author: 'James Roberts',
      date: 'February 15, 2024',
      category: 'Lifestyle',
      image: '🌟',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Travel Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stories, tips, and inspiration from the road. Join our community of travelers sharing their adventures.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden border border-gray-100"
            >
              <div className="w-full h-48 bg-gradient-to-br from-blue-400 via-green-400 to-orange-400 flex items-center justify-center text-6xl">
                {post.image}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="space-y-3 border-t pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User size={16} />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar size={16} />
                    <span>{post.date}</span>
                  </div>
                  <button className="w-full mt-4 flex items-center justify-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200">
                    Read More <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-blue-100 mb-8">Get the latest travel tips and stories delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
