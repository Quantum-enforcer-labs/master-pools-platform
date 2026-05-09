#!/bin/bash
# Performance & Accessibility Audit Script
# Run this to check for common issues

echo "======================================================================"
echo "ACCESSIBILITY & PERFORMANCE AUDIT"
echo "======================================================================"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check for empty alt text
echo ""
echo -e "${YELLOW}Checking for empty alt text...${NC}"
EMPTY_ALT=$(find src -name "*.tsx" -o -name "*.ts" | xargs grep -l 'alt=""' 2>/dev/null | wc -l)
if [ $EMPTY_ALT -gt 0 ]; then
  echo -e "${RED}✗ Found ${EMPTY_ALT} files with empty alt text${NC}"
  find src -name "*.tsx" -o -name "*.ts" | xargs grep -n 'alt=""' 2>/dev/null
else
  echo -e "${GREEN}✓ No empty alt text found${NC}"
fi

# Check for missing aria-labels on icon buttons
echo ""
echo -e "${YELLOW}Checking for icon buttons without aria-labels...${NC}"
MISSING_ARIA=$(find src -name "*.tsx" | xargs grep -l '<button' | wc -l)
echo -e "${YELLOW}Found ${MISSING_ARIA} files with buttons - review for missing aria-labels${NC}"

# Check for lazy loading on images
echo ""
echo -e "${YELLOW}Checking for lazy loading on images...${NC}"
LAZY_IMGS=$(find src -name "*.tsx" | xargs grep 'loading="lazy"' | wc -l)
echo -e "${GREEN}✓ Found ${LAZY_IMGS} images with lazy loading${NC}"

# Check CSS for focus styles
echo ""
echo -e "${YELLOW}Checking for focus-visible styles...${NC}"
FOCUS_STYLES=$(grep -c "focus-visible" src/index.css || echo 0)
if [ $FOCUS_STYLES -gt 0 ]; then
  echo -e "${GREEN}✓ Focus styles configured${NC}"
else
  echo -e "${RED}✗ No focus-visible styles found${NC}"
fi

# Check for prefers-reduced-motion
echo ""
echo -e "${YELLOW}Checking for motion preference support...${NC}"
MOTION=$(grep -c "prefers-reduced-motion" src/index.css || echo 0)
if [ $MOTION -gt 0 ]; then
  echo -e "${GREEN}✓ prefers-reduced-motion supported${NC}"
else
  echo -e "${RED}✗ No prefers-reduced-motion support${NC}"
fi

# Check build size
echo ""
echo -e "${YELLOW}Build size analysis...${NC}"
if [ -d "dist" ]; then
  BUNDLE_SIZE=$(du -sh dist | cut -f1)
  echo -e "${GREEN}✓ Build size: ${BUNDLE_SIZE}${NC}"
  
  # JS bundle size
  JS_SIZE=$(find dist -name "*.js" -exec du -c {} + 2>/dev/null | tail -1 | cut -f1)
  echo "  JavaScript: $JS_SIZE"
  
  # CSS bundle size
  CSS_SIZE=$(find dist -name "*.css" -exec du -c {} + 2>/dev/null | tail -1 | cut -f1)
  echo "  CSS: $CSS_SIZE"
else
  echo -e "${YELLOW}No dist folder found - run 'npm run build' first${NC}"
fi

echo ""
echo "======================================================================"
echo "Audit complete!"
echo "======================================================================"
