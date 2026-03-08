'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const NAV_SECTIONS = [
  {
    label: 'Verticals',
    href: '/verticals',
    items: [
      { label: 'AI Governance', href: '/verticals/governance' },
      { label: 'Manufacturing', href: '/verticals/manufacturing' },
      { label: 'Financial Services', href: '/verticals/financial-services' },
      { label: 'Healthcare', href: '/verticals/healthcare' },
      { label: 'Logistics', href: '/verticals/logistics' },
      { label: 'Technology', href: '/verticals/technology' },
      { label: 'All Verticals', href: '/verticals' },
    ],
  },
  {
    label: 'Regions',
    href: '/regions',
    items: [
      { label: 'European Union', href: '/regions/european-union' },
      { label: 'United States', href: '/regions/united-states' },
      { label: 'United Kingdom', href: '/regions/united-kingdom' },
      { label: 'Singapore', href: '/regions/singapore' },
      { label: 'India', href: '/regions/india' },
      { label: 'All Regions', href: '/regions' },
    ],
  },
  {
    label: 'Ecosystem',
    href: '/entities',
    items: [
      { label: 'Aureya', href: '/entities/aureya' },
      { label: 'AINEFF', href: '/entities/aineff' },
      { label: 'AINEF', href: '/entities/ainef' },
      { label: 'AINEG', href: '/entities/aineg' },
      { label: 'Frankmax', href: '/entities/frankmax' },
      { label: 'All Entities', href: '/entities' },
    ],
  },
];

const NAV_LINKS = [
  { label: 'Frameworks', href: '/essays' },
  { label: 'Products', href: '/products' },
  { label: 'Intelligence', href: '/intelligence' },
  { label: 'Rankings', href: '/rankings' },
  { label: 'Tracker', href: '/tracker' },
  { label: 'Newsletter', href: '/newsletter' },
];

export default function NavClient() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });

    // Generate animated background dots
    const bg = document.getElementById('animated-bg');
    if (bg && bg.childElementCount === 0) {
      for (let i = 0; i < 50; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;
        dot.style.animationDelay = `${Math.random() * 20}s`;
        dot.style.animationDuration = `${15 + Math.random() * 20}s`;
        bg.appendChild(dot);
      }
    }
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const revealEl = () => {
      document.querySelectorAll('.reveal').forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 130) el.classList.add('active');
      });
    };
    window.addEventListener('scroll', revealEl, { passive: true });
    revealEl();
    return () => window.removeEventListener('scroll', revealEl);
  }, []);

  const closeAll = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <Link href="/" className="nav__logo" onClick={closeAll}>
          andrew<span>franklin</span>leo
        </Link>

        <button
          className="nav__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        <ul className={`nav__links${menuOpen ? ' nav__links--open' : ''}`}>
          {/* Dropdown sections */}
          {NAV_SECTIONS.map((section) => (
            <li
              key={section.label}
              className="nav__dropdown"
              onMouseEnter={() => setOpenDropdown(section.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={section.href}
                onClick={(e) => {
                  // On mobile, toggle dropdown instead of navigating
                  if (window.innerWidth < 768) {
                    e.preventDefault();
                    setOpenDropdown(openDropdown === section.label ? null : section.label);
                  } else {
                    closeAll();
                  }
                }}
              >
                {section.label}
                <span className="nav__dropdown-arrow">&#9662;</span>
              </Link>
              {openDropdown === section.label && (
                <div className="nav__dropdown-menu">
                  {section.items.map((item) => (
                    <Link key={item.href} href={item.href} onClick={closeAll}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}

          {/* Direct links */}
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={closeAll}>{link.label}</Link>
            </li>
          ))}

          {/* Search */}
          <li>
            <Link href="/search" onClick={closeAll} aria-label="Search" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </Link>
          </li>

          {/* CTA */}
          <li>
            <Link href="/subscribe" className="nav__cta" onClick={closeAll}>Subscribe</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
