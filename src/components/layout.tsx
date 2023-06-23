import React, { useState } from "react";
import Shorter from "./shorter";
import Qrcode from "./qrcode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import NavbarPage from "./navbar";

function Layout() {
  const [page, setPage] = useState(true);
  const [shortUrl, setShortUrl] = useState("");
  const [formData, setFormData] = useState({
    longUrl: "",
    customeUrl: "",
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.longUrl === "" || !formData.longUrl) {
      toast.error("Please input your long url");
      return;
    } else if (formData.customeUrl.length > 10) {
      toast.error("input your custome url less than 10 character...");
      return;
    } else {
      try {
        const token = localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.post(
          "https://barny.cyclic.app/create",
          formData,
          { headers: headers }
        );
        setShortUrl(response.data.data);
        toast.success(response.data.message);
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.error);
        } else if (error.response && error.response.status === 401) {
          toast.error(error.response.data.error);
        } else {
          toast.error(error.response.data.error);
        }
      }
    }
  };
  return (
    <>
      <NavbarPage />
      <div
        className="container m-3 p-4 border "
        style={{ height: "75vh" }}
      >
        <h1 className="text-center fw-bold">URL... Shortner</h1>

        {/* create the form and add submit functionality */}
        <div className="container-fluid d-flex justify-content-center mt-5">
          <form action="" className="w-50" onSubmit={handleSubmit}>
            <div className="form-group p-3 w-100 ">
              <input
                type="text"
                onChange={handleInputChange}
                value={formData.longUrl}
                className="form-control"
                name="longUrl"
                placeholder="input your long url"
              />
            </div>

            <div className="form-group p-3 w-100 ">
              <input
                type="text"
                className="form-control"
                onChange={handleInputChange}
                value={formData.customeUrl}
                name="customeUrl"
                placeholder="Input your Custome url"
              />
            </div>

            <div className="text-end mt-3">
              <button
                type="submit"
                className="btn btn-primary mx-2 mb-4 px-3 ml-auto"
              >
                Generate Link
              </button>
              <ToastContainer />
            </div>
          </form>
        </div>
        {/* create the form and add submit functionality */}
        {/* qrcode and shorter url start */}
        <div className="container">
          <div className="row">
            <div className="col">
              <button
                onClick={() => setPage(true)}
                className="btn btn-outline-primary w-100"
              >
                Url-shorter
              </button>
            </div>
            <div className="col">
              <button
                onClick={() => setPage(false)}
                className="btn btn-outline-primary w-100"
              >
                Qr-code
              </button>
            </div>
            <div className="form-Content">
              {page ? (
                <Shorter responseData={shortUrl} />
              ) : (
                <Qrcode responseData={shortUrl} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
