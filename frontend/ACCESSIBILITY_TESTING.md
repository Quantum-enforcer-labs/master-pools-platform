# Accessibility Testing Guide

## Quick Start Testing

### 1. Keyboard Navigation

- [ ] Tab through all interactive elements
- [ ] Check focus indicators are visible
- [ ] Verify Tab order is logical (left to right, top to bottom)
- [ ] Test form submission with Enter key
- [ ] Test modal dialogs open/close with Escape
- [ ] Verify skip links work on Tab

**Command to test:**

```bash
# Use browser dev tools
# 1. Open DevTools (F12)
# 2. Go to Lighthouse > Accessibility
# 3. Run audit
```

### 2. Screen Reader Testing

#### Using NVDA (Windows, Free)

1. Download: https://www.nvaccess.org/download/
2. Open page and turn on NVDA
3. Navigate with arrow keys
4. Check:
   - Page title is announced
   - Headings structure is correct
   - Images have descriptive alt text
   - Form labels are associated
   - Buttons are announced correctly

#### Using JAWS (Windows, Paid)

- Similar to NVDA but more comprehensive

#### Using VoiceOver (Mac, Free)

1. System Preferences > Accessibility > VoiceOver
2. Enable VoiceOver
3. Use VO+Arrow keys to navigate
4. Check same items as NVDA

### 3. Color Contrast Testing

Use WebAIM Contrast Checker:

- https://webaim.org/resources/contrastchecker/

Run automated check:

```bash
# Using Lighthouse
# DevTools > Lighthouse > Accessibility
```

### 4. Reduced Motion Testing

**Manual testing:**

1. System Settings > Accessibility > Display > Reduce motion
2. Reload website
3. Verify animations are disabled or minimal

**In code:**

```javascript
// Check if working
const prefersReduced = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
console.log("Reduced motion:", prefersReduced);
```

### 5. Mobile Accessibility

#### Android

1. Enable TalkBack: Settings > Accessibility > TalkBack
2. Test touch navigation
3. Check focus indicators

#### iOS

1. Enable VoiceOver: Settings > Accessibility > VoiceOver
2. Test gesture navigation
3. Check focus indicators

### 6. Browser DevTools Testing

#### Chrome/Edge

1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Check "Accessibility" option
4. Run audit
5. Review issues

#### Firefox

1. Open DevTools (F12)
2. Go to Accessibility panel
3. Review accessibility tree
4. Check for issues

### 7. Automated Testing Commands

```bash
# Run accessibility audit
npm run audit

# Check TypeScript types
npm run typecheck

# Check for common issues with axe DevTools
# Install Chrome Extension: Axe DevTools
# Run scan on each page
```

## Testing Checklist

### Perceivable

- [ ] Images have alt text
- [ ] Text has sufficient color contrast (4.5:1 minimum)
- [ ] Content is readable without colors alone
- [ ] Video has captions
- [ ] Text can be resized 200% without loss

### Operable

- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] Tab order is logical
- [ ] No keyboard trap
- [ ] Skip links work
- [ ] No auto-playing audio/video
- [ ] Touch targets are 44x44px minimum

### Understandable

- [ ] Page purpose is clear
- [ ] Link text is descriptive
- [ ] Form labels are clear
- [ ] Error messages are helpful
- [ ] Page language is specified
- [ ] Consistent navigation

### Robust

- [ ] Valid HTML
- [ ] ARIA used correctly
- [ ] Semantic HTML where possible
- [ ] No accessibility conflicts
- [ ] Works with assistive technology

## Testing Tools

### Browser Extensions

- Axe DevTools (Chrome, Firefox, Edge)
- WAVE (Chrome, Firefox, Edge)
- Lighthouse (Chrome)
- ARIA DevTools (Chrome)

### Online Tools

- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- axe-core: https://www.deque.com/axe/core/
- WAVE Online: https://wave.webaim.org/
- Lighthouse CI: https://github.com/GoogleChrome/lighthouse-ci

### Command Line Tools

```bash
# Install globally
npm install -g @axe-core/cli
npm install -g lighthouse

# Run tests
axe https://masterpools.co.zw
lighthouse https://masterpools.co.zw --view
```

## Common Issues and Fixes

### Empty Alt Text

**Issue:** Images have `alt=""` or missing alt
**Fix:** Add descriptive alt text that conveys image meaning

```tsx
// Bad
<img src="pool.jpg" alt="" />

// Good
<img src="pool.jpg" alt="Luxury infinity pool with city view" />
```

### Missing Focus Indicators

**Issue:** Can't see which element has focus
**Fix:** Use CSS focus-visible styles

```css
button:focus-visible {
  outline: 3px solid blue;
  outline-offset: 2px;
}
```

### Low Color Contrast

**Issue:** Text hard to read
**Fix:** Check contrast ratio >= 4.5:1

```css
/* Bad: #666 on #fff = 5.92:1 - too low */
color: #666;
background: #fff;

/* Good: #333 on #fff = 12.63:1 */
color: #333;
background: #fff;
```

### Icon-Only Buttons

**Issue:** Icon buttons unclear
**Fix:** Add aria-label and title

```tsx
<button aria-label="Search" title="Search">
  <SearchIcon />
</button>
```

### Missing Form Labels

**Issue:** Form inputs not labeled
**Fix:** Associate labels with inputs

```tsx
// Bad
<input type="email" placeholder="Email" />

// Good
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

## Performance Tips

### Image Optimization

- Use lazy loading: `loading="lazy"`
- Use responsive images: `srcset` and `sizes`
- Optimize WebP format for modern browsers
- Use thumbnail previews for lists
- Preload critical images

### Bundle Optimization

- Code split by route
- Lazy load non-critical components
- Tree-shake unused code
- Minimize CSS with Tailwind
- Drop console logs in production

### Rendering Optimization

- Use React.memo for expensive components
- Debounce scroll/resize listeners
- Virtualize long lists
- Preload critical fonts
- Async decode images

## Maintenance

### Regular Checks

- [ ] Weekly: Run Lighthouse audit
- [ ] Monthly: Test with screen reader
- [ ] Quarterly: Full accessibility audit
- [ ] Before release: Full testing checklist

### CI/CD Integration

Add to your GitHub Actions:

```yaml
- name: Accessibility Check
  run: npm run audit

- name: Lighthouse CI
  uses: treosh/lighthouse-ci-action@v9
```

## Resources

- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- Web Accessibility Initiative: https://www.w3.org/WAI/
- MDN Accessibility: https://developer.mozilla.org/en-US/docs/Web/Accessibility
- WebAIM Resources: https://webaim.org/
- Inclusive Components: https://inclusive-components.design/
