'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Building2, ExternalLink } from 'lucide-react'

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: 'Team Lead',
      company: 'Benekiva',
      location: 'Remote, USA',
      period: '2022 - Present',
      description: 'Led development of scalable web applications using modern technologies. Collaborated with cross-functional teams to deliver high-quality software solutions.',
      technologies: ['Angular', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
      achievements: [
        'Improved application performance by 40% through code optimization',
        'Led a team of 3 developers on a major project',
        'Implemented CI/CD pipelines reducing deployment time by 60%'
      ],
      companyUrl: '#'
    },
    {
      id: 2,
      title: 'Senior Software Engineer',
      company: 'Accord Global Technologies and Solutions Pvt Ltd',
      location: 'Bengaluru, India',
      period: '2017 - 2022',
      description: 'Developed responsive web applications and user interfaces. Worked closely with designers to implement pixel-perfect designs.\
      also worked on embedded software development.',
      technologies: ['Angular', 'Java', 'Python', 'PostgreSQL', 'Git'],
      achievements: [
        'Built 3+ responsive web applications',
        'Reduced page load time by 35%',
        'Mentored 2 junior developers'
      ],
      companyUrl: '#'
    }
  ]

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
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
              Work Experience
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            My professional journey in software development, showcasing growth and achievements.
          </p>
        </motion.div>

        <div className="space-y-12">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="text-blue-600" size={24} />
                    <h3 className="text-2xl font-bold text-gray-800">{experience.title}</h3>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                    <a
                      href={experience.companyUrl}
                      className="text-xl font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300 flex items-center gap-2"
                    >
                      {experience.company}
                      <ExternalLink size={16} />
                    </a>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{experience.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{experience.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {experience.description}
              </p>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Key Achievements:</h4>
                <ul className="space-y-2">
                  {experience.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
