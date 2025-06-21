# 🎯 Interactive Conic Sections Tool

An advanced educational web application for exploring and visualizing conic sections (parabolas, circles, ellipses, and hyperbolas) with real-time 3D cone demonstrations and interactive parameter controls.

![Conic Sections Demo](https://img.shields.io/badge/Demo-Live-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-13+-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue) ![Three.js](https://img.shields.io/badge/Three.js-3D-orange)

## ✨ Features

### 🎮 Interactive Controls

- **Real-time parameter adjustment** with smooth sliders
- **Four conic types**: Parabola, Circle, Ellipse, Hyperbola
- **Toggle button interface** for easy conic type selection
- **Reset to defaults** functionality

### 📐 Mathematical Visualization

- **Live equation display** with proper mathematical formatting
- **Key points visualization**: Foci, vertices, centers, directrix
- **Color-coded elements** for easy identification
- **Responsive 2D graphing** with Recharts

### 🎨 3D Cone Demonstration

- **Interactive 3D cone** showing how each conic section forms
- **Play/pause animation controls** for the rotating cone
- **Dynamic cutting plane** that changes based on selected conic type
- **Color-coded planes** matching mathematical conventions

### 🌙 User Experience

- **Dark/Light mode toggle** with smooth transitions
- **Export/Share functionality**:
  - Copy equation to clipboard
  - Export equation as JSON
  - Export graph as high-quality PNG
- **Responsive design** for desktop and tablet use
- **Professional UI** with clean, modern styling

### 📊 Educational Value

- **Mathematical definitions** for each conic type
- **Parameter explanations** with real-time feedback
- **Visual learning** through 3D cone intersections
- **Export capabilities** for homework and presentations

## 🚀 Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/conic-sections-tool.git
   cd conic-sections-tool
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Dependencies

### Core Framework

- **Next.js 13+** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety and better development experience

### Visualization Libraries

- **Three.js** - 3D cone visualization and animations
- **Recharts** - Interactive 2D graphing and charts
- **Lucide React** - Modern icon library

### Styling

- **Tailwind CSS** - Utility-first CSS framework
- **CSS Modules** - Scoped styling (optional)

## 🏗️ Project Structure

```
conic-sections-tool/
├── pages/
│   ├── index.tsx          # Main application component
│   ├── _app.tsx           # Next.js app wrapper
│   └── _document.tsx      # HTML document structure
├── public/
│   ├── favicon.ico        # App icon
│   └── images/            # Static images
├── styles/
│   ├── globals.css        # Global styles and Tailwind imports
│   └── components/        # Component-specific styles
├── components/            # Reusable React components (future)
├── utils/                 # Utility functions (future)
├── types/                 # TypeScript type definitions
├── package.json
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── README.md
```

## 🎓 Educational Applications

### For Students

- **Visual Learning**: See how mathematical equations translate to geometric shapes
- **Parameter Exploration**: Understand how changing values affects curve properties
- **3D Understanding**: Grasp the fundamental relationship between all conic sections
- **Export Tools**: Create materials for presentations and homework

### For Educators

- **Classroom Demonstrations**: Project live parameter changes during lessons
- **Assignment Creation**: Export custom problems and solutions
- **Interactive Learning**: Engage students with hands-on mathematical exploration
- **Assessment Support**: Generate examples for tests and quizzes

### For Self-Study

- **Concept Reinforcement**: Practice identifying conic section properties
- **Visual References**: Compare different parameter combinations
- **Mathematical Definitions**: Learn formal definitions with visual context

## 🔧 Configuration

### Tailwind CSS Setup

The project uses Tailwind CSS for styling. Configuration is in `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      // Custom theme extensions
    },
  },
  plugins: [],
};
```

### TypeScript Configuration

Strict TypeScript settings in `tsconfig.json` ensure code quality:

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true
  }
}
```

## 🎯 Mathematical Formulas

The application supports these conic section equations:

### Parabola

- **Vertex Form**: `y = a(x - h)² + k`
- **Parameters**:
  - `a`: Width and direction (positive = up, negative = down)
  - `h`: Horizontal shift of vertex
  - `k`: Vertical shift of vertex

### Circle

- **Standard Form**: `(x - h)² + (y - k)² = r²`
- **Parameters**:
  - `r`: Radius
  - `h, k`: Center coordinates

### Ellipse

- **Standard Form**: `(x - h)²/a² + (y - k)²/b² = 1`
- **Parameters**:
  - `a`: Horizontal semi-axis
  - `b`: Vertical semi-axis
  - `h, k`: Center coordinates

### Hyperbola

- **Standard Form**: `(x - h)²/a² - (y - k)²/b² = 1`
- **Parameters**:
  - `a`: Horizontal scale factor
  - `b`: Vertical scale factor
  - `h, k`: Center coordinates

## 🛠️ Development

### Building for Production

```bash
npm run build
npm start
```

### Code Quality

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Formatting
npm run format
```

### Adding New Features

1. Create feature branch: `git checkout -b feature/new-feature`
2. Implement changes with TypeScript
3. Add appropriate tests
4. Update documentation
5. Submit pull request

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Add tests if applicable**
5. **Update documentation**
6. **Submit a pull request**

### Code Style

- Use TypeScript for all new code
- Follow the existing component structure
- Use Tailwind CSS for styling
- Add comments for complex mathematical calculations
- Ensure accessibility standards

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js** community for excellent 3D visualization capabilities
- **Recharts** team for robust charting components
- **Next.js** team for the amazing React framework
- **Tailwind CSS** for the utility-first styling approach
- **Mathematics educators** who inspired this educational tool

## 📞 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Create an issue on GitHub for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Email**: [your-email@example.com] for direct support

## 🔮 Future Enhancements

- [ ] **Mobile responsive design** for phone usage
- [ ] **Asymptotes visualization** for hyperbolas
- [ ] **Eccentricity display** and calculations
- [ ] **Animation presets** for common demonstrations
- [ ] **Keyboard shortcuts** for power users
- [ ] **Save/Load configurations** functionality
- [ ] **Multi-language support** for international users
- [ ] **Accessibility improvements** for screen readers
- [ ] **Performance optimizations** for complex calculations
- [ ] **Integration with learning management systems**

---

**Made with ❤️ for mathematics education**

_Transform the way students learn conic sections through interactive visualization and hands-on exploration._
