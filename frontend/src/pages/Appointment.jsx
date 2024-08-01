import AppointmentForm from "../components/AppointmentForm";
import Hero from "../components/Hero";
const Appointment = () => {
  return (
    <>
      <Hero
        title={"Schedule your Appointment | Medicare"}
        imageUrl={"/signin.png"}
      />
      <AppointmentForm />
    </>
  );
};

export default Appointment;
