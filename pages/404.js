import styled from 'styled-components';
import Link from 'next/link';

export default function Custom404() {
    return (
        <ErrorImageOverlay>
            <ErrorImageContainer imageUrl='404.png' />
            <ErrorImageText>This Page Lost in Space</ErrorImageText>
            <br />
            <p>Try to refresh or <Link href='/' className="link">Return to Homepage</Link></p>
        </ErrorImageOverlay>)
}

export const ErrorImageOverlay = styled.div`
  height: 80vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ErrorImageContainer = styled.div`
  display: inline-block;
  background-image: ${({ imageUrl }) => `url("images/${imageUrl}")`};
  background-size: cover;
  background-position: center;
  width: 40vh;
  height: 40vh;
`;

export const ErrorImageText = styled.h2`
  font-size: 24px;
  color: #094b3e;
`;
