import React from 'react';
import { Link } from 'gatsby'
import { getMediaUrl, parseDate } from '@util/urls'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import styles from './blogs.module.scss'

class Blogs extends React.Component {
    constructor(props) {
        super();

        this.state = {
            activeBlogs: props.blogs,
            filtered: false
        }

        this.handleClearClick = this.handleClearClick.bind(this);
    }

    removeActiveStyles(e){
        [...e.target.parentNode.childNodes].forEach(el => {
            el.style.color = '';
            el.style.backgroundColor = '';
        })
    }

    addActiveStyle(e) {
        e.target.style.color = '#eb7400';
        e.target.style.backgroundColor = 'rgba(0,0,0,0.1)';
    }

    handleFilterClick(e) {
        e.preventDefault();
        this.removeActiveStyles(e);
        this.addActiveStyle(e);

        const activeBlogs = this.props.blogs.filter(blog => {
            if (blog.node.tags.includes(e.target.innerHTML)) {
                return blog;
            }
        });

        this.setState({
            activeBlogs,
            filtered: true
        });
    }

    handleClearClick(e){
        e.preventDefault();
        this.removeActiveStyles(e);
        this.setState({
            activeBlogs: this.props.blogs,
            filtered: false
        });
    }

    renderTags(blogs) {
        const tags = blogs.map(blog => blog.node.tags);
        const flattenedArray = [].concat(...tags);
        return [...(new Set(flattenedArray))];
    }

    render() {
        return (
            <>
                <div className={styles.blogsFilters}>
                    {this.renderTags(this.props.blogs).map(item => {
                        return (
                            <a href="#" className={styles.blogsFilter} onClick={event => this.handleFilterClick(event)} key={item}>{item}</a>
                        )
                    })}
                    {this.state.filtered ? (
                        <a href="#" className={styles.blogsFilterClear} onClick={event => this.handleClearClick(event)}>
                            Clear
                            <FontAwesomeIcon icon={faTimes} />
                        </a>
                    ) : (
                        null
                    )}
                </div>
                <div className={styles.blogsContainer}>
                    {this.state.activeBlogs.map(({ node }) => {
                        return (
                            <Link to={`/blog/${node.slug}`} key={node.id} className={this.state.filtered ? `${styles.blogs} ${styles.blogsFiltered}` : styles.blogs}>
                                <img className={styles.blogsImage} src={getMediaUrl(node.image.file.thumbnail)} alt="" />
                                <div className={styles.blogsText}>
                                    <h2 className={styles.blogsTitle}>{node.title}</h2>
                                    <p className={styles.blogsIntroduction}>{node.introduction}</p>
                                </div>
                                <div className={styles.blogsMeta}>{parseDate(node.datePublished)}</div>
                            </Link>
                        )
                    })}
                </div>
            </>
        )
    }
}

export default Blogs;
