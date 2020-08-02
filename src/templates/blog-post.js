import React from "react";
import { Link, graphql } from "gatsby";
import kebabCase from "lodash/kebabCase";
import Layout from "../components/layout";
import folderIcon from "./../img/icons/folder.svg";
import SEO from "../components/seo";
import calendarIcon from "./../img/icons/calendar.svg";
import styled from "styled-components";
import PreviewCompatibleImage from "../components/preview-compatible-image";
import {
  MetaIcon,
  MetaContainer,
  MetaItemDetail,
  MetaItemDetailList,
  MetaItemTerm,
  MetaItemWrapper
} from "../utils/styled-components";

const Description = styled.blockquote`
  background: var(--color-secondary-l4);
  margin: var(--scale-4) 0;
  padding: var(--scale-3) var(--scale-4);
  font-style: italic;
`;

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark;
  const { title, description, tags, featuredimage } = post.frontmatter;
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={title} description={description || post.excerpt} />
      <article>
        <header>
          <h1>{title}</h1>
          <MetaContainer>
            <MetaItemWrapper>
              <MetaItemTerm>
                <MetaIcon iconid={calendarIcon.id} id="post-date" title="Post Created" />
              </MetaItemTerm>
              <MetaItemDetail>{post.frontmatter.date}</MetaItemDetail>
            </MetaItemWrapper>
            {tags && tags.length ? (
              <MetaItemWrapper>
                <MetaItemTerm>
                  <MetaIcon iconid={folderIcon.id} id="post-date" title="Post Categories" />
                </MetaItemTerm>
                <MetaItemDetail>
                  <MetaItemDetailList>
                    {tags.map(tag => (
                      <li key={tag + `tag`}>
                        <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                      </li>
                    ))}
                  </MetaItemDetailList>
                </MetaItemDetail>
              </MetaItemWrapper>
            ) : null}
          </MetaContainer>
          <PreviewCompatibleImage
            imageInfo={{
              image: featuredimage,
              alt: `${title}`
            }}
          />
          <Description>{description}</Description>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 1920, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
