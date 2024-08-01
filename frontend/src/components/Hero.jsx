const Hero = ({ title, imageUrl }) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident,
          cupiditate unde eaque sapiente enim sint optio, sed accusantium, porro
          officia aliquid quod alias doloremque explicabo laboriosam facere
          commodi! Nobis, vero. Blanditiis, eos inventore laborum, sequi
          quisquam corporis itaque hic aperiam, sit fuga nihil eligendi adipisci
          dolore ipsum quas in excepturi.
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="" className="animated-image" />
        <span>
            <img src="/Vector.png" alt="vector" />
        </span>
      </div>
    </div>
  );
};

export default Hero;
