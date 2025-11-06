import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { CSVLink } from "react-csv";

export default function Reports() {
  const [collapsed, setCollapsed] = useState(false);
  const [gender_, setGender] = useState("");
  const [nic_, setNic] = useState("");  
  const [reportData, setReportData] = useState([]);

  const generateReport = async () => {
    const response = await fetch("http://localhost:5000/api/reports/suppliers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gender: gender_,
        nic: nic_,       
      }),
    });

    const data = await response.json();
    setReportData(data);
  };

  const headers = [
    { label: "Supplier Name", key: "supplier_name" },
    { label: "Gender", key: "company_name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Address", key: "address" },
    //{ label: "Registered Date", key: "created_at" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar collapsed={collapsed} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          collapsed ? "ml-16" : "ml-60"
        }`}
      >
        <Header />
        <main className="p-6 mt-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Supplier Reports</h2>

          {/* Filter Section */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Filter Criteria</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <input
                  type="text"
                  value={gender_}
                  onChange={(e) => setGender(e.target.value)}
                  className="mt-1 block w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                  placeholder="Gender"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">NIC</label>
                <input
                  type="text"
                  value={nic_}
                  onChange={(e) => setNic(e.target.value)}
                  className="mt-1 block w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                  placeholder="NIC"
                />
              </div>

              
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={generateReport}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Generate Report
              </button>

              {reportData.length > 0 && (
                <CSVLink
                  data={reportData}
                  headers={headers}
                  filename="supplier_report.csv"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Download CSV
                </CSVLink>
              )}
            </div>
          </div>

          {/* Results Section */}
          {reportData.length > 0 ? (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Report Results</h3>
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2 text-left">Supplier Name</th>
                    <th className="border px-4 py-2 text-left">Gender</th>
                    <th className="border px-4 py-2 text-left">Email</th>
                    <th className="border px-4 py-2 text-left">Phone</th>
                    <th className="border px-4 py-2 text-left">Address</th>                    
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((row) => (
                    <tr key={row.id}>
                      <td className="border px-4 py-2">{row.supplier_nameinitials}</td>
                      <td className="border px-4 py-2">{row.supplier_gender}</td>
                      <td className="border px-4 py-2">{row.email}</td>
                      <td className="border px-4 py-2">{row.supplier_contact1}</td>
                      <td className="border px-4 py-2">{row.supplier_address}</td>                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No report generated yet.</p>
          )}
        </main>
      </div>
    </div>
  );
}