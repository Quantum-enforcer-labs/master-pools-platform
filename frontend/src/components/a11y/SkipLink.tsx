/**
 * Skip to main content link for keyboard navigation
 * Hidden visually but available to screen readers and keyboard users
 */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      style={{
        position: "absolute",
        top: "-40px",
        left: "0",
        zIndex: 9999,
        padding: "8px 16px",
        background: "var(--color-primary-600)",
        color: "#fff",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: 600,
        borderRadius: "0 0 4px 0",
      }}
      onFocus={(e) => {
        e.currentTarget.style.top = "0";
      }}
      onBlur={(e) => {
        e.currentTarget.style.top = "-40px";
      }}
    >
      Skip to main content
    </a>
  );
}
