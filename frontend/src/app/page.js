"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import EditEmployee from "./components/Modals/EditEmployee";
import AddEmployee from "./components/Modals/AddEmployee";

const EmployeeList = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/employees");
        setEmployeeData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleCheck = (id) => {
    // handle check logic
    setIsModalOpen(true);
  };

  const editEmployee = (id) => {
    // edit employee logic
  };

  const deleteEmployee = (id) => {
    // delete employee logic
  };

  if (loading) {
    return <p>Loading employee data...</p>;
  }

  return (
    <>
      {isModalOpen && <AddEmployee />}

      {/* <EditEmployee/> */}
      <main className="px-[100px]">
        <div className="flex justify-between items-center mt-2 px-8">
          <h2 className="text-2xl font-bold">Employee List</h2>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
            onClick={handleCheck}
          >
            Create Employee
          </button>
        </div>
        <hr className="my-4" />
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">Profile</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email Address</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {console.log(employeeData)}
            {employeeData.map(({ name, profile, email, status }, i) => (
              <tr key={i} className="odd:bg-white even:bg-gray-100">
                <td className="px-6 py-4">
                  <img
                    src={`https://i.pravatar.cc/150?u=${email}`}
                    className="w-10 h-10 rounded-full"
                    alt="User avatar"
                  />
                </td>
                <td className="px-6 py-4">{name}</td>
                <td className="px-6 py-4">{email}</td>
                <td className="px-6 py-4">
                  {status === "active" ? (
                    <span className="badge bg-green-500 text-white">
                      Active
                    </span>
                  ) : (
                    <span className="badge bg-red-500 text-white">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md mr-2"
                    onClick={() => editEmployee()}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-md"
                    onClick={() => deleteEmployee()}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default EmployeeList;
