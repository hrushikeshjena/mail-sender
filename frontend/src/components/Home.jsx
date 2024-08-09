

// import { useState, useEffect } from "react";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import EmailData from "./EmailData";

// const EmailForm = () => {
//   const [recipients, setRecipients] = useState([]);
//   const [subject, setSubject] = useState("");
//   const [text, setText] = useState("");
//   const [recipientCount, setRecipientCount] = useState(0);
//   const [showExcelFormat, setShowExcelFormat] = useState(false);
//   const [attachment, setAttachment] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8080/get-email-data"
//         );
//         // Assuming `setDataSource` is intended to update some state, you might want to define this function.
//         // setDataSource(response.data);
//       } catch (error) {
//         toast.error("Failed to fetch data");
//       }
//     };
//     fetchData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate form inputs
//     if (recipients.length === 0 || !subject || !text) {
//       toast.error("All fields are required");
//       return;
//     }

//     const formData = new FormData();
//     formData.append(
//       "recipients",
//       JSON.stringify(recipients.map((email) => email.trim()))
//     );
//     formData.append("subject", subject);
//     formData.append("text", text);
//     if (attachment) {
//       formData.append("attachment", attachment);
//     }

//     try {
//       await axios.post("http://localhost:8080/send-emails", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       toast.success("Emails sent successfully!");
//       setRecipients([]);
//       setSubject("");
//       setText("");
//       setRecipientCount(0);
//       setAttachment(null);
//     } catch (error) {
//       toast.error(
//         `Failed to send emails: ${
//           error.response?.data?.message || error.message
//         }`
//       );
//     }
//   };

//   const handleFileUpload = (file) => {
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const data = new Uint8Array(event.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet);

//       // Extract emails and domains
//       const emails = jsonData
//         .map((row) => row.Email)
//         .filter((email) => typeof email === "string");
//       const domains = jsonData
//         .map((row) => row.Domain)
//         .filter((domain) => typeof domain === "string");

//       setRecipients(emails);
//       setRecipientCount(emails.length);
//       setText(domains);
//       console.log(jsonData);
//     };
//     reader.readAsArrayBuffer(file);
//   };
//   return (
//     <div className="container mx-auto p-4">
//       <ToastContainer />
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <div>
//           <label className="block text-gray-700">
//             Recipients (comma separated)
//           </label>
//           <input
//             type="text"
//             value={recipients.join(", ")}
//             onChange={(e) => {
//               const emails = e.target.value
//                 .split(",")
//                 .map((email) => email.trim())
//                 .filter((email) => email);
//               setRecipients(emails);
//               setRecipientCount(emails.length);
//             }}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-500 focus:border-green-500 sm:text-sm"
//             placeholder="Enter recipient emails"
//           />
//           <p className="text-sm text-gray-500">
//             Total Recipients: {recipientCount}
//           </p>
//         </div>
//         <div>
//           <label className="block text-gray-700">Subject</label>
//           <input
//             type="text"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-500 focus:border-green-500 sm:text-sm"
//             placeholder="Enter email subject"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Message</label>
//           <textarea
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-500 focus:border-green-500 sm:text-sm"
//             placeholder="Enter email message"
//             rows={4}
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Attach File</label>
//           <input
//             type="file"
//             onChange={(e) => setAttachment(e.target.files[0])}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-500 focus:border-green-500 sm:text-sm"
//           />
//         </div>
//         <div className="flex space-x-4">
//           <button
//             type="submit"
//             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//           >
//             Send Emails
//           </button>
//           <input
//             type="file"
//             onChange={(e) => handleFileUpload(e.target.files[0])}
//             className="hidden"
//             id="file-upload"
//           />
//           <label
//             htmlFor="file-upload"
//             className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//           >
//             Upload Excel File
//           </label>
//           <button
//             type="button"
//             onClick={() => setShowExcelFormat(!showExcelFormat)}
//             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Excel File Format
//           </button>
//         </div>
//         {showExcelFormat && (
//           <div className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-50">
//             <p className="text-sm text-gray-700">
//               The Excel file should have a column named 'Email' with the email
//               addresses in each row. Example:
//             </p>
//             <table className="min-w-full bg-white border border-gray-200 mt-2">
//               <thead>
//                 <tr>
//                   <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Email
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     example1@example.com
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     example2@example.com
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         )}
//       </form>
//       <EmailData />
//     </div>
//   );
// };

// export default EmailForm;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import EmailData from "./EmailData";

// const EmailForm = () => {
//   const [recipients, setRecipients] = useState([]);
//   const [subject, setSubject] = useState("");
//   const [text, setText] = useState("");
//   const [recipientCount, setRecipientCount] = useState(0);
//   const [showExcelFormat, setShowExcelFormat] = useState(false);
//   const [attachment, setAttachment] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/get-email-data");
//         // Handle the response data if needed
//         // setDataSource(response.data); // Uncomment if you have a state for this
//       } catch (error) {
//         toast.error("Failed to fetch data");
//       }
//     };
//     fetchData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate form inputs
//     if (recipients.length === 0 || !subject || !text) {
//       toast.error("All fields are required");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("recipients", JSON.stringify(recipients.map((email) => email.trim())));
//     formData.append("subject", subject);
//     formData.append("text", text);
//     if (attachment) {
//       formData.append("attachment", attachment);
//     }

//     try {
//       await axios.post("http://localhost:8080/send-emails", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       toast.success("Emails sent successfully!");
//       setRecipients([]);
//       setSubject("");
//       setText("");
//       setRecipientCount(0);
//       setAttachment(null);
//     } catch (error) {
//       toast.error(`Failed to send emails: ${error.response?.data?.message || error.message}`);
//     }
//   };

