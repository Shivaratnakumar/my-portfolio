// Projects utility functions

export const sampleProjects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, payment processing, inventory management, and admin dashboard.',
    image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop',
    tech_stack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
    github_url: 'https://github.com/yourusername/ecommerce-platform',
    live_url: 'https://your-ecommerce-demo.com',
    featured: true,
    category: 'Full Stack'
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    image_url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop',
    tech_stack: ['React', 'TypeScript', 'Socket.io', 'PostgreSQL'],
    github_url: 'https://github.com/yourusername/task-manager',
    live_url: 'https://your-task-manager-demo.com',
    featured: true,
    category: 'Web App'
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'A responsive weather dashboard that displays current weather conditions, forecasts, and interactive maps for multiple locations.',
    image_url: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&h=300&fit=crop',
    tech_stack: ['Vue.js', 'Chart.js', 'OpenWeather API', 'CSS3'],
    github_url: 'https://github.com/yourusername/weather-dashboard',
    live_url: 'https://your-weather-demo.com',
    featured: false,
    category: 'Web App'
  },
  {
    id: 4,
    title: 'Mobile Banking App',
    description: 'A secure mobile banking application with biometric authentication, transaction history, and real-time notifications.',
    image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=300&fit=crop',
    tech_stack: ['React Native', 'Firebase', 'Biometric Auth', 'Redux'],
    github_url: 'https://github.com/yourusername/banking-app',
    live_url: 'https://your-banking-demo.com',
    featured: true,
    category: 'Mobile'
  },
  {
    id: 5,
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website showcasing projects, skills, and experience with smooth animations and dark mode.',
    image_url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=300&fit=crop',
    tech_stack: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    github_url: 'https://github.com/yourusername/portfolio',
    live_url: 'https://your-portfolio.com',
    featured: false,
    category: 'Web App'
  },
  {
    id: 6,
    title: 'Social Media Analytics',
    description: 'A comprehensive analytics dashboard for social media metrics with data visualization, reporting, and insights.',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    tech_stack: ['Angular', 'D3.js', 'Python', 'PostgreSQL', 'Redis'],
    github_url: 'https://github.com/yourusername/social-analytics',
    live_url: 'https://your-analytics-demo.com',
    featured: true,
    category: 'Full Stack'
  }
];

export const insertSampleProjects = async (supabase) => {
  try {
    // First, clear existing projects
    await supabase.from('projects').delete().neq('id', 0);
    
    // Ensure proper data types for Supabase
    const projectsToInsert = sampleProjects.map(project => ({
      ...project,
      featured: project.featured, // Keep as boolean, Supabase will handle the conversion
      tech_stack: Array.isArray(project.tech_stack) ? project.tech_stack : []
    }));
    
    // Insert sample projects
    const { error } = await supabase
      .from('projects')
      .insert(projectsToInsert);
    
    if (error) {
      console.error('Error inserting sample projects:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in insertSampleProjects:', error);
    return false;
  }
};

export const getProjectsByCategory = (projects, category) => {
  console.log('=== getProjectsByCategory DEBUG ===')
  console.log('Category:', category)
  console.log('Projects input:', projects)
  
  if (category === 'All') {
    console.log('Returning all projects')
    return projects;
  }
  
  if (category === 'Featured') {
    console.log('Filtering for featured projects')
    const featuredProjects = projects.filter(project => {
      console.log(`Checking project: ${project.title}`)
      console.log(`Featured value: ${JSON.stringify(project.featured)} (type: ${typeof project.featured})`)
      
      // Only return projects that are explicitly marked as featured
      const featured = project.featured;
      const isFeatured = featured === true;
      
      console.log(`Is featured: ${isFeatured}`)
      return isFeatured;
    });
    
    console.log('Featured projects found:', featuredProjects.length)
    return featuredProjects;
  }
  
  console.log(`Filtering for category: ${category}`)
  const filteredProjects = projects.filter(project => {
    const techMatch = project.tech_stack.some(tech => 
      tech.toLowerCase().includes(category.toLowerCase())
    );
    const categoryMatch = project.category === category;
    
    console.log(`Project: ${project.title}, Tech match: ${techMatch}, Category match: ${categoryMatch}`)
    return techMatch || categoryMatch;
  });
  
  console.log(`Projects matching "${category}":`, filteredProjects.length)
  return filteredProjects;
};