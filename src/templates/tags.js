import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import BlogRoll from "../components/blog-roll";

class TagRoute extends React.Component {
  render() {
    const tag = this.props.pageContext.tag;
    const totalCount = this.props.data.allMarkdownRemark.totalCount;
    const tagHeader = `${totalCount} post${totalCount === 1 ? "" : "s"} tagged with “${tag}”`;

    return (
      <Layout>
        <section>
          <SEO title={tag} />
          <h1 className="h2">{tagHeader}</h1>
          <BlogRoll />
        </section>
      </Layout>
    );
  }
}

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
