// Hero section utility functions
export const scrollToNext = () => {
  const aboutSection = document.querySelector('#about');
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: 'smooth' });
  }
};

export const scrollToProjects = () => {
  const projectsSection = document.querySelector('#projects');
  if (projectsSection) {
    projectsSection.scrollIntoView({ behavior: 'smooth' });
  }
};

export const scrollToContact = () => {
  const contactSection = document.querySelector('#contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};

export const socialLinks = [
  { icon: 'Github', href: 'https://github.com/Shivaratnakumar', label: 'GitHub' },
  { icon: 'Linkedin', href: 'https://www.linkedin.com/in/shivaratnakumar-patil-6967659a/', label: 'LinkedIn' },
  { icon: 'Mail', href: 'mailto:shivaratnakumarpatil@gmail.com', label: 'Email' },
];
