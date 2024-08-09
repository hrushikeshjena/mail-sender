import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from 'xlsx'; // Import XLSX
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const EmailData = () => {
  const [dataSource, setDataSource] = useState([]);

  const getTotalRecipientsCount = () => {
    return dataSource.reduce((total, record) => total + record.bcc.length, 0);
  };

  const columns = [
    { title: "No", key: "index" },
    { title: "BCC Recipients", key: "bcc", style: { width: "300px" } },
    { title: "Recipient Count", key: "recipientCount" },
    { title: "Subject", key: "subject" },
    { title: "Message", key: "text" },
    { title: "Date", key: "sentAt" },
    { title: "Action", key: "action" },
  ];

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/delete-email-log/${id}`);
      toast.success("Email log deleted successfully!");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete email log");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/get-email-data");
      setDataSource(response.data);
    } catch (error) {
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDataForExport = (data) => {
    return data.map(record => ({
      ...record,
      bcc: record.bcc.join(", "), // Convert array to string
    }));
  };

  const exportToExcel = () => {
    const formattedData = formatDataForExport(dataSource);
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Email Data");
    XLSX.writeFile(workbook, "EmailData.xlsx");
  };

  const exportToCSV = () => {
    const formattedData = formatDataForExport(dataSource);
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "EmailData.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToPDF = () => {
    html2canvas(document.querySelector("table")).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10);
      pdf.save('EmailData.pdf');
    });
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Email Data</h2>
      <div className="mb-4">
        <button onClick={exportToExcel} className="mr-2 bg-blue-500 text-white py-2 px-4 rounded">Export to Excel</button>
        <button onClick={exportToCSV} className="mr-2 bg-green-500 text-white py-2 px-4 rounded">Export to CSV</button>
        <button onClick={exportToPDF} className="bg-red-500 text-white py-2 px-4 rounded">Export to PDF</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={column.style || {}}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataSource.map((record, index) => (
              <tr key={record._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {index + 1}
                </td>
                <td
                  className="px-6 py-4 whitespace-wrap text-sm text-gray-900"
                  style={{ width: "300px" }}
                >
                  {record.bcc.join(", ")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.bcc.length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.subject}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.text}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(record.sentAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button
                    onClick={() => handleDelete(record._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td
                colSpan={7}
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold"
              >
                Total Recipients: {getTotalRecipientsCount()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmailData;
