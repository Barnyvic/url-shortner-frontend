import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import NavbarPage from "./navbar";

interface ShortUrlData {
  statusCode: number;
  message: string;
  data: ShortUrlItem[];
}

interface ShortUrlItem {
  clicks: number;
  createdAt: string;
  longUrl: string;
  shortUrl: string;
  updatedAt: string;
  userId: User;
  __v: number;
  _id: string;
}

interface User {
  _id: string;
  fullName: string;
  ipAddress: string;
  userAgent: string;
}

const History = () => {
  const [historyData, setHistoryData] = useState<ShortUrlItem[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("No token found. Please log in.");
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get<ShortUrlData>(
          "https://barny.cyclic.app/user/history",
          { headers: headers }
        );

        setHistoryData(response.data.data);
        toast.success("History loaded.....");
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.error);
        } else if (error.request) {
          toast.error("No response received from the server.");
        } else {
          toast.error("An error occurred while making the request.");
        }
      }
    };

    fetchHistory();
  }, []);

  return (
    <>
      <NavbarPage />
      <div>
        <ToastContainer />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Number of Clicks</th>
              <th>Short URL</th>
              <th>IP Address</th>
              <th>User Agent</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((item, index) => (
              <tr key={index}>
                <td>{item.userId.fullName}</td>
                <td>{item.clicks}</td>
                <td>
                  {" "}
                  <a href={`https://barny.cyclic.app/${item.shortUrl}`}>
                    {`https://barny.cyclic.app/${item.shortUrl}`}
                  </a>
                </td>
                <td>{item.userId.ipAddress}</td>
                <td>{item.userId.userAgent}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default History;
