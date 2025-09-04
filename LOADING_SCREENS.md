# Loading Screens Documentation

This project includes multiple animated loading screens featuring your TextCrafter logo.

## 🎯 **IMPORTANT: Loading First Behavior**
The loading screen now displays **FIRST** before any page content loads. Users will see your TextCrafter logo animation immediately when they visit the site, creating a professional loading experience.

## 🎨 Available Loading Screens

### 1. Simple Loading Screen (`SimpleLoadingScreen.tsx`)
A clean, lightweight loading screen with smooth CSS animations.

**Features:**
- ✨ Pure CSS animations (no external dependencies)
- 🎯 Lightweight and fast
- 📱 Fully responsive design
- 🎨 Gradient progress bar with shimmer effect
- ⚡ Real-time progress tracking
- 🌟 Floating particles animation
- 🔄 Logo entrance and floating animations

### 2. Advanced Loading Screen (`AdvancedLoadingScreen.tsx`)
A premium loading experience with advanced animations and effects.

**Features:**
- 🌟 Morphing background gradients
- ✨ Advanced particle system (25 animated particles)
- 🎭 Multi-phase animations (entering → loading → exiting)
- 📊 Circular progress indicator with gradient stroke
- 🏷️ Loading stage indicators
- 🎪 Typewriter text effect
- 🔮 Glowing rings and pulse effects
- 📱 Mobile responsive

## 🚀 Usage

### Global App Loading (Recommended)
The loading screen is automatically integrated at the app level and will show FIRST:

```tsx
// Automatically enabled in layout.tsx
<AppLoader>
  {children} // Your entire app content
</AppLoader>
```

### Page-Level Loading (Optional)
You can also add loading to specific pages:

```tsx
<PageLoader 
  enabled={true}
  loadingType="advanced" // or "simple"
  duration={3500}
>
  {/* Page content */}
</PageLoader>
```

### Component-Level Usage
For custom implementations:

```tsx
import { SimpleLoadingScreen, AdvancedLoadingScreen } from '@/components';

// Simple loading
<SimpleLoadingScreen 
  onComplete={() => console.log('Loading complete!')}
  duration={3000}
/>

// Advanced loading
<AdvancedLoadingScreen 
  onComplete={() => console.log('Loading complete!')}
  duration={3500}
/>
```

### Configuration

You can configure loading behavior in `src/config/loading.ts`:

```typescript
export const loadingConfig = {
  enabled: true,
  type: 'advanced', // 'simple' or 'advanced'
  duration: 3500,
  minDuration: 2000,
  showOnlyOnFirstVisit: false
};
```

## 🎛️ Customization

### Duration
Control how long the loading screen appears:
```tsx
<SimpleLoadingScreen duration={2000} /> // 2 seconds
<AdvancedLoadingScreen duration={4000} /> // 4 seconds
```

### Callbacks
Handle loading completion:
```tsx
<SimpleLoadingScreen 
  onComplete={() => {
    // Redirect, show content, etc.
    console.log('Loading finished!');
  }}
/>
```

## 🎨 Styling

### Simple Loading Screen
- Uses CSS-in-JS for styling
- Easily customizable gradients and colors
- Mobile-first responsive design

### Advanced Loading Screen
- Complex morphing backgrounds
- Multiple animation layers
- Advanced particle effects
- SVG-based circular progress

## 📱 Responsive Design

Both loading screens are fully responsive:
- **Desktop**: Full-size animations and effects
- **Mobile**: Optimized animations and smaller elements
- **Tablet**: Adaptive sizing

## 🔧 Technical Details

### Performance
- **Simple**: ~5KB gzipped, pure CSS animations
- **Advanced**: ~8KB gzipped, complex animations

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox support required
- CSS animations and transforms support

## 🎪 Demo

Visit `/loading-demo` to see both loading screens in action and compare their features.

## 🛠️ Development

### Adding New Loading Screens
1. Create component in `src/components/ui/`
2. Add to `src/components/index.ts`
3. Update `FxotaryLayout.tsx` if needed
4. Add configuration options

### Animation Guidelines
- Use CSS transforms for better performance
- Implement entrance/exit animations
- Include loading progress feedback
- Ensure mobile responsiveness

## 🎯 Best Practices

1. **Duration**: Keep loading times realistic (2-4 seconds)
2. **Progress**: Always show progress indication
3. **Accessibility**: Include appropriate ARIA labels
4. **Performance**: Optimize animations for 60fps
5. **Fallbacks**: Handle loading failures gracefully

## 🐛 Troubleshooting

### Common Issues
- **Logo not showing**: Check logo path in `/public/images/`
- **Animations not smooth**: Verify CSS transform support
- **Loading too fast**: Increase `minDuration` in config
- **Mobile issues**: Test responsive breakpoints

### Debug Mode
Enable debug logging by setting `NODE_ENV=development`.