"use client"
import { useState } from "react";

export default function Modal({
  header,
  setShowModal,
  handleSubmit,
  selectedEmployee,
}) {
  const [formData, setFormData] = useState(selectedEmployee);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50" onClick={(e) => setShowModal(false)}>
      <div className="bg-white w-96 md:w-[500px] rounded-lg shadow-lg p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-semibold text-gray-700">{header}</h3>
          <button className="text-gray-400 hover:text-gray-600" onClick={() => setShowModal(false)}>
            ✖
          </button>
        </div>

        <form className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4 items-center">
            <label className="text-sm font-medium text-gray-700">Country *</label>
            <select className="w-full border border-gray-300 rounded-lg p-1 focus:ring-blue-500 focus:border-blue-500">
              <option>---</option>
              <option>Philippines</option>
              <option>USA</option>
            </select>

            <label className="text-sm font-medium text-gray-700">Account Type *</label>
            <select className="w-full border border-gray-300 rounded-lg p-1 focus:ring-blue-500 focus:border-blue-500">
              <option>---</option>
              <option>Admin</option>
              <option>Team Member</option>
            </select>

            <label className="text-sm font-medium text-gray-700">Username *</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-1 focus:ring-blue-500 focus:border-blue-500" />

            <label className="text-sm font-medium text-gray-700">Last Name *</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-1 focus:ring-blue-500 focus:border-blue-500" />

            <label className="text-sm font-medium text-gray-700">First Name *</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-1 focus:ring-blue-500 focus:border-blue-500" />

            <label className="text-sm font-medium text-gray-700">Email Address *</label>
            <input type="email" className="w-full border border-gray-300 rounded-lg px-1 focus:ring-blue-500 focus:border-blue-500" />

            <label className="text-sm font-medium text-gray-700">Contact Number</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-1 focus:ring-blue-500 focus:border-blue-500" />

            <label className="text-sm font-medium text-gray-700">Photo (optional)</label>
            <div>
              <input type="file" className="w-full border border-gray-300 rounded-lg px-1 focus:ring-blue-500 focus:border-blue-500" />
              <p className="mt-1 text-xs text-gray-500">No Photo Uploaded</p>
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>


  );
}
