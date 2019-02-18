import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'
import { SwitchExample } from '../components/SwitchExample';
import styled from "styled-components";


const Item = styled.div`
  padding:0.5em;
  display:flex;
  flex-direction:column;
`
const Box = styled(Item)`
  width:100%;
  @media screen and (min-width:30em) {
    width:70%;
  height:40%;
  }
`

const Top = styled(Box)`
  background-color:#542344;
`

const Bottom = styled(Box)`
  background-color:#808080;
  @media screen and (min-width:30em) {
    transform:translate(120px, 12%);
  }
`

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const post = data.allMarkdownRemark.edges[0].node
    const postTitle = post.frontmatter.title || post.fields.slug
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Top>
          <SwitchExample />
          <SEO
            title="All posts"
            keywords={[`blog`, `gatsby`, `javascript`, `react`]}
          />
          <Bio />
        </Top>
        <Bottom>
          <h1>Latest Post</h1>
          <Item key={post.fields.slug}>
            <h3
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link style={{ boxShadow: `none` }} to={post.fields.slug}>
                {postTitle}
              </Link>
            </h3>
            <small>{post.frontmatter.date}</small>
            <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </Item>
        </Bottom>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`