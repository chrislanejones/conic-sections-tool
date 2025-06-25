# 📐 Interactive Conic Sections Tool

An advanced educational web application for exploring and visualizing conic sections with real-time 3D demonstrations, interactive parameter controls, dynamic mathematical equations, and comprehensive key point visualization.

![Conic Sections Demo](https://img.shields.io/badge/Demo-Live-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14.2.30-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🎯 **Interactive Visualization**

- **Real-time Plotly charts** with smooth parameter updates and mathematical accuracy
- **3D Three.js cone demonstrations** showing how conic sections form geometrically
- **Pause/Play animation controls** for the 3D visualization
- **Live equation display** with LaTeX-style mathematical formatting
- **Complete key point visualization** including vertices, foci, directrix, and centers

### 📊 **Four Conic Types with Full Mathematical Detail**

- **Parabola**: `y = a(x - h)² + k`
  - Displays: Vertex, Focus, and Directrix line
- **Circle**: `(x - h)² + (y - k)² = r²`
  - Displays: Center point
- **Ellipse**: `(x - h)²/a² + (y - k)²/b² = 1`
  - Displays: Center, Two Foci, and Vertices (major/minor axes endpoints)
- **Hyperbola**: `(x - h)²/a² - (y - k)²/b² = 1`
  - Displays: Center, Two Foci, and Vertices

### 🎨 **Modern UI/UX**

- **Full light/dark mode support** with shadcn/ui theming system
- **Responsive design** optimized for desktop, tablet, and mobile
- **Smooth animations** and transitions throughout the interface
- **Accessible controls** with proper ARIA labels and keyboard navigation
- **Type-safe implementation** with comprehensive TypeScript coverage

### 📁 **Export Capabilities**

- **Graph export** in multiple formats (PNG, SVG)
- **Data export** as CSV files for further analysis
- **Equation export** in JSON format for sharing configurations
- **Clipboard integration** for easy copying and sharing

### 🎛️ **Advanced Controls**

- **Dynamic parameter sliders** with real-time visual feedback
- **Context-aware UI** (parameters change based on selected conic type)
- **Animation control** with pause/play functionality
- **Reset functionality** to return to default values
- **Theme toggle** for comfortable viewing in any lighting condition

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

#### `page.tsx` - Application Core

- Main application layout and state management
- Handles conic type and parameter state
- Integrates Three.js scene with animation controls
- Theme detection and responsive design
- Centralized event handling for all user interactions

#### `PlotlyChart.tsx` - Enhanced Mathematical Visualization

- Interactive Plotly.js charts with full mathematical accuracy
- **Key point calculation and display** for all conic types
- Dynamic theming with shadcn/ui integration
- Real-time parameter updates and smooth transitions
- **Type-safe implementation** with comprehensive error handling
- Export functionality integration

#### `ConicSelector.tsx` - Conic Type Selection

- Toggle group interface for selecting conic types
- Visual feedback for active selection
- Theme-aware styling with hover states
- Accessibility features for keyboard navigation

#### `ParameterControls.tsx` - Dynamic Parameter Interface

- Context-sensitive parameter sliders
- Real-time value display and feedback
- Parameter visibility based on selected conic type
- Custom styled range inputs with proper theming
- Descriptive labels and help text

#### `Header.tsx` - Application Controls

- Export functionality with dropdown menu
- Theme toggle with system preference detection
- Application branding and navigation
- **Enhanced export options** for graphs, data, and equations

### **Enhanced Utility Modules**

#### `mathUtils.ts` - Mathematical Engine

- **Comprehensive point generation** algorithms for all conic types
- **Key point calculations** (vertices, foci, directrix, center)
- Equation formatting with proper mathematical notation
- Optimized curve generation with adaptive point density
- **Type-safe mathematical operations**

#### `threeUtils.ts` - 3D Visualization Engine

- **Double-cone geometry** with point-to-point configuration
- **Interactive animation controls** (play/pause functionality)
- Theme-aware 3D scene rendering
- **Accurate cutting plane positioning** for each conic type
- Performance-optimized animation loops
- Proper resource cleanup and memory management

#### `exportUtils.ts` - Export Functionality

- **Client-side only** implementation to prevent SSR issues
- **Type-safe Plotly integration** with dynamic imports
- Multiple export formats (PNG, SVG, CSV, JSON)
- **Error handling and user feedback**
- Clipboard integration for easy sharing

## 🎨 Enhanced Theming System

The application uses **shadcn/ui** with CSS custom properties for comprehensive theming support:

### **CSS Custom Properties**

```css
:root {
  --background: 0 0% 100%; /* Main app background */
  --foreground: 222.2 84% 4.9%; /* Primary text color */
  --primary: 221.2 83.2% 53.3%; /* Interactive elements */
  --muted: 210 40% 96%; /* Secondary backgrounds */
  --border: 214.3 31.8% 91.4%; /* Border colors */
  --card: 0 0% 100%; /* Component backgrounds */
  /* ... complete color system */
}

.dark {
  --background: 222.2 84% 4.9%; /* Dark backgrounds */
  --foreground: 210 40% 98%; /* Light text */
  --primary: 217.2 91.2% 59.8%; /* Adjusted primary for dark mode */
  /* ... dark mode color overrides */
}
```

### **Semantic Color Usage**

- **`bg-background`** - Main page background that adapts to theme
- **`bg-card`** - Component backgrounds (sidebar, controls)
- **`text-foreground`** - Primary text that ensures proper contrast
- **`text-muted-foreground`** - Secondary text for descriptions
- **`bg-primary`** - Interactive elements (buttons, selections)
- **`border-border`** - All borders with theme-appropriate colors

### **Advanced Theme Features**

- **System preference detection** - Automatically matches OS theme
- **Smooth transitions** - All theme changes are animated
- **Component-level theming** - Each component responds to theme changes
- **3D scene theming** - Three.js background adapts to current theme
- **Plotly chart theming** - Charts use theme colors for axes, grids, and text
- **High contrast support** - Meets accessibility guidelines

### **Theme Integration**

```typescript
// Components automatically inherit theme colors
const { resolvedTheme } = useTheme();
const isDark = resolvedTheme === "dark";

// 3D scenes adapt to theme
setupThreeScene(canvas, conicType, isDark);

// Charts use semantic colors
paperBg: isDark ? 'hsl(var(--background))' : 'hsl(var(--background))',
plotBg: isDark ? 'hsl(var(--card))' : 'hsl(var(--muted))',
```

## 📊 Mathematical Implementation

### **Enhanced Conic Section Visualization**

#### Parabola (`y = a(x - h)² + k`)

```typescript
Displayed Elements:
- 🟢 Vertex: (h, k) - The turning point
- 🔴 Focus: (h, k + 1/(4a)) - The focal point
- 🟡 Directrix: y = k - 1/(4a) - Reference line (dashed)

Key Properties:
- Distance from any point to focus = distance to directrix
- Opens upward when a > 0, downward when a < 0
- Width controlled by parameter 'a'
```

#### Circle (`(x - h)² + (y - k)² = r²`)

```typescript
Displayed Elements:
- 🔵 Center: (h, k) - The center point

Key Properties:
- All points equidistant from center
- Radius = r (parameter 'a' in interface)
- Perfect symmetry in all directions
```

#### Ellipse (`(x - h)²/a² + (y - k)²/b² = 1`)

```typescript
Displayed Elements:
- 🔵 Center: (h, k) - The center point
- 🔴 Foci: Two focal points where sum of distances is constant
- 🟢 Vertices: Endpoints of major and minor axes

Mathematical Relationships:
- Focal distance: c = √|a² - b²|
- Foci positions: (h ± c, k) if a > b, (h, k ± c) if b > a
- Eccentricity: e = c/max(a,b)
```

#### Hyperbola (`(x - h)²/a² - (y - k)²/b² = 1`)

```typescript
Displayed Elements:
- 🔵 Center: (h, k) - The center point
- 🔴 Foci: Two focal points where difference of distances is constant
- 🟢 Vertices: Closest points on each branch

Mathematical Relationships:
- Focal distance: c = √(a² + b²)
- Foci positions: (h ± c, k)
- Asymptotes: y - k = ±(b/a)(x - h)
```

### **3D Cone Visualization**

The application features an accurate double-cone model where:

- **Two cones** positioned point-to-point at the origin
- **Cutting planes** at different angles create different conic sections:
  - **Horizontal cut** → Circle (red plane)
  - **Angled cut** → Ellipse (green plane)
  - **Parallel to side** → Parabola (blue plane)
  - **Through both cones** → Hyperbola (orange plane)
- **Interactive controls** to pause/play the rotation animation
- **Theme-aware rendering** for optimal viewing in light/dark modes

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

## 🧪 Testing & Quality Assurance

### **TypeScript Integration**

```bash
# Comprehensive type checking
pnpm type-check

# Development with strict type safety
pnpm dev
```

**Type Safety Features:**

- **Strict TypeScript configuration** with comprehensive error checking
- **Custom type definitions** for Plotly.js integration
- **Type-safe mathematical calculations** with proper parameter validation
- **Component prop validation** ensuring correct data flow
- **Error boundary implementations** for graceful error handling

### **Code Quality**

```bash
# Code linting with automatic fixes
pnpm lint

# Code formatting consistency
pnpm format

# Format checking without changes
pnpm format:check
```

### **Development Workflow**

- **Hot reload** for instant development feedback
- **Error boundaries** catch and display errors gracefully
- **Console logging** for debugging mathematical calculations
- **Performance monitoring** for smooth animations
- **Memory leak prevention** with proper cleanup functions

## 🚀 **Recent Updates & Improvements**

### **Version 2.0 Features**

- ✅ **Complete key point visualization** - All mathematical elements now displayed
- ✅ **Enhanced 3D visualization** - Point-to-point double cone geometry
- ✅ **Animation controls** - Pause/play functionality for 3D scenes
- ✅ **Type-safe implementation** - Comprehensive TypeScript coverage
- ✅ **Improved theming** - Full shadcn/ui integration with semantic colors
- ✅ **Better error handling** - Graceful failure and user feedback
- ✅ **Export functionality** - Multiple formats with proper error handling

### **Mathematical Accuracy**

- **Vertex calculation** for parabolas with proper focal relationships
- **Directrix visualization** as dashed reference lines
- **Focal point calculations** for ellipses and hyperbolas
- **Center point marking** for all applicable conic types
- **Real-time updates** of all mathematical elements

### **Performance Optimizations**

- **Efficient point generation** with optimized algorithms
- **Smooth animations** with requestAnimationFrame
- **Memory management** with proper cleanup functions
- **Responsive rendering** adapting to different screen sizes
- **Client-side only exports** preventing SSR issues

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
