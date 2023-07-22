"use client";
import { useState } from "react";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const AddEmployeeForm = ({ onSubmit, closeModal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("status", status);
      if (profileImage) formData.append("profile", profileImage);

      const response = await axios.post(`${apiUrl}employees`, formData);

      console.log("Employee added successfully!", response.data);
    } catch (error) {
      console.log(error);
    }

    setName("");
    setEmail("");
    setStatus("");
    setProfileImage(null);
    onSubmit();
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;

    switch (id) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "status":
        setStatus(value);
        break;
      default:
        break;
    }
  };

  const handleProfileImageChange = (event) => {
    const imageFile = event.target.files[0];
    setProfileImage(imageFile);
  };

  return (
    <form
      className="bg-[#1a1c1d96] h-screen w-full absolute top-0 z-[22] flex items-center justify-center"
      onSubmit={handleSubmit}
    >
      <div className="relative w-[399px] bg-white rounded-[7px] px-[64px] py-[34px]">
        <div className="absolute top-[27px] right-[30px]" title="Close">
          <button type="button" onClick={closeModal}>
            <img
              src="/images/close-icon-dark.svg"
              height={17}
              width={17}
              alt="Close"
            />
          </button>
        </div>
        <div>
          <h1 className="text-[20px] text-[#7B45E5] font-semibold leading-[10.24px] pb-[33px]">
            Add a new employee
          </h1>
          <div>
            <ul className="flex flex-col gap-[16px]">
              <li className="flex items-center gap-[15px]">
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="text-[#666666] text-[14px] font-semibold pb-[11px]"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="input-box-shadow border border-[#D7D7D7] rounded-[5px] h-[38px] px-[8px]"
                    id="name"
                    placeholder="e.g. Rajesh Biswas"
                    value={name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </li>
              <li className="flex items-center gap-[15px]">
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="text-[#666666] text-[14px] font-semibold pb-[11px]"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="input-box-shadow border border-[#D7D7D7] rounded-[5px] h-[38px] px-[8px]"
                    id="email"
                    placeholder="e.g. rajesh@test.com"
                    value={email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </li>
              <li className="flex items-center gap-[15px]">
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-[#666666] text-[14px] font-semibold pb-[11px]"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    className="input-box-shadow border border-[#D7D7D7] rounded-[5px] h-[38px] px-[8px]"
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
              <li className="flex items-center gap-[15px]">
                <div className="flex flex-col">
                  <label
                    htmlFor="profile-image"
                    className="text-[#666666] text-[14px] font-semibold pb-[11px]"
                  >
                    Choose a profile image
                  </label>
                  <input
                    type="file"
                    className="input-box-shadow border border-[#D7D7D7] rounded-[5px] h-[38px] px-[8px]"
                    id="profile-image"
                    onChange={handleProfileImageChange}
                  />
                </div>
              </li>{" "}
            </ul>
          </div>
          <div className="mt-[50px] flex gap-4">
            <button
              type="button"
              onClick={closeModal}
              className="text-[#6f6f6f] text-[16px] font-semibold leading-[24px] bg-[#bcbcbc] w-full rounded-[4px] py-[7px] uppercase"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-white text-[16px] font-semibold leading-[24px] bg-[#4D3AC1] w-full rounded-[4px] py-[7px] uppercase"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddEmployeeForm;
