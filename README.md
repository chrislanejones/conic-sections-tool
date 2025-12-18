![Conic Banner with Banner](/public/Conic-Sections.webp)
# Interactive Conic Sections

An advanced educational web application for exploring and visualizing conic sections with real-time 3D demonstrations, interactive parameter controls, dynamic mathematical equations, and comprehensive key point visualization.

![License](https://img.shields.io/badge/license-MIT-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC)

## Features

### Core Functionality
- **Real-time Interactive Graphs** - Plotly.js charts with smooth parameter updates and mathematical accuracy
- **3D Cone Visualizations** - Three.js double-cone demonstrations showing how conic sections form geometrically
- **Animation Controls** - Pause/Play functionality for 3D visualization
- **Live Equation Display** - Dynamic mathematical equation formatting
- **Complete Key Point Visualization** - Vertices, foci, directrix, centers, and more

### Supported Conic Types

#### Parabola
- Equation: `y = a(x - h)² + k`
- Displays: Vertex, Focus, and Directrix line
- Parameters: `a` (shape), `h` (horizontal shift), `k` (vertical shift)

#### Circle
- Equation: `(x - h)² + (y - k)² = r²`
- Displays: Center point
- Parameters: `a` (radius), `h` (center x), `k` (center y)

#### Ellipse
- Equation: `(x - h)²/a² + (y - k)²/b² = 1`
- Displays: Center, Two Foci, and Vertices (major/minor axes endpoints)
- Parameters: `a` (semi-major), `b` (semi-minor), `h`, `k`

#### Hyperbola
- Equation: `(x - h)²/a² - (y - k)²/b² = 1`
- Displays: Center, Two Foci, and Vertices
- Parameters: `a`, `b`, `h`, `k`

### UI/UX Features
- **Full Light/Dark Mode Support** - Beautiful monotone shadcn/ui theming
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Smooth Animations** - Transitions and visual feedback throughout
- **Accessible Controls** - Proper ARIA labels and keyboard navigation
- **Dynamic Parameter Sliders** - Real-time visual feedback
- **Context-aware UI** - Parameters change based on selected conic type
- **Reset Functionality** - Return to default values instantly

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) - React framework with App Router
- **UI Library**: [React 19](https://react.dev/) - Modern React with hooks
- **Language**: [TypeScript 5.9](https://www.typescriptlang.org/) - Type safety
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS
- **Components**: [shadcn/ui](https://ui.shadcn.com/) - High-quality component library
- **Charting**: [Plotly.js 3](https://plotly.com/javascript/) - Interactive 2D graphs
- **3D Graphics**: [Three.js 0.182](https://threejs.org/) - WebGL 3D visualization
- **Themes**: [next-themes](https://github.com/pacocoursey/next-themes) - Theme switching
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful icon library
- **Accessibility**: [Radix UI](https://www.radix-ui.com/) - Accessible primitives

## Installation

### Prerequisites
- **Node.js** 16.8.0 or higher
- **pnpm** (recommended) or npm

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/interactive-conic-sections.git
cd interactive-conic-sections

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Selecting a Conic Type
Click the buttons in the left panel to switch between Parabola, Circle, Ellipse, and Hyperbola.

### Adjusting Parameters
Use the interactive sliders to modify:
- **a**: Controls the width/semi-major axis
- **b**: Controls the height/semi-minor axis (hidden for parabola and circle)
- **h**: Horizontal shift (left/right)
- **k**: Vertical shift (up/down)

Changes are reflected in real-time on the graph and 3D visualization.

### 3D Animation
- Click **Play** to rotate the double cone and animate the cutting plane
- Click **Pause** to freeze the animation
- The plane position automatically adjusts based on the selected conic type

### Theme Toggle
Click the sun/moon icon in the header to switch between light and dark modes.

### Reset
Click **Reset** to return all parameters to their default values.

## Project Structure

```
src/
├── app/
│   ├── globals.css           # Global styles and Tailwind config
│   ├── layout.tsx            # Root layout with theme provider
│   └── page.tsx              # Main application page
├── components/
│   ├── ui/
│   │   ├── theme-provider.tsx    # next-themes wrapper
│   │   └── toggle-group.tsx      # Radix UI toggle component
│   ├── Header.tsx            # Header with theme toggle
│   ├── ConicSelector.tsx      # Conic type selector buttons
│   ├── ParameterControls.tsx  # Parameter slider controls
│   └── PlotlyChart.tsx        # Plotly.js graph component
├── types/
│   ├── index.ts              # TypeScript interfaces
│   ├── plotly.d.ts           # Plotly type definitions
│   └── react-plotly.js.d.ts  # React-Plotly type definitions
├── utils/
│   ├── mathUtils.ts          # Mathematical calculations
│   ├── threeUtils.ts         # Three.js scene setup
│   └── exportUtils.ts        # Export functionality (future)
└── lib/
    ├── constants.ts          # App configuration constants
    └── utils.ts              # Utility functions (cn helper)
```

## How It Works

### Mathematical Rendering
The application uses parametric equations to generate points for each conic section:

- **Parabola**: Standard form with vertex and focus calculations
- **Circle/Ellipse**: Parametric equations using cosine and sine
- **Hyperbola**: Hyperbolic functions (cosh, sinh) for both branches

### 3D Visualization
- Double cone created with Three.js ConeGeometry
- Cutting plane positioned and rotated based on conic type
- Real-time animation with requestAnimationFrame
- Proper resource cleanup to prevent memory leaks

### Key Points Calculation
For each conic type, the app calculates and displays:
- Mathematical centers and vertices
- Focal points (for ellipses and hyperbolas)
- Directrix lines (for parabolas)
- Visual markers on the 2D graph

### Theme System
- Uses next-themes for persistent theme preference
- CSS variables for seamless color transitions
- Respects system color scheme preference
- Works with Tailwind CSS custom colors

## Available Scripts

```bash
# Development
pnpm dev              # Start development server

# Building
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm type-check       # Run TypeScript compiler
pnpm format           # Format code with Prettier
pnpm format:check     # Check formatting
```

## Customization

### Changing Colors
Edit the CSS variables in `src/app/globals.css`:

```css
@theme {
  --color-primary: #000000;
  --color-background: #ffffff;
}

html.dark {
  --color-primary: #ffffff;
  --color-background: #000000;
}
```

### Adjusting Parameter Ranges
Modify slider min/max in `src/components/ParameterControls.tsx`:

```typescript
const min = param === "h" || param === "k" ? -10 : 0.1;
```

### Graph Display Range
Update the range in `src/components/PlotlyChart.tsx`:

```typescript
xaxis: {
  range: [-15, 15],
}
```

## Performance Optimizations

- **Dynamic Imports**: PlotlyChart loaded dynamically to avoid SSR issues
- **Client-side Only**: Three.js and Plotly initialized on client
- **Lazy Loading**: Components use React.lazy and Suspense
- **Memory Management**: Proper cleanup of Three.js resources
- **Efficient Rendering**: Memoized components where beneficial

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Known Limitations

- Plotly 3D mode disabled (2D only for simplicity)
- Export functionality not yet implemented
- Mobile touch controls for 3D not yet supported

## Future Enhancements

- [ ] Graph and data export (PNG, SVG, CSV)
- [ ] Save/load configurations
- [ ] Equation export in multiple formats
- [ ] More conic properties (eccentricity display, etc.)
- [ ] Mobile-optimized controls
- [ ] Custom color themes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Learning Resources

- [Conic Sections on Wikipedia](https://en.wikipedia.org/wiki/Conic_section)
- [Khan Academy - Conic Sections](https://www.khanacademy.org/math/precalculus/x9e6a4f10630fb89d:conics)
- [Three.js Documentation](https://threejs.org/docs/)
- [Plotly.js Documentation](https://plotly.com/javascript/)

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

## Author

Created as an educational tool for visualizing and understanding conic sections.

---

**Made with ❤️ for mathematics education**

