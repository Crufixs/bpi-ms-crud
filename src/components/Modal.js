"use client";
import { useState } from "react";
import { createEmployee, updateEmployee } from "../lib/apiClient";
export default function Modal({
  setShowModal,
  selectedEmployee,
  setSelectedEmployee,
  fetchLatestData,
}) {
  const [formData, setFormData] = useState({
    country: selectedEmployee?.country || "",
    accountType: selectedEmployee?.accountType || "",
    username: selectedEmployee?.username || "",
    lastName: selectedEmployee?.lastName || "",
    firstName: selectedEmployee?.firstName || "",
    email: selectedEmployee?.email || "",
    contactNumber: selectedEmployee?.contactNumber || "",
    photo: null,
  });

  const [errors, setErrors] = useState({});

  const handleHideModal = () => {
    setShowModal(false);
    if (selectedEmployee) setSelectedEmployee(null);
  };
  const validate = () => {
    const newErrors = {};

    if (!formData.country || formData.country === "---") {
      newErrors.country = "Country is required.";
    }
    if (!formData.accountType || formData.accountType === "---") {
      newErrors.accountType = "Account Type is required.";
    }
    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required.";
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is not valid.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUploadImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Validate the file size (max 2MB)
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes

      if (file.size > maxSize) {
        setErrors((errors) => ({
          ...errors,
          photo: "File size must be less than 2MB",
        }));
        setFormData({ ...formData, photo: undefined });
      } else {
        setErrors((errors) => ({ ...errors, photo: undefined }));
        setFormData({ ...formData, photo: file });
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      // Construct FormData for the API call (including file if provided)
      const fd = new FormData();
      fd.append("country", formData.country);
      fd.append("accountType", formData.accountType);
      fd.append("username", formData.username);
      fd.append("lastName", formData.lastName);
      fd.append("firstName", formData.firstName);
      fd.append("email", formData.email);
      fd.append("contactNumber", formData.contactNumber);
      if (formData.photo) fd.append("photo", formData.photo);

      try {
        if (selectedEmployee) {
          await updateEmployee(selectedEmployee.id, fd);
        } else {
          await createEmployee(fd);
        }
        handleHideModal();
        fetchLatestData();
      } catch (error) {
        console.error("Submission Error:", error);
        // Optionally, display error to the user
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, photo: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
      onClick={() => handleHideModal()}
    >
      <div
        className="bg-white w-96 md:w-[700px] rounded-lg shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-semibold text-gray-700">
            {selectedEmployee ? "Edit Employee" : "Add Employee"}
          </h3>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() => handleHideModal()}
          >
            ✖
          </button>
        </div>

        <form className="mt-4 space-y-4" onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-2 gap-2 items-center">
            <label className="text-sm font-semibold">
              Country <span className="text-red-500">*</span>
            </label>
            <div>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>---</option>
                <option>Philippines</option>
                <option>USA</option>
              </select>
              {errors.country && (
                <p className="text-red-500 text-xs mt-1">{errors.country}</p>
              )}
            </div>

            <label className="text-sm font-semibold">
              Account Type <span className="text-red-500">*</span>
            </label>
            <div>
              <select
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>---</option>
                <option>Admin</option>
                <option>Team Member</option>
                <option>System Administrator</option>
              </select>
              {errors.accountType && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.accountType}
                </p>
              )}
            </div>

            <label className="text-sm font-semibold">
              Username <span className="text-red-500">*</span>
            </label>
            <div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>

            <label className="text-sm font-semibold">
              Last Name <span className="text-red-500">*</span>
            </label>
            <div>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>

            <label className="text-sm font-semibold">
              First Name <span className="text-red-500">*</span>
            </label>
            <div>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>

            <label className="text-sm font-semibold">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <label className="text-sm font-semibold">Contact Number</label>
            <div>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <label className="text-sm font-semibold">Photo (optional)</label>
            <div>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleUploadImage}
                className="w-full py-1 border border-gray-300 rounded-lg px-2 focus:ring-blue-500 focus:border-blue-500"
              />

              {errors.photo ? (
                <p className="text-red-500 text-xs mt-1">{errors.photo}</p>
              ) : (
                <p className="mt-1 text-xs text-gray-500">
                  {formData.photo ? formData.photo.name : "No Photo Uploaded"}
                </p>
              )}
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
