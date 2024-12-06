"use client";
import { useState } from "react";
import { deleteEmployee } from "../lib/apiClient";

export default function DeleteModal({
  setShowDeleteModal,
  selectedEmployee,
  setSelectedEmployee,
  fetchLatestData,
}) {
  const handleHideDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedEmployee(false);
  };
  const handleDelete = async () => {
    try {
      await deleteEmployee(selectedEmployee.id);
      fetchLatestData();
      handleHideDeleteModal();
    } catch (error) {
      console.error("Submission Error:", error);
      // Optionally, display error to the user
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
      onClick={() => handleHideDeleteModal()}
    >
      <div
        className="bg-white w-96 md:w-[500px] rounded-lg shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-semibold text-gray-700">
            Delete Employee
          </h3>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() => handleHideDeleteModal()}
          >
            ✖
          </button>
        </div>
        <div className="my-10 p-5 w-full flex text-center text-xl font-bold">
          Are you sure you want to delete {selectedEmployee.firstName}{" "}
          {selectedEmployee.lastName}?
        </div>
        <div className="w-full flex justify-center gap-x-16">
          <button
            onClick={() => handleHideDeleteModal()}
            className="px-5 py-2 border"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete()}
            className="px-5 py-2 bg-red-500 text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
