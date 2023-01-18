import {Logo} from "../components";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import {Link} from 'react-router-dom'

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
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
          <Link to="/register" className="btn btn-hero">Login/Register</Link>
        </div>
        <img src={main} alt="job hunt" className="img img-main" />
      </div>
    </Wrapper>
  );
};

export default Landing;
