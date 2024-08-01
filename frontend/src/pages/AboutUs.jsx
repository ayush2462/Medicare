import Hero from "../components/Hero";
import Biography from '../components/Biography';
const AboutUs = () => {
  return (
    <>
      <Hero title={"Learn More | Medicare"} imageUrl={"/about.png"} />
      <Biography imageUrl={"/whoweare.png"}  />
    </>
  );
};

export default AboutUs;
