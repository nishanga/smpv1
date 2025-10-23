import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import React, { useState } from "react";


function AnnualForm() {
  const [selectedOption, setSelectedOption] = useState("option1");
  const [dropdown1, setDropdown1] = useState("");
  const [dropdown2, setDropdown2] = useState("");

  const [numGrades, setNumGrades] = useState(0);

  const schoolName = localStorage.getItem('schoolName');
  const school_census = localStorage.getItem('schollcensus');
  const currentyear = '2025';

  // Handle grade span selection
  const gradeSpanMapping = {
    "1-5": [1, 5],
    "1-8": [1, 8],
    "1-11": [1, 11],
    "1-13": [1, 13],
    "6-11": [6, 11],
    "6-13": [6, 13],
  };

  // Dropdown2 change handler
  const handleGradeSpanChange = (value) => {
    setDropdown2(value);

    if (gradeSpanMapping[value]) {
      const [start, end] = gradeSpanMapping[value];
      setNumGrades({ start, end });
    }
  };

  // Generate grade labels dynamically
  const grades =
    numGrades && numGrades.start
      ? Array.from(
        { length: numGrades.end - numGrades.start + 1 },
        (_, i) => `Grade ${numGrades.start + i}`
      )
      : [];



  const [gender, setGender] = useState("");

  const handleSubmit = async () => {
    const payload = {
      schoolName,
      school_census,
      currentyear,
      eligibleForMeal: selectedOption === "option1",
      gender,
      gradeSpan: dropdown2,
      formData: tableData      
    };  

    try {
      const res = await fetch("http://localhost:5000/annualform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Saved:", data);
      alert("Form saved successfully!");
    } catch (err) {
      console.error("Error:", err);
      alert("Error saving form");
    }
  };

   const [tableData, setTableData] = useState(
      grades.map((grade) => ({
        grade,
        totalMale: 0,
        totalFemale: 0,
        eligibleMale: 0,
        eligibleFemale: 0,
      }))
    );

    const handleInputChange = (idx, field, value) => {
      const updatedData = [...tableData];
      updatedData[idx][field] = Number(value);
      setTableData(updatedData);
    };


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-60 p-6 flex justify-center items-start">
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Annual Form</h2>
          <p>School: {schoolName}</p>

          {/* Form Card */}
          <div className="max-w-4xl bg-white p-8 rounded-2xl shadow-lg space-y-8">
            {/* Section Title */}
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-3">
              Eligible for school meal program
            </h3>

            {/* Radio Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:shadow-md transition">
                <input
                  type="radio"
                  value="option1"
                  checked={selectedOption === "option1"}
                  onChange={() => setSelectedOption("option1")}
                  className="form-radio text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">Yes</span>
              </label>

              <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:shadow-md transition">
                <input
                  type="radio"
                  value="option2"
                  checked={selectedOption === "option2"}
                  onChange={() => setSelectedOption("option2")}
                  className="form-radio text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">No</span>
              </label>
            </div>

            {/* Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  School Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">-- Select Gender --</option>
                  <option value="boys">Boys</option>
                  <option value="girls">Girls</option>
                  <option value="both">Both</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  School Grade Span
                </label>
                <select
                  value={dropdown2}
                  onChange={(e) => handleGradeSpanChange(e.target.value)}
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">-- Select grade span --</option>
                  <option value="1-5">Grade 1 - 5</option>
                  <option value="1-8">Grade 1 - 8</option>
                  <option value="1-11">Grade 1 - 11</option>
                  <option value="1-13">Grade 1 - 13</option>
                  <option value="6-11">Grade 6 - 11</option>
                  <option value="6-13">Grade 6 - 13</option>
                </select>
              </div>
            </div>

            {/* Student Registration Table */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Student Registration
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg text-sm">
                  <thead>
                    <tr className="bg-gray-200 text-gray-700">
                      <th
                        rowSpan="2"
                        className="border border-gray-300 px-4 py-2 text-left w-40"  // wider grade column
                      >
                        Grade
                      </th>
                      <th
                        colSpan="2"
                        className="border border-gray-300 px-4 py-2 text-center"
                      >
                        Total Number of Students
                      </th>

                      <th
                        rowSpan="2"
                        className="border border-gray-300 px-4 py-2 text-left w-40"  // wider grade column
                      >
                        Grade
                      </th>
                      <th
                        colSpan="2"
                        className="border border-gray-300 px-4 py-2 text-center"
                      >
                        Number of Eligible Students
                      </th>
                    </tr>
                    <tr className="bg-gray-200 text-gray-700">
                      <th className="border border-gray-300 px-2 py-2 text-center w-20">
                        Male
                      </th>
                      <th className="border border-gray-300 px-2 py-2 text-center w-20">
                        Female
                      </th>
                      <th className="border border-gray-300 px-2 py-2 text-center w-20">
                        Male
                      </th>
                      <th className="border border-gray-300 px-2 py-2 text-center w-20">
                        Female
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {grades.map((grade, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2 font-medium w-40">
                          {grade}
                        </td>
                        {/* Total Male */}
                        <td className="border border-gray-300 px-2 py-2 w-20">
                          <input
                            type="number"
                            disabled={gender === "girls"}   // disable if Girls selected
                            value={tableData[idx]?.totalMale || ""}
                            className={`w-full border rounded-md px-1 py-1 ${gender === "girls" ? "bg-gray-100 cursor-not-allowed" : ""
                              }`}
                            placeholder="0"
                          />
                        </td>
                        {/* Total Female */}
                        <td className="border border-gray-300 px-2 py-2 w-20">
                          <input
                            type="number"
                            disabled={gender === "boys"}    // disable if Boys selected
                             value={tableData[idx]?.totalFemale || ""}
                            className={`w-full border rounded-md px-1 py-1 ${gender === "boys" ? "bg-gray-100 cursor-not-allowed" : ""
                              }`}
                            placeholder="0"
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2 font-medium w-40">
                          {grade}
                        </td>
                        {/* Eligible Male */}
                        <td className="border border-gray-300 px-2 py-2 w-20">
                          <input
                            type="number"
                            disabled={gender === "girls"}   // disable if Girls selected
                            value={tableData[idx]?.eligibleMale || ""}
                            className={`w-full border rounded-md px-1 py-1 ${gender === "girls" ? "bg-gray-100 cursor-not-allowed" : ""
                              }`}
                            placeholder="0"
                          />
                        </td>
                        {/* Eligible Female */}
                        <td className="border border-gray-300 px-2 py-2 w-20">
                          <input
                            type="number"
                            disabled={gender === "boys"}    // disable if Boys selected
                            value={tableData[idx]?.eligibleFemale || ""}
                            className={`w-full border rounded-md px-1 py-1 ${gender === "boys" ? "bg-gray-100 cursor-not-allowed" : ""
                              }`}
                            placeholder="0"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnnualForm;