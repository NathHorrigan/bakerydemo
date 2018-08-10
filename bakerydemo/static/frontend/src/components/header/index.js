import React from 'react'
import Link from 'gatsby-link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import styles from './header.module.scss'

class Header extends React.Component {
    state = { query: null }

    render() {
        return(
            <header className={styles.header}>
                <div className={styles.container}>

                    <section className={styles.headerTop}>
                        <Link className={styles.titleLink} to='/'>The Wagtail Bakery</Link>
                        <form className={styles.search} onSubmit={event => this.submitSearch(event)}>
                            <input
                                onChange={event => this.updateQuery(event.target.value)}
                                className={styles.searchBar}
                                placeholder="Search the site..." />
                            <FontAwesomeIcon
                                className={styles.searchIcon}
                                icon={faSearch}
                                onClick={() => this.submitSearch()} />
                        </form>
                    </section>

                    <nav className={styles.nav}>
                        { (this.props.links || []).map(link => (
                            <Link
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
