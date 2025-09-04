// Contact form utility functions

// Test function to verify Supabase connection
export const testSupabaseConnection = async (supabase) => {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Supabase connection test failed:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Supabase connection test error:', error);
    return false;
  }
};
export const handleFormSubmit = async (e, formData, setIsSubmitting, setIsSubmitted, setFormData) => {
  setIsSubmitting(true);

  try {
    const { supabase } = await import('@/lib/supabase');
    const { error } = await supabase
      .from('contact_messages')
      .insert([formData]);

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  } catch (error) {
    console.error('Error submitting message:', error);
    alert(`There was an error sending your message: ${error.message}`);
  } finally {
    setIsSubmitting(false);
  }
};

export const contactInfo = [
  {
    icon: 'Mail',
    title: 'Email',
    value: 'shivaratnakumarpatil@gmail.com',
    href: 'mailto:shivaratnakumarpatil@gmail.com'
  },
  {
    icon: 'Phone',
    title: 'Phone',
    value: '+91 8050372422',
    href: 'tel:+918050372422'
  },
  {
    icon: 'MapPin',
    title: 'Location',
    value: 'Belagavi, India',
    href: '#'
  }
];
