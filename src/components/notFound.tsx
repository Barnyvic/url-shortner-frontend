import NavbarPage from "./navbar";
import image404 from "../assets/404_illustration_4x.webp";

const NotFound = () => {
  return (
    <>
      <NavbarPage />
      <div className="p-4">
        <h1 className="text-center h1">404 - Page Not Found</h1>
        <img src={image404} className=" img-fluid h-25" alt="404-image" />
        <p className=" text-center h1">The requested page does not exist.</p>
      </div>
    </>
  );
};

export default NotFound;
