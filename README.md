# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, Tailwind CSS, and Supabase. Features smooth animations, project showcase, and contact form integration.

## 🚀 Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Interactive**: Smooth scrolling navigation and hover effects
- **Project Showcase**: Dynamic project filtering and display
- **Contact Form**: Integrated contact form with Supabase backend
- **Performance**: Optimized for speed and SEO
- **Accessibility**: Built with accessibility best practices

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: Supabase
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd portfolio
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings → API to get your project URL and anon key
3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Set Up Database

Run this SQL in your Supabase SQL Editor:

```sql
-- Create projects table
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  tech_stack TEXT[],
  github_url VARCHAR(500),
  live_url VARCHAR(500),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create contact_messages table
CREATE TABLE contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample projects
INSERT INTO projects (title, description, image_url, tech_stack, github_url, live_url, featured) VALUES
('E-Commerce Platform', 'Full-stack e-commerce solution with payment integration', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500', ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe'], 'https://github.com', 'https://example.com', true),
('Task Management App', 'Collaborative task management with real-time updates', 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500', ARRAY['Next.js', 'TypeScript', 'Supabase'], 'https://github.com', 'https://example.com', true),
('Weather Dashboard', 'Real-time weather tracking with beautiful UI', 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500', ARRAY['React', 'API Integration', 'Chart.js'], 'https://github.com', 'https://example.com', false);
```

### 5. Customize Content

Update the following files with your information:

- `src/components/Hero.tsx` - Update name, title, and social links
- `src/components/About.tsx` - Update your story and skills
- `src/components/Contact.tsx` - Update contact information
- `src/app/layout.tsx` - Update metadata

### 6. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

## 🚀 Deployment on Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial portfolio setup"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click "Deploy"

### 3. Custom Domain (Optional)

1. In your Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS settings as instructed

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navigation.tsx
│   └── Projects.tsx
└── lib/
    └── supabase.ts
```

## 🎨 Customization

### Colors
The portfolio uses a blue-to-purple gradient theme. To change colors, update the gradient classes in:
- `src/components/Hero.tsx`
- `src/components/About.tsx`
- `src/components/Projects.tsx`
- `src/components/Contact.tsx`

### Animations
Animations are powered by Framer Motion. You can customize them in each component file.

### Content
- **Projects**: Add/edit projects in your Supabase database
- **Skills**: Update the skills array in `About.tsx`
- **Contact Info**: Update contact details in `Contact.tsx` and `Footer.tsx`

## 📱 Features Overview

### Navigation
- Smooth scrolling between sections
- Responsive mobile menu
- Active section highlighting

### Hero Section
- Animated gradient text
- Call-to-action buttons
- Social media links
- Scroll indicator

### About Section
- Personal story
- Animated skill bars
- Technology tags

### Projects Section
- Dynamic project filtering
- Hover effects
- Project details modal
- Responsive grid layout

### Contact Section
- Working contact form
- Form validation
- Success/error states
- Contact information display

## 🔧 Troubleshooting

### Common Issues

1. **Supabase Connection Error**
   - Check your environment variables
   - Verify Supabase project is active
   - Check database permissions

2. **Build Errors**
   - Run `npm run build` locally to check for errors
   - Ensure all dependencies are installed
   - Check TypeScript errors

3. **Styling Issues**
   - Clear browser cache
   - Check Tailwind CSS configuration
   - Verify all CSS imports

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, feel free to reach out!

---

**Happy Coding! 🚀**