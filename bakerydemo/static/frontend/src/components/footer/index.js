import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'

import styles from './footer.module.scss';

export default () => (
    <footer className={styles.footer}>
        <div className={styles.footerSocialLinks}>
            <a href="https://github.com/wagtail/wagtail">
                <FontAwesomeIcon icon={faGithub} color="white" size="lg" />
            </a>
            <a href="https://twitter.com/wagtailcms">
                <FontAwesomeIcon icon={faTwitter} color="white" size="lg" />
            </a>
            <a href="https://wagtail.io/">
                <FontAwesomeIcon icon={faLink} color="white" size="lg" />
            </a>
        </div>
        <p className={styles.footerCopy}>Copyright <b>The Wagtail Bakery</b>, 2017. All rights reserved.</p>
        <p className={styles.footerCopy}>"If you read a lot you're well read / If you eat a lot you're well bread."</p>
    </footer>
)
