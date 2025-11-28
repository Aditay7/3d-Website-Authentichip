# Authentichip 3D Website - Project Structure

## 📁 Folder Organization

```
src/
├── components/
│   ├── layout/           # Layout components (header, footer, navigation)
│   │   ├── Navbar.jsx
│   │   └── index.js
│   │
│   ├── sections/         # Page sections (hero, features, about)
│   │   ├── Hero.jsx
│   │   ├── HardwareSection.jsx
│   │   ├── ScanDemoSection.jsx
│   │   ├── HowItWorksSection.jsx
│   │   ├── AboutSection.jsx
│   │   └── index.js
│   │
│   └── 3d/              # All 3D-related components
│       ├── HardwareModel3D.jsx    # Main canvas container
│       ├── index.js
│       ├── scene/                  # Scene composition
│       │   └── Scene3D.jsx        # Camera, lights, environment
│       └── models/                 # Individual 3D models
│           ├── ICJigModel.jsx     # wcJIG inspection rig
│           ├── ICChipModel.jsx    # Draggable IC chip
│           └── index.js
│
├── assets/              # Static assets
│   └── models/          # (if any local assets)
│
├── hooks/               # Custom React hooks
│
├── App.jsx              # Main app component
├── App.css              # App-specific styles
├── index.css            # Global styles (Tailwind)
└── main.jsx             # App entry point

public/
└── models/              # 3D model files (.glb)
    ├── wcJIG.glb       # Main inspection rig model
    └── icJIG.glb       # Draggable chip model
```

## 🎯 Component Responsibilities

### Layout Components (`components/layout/`)
- **Navbar.jsx**: Fixed navigation with scroll effects and mobile menu

### Section Components (`components/sections/`)
- **Hero.jsx**: Landing section with branding and CTAs
- **HardwareSection.jsx**: Hardware specifications and features
- **ScanDemoSection.jsx**: AI scanning demo information
- **HowItWorksSection.jsx**: Process explanation
- **AboutSection.jsx**: Company/product information

### 3D Components (`components/3d/`)

#### Main Canvas
- **HardwareModel3D.jsx**: Three.js Canvas container
  - Handles canvas settings
  - OrbitControls configuration
  - Cursor states and interactions

#### Scene
- **scene/Scene3D.jsx**: Scene composition
  - Camera setup
  - Lighting configuration
  - Environment settings
  - Orchestrates all 3D models

#### Models
- **models/ICJigModel.jsx**: wcJIG Inspection Rig
  - Scroll-based position animation (center → left)
  - 720° rotation during scroll
  - Manual rotation support
  - Breathing animation effect

- **models/ICChipModel.jsx**: Draggable IC Chip
  - Appears at scrollProgress > 0.5
  - Drag-and-drop functionality
  - Hover animations
  - Independent lighting

## 🔄 Data Flow

```
App.jsx
  ├── Tracks scroll progress (0 → 1)
  │
  ├── Fixed 3D Layer (z-10)
  │   └── HardwareModel3D
  │       └── Scene3D
  │           ├── ICJigModel (animated by scroll)
  │           └── ICChipModel (draggable)
  │
  └── Content Layers (z-20+)
      ├── Navbar
      ├── Hero
      ├── HardwareSection
      ├── ScanDemoSection
      └── Other sections
```

## 📦 Import Patterns

### Clean Imports with Barrel Files
```javascript
// App.jsx
import { Navbar } from './components/layout';
import { Hero, HardwareSection } from './components/sections';
import { HardwareModel3D } from './components/3d';
```

### Direct Imports (when needed)
```javascript
import { ICJigModel, ICChipModel } from './components/3d/models';
```

## 🎨 Styling Architecture

- **Tailwind CSS v4**: Utility-first styling
- **index.css**: Global styles and Tailwind imports
- **App.css**: App-specific styles
- **Inline styles**: Component-specific animations and dynamic styles

## 🚀 Development Guidelines

### Adding a New Section
1. Create component in `components/sections/`
2. Export from `components/sections/index.js`
3. Import in `App.jsx` and add to render

### Adding a New 3D Model
1. Place `.glb` file in `public/models/`
2. Create component in `components/3d/models/`
3. Export from `components/3d/models/index.js`
4. Add to `Scene3D.jsx`

### Modifying Scroll Animation
- Update `App.jsx` for scroll tracking logic
- Modify model components for position/rotation changes

## 📝 Key Features

- ✅ Modular component structure
- ✅ Clear separation of concerns
- ✅ Barrel exports for clean imports
- ✅ Production-ready organization
- ✅ Easy to understand for new developers
- ✅ Scalable architecture

## 🛠️ Tech Stack

- **React 19.2.0**: UI framework
- **Vite 7.2.4**: Build tool
- **Three.js**: 3D rendering
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Helper components
- **Tailwind CSS v4**: Styling

## 📚 Learn More

- [React Documentation](https://react.dev/)
- [Three.js Docs](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Tailwind CSS](https://tailwindcss.com/)
