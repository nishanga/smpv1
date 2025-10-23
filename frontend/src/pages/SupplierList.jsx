import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/viewsuppliers")
      .then((res) => res.json())
      .then((data) => setSuppliers(data))
      .catch((err) => console.error("Error fetching suppliers:", err));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} />

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          collapsed ? "ml-16" : "ml-60"
        }`}
      >
        
        <main className="p-6 mt-5">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Registered Suppliers
          </h2>

          {/* Grid of tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {suppliers.map((supplier) => (
              <div
                key={supplier.id}
                className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold text-blue-700 mb-2">
                  {supplier.supplier_nameinitials}
                </h3>
                <p className="text-gray-700">
                  <span className="font-medium">Company:</span> {supplier.supplier_address}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Email:</span> {supplier.supplier_contact1}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Phone:</span> {supplier.supplierinfo_nic}
                </p>
                
              </div>
            ))}

            {/* Show message if no data */}
            {suppliers.length === 0 && (
              <p className="text-gray-500 text-center col-span-full">
                No suppliers registered yet.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
