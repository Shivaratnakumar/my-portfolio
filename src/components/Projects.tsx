'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Filter, Plus, Database } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { sampleProjects, insertSampleProjects, getProjectsByCategory } from '@/utils/projects'

interface Project {
  id: number
  title: string
  description: string
  image_url: string
  tech_stack: string[]
  github_url: string
  live_url: string
  featured: boolean
  category?: string
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [activeFilter, setActiveFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showSampleData, setShowSampleData] = useState(false)

  const filters = ['All', 'Web App', 'Mobile', 'Full Stack']

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    filterProjects()
  }, [projects, activeFilter])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      const projectsData = data || []
      setProjects(projectsData)
      
      // If no projects found, show option to add sample data
      if (projectsData.length === 0) {
        setShowSampleData(true)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
      setError('Failed to load projects')
      setShowSampleData(true)
    } finally {
      setLoading(false)
    }
  }

  const filterProjects = () => {
    let filtered = []
    
    if (activeFilter === 'All') {
      filtered = projects
    } else if (activeFilter === 'Web App') {
      filtered = projects.filter(project => 
        project.category === 'Web App' || 
        project.tech_stack.some(tech => tech.toLowerCase().includes('web'))
      )
    } else if (activeFilter === 'Mobile') {
      filtered = projects.filter(project => 
        project.category === 'Mobile' || 
        project.tech_stack.some(tech => tech.toLowerCase().includes('mobile'))
      )
    } else if (activeFilter === 'Full Stack') {
      filtered = projects.filter(project => 
        project.category === 'Full Stack' || 
        project.tech_stack.some(tech => tech.toLowerCase().includes('full'))
      )
    }
    
    console.log(`Filter: ${activeFilter}, Projects: ${projects.length}, Filtered: ${filtered.length}`)
    setFilteredProjects(filtered)
  }

  const handleAddSampleData = async () => {
    try {
      setLoading(true)
      const success = await insertSampleProjects(supabase)
      if (success) {
        setShowSampleData(false)
        await fetchProjects()
      } else {
        setError('Failed to add sample projects')
      }
    } catch (error) {
      console.error('Error adding sample data:', error)
      setError('Failed to add sample projects')
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Projects
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A showcase of my recent work and side projects
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300'
              }`}
            >
{filter === 'All' && <Filter size={16} />}
              {filter}
            </motion.button>
          ))}
        </motion.div>



        {/* Sample Data Section */}
        {showSampleData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 p-6 bg-blue-50 rounded-xl border border-blue-200"
          >
            <Database className="mx-auto mb-4 text-blue-600" size={48} />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Projects Found</h3>
            <p className="text-gray-600 mb-4">
              {error ? 'There was an error loading projects.' : 'Your projects database is empty.'}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddSampleData}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 mx-auto hover:shadow-lg disabled:opacity-50"
            >
              <Plus size={20} />
              {loading ? 'Adding Sample Data...' : 'Add Sample Projects'}
            </motion.button>
          </motion.div>
        )}



        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Project+Image'
                  }}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-300"
                  >
                    <Github size={20} className="text-white" />
                  </a>
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-300"
                  >
                    <ExternalLink size={20} className="text-white" />
                  </a>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && !showSampleData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Filter className="mx-auto mb-4 text-gray-400" size={48} />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Projects Found</h3>
            <p className="text-gray-500 text-lg">No projects match the "{activeFilter}" filter.</p>
            <button
              onClick={() => setActiveFilter('All')}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
            >
              Show All Projects
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Projects
