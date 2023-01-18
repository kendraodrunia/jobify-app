import logo from "../assets/images/logo.svg";
import main from "../assets/images/main.svg";
import styled from "styled-components";

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <img src={logo} className="logo" alt="jobify" />
      </nav>
      <div className="container page">
        <div className="info">
          {/* {info} */}
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Hella mixtape air plant kogi meggings brunch tumblr shaman hoodie
            lo-fi kombucha jianbing. Artisan gatekeep ennui, knausgaard tilde
            poutine cray vexillologist succulents poke health goth listicle
            chambray echo park godard. YOLO vexillologist selfies, XOXO copper
            mug street art prism ramps shoreditch viral hot chicken coloring
            book. Bodega boys ugh palo santo man bun dreamcatcher actually bruh
            praxis.
          </p>
          <button className="btn btn-hero">Login/Register</button>
        </div>
        <img src={main} alt="job hunt" className="img img-main" />
      </div>
    </Wrapper>
  );
};

export default Landing;
