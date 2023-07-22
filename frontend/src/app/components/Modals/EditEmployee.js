"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const EditEmployee = ({ employeeId, onSubmit, closeModal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const fetchEmployeeById = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}employees/${id}`);
      const { name, email, status } = response.data;
      setName(name);
      setEmail(email);
      setStatus(status);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployeeById(employeeId);
  }, [employeeId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "status") {
      setStatus(value);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedEmployee = {
        name,
        email,
        status,
      };

      const response = await axios.put(
        `${apiUrl}employees/${employeeId}`,
        updatedEmployee
      );

      console.log("Update successful:", response.data);
      closeModal();
    } catch (error) {
      console.log("Update failed:", error);
    }
    onSubmit();
  };

  return (
    <div className="bg-[#1a1c1d96] h-screen w-full absolute top-0 z-[22] flex items-center justify-center">
      <div className="relative w-[399px] bg-white rounded-[7px] px-[64px] py-[34px]">
        <div className="absolute top-[27px] right-[30px]" title="close">
          <button type="button" onClick={closeModal}>
            <Image
              src="/images/close-icon-dark.svg"
              height={17}
              width={17}
              alt="close"
            />
          </button>
        </div>
        <div>
          <h1 className="text-[20px] text-[#7B45E5] font-semibold leading-[10.24px] pb-[33px]">
            Update Employee Details
          </h1>
          <div>
            <ul className="flex flex-col gap-[16px]">
              <li className="flex items-center gap-[15px]">
                <div className="flex flex-col pb-[37px]">
                  <label
                    htmlFor="name"
                    className="text-[#666666] text-[14px] font-semibold pb-[11px]"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="input-box-shadow border border-[#D7D7D7] rounded-[5px] h-[38px]"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </li>
              <li className="flex items-center gap-[15px]">
                <div className="flex flex-col pb-[37px]">
                  <label
                    htmlFor="email"
                    className="text-[#666666] text-[14px] font-semibold pb-[11px]"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="input-box-shadow border border-[#D7D7D7] rounded-[5px] h-[38px]"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </li>
              <li className="flex items-center gap-[15px]">
                <div className="flex flex-col pb-[37px]">
                  <label
                    htmlFor="status"
                    className="text-[#666666] text-[14px] font-semibold pb-[11px]"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    className="input-box-shadow border border-[#D7D7D7] rounded-[5px] h-[38px]"
                    name="status"
                    value={status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </li>
            </ul>
          </div>
          <div className="mt-[50px] flex gap-4">
            <button
              type="button"
              onClick={closeModal}
              className="text-white text-[16px] font-semibold leading-[24px] bg-[#4D3AC1] w-full rounded-[4px] py-[7px] uppercase"
            >
              Cancel
            </button>
            <button
              className="text-white text-[16px] font-semibold leading-[24px] bg-[#4D3AC1] w-full rounded-[4px] py-[7px] uppercase"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
