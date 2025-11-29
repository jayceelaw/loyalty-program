'use client';
import { useState, useEffect, useRef } from 'react';
import TransactionMenu from "./TransactionMenu";
import PromotionMenu from "./PromotionMenu";
import EventMenu from "./EventMenu";
import { useAuth } from '../../context/AuthContext.jsx';
import { usePathname, useRouter } from 'next/navigation';
import styles from './NavigationBar.module.css';
import Link from 'next/link';
import Symbol from './Symbol';
import colors from '../constants/colors';
import Notifications from './Notifications';
import NotificationButton from './NotificationButton';

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [ isNotificationOpen, setIsNotificationOpen ] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRef = useRef(null);
  const settingDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);
  const { logout, currentInterface } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/user' },
    { label: 'QR', path: '/user/qr' },
    // { label: 'Events', path: '/event' },
  ];
  if (!EventMenu({})) {
    navItems.push({ label: 'Events', path: '/event' });
  }
  if (!PromotionMenu({})) {
    navItems.push({ label: 'Promotions', path: '/promotion' });
  }
  
  const specialItems = [];
  if (currentInterface === "cashier" || currentInterface === "manager" || currentInterface === "superuser" ) {
    specialItems.push({ label: 'Register User', path: '/user/register' });
  }
  if (currentInterface === "manager" || currentInterface === "superuser" ) {
    specialItems.push({ label: 'View Users', path: '/user/view' });
  }

  const extraNavPaths = ['/event', '/promotion', '/transaction'];

  // Helper to normalize paths for comparison (handle trailing slashes)
  const normalizePath = (path) => path.endsWith('/') ? path.slice(0, -1) : path;
  const isActive = (path) => {
    const curr_path = normalizePath(pathname || '');
    const target_path = normalizePath(path);

    // treat root "/" as dashboard same as "/user"
    if ((curr_path === '/' || curr_path === '') && target_path === '/user') return true;
    if (curr_path === target_path) return true;
    if (target_path === '/event' || target_path === '/promotion' || target_path === '/transaction') {
        return curr_path === target_path || curr_path.startsWith(target_path + '/');
    }
  };

  // Check if current page is in the main nav
  const isMainNavPage = navItems.some(item => normalizePath(item.path) === normalizePath(pathname))
                        || specialItems.some(item => normalizePath(item.path) === normalizePath(pathname))
                        || extraNavPaths.some(p => normalizePath(pathname).startsWith(normalizePath(p)));

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingDropdownRef.current && !settingDropdownRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
        
      }

      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };

    if (isUserMenuOpen || isNotificationOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen, isNotificationOpen]);

  useEffect(() => {
    const updateIndicator = () => {
      if (navRef.current && isMainNavPage) {
        const activeLink = navRef.current.querySelector(`.${styles.active}`);
        if (activeLink) {
          const { offsetLeft, offsetWidth } = activeLink;
          setIndicatorStyle({
            left: `${offsetLeft}px`,
            width: `${offsetWidth}px`,
            opacity: 1,
          });
        }
      } else {
        setIndicatorStyle({
          opacity: 0,
        });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [pathname, isMainNavPage]);

  return (
    <nav className={styles.navWrapper}>
      <div className={styles.navContainer}>
        {/* Main navigation pill */}
        <div className={styles.navPill} ref={navRef}>
          {/* Sliding white background indicator */}
          <div className={styles.activeIndicator} style={indicatorStyle} />

          {/* Navigation Tabs */}
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`${styles.navTab} ${ isActive(item.path) ? styles.active : '' }`}
            >
              {item.label}
            </Link>
          ))}

          <EventMenu className={`${styles.navTab} ${isActive('/event') ? styles.active : ''}`} />
          <PromotionMenu className={`${styles.navTab} ${isActive('/promotion') ? styles.active : ''}`} />
          <TransactionMenu className={`${styles.navTab} ${isActive('/transaction') ? styles.active : ''}`} />

          {/* Divider */}
          {specialItems.length > 0 && <div className={styles.divider} />}

          {/* role-dependent actions */}
          {specialItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`${styles.navTab} ${isActive(item.path) ? styles.active : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* User Menu - outside the pill */}
        <div className={styles.userMenuWrapper} ref={settingDropdownRef}>
          <button
            className={styles.button}
            onClick={() => {
              setIsUserMenuOpen(!isUserMenuOpen);
              setIsNotificationOpen(false);
            }}
            aria-label="User menu"
          >
            <Symbol
              name="Cog"
              size={24}
              colour={colors.black}
            />
          </button>

          {isUserMenuOpen && (
            <div className={styles.dropdown}>
              <Link
                href="/settings"
                className={styles.dropdownItem}
                onClick={() => setIsUserMenuOpen(false)}
              >
                <span className={styles.dropdownIcon}>⚙️</span>
                Settings
              </Link>
              <button
                className={`${styles.dropdownItem} ${styles.logoutButton}`}
                onClick={() => {
                  setIsUserMenuOpen(false);
                  logout();
                }}
              >
                <span className={styles.dropdownIcon}>🚪</span>
                Log out
              </button>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className={styles.userMenuWrapper} ref={notificationDropdownRef}>
          <NotificationButton  className={styles.button} toggle={
              () => {
              setIsNotificationOpen(!isNotificationOpen);
              setIsUserMenuOpen(false);
          }}/>
          
          {isNotificationOpen && (
            <div className={styles.dropdown}>
              <Notifications />
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}