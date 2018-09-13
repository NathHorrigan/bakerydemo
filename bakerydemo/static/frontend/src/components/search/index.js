import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import debounce from 'debounce-promise'
import { baseUrl } from '../../util/urls'
import { search } from 'gatsby-source-wagtail'
import styles from './search.module.scss'
import { push } from "gatsby-link"

export default class SearchBar extends Component {
  state = {query: '', results: []}

  constructor (props) {
    super(props)
    this.search = debounce(this.search, 200)
  }

  render () {
    return (
      <form className={styles.search} onSubmit={() => this.search()}>
        <input
          onBlur={() => this.clear()}
          onChange={event => this.triggerSearch(event.target.value)}
          className={styles.searchBar}
          value={this.state.query}
          placeholder="Search the site..."/>

        <FontAwesomeIcon
          className={styles.searchIcon}
          icon={this.state.query.length ? faWindowClose : faSearch}
          onClick={() => this.clear()}/>

        {this.state.results.length ?
          <div className={styles.searchResultsContainer}>
            <div className={styles.searchResultsList}>
              {this.state.results.map(result => this.renderRow(result))}
            </div>
          </div>
          : null}
      </form>
    )
  }

  renderRow = result => {
    console.log(result)
    return (
      <div onMouseDown={() => push(result.urlPath)} className={styles.searchResultsItem}>
        <span className={styles.searchResultsItemTitle}>{limitString(result.title)}</span>
        <span className={styles.searchResultsItemType}>{limitString(result.type)}</span>
      </div>
    )
  }

  triggerSearch = query => this.setState({query}, () => this.search())

  search = () => search(baseUrl, this.state.query, {})
    .then(results => this.setState({results}))

  clear = () => this.setState({query: '', results: []})

}

const limitString = str => (str.length > 27)
  ? str.substring(0, 27) + '...'
  : str