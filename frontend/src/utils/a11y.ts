/**
 * Accessibility utilities for keyboard navigation, focus management, and ARIA helpers
 */

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Get animation settings based on user preferences
 */
export const getAnimationDuration = (normal: number = 0.3): number => {
  return prefersReducedMotion() ? 0 : normal;
};

/**
 * Trap focus within a container (for modals, popovers)
 */
export const trapFocus = (e: KeyboardEvent, container: HTMLElement) => {
  if (e.key !== "Tab") return;

  const focusableElements = container.querySelectorAll(
    "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
  );
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[
    focusableElements.length - 1
  ] as HTMLElement;

  if (e.shiftKey) {
    if (document.activeElement === firstElement) {
      lastElement?.focus();
      e.preventDefault();
    }
  } else {
    if (document.activeElement === lastElement) {
      firstElement?.focus();
      e.preventDefault();
    }
  }
};

/**
 * Create a skip link for keyboard navigation
 */
export const createSkipLink = (
  href: string,
  text: string = "Skip to main content",
): HTMLAnchorElement => {
  const link = document.createElement("a");
  link.href = href;
  link.textContent = text;
  link.className = "sr-only focus:not-sr-only";
  link.style.position = "absolute";
  link.style.top = "-40px";
  link.style.left = "0";
  link.style.zIndex = "99";
  link.style.padding = "8px";
  link.style.background = "var(--color-primary-600)";
  link.style.color = "white";
  link.onfocus = () => {
    link.style.top = "0";
  };
  link.onblur = () => {
    link.style.top = "-40px";
  };
  return link;
};

/**
 * Announce a message to screen readers
 */
export const announce = (
  message: string,
  priority: "polite" | "assertive" = "polite",
) => {
  const announcement = document.createElement("div");
  announcement.setAttribute("role", "status");
  announcement.setAttribute("aria-live", priority);
  announcement.className = "sr-only";
  announcement.textContent = message;
  document.body.appendChild(announcement);
  setTimeout(() => announcement.remove(), 1000);
};

/**
 * Check if element is in viewport
 */
export const isInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Handle keyboard shortcuts
 */
export const registerKeyboardShortcut = (
  key: string,
  handler: () => void,
  options?: { ctrlKey?: boolean; shiftKey?: boolean; altKey?: boolean },
) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    const modifiersMatch =
      (options?.ctrlKey ?? false) === e.ctrlKey &&
      (options?.shiftKey ?? false) === e.shiftKey &&
      (options?.altKey ?? false) === e.altKey;

    if (e.key === key && modifiersMatch) {
      e.preventDefault();
      handler();
    }
  };

  document.addEventListener("keydown", handleKeyDown);
  return () => document.removeEventListener("keydown", handleKeyDown);
};
