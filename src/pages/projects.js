import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'
import styled from "styled-components";

const Item = styled.div `
  padding:0.5em;
  display:flex;
  flex-direction:column;
`;
const Box = styled(Item) `
  width:100%;
`;

const ProjectsContainer = styled(Box) `
  height:100%;
  @media screen and (max-width:30em) {
    background-color:#D76D77;
  }
`;

class Projects extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const projects = data.allProjectsJson.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="projects list"
          keywords={[`javascript`, `react`, `rails`]}
        />
        <ProjectsContainer>
        <h1 style={{ marginTop:"1rem",
}}>Projects</h1>
        {projects.map(({ node }) => {
          const desc = node.desc
          const title = node.title
          const link = node.link
          return (
            <div key={node.title}>
              <h3
                style={{
                  marginTop:"1rem",
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <a href={link}  style={{ boxShadow: `none`, color:'#ffffff' }}>
                {title }
                </a>
              </h3>
              <p dangerouslySetInnerHTML={{ __html: desc }} />
            </div>
          )
        })}
          </ProjectsContainer>
      </Layout>
    )
  }
}

export default Projects

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allProjectsJson {
      edges {
        node {
          title
          link
          desc
        }
      }
    }
  }
`