//   const handleFileUpload = (file) => {
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const data = new Uint8Array(event.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet);

//       // Extract emails and domains
//       const emails = jsonData
//         .map((row) => row.Email)
//         .filter((email) => typeof email === "string");
//       const domains = jsonData
//         .map((row) => row.Domain)
//         .filter((domain) => typeof domain === "string");

//       setRecipients(emails);
//       setRecipientCount(emails.length);
//       setText(domains.join(", ")); // Join domains into a single string if needed
//       console.log(jsonData);
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <ToastContainer />
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <div>
//           <label className="block text-gray-700">Recipients (comma separated)</label>
//           <input
//             type="text"
//             value={recipients.join(", ")}
//             onChange={(e) => {
//               const emails = e.target.value
//                 .split(",")
//                 .map((email) => email.trim())
//                 .filter((email) => email);
//               setRecipients(emails);
//               setRecipientCount(emails.length);
//             }}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-500 focus:border-green-500 sm:text-sm"
//             placeholder="Enter recipient emails"
//           />
//           <p className="text-sm text-gray-500">Total Recipients: {recipientCount}</p>
//         </div>
//         <div>
//           <label className="block text-gray-700">Subject</label>
//           <input
//             type="text"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-500 focus:border-green-500 sm:text-sm"
//             placeholder="Enter email subject"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Message</label>
//           <textarea
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-500 focus:border-green-500 sm:text-sm"
//             placeholder="Enter email message"
//             rows={4}
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Attach File</label>
//           <input
//             type="file"
//             onChange={(e) => setAttachment(e.target.files[0])}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-500 focus:border-green-500 sm:text-sm"
//           />
//         </div>
//         <div className="flex space-x-4">
//           <button
//             type="submit"
//             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//           >
//             Send Emails
//           </button>
//           <input
//             type="file"
//             onChange={(e) => handleFileUpload(e.target.files[0])}
//             className="hidden"
//             id="file-upload"
//           />
//           <label
//             htmlFor="file-upload"
//             className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//           >
//             Upload Excel File
//           </label>
//           <button
//             type="button"
//             onClick={() => setShowExcelFormat(!showExcelFormat)}
//             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Excel File Format
//           </button>
//         </div>
//         {showExcelFormat && (
//           <div className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-50">
//             <p className="text-sm text-gray-700">
//               The Excel file should have a column named 'Email' with the email addresses in each row. Example:
//             </p>
//             <table className="min-w-full bg-white border border-gray-200 mt-2">
//               <thead>
//                 <tr>
//                   <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Email
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     example1@example.com
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     example2@example.com
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         )}
//       </form>
//       <EmailData />
//     </div>
//   );
// };

// export default EmailForm;
import { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmailData from "./EmailData";

const EmailForm = () => {
  const [recipients, setRecipients] = useState([]);
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [recipientCount, setRecipientCount] = useState(0);
  const [showExcelFormat, setShowExcelFormat] = useState(false);
  const [attachment, setAttachment] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/get-email-data");
        // Handle the response data if needed
        // setDataSource(response.data); // Uncomment if you have a state for this
      } catch (error) {
        toast.error("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (recipients.length === 0 || !subject || !text) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("recipients", JSON.stringify(recipients.map((email) => email.trim())));
    formData.append("bcc", JSON.stringify(recipients.map((email) => email.trim()))); // Include BCC
    formData.append("subject", subject);
    formData.append("text", text);
    if (attachment) {
      formData.append("attachment", attachment);
    }

    try {
      await axios.post("http://localhost:8080/send-emails", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Emails sent successfully!");
      setRecipients([]);
      setSubject("");
      setText("");
      setRecipientCount(0);
      setAttachment(null);
    } catch (error) {
      toast.error(`Failed to send emails: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleFileUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Extract emails and domains
        const emails = jsonData
          .map((row) => row.Email)
          .filter((email) => typeof email === "string" && email.includes('@')); // Ensure valid email format
        const domains = jsonData
          .map((row) => row.Domain)
          .filter((domain) => typeof domain === "string");

        setRecipients(emails);
        setRecipientCount(emails.length);
        setText(domains.join(", ")); // Join domains into a single string if needed
      } catch (error) {
        toast.error("Failed to process the file");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700">Recipients (comma separated)</label>
          <input
            type="text"
            value={recipients.join(", ")}
            onChange={(e) => {
              const emails = e.target.value
                .split(",")
                .map((email) => email.trim())
                .filter((email) => email);
              setRecipients(emails);
              setRecipientCount(emails.length);
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Enter recipient emails"
          />
          <p className="text-sm text-gray-500">Total Recipients: {recipientCount}</p>
        </div>
        <div>
          <label className="block text-gray-700">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Enter email subject"
          />
        </div>
        <div>
          <label className="block text-gray-700">Message</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Enter email message"
            rows={4}
          />
        </div>
        <div>
          <label className="block text-gray-700">Attach File</label>
          <input
            type="file"
            onChange={(e) => setAttachment(e.target.files[0])}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Send Emails
          </button>
          <input
            type="file"
            onChange={(e) => handleFileUpload(e.target.files[0])}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Upload Excel File
          </label>
          <button
            type="button"
            onClick={() => setShowExcelFormat(!showExcelFormat)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Excel File Format
          </button>
        </div>
        {showExcelFormat && (
          <div className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-50">
            <p className="text-sm text-gray-700">
              The Excel file should have a column named 'Email' with the email addresses in each row. Example:
            </p>
            <table className="min-w-full bg-white border border-gray-200 mt-2">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    example1@example.com
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    example2@example.com
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </form>
      <EmailData />
    </div>
  );
};

export default EmailForm;
