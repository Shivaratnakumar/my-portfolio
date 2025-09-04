// Navigation utility functions
export const scrollToSection = (href) => {
  // Add a small delay to ensure the mobile menu is closed first
  setTimeout(() => {
    const element = document.querySelector(href);
    if (element) {
      // Calculate the element's position
      const elementTop = element.offsetTop;
      
      // Account for fixed navigation height (4rem = 64px)
      const navHeight = 64;
      const targetPosition = elementTop - navHeight;
      
      // Smooth scroll to the target position
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }, 100); // Small delay to ensure mobile menu closes first
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
  { name: 'Resume', href: '/resume/Shivaratnakumar_Patil_Resume.pdf', isExternal: true },
];
