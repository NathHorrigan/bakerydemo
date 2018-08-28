import React from 'react';
import Header from '@components/header';
import StickyNav from '@components/sticky-nav';

import styles from './index.module.scss'
import './reset.css';


const primaryNav = [
    { label: 'Breads', url: '/breads/' },
    { label: 'Locations', url: '/locations/' },
    { label: 'Blog', url: '/blog/' }
]

export default ({ children }) => (
    <div>
        <div className={styles.page}>
            <Header links={primaryNav} />
            <StickyNav links={primaryNav} />
            <div>
                { children() }
            </div>
        </div>
    </div>
);
