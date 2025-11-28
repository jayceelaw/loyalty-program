'use client';

import { useState, useRef } from 'react';
import MenuModal from './MenuModal';
import styles from './NavDropDownButton.module.css';

export default function NavDropDownButton({
  options,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  if (!options || options.length === 0) {
    return null;
  }

  const primaryOption = options[0];
  const dropdownOptions = options.slice(1);

  const handlePrimaryClick = () => {
    primaryOption.action();
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // If there are no dropdown options render like a normal nav tab (className expected to be styles.navTab)
  if (dropdownOptions.length === 0) {
    return (
      <button
        type="button"
        className={className}
        onClick={handlePrimaryClick}
        ref={buttonRef}
      >
        {primaryOption.symbol && <span className={styles.symbol}>{primaryOption.symbol}</span>}
        <span className={styles.text}>{primaryOption.text}</span>
      </button>
    );
  }

  // When dropdown exists: render primary button styled as nav tab + a minimal arrow (no white background / pill)
  return (
    <>
      <div ref={buttonRef} className={styles.inlineWrapper}>
        <button
          className={className}
          onClick={handlePrimaryClick}
          type="button"
        >
          {primaryOption.symbol && <span className={styles.symbol}>{primaryOption.symbol}</span>}
          <span className={styles.text}>{primaryOption.text}</span>
        </button>

        <button
          className={styles.arrowButton}
          onClick={handleDropdownClick}
          type="button"
          aria-expanded={isOpen}
        >
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <MenuModal
        options={dropdownOptions}
        isOpen={isOpen}
        onClose={handleClose}
        anchorRef={buttonRef}
        position="bottom-right"
      />
    </>
  );
}
