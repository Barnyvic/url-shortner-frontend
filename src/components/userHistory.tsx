import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

interface User {
  _id: string;
  fullName: string;
  ipAddress: string;
  userAgent: string;
}

interface HistoryItem {
  _id: string;
  shortUrl: string;
  longUrl: string;
  userId: User;
  clicks: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const HistoryComponent = () => {
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get<HistoryItem[]>(
          "http://localhost:5000/user/history"
        );
        setHistoryData(response.data);
      } catch (error: any) {
        toast.error(error.response.data.error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div>
      <ToastContainer />
      <h1>History</h1>
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
              <td>{item.shortUrl}</td>
              <td>{item.userId.ipAddress}</td>
              <td>{item.userId.userAgent}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default HistoryComponent;
