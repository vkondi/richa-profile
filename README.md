# Richa Sharma - Numerology Professional Website

A modern, responsive web application showcasing Richa Sharma's numerology services and providing interactive numerology calculators. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🌟 Features

### Professional Profile & Services
- **Personal Branding**: Professional profile page featuring Richa Sharma as a certified numerologist
- **Service Showcase**: Comprehensive display of numerology services including:
  - Personal Numerology
  - Life Path Analysis
  - Compatibility Analysis
  - Career Guidance
  - Name and Date Correction
- **Contact Integration**: Social media links and contact information
- **Responsive Design**: Mobile-first approach with adaptive layouts

### Interactive Numerology Calculators
The application includes six specialized numerology calculators:

1. **All-in-One Calculator** - Comprehensive numerology analysis
2. **Name Numerology Calculator** - Analyze names using Pythagorean and Chaldean systems
3. **Destiny Number Calculator** - Calculate and interpret destiny numbers
4. **Pinnacle Number Calculator** - Determine life's pinnacle periods
5. **Personality Number Calculator** - Discover personality traits through numbers
6. **Lo-Shu Grid Calculator** - Traditional Chinese numerology grid analysis

### Technical Features
- **Dark/Light Theme Toggle** - User preference-based theme switching
- **Database Integration** - PostgreSQL with Neon hosting for interpretations
- **API Endpoints** - RESTful APIs for calculator functionality
- **Type Safety** - Full TypeScript implementation
- **Performance Optimized** - Next.js 15 with Turbopack for fast development
- **SEO Optimized** - Metadata and structured content

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Responsive** - Responsive design utilities

### Backend & Database
- **PostgreSQL** - Primary database
- **Neon** - Serverless PostgreSQL hosting
- **pg** - PostgreSQL client for Node.js

### Development Tools
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **Husky** - Git hooks for code quality
- **Yarn** - Package management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Yarn package manager
- PostgreSQL database (or Neon account)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd richa-profile
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   ```

4. **Database Setup**
   The application will automatically run migrations on startup. Ensure your database is accessible.

5. **Run the development server**
   ```bash
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `yarn dev` - Start development server with Turbopack
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier
- `yarn check-types` - TypeScript type checking

## 🎨 Design System

### Color Scheme
- **Light Theme**: Clean white background with pink accents
- **Dark Theme**: Deep blue background with light text
- **Responsive**: Adaptive color schemes for different screen sizes

### Typography
- **Font**: Inter (Google Fonts)
- **Responsive**: Scalable font sizes using CSS custom properties
- **Accessibility**: High contrast ratios for readability

## 🔧 Configuration

### Database Configuration
The application uses PostgreSQL with automatic migrations for storing numerology interpretations and user data.

### Environment Variables
- `DATABASE_URL` - PostgreSQL connection string (required)

## 📱 Responsive Design

The application is fully responsive with mobile-first design approach, supporting various screen sizes from mobile phones to desktop computers.

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The application can be deployed to any platform supporting Next.js.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 About Richa Sharma

Richa Sharma is a certified numerologist offering personalized guidance through the ancient science of numerology. The website serves as both a professional portfolio and a platform for clients to explore numerology through interactive calculators.

## 📞 Contact

For questions about the website or numerology services:
- **Website**: [richa-profile.vercel.app](https://richa-profile.vercel.app)
- **Social Media**: Available through the website's contact section

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
