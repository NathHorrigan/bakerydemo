import React from 'react';
import Header from '@components/header';
import StickyNav from '@components/sticky-nav';
import Footer from '@components/footer';

import styles from './index.module.scss'
import './reset.css';


const primaryNav = [
    { label: 'Breads', url: '/breads/' },
    { label: 'Locations', url: '/locations/' },
    { label: 'Blog', url: '/blog/' },
    // { label: 'Gallery', url: '/gallery/' },
    { label: 'Contact us', url: '/contact-us/' },
    { label: 'About', url: '/about/' }
]

export default ({ children }) => (
    <div className={styles.page}>
        <Header links={primaryNav} />
        <StickyNav links={primaryNav} />
        <div>
            {children}
        </div>
        <Footer />
    </div>
);
