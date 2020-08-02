import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import calendarIcon from "./../img/icons/calendar.svg";
import PreviewCompatibleImage from "./preview-compatible-image";
import styled from "styled-components";
import {
  MetaIcon,
  MetaContainer,
  MetaItemDetail,
  MetaItemTerm,
  MetaItemWrapper,
  PostList,
  PostExcerpt,
  PostListItem
} from "../utils/styled-components";

const BlogHeader = styled.h2`
  margin-bottom: 0;
`;

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <PostList>
        {posts.map(({ node: post }) => (
          <PostListItem key={post.fields.slug} className={post.frontmatter.featuredimage ? "has-image" : ""}>
            {post.frontmatter.featuredimage && (
              <div>
                <PreviewCompatibleImage
                  imageInfo={{
                    image: post.frontmatter.featuredimage,
                    alt: `${post.frontmatter.title}`
                  }}
                />
              </div>
            )}
            <div>
              <BlogHeader className="h3">
                <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
              </BlogHeader>
              <MetaContainer>
                <MetaItemWrapper>
                  <MetaItemTerm>
                    <MetaIcon iconid={calendarIcon.id} id="post-date" title="Post Created" />
                  </MetaItemTerm>
                  <MetaItemDetail>{post.frontmatter.date}</MetaItemDetail>
                </MetaItemWrapper>
              </MetaContainer>
              {post.frontmatter.description && <PostExcerpt>{post.frontmatter.description}</PostExcerpt>}
            </div>
          </PostListItem>
        ))}
      </PostList>
    );
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                description
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 335, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
);
