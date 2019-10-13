import { graphql, StaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: inherit;
  display: flex;
  color: inherit;
  flex-direction: column;

  p {
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const BioNameAndPhoto = styled.div`
  display: flex;
  margin-bottom: 10px;

  div img {
    border-radius: 6px;
    min-width: 70px;
  }

  div:first-child {
    margin-right: 10px;
  }

  div:last-child {
    margin: auto 0;

    div:first-child {
      font-size: 20px;
      font-weight: bold;
    }

    div:last-child {
      color: ${props => props.theme.bio.subText};
    }
  }
`;

const BioSocial = styled.div`
  display: flex;
  width: 100%;

  a {
    display: block;
    margin-bottom: 5px;
    cursor: pointer;
    color: ${props => props.theme.bio.socialButton};
  }

  span {
    margin-right: 5px;
  }
`;

const Bio = () => {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const {
          authorNickName,
          authorFullName,
          authorDescription,
          social,
        } = data.site.siteMetadata;
        return (
          <Container>
            <BioNameAndPhoto>
              <Image
                alt={authorNickName}
                fixed={data.avatar.childImageSharp.fixed}
              />
              <div>
                <div>{authorNickName}</div>
                <div>{authorFullName}</div>
              </div>
            </BioNameAndPhoto>
            <p>{authorDescription}</p>
            <BioSocial>
              {social && (
                <React.Fragment>
                  {social.github && (
                    <a
                      href={social.github}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span className="fa-stack">
                        <i className="fas fa-circle fa-stack-2x" />
                        <i className="fab fa-github fa-stack-1x fa-inverse fa-lg" />
                      </span>
                    </a>
                  )}
                  {social.email && (
                    <a href={`mailto:${social.email}`}>
                      <div>
                        <span className="fa-stack">
                          <i className="fas fa-circle fa-stack-2x" />
                          <i className="fas fa-envelope fa-stack-1x fa-inverse" />
                        </span>
                      </div>
                    </a>
                  )}
                </React.Fragment>
              )}
            </BioSocial>
          </Container>
        );
      }}
    />
  );
};

const bioQuery = graphql`
  query {
    avatar: file(absolutePath: { regex: "/shane.jpg/" }) {
      childImageSharp {
        fixed(width: 70, height: 70) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        authorFullName
        authorNickName
        authorDescription
        social {
          email
          github
        }
      }
    }
  }
`;

export default Bio;
