import React from "react";

/**
 * Notification — displays a dismissible success or error banner.
 *
 * Props:
 *  - type    : "success" | "error"
 *  - message : string
 *  - onClose : () => void
 */
function Notification({ type, message, onClose }) {
  return (
    <div className={`notification notification-${type}`} role="alert">
      <span className="notification-icon">
        {type === "success" ? "✅" : "❌"}
      </span>
      <span className="notification-message">{message}</span>
      <button
        id="close-notification-btn"
        className="notification-close"
        onClick={onClose}
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  );
}

export default Notification;
