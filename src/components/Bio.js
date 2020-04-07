import React, { useState, useRef } from "react";
import { StaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";

import { rhythm } from "../utils/typography";
import styled from "styled-components";
import { externalLinkText } from "../utils/helpers";
import { useSpring, useTransition, animated, useChain } from "react-spring";

const NameComponent = styled.span`
  color: "#131316";
  text-decoration-color: #eb586f;
  text-decoration: underline;
  font-weight: bold;
`;

const BioText = styled(animated.div)`
  background-color: #f495a3;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    margin: 0;
    color: #131316;
    padding: 10px;
  }
`;

const OCLCLink = externalLinkText(
  "https://oclc.org",
  "@OCLC",
  "OCLC website URL",
  "bio"
);
const RootIncLink = externalLinkText(
  "https://rootinc.com",
  "@RootInc",
  "Root website URL",
  "bio"
);

function Bio() {
  const [show, set] = useState(false);
  const [enterText, setEnterText] = useState(null);

  const springRef = useRef();
  const textAnimation = useSpring({
    ref: springRef,
    from: { opacity: 0 },
    opacity: 1,
  });

  const transitionRef = useRef();
  const transitions = useTransition(show, null, {
    ref: transitionRef,
    from: { borderRadius: "50%", width: "150px", height: "150px" },
    enter: (item) => async (next, cancel) => {
      await new Promise((resolve) => setTimeout(resolve, 600));
      await next({
        borderRadius: "6%",
        width: "fit-content",
        height: "fit-content",
      });
    },
    onRest: (_) => setEnterText(true),
    config: { tension: 120, mass: 1 },
  });

  useChain([transitionRef, springRef]);

  return (
    <StaticQuery
      query={bioQuery}
      render={(data) => {
        const { author } = data.site.siteMetadata;
        const Name = () => <NameComponent>{author}</NameComponent>;
        const IntroText = () => (
          <animated.p style={textAnimation}>
            Hi, I'm <Name /> I build software for libraries <OCLCLink /> using
            JavaScript/React, Java, and Spring. I love working with modern web
            technologies and building helpful/accessible products that serve the
            needs of users. Previously <RootIncLink />.
          </animated.p>
        );

        /*const Test = setTimeout(() => {
          return <IntroText />;
        }, [800]);*/

        return (
          <main
            style={{
              borderRadius: "15px",
              padding: "1rem",
              maxWidth: "1000px",
              width: "100%",
              display: `flex`,

              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              marginBottom: rhythm(2.5),
            }}
          >
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                width: "200px",
                height: "200px",
                borderRadius: `100%`,
                //position:'absolute'
              }}
              imgStyle={{
                borderRadius: `50%`,
              }}
            />
            {transitions.map(({ item, key, props }) => (
              <BioText key={key} style={props}>
                {enterText ? <IntroText /> : null}
              </BioText>
            ))}
          </main>
        );
      }}
    />
  );
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/me.jpg/" }) {
      childImageSharp {
        fixed(width: 150, height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`;

export default Bio;
