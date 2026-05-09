# Quick Reference - Using A11y & Performance Features

## Accessibility Utilities

### Detecting Motion Preferences

```typescript
import { prefersReducedMotion, getAnimationDuration } from "@/utils/a11y";

// Check if user prefers reduced motion
if (prefersReducedMotion()) {
  // Disable animations
}

// Get safe animation duration
const duration = getAnimationDuration(0.3); // Returns 0 if motion reduced, else 0.3
```

### Screen Reader Announcements

```typescript
import { announce } from "@/utils/a11y";

// Announce to screen readers
announce("Project saved successfully");
announce("Error loading projects", "assertive");
```

### Creating Skip Links

```typescript
import { createSkipLink } from "@/utils/a11y";

// Create a skip link programmatically
const skipLink = createSkipLink("#main-content", "Skip to main content");
document.body.prepend(skipLink);
```

### Keyboard Shortcuts

```typescript
import { registerKeyboardShortcut } from "@/utils/a11y";

// Register Ctrl+S to save
const unregister = registerKeyboardShortcut(
  "s",
  () => {
    /* save */
  },
  { ctrlKey: true },
);

// Later, unregister
unregister();
```

## Image Optimization

### Using Optimized Images

```typescript
import OptimizedImage from '@/components/ui/Image';

// Basic usage
<OptimizedImage
  src="/images/pool.jpg"
  alt="Luxury pool"
  loading="lazy"
/>

// With responsive images
<OptimizedImage
  src="/images/pool.jpg"
  alt="Luxury pool"
  srcSet="/images/pool-small.jpg 640w, /images/pool-large.jpg 1200w"
  sizes="(max-width: 640px) 100vw, 50vw"
  aspectRatio={16/9}
/>
```

### Image Optimization Utilities

```typescript
import {
  getWebPUrl,
  generateSrcSet,
  supportsWebP,
  preloadImage,
} from "@/utils/image-optimization";

// Check WebP support
const supportsWp = await supportsWebP();
const imageUrl = supportsWp ? getWebPUrl(url) : url;

// Generate responsive srcSet
const srcSet = generateSrcSet("/images/pool.jpg", [640, 1024, 1440]);

// Preload critical images
preloadImage("/images/hero.jpg");
```

## Accessibility Attributes

### Icon-Only Buttons

```tsx
// Always add aria-label for icon buttons
<button aria-label="Search projects" title="Search">
  <SearchIcon />
</button>

// Better: Include both aria-label and title
<button
  aria-label="Close dialog"
  title="Close (Escape)"
  onClick={close}
>
  <X />
</button>
```

### Image Alt Text

```tsx
// Good: Descriptive alt text
<img
  src="/pool.jpg"
  alt="Infinity pool overlooking the city with natural lighting"
  loading="lazy"
/>

// For decorative images
<img
  src="/divider.svg"
  alt=""
  aria-hidden="true"
/>

// For gallery thumbnails
{gallery.map((img, i) => (
  <img
    key={i}
    src={img.thumbnail}
    alt={img.alt || `Gallery image ${i + 1}`}
    loading="lazy"
  />
))}
```

### Form Labels

```tsx
// Always associate labels with inputs
<label htmlFor="email">Email Address</label>
<input id="email" type="email" required />

// For groups
<fieldset>
  <legend>Pool Type</legend>
  <input id="residential" type="radio" name="type" />
  <label htmlFor="residential">Residential</label>
</fieldset>
```

## CSS Accessibility

### Screen Reader Only Content

```css
/* Hide visually but available to screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Use in HTML */
<span class="sr-only">Loading projects...</span>
```

### Focus Indicators

```css
/* Automatic with our CSS */
button:focus-visible {
  outline: 3px solid var(--color-secondary-500);
  outline-offset: 2px;
}
```

### Respecting Motion Preferences

```css
/* Animations are automatically disabled if user prefers reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Testing Shortcuts

### Keyboard Testing

```
Tab              - Navigate forward
Shift + Tab      - Navigate backward
Enter            - Activate button/submit form
Space            - Toggle checkbox/radio
Escape           - Close modal/cancel
Arrow Keys       - Navigate menus/carousels
```

### Screen Reader Testing

```
NVDA (Windows):  Alt + NumPad Plus - Start/stop
JAWS (Windows):  Ctrl + Alt + N - Start/stop
VoiceOver (Mac): Cmd + F5 - Enable in System Preferences
TalkBack (Android): Volume Keys long-press
```

### Check Motion Preferences

```javascript
// In browser console
window.matchMedia("(prefers-reduced-motion: reduce)").matches;
```

## Performance Best Practices

### Lazy Loading Images

```tsx
// Always use lazy loading for images
<img src="/image.jpg" alt="..." loading="lazy" decoding="async" />

// For list items, use thumbnails
<img
  src={project.coverImage?.thumbnail || project.coverImage?.url}
  alt={project.title}
  loading="lazy"
  decoding="async"
/>
```

### Code Splitting

Vite automatically splits code into:

- `vendor-react.js` - React core
- `vendor-router.js` - TanStack Router
- `vendor-query.js` - React Query
- `vendor-ui.js` - Animations & icons
- `vendor-forms.js` - Form handling

No manual action needed!

### Image Formats

```tsx
// For best performance
<img
  srcSet="/image-small.webp 640w, /image-large.webp 1200w"
  fallback="/image-small.jpg 640w, /image-large.jpg 1200w"
  sizes="(max-width: 640px) 100vw, 50vw"
  alt="..."
  loading="lazy"
  decoding="async"
/>
```

## Common Patterns

### Accessible Modal

```tsx
<div
  role="dialog"
  aria-labelledby="dialog-title"
  aria-modal="true"
  aria-hidden={!isOpen}
>
  <h2 id="dialog-title">Confirm Action</h2>
  <p>Are you sure?</p>
  <button>Cancel</button>
  <button>Confirm</button>
</div>
```

### Accessible Toast/Alert

```tsx
<div role="alert" aria-live="assertive" aria-atomic="true">
  {message}
</div>
```

### Accessible Carousel

```tsx
<div role="region" aria-label="Image carousel">
  <img alt={allImages[activeImg].alt} src={...} />
  <button aria-label="Previous image">←</button>
  <button aria-label="Next image">→</button>
  <p aria-live="polite">
    Image {activeImg + 1} of {allImages.length}
  </p>
</div>
```

## Debugging

### Check Alt Text

```javascript
// In console
document.querySelectorAll("img:not([alt])").length;
```

### Find Focus Issues

```javascript
// In console - adds red border to focused element
document.addEventListener(
  "focus",
  (e) => {
    e.target.style.outline = "2px solid red";
  },
  true,
);
```

### Test Reduced Motion

```javascript
// Simulate reduced motion preference
const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
console.log(mediaQuery.matches); // true = reduced motion enabled
```

## Resources

- Accessibility utilities: `src/utils/a11y.ts`
- Image optimization: `src/utils/image-optimization.ts`
- Component examples: `src/components/a11y/`
- Complete testing guide: `ACCESSIBILITY_TESTING.md`
- Implementation details: `IMPLEMENTATION_SUMMARY.md`

---

**Need help?** Check the testing guide or consult WCAG 2.1 guidelines at https://www.w3.org/WAI/WCAG21/quickref/
