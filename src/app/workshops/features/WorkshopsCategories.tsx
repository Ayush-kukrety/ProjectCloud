import React from 'react'

const WorkshopsCategories = () => {
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <header className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-gray-600">
          JD
        </div>
        <div className="flex-grow">
          <h1 className="text-2xl font-bold">John Doe</h1>
          <p className="text-gray-600">@johndoe</p>
          <p className="mt-2 max-w-2xl">Full-stack developer passionate about creating innovative solutions and contributing to open-source projects.</p>
        </div>
        <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors">
          Follow
        </button>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        <main className="flex-grow">
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <a href="#" className="border-b-2 border-gray-800 py-4 px-1 text-sm font-medium">
                  Overview
                </a>
                <a href="#" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                  Repositories
                </a>
                <a href="#" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                  Projects
                </a>
                <a href="#" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                  Packages
                </a>
              </nav>
            </div>
            <div className="pt-6">
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Popular repositories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((repo) => (
                    <div key={repo} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-base font-medium mb-2">
                        <a href="#" className="text-blue-500 hover:underline">awesome-project-{repo}</a>
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">A really cool project that does amazing things</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                          JavaScript
                        </span>
                        <span className="flex items-center gap-1">
                          ★ 100
                        </span>
                        <span className="flex items-center gap-1">
                          ⑂ 20
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <h2 className="text-xl font-semibold mb-4">Contribution activity</h2>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="h-32 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                    Contribution graph placeholder
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>

        <aside className="w-full md:w-64 space-y-4">
          <div className="border border-gray-200 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>👥</span>
              <span>1.5k followers · 100 following</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>📍</span>
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>🔗</span>
              <a href="#" className="text-blue-500 hover:underline">https://johndoe.com</a>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>📅</span>
              <span>Joined September 2015</span>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-base font-medium mb-2">Achievements</h3>
            <div className="flex flex-wrap gap-2">
              {['🏆', '🌟', '🚀', '💡', '🎉'].map((emoji, index) => (
                <div key={index} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default WorkshopsCategories
