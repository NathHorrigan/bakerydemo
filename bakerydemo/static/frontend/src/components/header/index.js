import React from 'react'
import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons' // Missing: faSearch
import styles from './header.module.scss'

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            query: null,
            mobileNavVisible: false,
        };

        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu(){
        if (window.innerWidth < 900) {
            this.setState({
                mobileNavVisible: !this.state.mobileNavVisible
            })
        }
    }

    render() {
        return(
            <header className={styles.header}>
                <div className={`${styles.container} ${styles.headerContainer}`}>

                    <section className={styles.headerTop}>
                        <Link className={styles.titleLink} to='/'>The Wagtail Bakery</Link>
                        {/*<form className={styles.search} onSubmit={event => this.submitSearch(event)}>*/}
                            {/*<input*/}
                                {/*onChange={event => this.updateQuery(event.target.value)}*/}
                                {/*className={styles.searchBar}*/}
                                {/*placeholder="Search the site..." />*/}
                            {/*<FontAwesomeIcon*/}
                                {/*className={styles.searchIcon}*/}
                                {/*icon={faSearch}*/}
                                {/*onClick={() => this.submitSearch()} />*/}
                        {/*</form>*/}
                    </section>

                    <button className={styles.headerMobileNavToggle} onClick={this.toggleMenu}>
                        <FontAwesomeIcon icon={faBars} color="white" size="3x" />
                    </button>

                    <nav className={this.state.mobileNavVisible ? `${styles.nav} ${styles.navVisible}` : styles.nav}>
                        { (this.props.links || []).map(link => (
                            <Link
                            onClick={this.toggleMenu}
                            className={styles.navLink}
                            activeClassName={styles.navLinkActive}
                            key={link.url}
                            to={link.url}>
                                    {link.label}
                            </Link>
                        )) }
                    </nav>

                </div>
            </header>
        )
    }

    updateQuery = query => {
        this.setState({ query })
    }

    submitSearch = event => {
        if (event) {
            event.preventDefault()
        }
        alert(`Searching for: ${this.state.query}`)
    }

}

export default Header
