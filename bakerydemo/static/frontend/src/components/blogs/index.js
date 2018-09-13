import React from 'react';
import { Link } from 'gatsby'
import { getMediaUrl, parseDate } from '@util/urls'

import styles from './blogs.module.scss'

class Blogs extends React.Component {
    constructor(props) {
        super();

        this.state = {
            activeBlogs: props.blogs,
            filtered: false
        }
    }

    handleFilterClick(e) {
        e.preventDefault();
        [...e.target.parentNode.childNodes].forEach(el => {
            el.style.color = '';
            el.style.backgroundColor = '';
        })
        e.target.style.color = '#eb7400';
        e.target.style.backgroundColor = 'rgba(0,0,0,0.1)';

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
                            <a href="#" onClick={event => this.handleFilterClick(event)} key={item}>{item}</a>
                        )
                    })}
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
