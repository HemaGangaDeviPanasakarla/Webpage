import './Home.css';

function Home() {
  return (
   <div id="home" role="region" aria-label="Home Banner">
      <div className="s1">
          <img
          src={require('../images/header.png')}
          alt="Western fashion background"
          className="bg-img"
          loading="lazy"
        />
        <div className="s2">
          <span className="s3">Welcome to Our Styles</span>
          <span className="s4">A Journey Through Western Styles</span>
          <span className="s5">
            Delight in Western Style without stretching your budget.
          </span>
        </div>
      </div>
    </div>
  );
}

export default Home;

