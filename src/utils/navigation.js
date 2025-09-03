// Navigation utility functions
export const scrollToSection = (href) => {
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const handleScroll = (setScrolled) => {
  const handleScrollEvent = () => {
    setScrolled(window.scrollY > 50);
  };
  
  window.addEventListener('scroll', handleScrollEvent);
  return () => window.removeEventListener('scroll', handleScrollEvent);
};

export const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];
