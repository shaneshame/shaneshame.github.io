import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0 10px 10px 10px;
  width: 100%;

  @media all and (min-width: 992px) {
    display: ${props => props.display || 'inline-block'};
    width: 25%;
  }
`;

const Cover = styled(Link)`
  background-image: url(${props => props.image});
  background-position: 50% 50%;
  background-size: cover;
  border-radius: 10px;
  display: inline-block;
  height: 100px;
  margin: 0 !important;
  width: 100%;

  &:hover {
    text-decoration: underline #fff;
  }

  div {
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: inherit;
    color: ${props => props.theme.recentpostitem.text};
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: flex-end;
    padding: 10px;

    p {
      font-weight: bold;
    }

    span {
      font-size: 12px;
    }
  }

  @media all and (min-width: 992px) {
    height: 120px;
  }
`;

const RecentPostItem = ({ data }) => {
  const link = data.node.fields.slug;
  const { cover, date, title } = data.node.frontmatter;
  const image = !!cover ? cover.childImageSharp.fixed.src : '';

  return (
    <Container>
      <Cover image={image} to={link}>
        <div>
          <p
            css={`
              margin: 0;
            `}
          >
            {title}
          </p>
          <span>{date}</span>
        </div>
      </Cover>
    </Container>
  );
};

export default RecentPostItem;
