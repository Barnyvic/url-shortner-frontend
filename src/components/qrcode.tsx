import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ShorterProps {
  responseData: string;
}

function Qrcode({ responseData }: ShorterProps) {
  const [qrCodeData, setQRCodeData] = useState(null);

  const splitUrl = (url: string) => {
    const split = url.split("/");
    return split[split.length - 1];
  };
  const shortUrl = splitUrl(responseData);

  useEffect(() => {
    const getQrcode = async () => {
      try {
        const token = localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(
          `https://barny.cyclic.app/qr/${shortUrl}`,
          {
            headers: headers,
          }
        );
        setQRCodeData(response.data.data);
        toast.success(response.data.message);
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.error);
        } else if (error.response && error.response.status === 500) {
          toast.error(error.response.data.error);
        }
      }
    };
    getQrcode();
  }, []);

return (
  <div className="text-end m-3 p-3 border border-success">
    <p className="h4">QR Code</p>
    {qrCodeData && (
      <div className="d-flex justify-content-end">
        <img
          src={qrCodeData}
          alt="QR Code"
          className="img-fluid qr-code-image"
        />
      </div>
    )}
    <ToastContainer />
  </div>
);
}

export default Qrcode;
