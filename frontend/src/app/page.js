"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import EditEmployee from "./components/Modals/EditEmployee";
import AddEmployee from "./components/Modals/AddEmployee";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const EmployeeList = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEmployeeId, setCurrentEmployeeId] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}employees`);
      setEmployeeData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    setIsAddModalOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCloseModal = (id) => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  const editEmployeeModal = (id) => {
    setCurrentEmployeeId(id);
    setIsEditModalOpen(true);
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${apiUrl}employees/${id}`);

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this employee? It can't be undone."
    );
    if (isConfirmed) {
      deleteEmployee(id);
      console.log("Item deleted.");
    } else {
      console.log("Delete canceled.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div
          class="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
          role="status"
          aria-label="loading"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {isAddModalOpen && (
        <AddEmployee onSubmit={fetchData} closeModal={handleCloseModal} />
      )}
      {isEditModalOpen && (
        <EditEmployee
          employeeId={currentEmployeeId}
          onSubmit={fetchData}
          closeModal={handleCloseModal}
        />
      )}

      <main className="px-[100px] pt-[30px]">
        <div className="flex justify-between items-center mt-2 px-8">
          <h2 className="text-2xl font-bold">Employee List</h2>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
            onClick={() => setIsAddModalOpen(true)}
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
            {employeeData.map(({ name, profile, email, status, id }, i) => (
              <tr key={i} className="odd:bg-white even:bg-gray-100">
                <td className="px-6 py-4">
                  <img
                    src={`${
                      profile
                        ? `http://127.0.0.1:8000/storage/${profile}`
                        : `https://i.pravatar.cc/150?u=${email}`
                    }`}
                    className="w-10 h-10 rounded-full"
                    alt="User avatar"
                  />
                </td>
                <td className="px-6 py-4">{name}</td>
                <td className="px-6 py-4">{email}</td>
                <td className="px-6 py-4">
                  {status === "active" ? (
                    <span className="badge bg-green-500 text-white px-2 py-1 rounded-md">
                      Active
                    </span>
                  ) : (
                    <span className="badge bg-red-500 text-white px-2 py-1 rounded-md">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md mr-2"
                    onClick={() => editEmployeeModal(id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-md"
                    onClick={() => handleDelete(id)}
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
