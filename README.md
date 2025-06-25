# 📐 Interactive Conic Sections Tool

An advanced educational web application for exploring and visualizing conic sections with real-time 3D demonstrations, interactive parameter controls, and dynamic mathematical equations.

![Conic Sections Demo](https://img.shields.io/badge/Demo-Live-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14.2.30-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🎯 **Interactive Visualization**

- **Real-time Plotly charts** with smooth parameter updates
- **3D Three.js cone demonstrations** showing how conic sections form
- **Live equation display** with LaTeX-style mathematical formatting
- **Key point visualization** (center, foci, vertices) for ellipses

### 📊 **Four Conic Types Supported**

- **Parabola**: `y = a(x - h)² + k`
- **Circle**: `(x - h)² + (y - k)² = r²`
- **Ellipse**: `(x - h)²/a² + (y - k)²/b² = 1`
- **Hyperbola**: `(x - h)²/a² - (y - k)²/b² = 1`

### 🎨 **Modern UI/UX**

- **Full light/dark mode support** with shadcn/ui theming
- **Responsive design** for desktop and mobile
- **Smooth animations** and transitions
- **Accessible controls** with proper ARIA labels

### 📁 **Export Capabilities**

- **Graph export** (PNG, SVG formats)
- **Data export** (CSV format)
- **Equation export** (JSON format)
- **Clipboard integration** for easy sharing

## 🚀 Quick Start

### Prerequisites

- **Node.js** 16.8.0 or higher
- **pnpm** (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/interactive-conic-sections.git
cd interactive-conic-sections

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🛠️ Tech Stack

### **Frontend Framework**

- **Next.js 14.2.30** - React framework with App Router
- **React 18.3.1** - UI library
- **TypeScript 5.8.3** - Type safety

### **Visualization**

- **Plotly.js 3.0.1** - Interactive charts and graphs
- **Three.js 0.158.0** - 3D cone visualizations
- **React-Plotly.js 2.6.0** - React integration for Plotly

### **Styling & UI**

- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Radix UI** - Accessible component primitives
- **next-themes** - Theme switching functionality

### **Development Tools**

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles with shadcn/ui theming
│   ├── layout.tsx         # Root layout with theme provider
│   └── page.tsx           # Main application page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   │   ├── theme-provider.tsx
│   │   └── toggle-group.tsx
│   ├── ConicSelector.tsx  # Conic type selection buttons
│   ├── Header.tsx         # App header with export controls
│   ├── ParameterControls.tsx # Parameter sliders
│   └── PlotlyChart.tsx    # Main chart component
├── types/                 # TypeScript type definitions
│   ├── index.ts          # Main types
│   ├── plotly.d.ts       # Plotly type declarations
│   └── react-plotly.js.d.ts # React-Plotly type declarations
├── utils/                 # Utility functions
│   ├── exportUtils.ts     # Export functionality
│   ├── mathUtils.ts       # Mathematical calculations
│   └── threeUtils.ts      # Three.js scene setup
└── lib/                   # Library utilities
    ├── constants.ts       # Application constants
    └── utils.ts           # General utilities
```

## 🎛️ Component Architecture

### **Main Components**

#### `page.tsx`

- Main application layout
- State management for conic type and parameters
- Theme detection and Three.js integration

#### `PlotlyChart.tsx`

- Interactive Plotly visualization
- Dynamic theming support
- Real-time data updates

#### `ConicSelector.tsx`

- Conic type selection interface
- Button group with active state management

#### `ParameterControls.tsx`

- Dynamic parameter sliders
- Context-aware parameter visibility
- Real-time value updates

#### `Header.tsx`

- Export functionality
- Theme toggle
- Application branding

### **Utility Modules**

#### `mathUtils.ts`

- Point generation algorithms
- Equation formatting
- Mathematical calculations for each conic type

#### `threeUtils.ts`

- 3D scene setup and management
- Cone and plane geometry creation
- Animation loops

#### `exportUtils.ts`

- Plotly chart export functionality
- CSV data export
- Clipboard operations

## 🎨 Theming System

The application uses **shadcn/ui** with CSS custom properties for comprehensive theming:

### **CSS Custom Properties**

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --muted: 210 40% 96%;
  /* ... more properties */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode overrides */
}
```

### **Theme Usage**

Components use semantic classes like:

- `bg-background` - Main background
- `text-foreground` - Primary text
- `bg-card` - Component backgrounds
- `border-border` - Border colors

## 📊 Mathematical Implementation

### **Conic Section Equations**

#### Parabola

```typescript
y = a(x - h)² + k
```

- `a`: Coefficient (width/direction)
- `h`: Horizontal shift
- `k`: Vertical shift

#### Circle

```typescript
(x - h)² + (y - k)² = r²
```

- `r`: Radius
- `h`, `k`: Center coordinates

#### Ellipse

```typescript
(x - h)²/a² + (y - k)²/b² = 1
```

- `a`: Semi-major axis
- `b`: Semi-minor axis
- `h`, `k`: Center coordinates

#### Hyperbola

```typescript
(x - h)²/a² - (y - k)²/b² = 1
```

- `a`: Horizontal distance parameter
- `b`: Vertical distance parameter
- `h`, `k`: Center coordinates

### **Point Generation Algorithms**

The application uses parametric equations and direct function evaluation to generate smooth curves with optimized point density.

## 🔧 Configuration

### **Environment Variables**

Create a `.env.local` file for custom configuration:

```bash
# Analytics (optional)
NEXT_PUBLIC_GA_ID=your_analytics_id

# Feature flags (optional)
NEXT_PUBLIC_ENABLE_EXPORT=true
NEXT_PUBLIC_ENABLE_3D=true
```

### **Customization**

#### **Adding New Conic Types**

1. Update `ConicType` in `src/types/index.ts`
2. Add equation logic in `src/utils/mathUtils.ts`
3. Update UI components for new parameters

#### **Modifying Theme Colors**

Edit `src/app/globals.css` to customize the color palette:

```css
:root {
  --primary: your-custom-hue saturation lightness;
}
```

## 🚢 Deployment

### **Vercel (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### **Docker**

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### **Static Export**

```bash
# Build static version
pnpm build

# Serve static files
npx serve out
```

## 🧪 Testing

```bash
# Run type checking
pnpm type-check

# Lint code
pnpm lint

# Format code
pnpm format
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### **Development Guidelines**

- Follow TypeScript best practices
- Use semantic commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Plotly.js](https://plotly.com/javascript/)** - Powerful charting library
- **[Three.js](https://threejs.org/)** - 3D visualization capabilities
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful component library
- **[Next.js](https://nextjs.org/)** - Amazing React framework
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling

## 🔗 Links

- **[Live Demo](https://conic-sections.vercel.app)** - Try the application
- **[Documentation](https://github.com/yourusername/interactive-conic-sections/wiki)** - Detailed guides
- **[Issues](https://github.com/yourusername/interactive-conic-sections/issues)** - Report bugs or request features
- **[Discussions](https://github.com/yourusername/interactive-conic-sections/discussions)** - Community discussions

---

**Made with ❤️ for mathematics education**
