import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Departments = () => {
  const departmentArray = [
    {
      name: "Cardiology",
      imageUrl: "/departments/cardio.jpg",
    },
    {
      name: "Dermatology",
      imageUrl: "/departments/derma.jpg",
    },
    {
      name: "ENT",
      imageUrl: "/departments/ent.jpg",
    },
    {
      name: "Neurology",
      imageUrl: "/departments/neuro.jpg",
    },
    {
      name: "Oncology",
      imageUrl: "/departments/onco.jpg",
    },
    {
      name: "Orthopedic",
      imageUrl: "/departments/ortho.jpg",
    },
    {
      name: "Pediatrics",
      imageUrl: "/departments/pedia.jpg",
    },
    {
      name: "Radiology",
      imageUrl: "/departments/radio.jpg",
    },
    {
      name: "Therapist",
      imageUrl: "/departments/therapy.jpg",
    },
  ];
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="container departments">
      <h2>Departments</h2>
      <Carousel responsive={responsive} removeArrowOnDeviceType={["tablet","mobile"]}>
        {departmentArray.map((depart,i)=>{
          return(
            <div key={i} className="card">
              <div className="depart-name">
                <h3>{depart.name}</h3>
                <img src={depart.imageUrl} alt={departmentArray.name} />
              </div>
            </div>
          )
        })}
      </Carousel>
    </div>
  );
};

export default Departments;
