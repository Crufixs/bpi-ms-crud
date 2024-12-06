"use client";
import Modal from "@/components/Modal";
import { useState, useMemo, useEffect } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaSort,
  FaSortDown,
  FaSortUp,
} from "react-icons/fa";

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalState, setModalState] = useState("DELETE");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [sortState, setSortState] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPageRange, setCurrentPageRange] = useState([0, 10]);
  const [searchKey, setSearchKey] = useState("");

  const ModalStateEnum = Object.freeze({
    DELETE: "DELETE",
    ADD: "ADD",
    EDIT: "EDIT",
  });

  const SortStateEnum = Object.freeze({
    NAME_ASC: "NAME_ASC",
    NAME_DSC: "NAME_DSC",
    UNAME_ASC: "UNAME_ASC",
    UNAME_DSC: "UNAME_DSC",
    COUNTRY_ASC: "COUNTRY_ASC",
    COUNTRY_DSC: "COUNTRY_DSC",
    EMAIL_ASC: "EMAIL_ASC",
    EMAIL_DSC: "EMAIL_DSC",
  });

  function searchUsers(users, keyword) {
    // Normalize keyword to lowercase for case-insensitive matching
    const lowerCaseKeyword = keyword.toLowerCase().trim();
    if (keyword.length === 0) return users;

    // Filter users based on the presence of the keyword in any field
    return users.filter((user) => {
      return (
        user.name.toLowerCase().includes(lowerCaseKeyword) ||
        user.username.toLowerCase().includes(lowerCaseKeyword) ||
        user.country.toLowerCase().includes(lowerCaseKeyword) ||
        user.email.toLowerCase().includes(lowerCaseKeyword) ||
        user.accountType.toLowerCase().includes(lowerCaseKeyword)
      );
    });
  }

  useEffect(() => {
    switch (pageSize) {
      case 20:
        setCurrentPageRange([0, 20]);
        break;
      case 50:
        setCurrentPageRange([0, 50]);
        break;
      default:
        setCurrentPageRange([0, 10]);

        break;
    }
  }, [pageSize]);

  const sortedEmployees = useMemo(() => {
    if (!employees) return [];

    const tempArr = [...employees];

    switch (sortState) {
      case SortStateEnum.NAME_ASC:
        return tempArr.sort((a, b) => a.name.localeCompare(b.name));
      case SortStateEnum.NAME_DSC:
        return tempArr.sort((a, b) => b.name.localeCompare(a.name));
      case SortStateEnum.UNAME_ASC:
        return tempArr.sort((a, b) => a.username.localeCompare(b.username));
      case SortStateEnum.UNAME_DSC:
        return tempArr.sort((a, b) => b.username.localeCompare(a.username));
      case SortStateEnum.COUNTRY_ASC:
        return tempArr.sort((a, b) => a.country.localeCompare(b.country));
      case SortStateEnum.COUNTRY_DSC:
        return tempArr.sort((a, b) => b.country.localeCompare(a.country));
      case SortStateEnum.EMAIL_ASC:
        return tempArr.sort((a, b) => a.email.localeCompare(b.email));
      case SortStateEnum.EMAIL_DSC:
        return tempArr.sort((a, b) => b.email.localeCompare(a.email));
      default:
        return tempArr; // Return the original array if no sorting is applied
    }
  }, [employees, sortState]);

  useEffect(() => {
    setEmployees(generateDummyData(100));
  }, []);

  useEffect(() => {
    console.log("TESTRAWR sortedEmployees", sortedEmployees);
  }, [sortedEmployees]);
  function generateDummyData(amount) {
    const names = [
      "John Doe",
      "Jane Smith",
      "Alice Johnson",
      "Chris Evans",
      "Michael Brown",
      "Emily Davis",
      "Sarah Wilson",
      "James Anderson",
    ];
    const countries = ["Philippines", "USA", "Canada", "Australia", "India"];
    const emailDomains = ["example.com", "mail.com", "test.com"];
    const accountTypes = ["Team Member", "Admin", "Viewer"];

    const dummyData = Array.from({ length: amount }, (_, index) => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const [firstName, lastName] = randomName.split(" ");
      const username = `P${Math.floor(100000 + Math.random() * 900000)}`;
      const country = countries[Math.floor(Math.random() * countries.length)];
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${
        emailDomains[Math.floor(Math.random() * emailDomains.length)]
      }`;
      const accountType =
        accountTypes[Math.floor(Math.random() * accountTypes.length)];

      return {
        id: index + 1,
        name: randomName,
        username: username,
        country: country,
        email: email,
        accountType: accountType,
        photo: "No image available",
      };
    });

    return dummyData;
  }

  const handleDisplayAddModal = () => {
    setShowModal(true);
    setModalState(ModalStateEnum.ADD);
  };

  const handleDisplayEditModal = (employee) => {
    setShowModal(true);
    setModalState(ModalStateEnum.EDIT);
    setSelectedEmployee(employee);
  };

  return (
    <div>
      <main className="h-screen flex flex-col">
        <div className="w-full p-5 border-b ">Employee: Records</div>
        <div className="w-full p-5 flex justify-end">
          <button
            onClick={() => handleDisplayAddModal()}
            className="p-2 py-3 bg-blue-600 text-white"
          >
            ADD EMPLOYEE
          </button>
        </div>
        <div className="overflow-x-auto p-3 m-2 border flex flex-col">
          <div className="w-full flex justify-between p-2">
            <div>
              Show{" "}
              <select
                onClick={(e) => setPageSize(parseInt(e.target.value))}
                className="inline border rounded py-1"
              >
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>{" "}
              entries
            </div>
            <div className="flex justify-center items-center">
              <label className="text-sm font-medium text-gray-700 mr-2">
                Search
              </label>
              <input
                type="text"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="w-full h-full overflow-y-auto">
            <table className="crud-table w-full">
              <thead>
                <tr>
                  <th>Photo </th>
                  <th>
                    <div
                      className="flex items-center justify-center"
                      onClick={() =>
                        setSortState((curr) =>
                          curr === null
                            ? SortStateEnum.NAME_DSC
                            : curr === SortStateEnum.NAME_DSC
                            ? SortStateEnum.NAME_ASC
                            : null
                        )
                      }
                    >
                      Name
                      {sortState === SortStateEnum.NAME_ASC ? (
                        <FaSortUp className="inline" />
                      ) : sortState === SortStateEnum.NAME_DSC ? (
                        <FaSortDown className="inline" />
                      ) : (
                        <FaSort className="inline" />
                      )}
                    </div>
                  </th>
                  <th>
                    {" "}
                    <div
                      className="flex items-center justify-center"
                      onClick={() =>
                        setSortState((curr) =>
                          curr === null
                            ? SortStateEnum.UNAME_DSC
                            : curr === SortStateEnum.UNAME_DSC
                            ? SortStateEnum.UNAME_ASC
                            : null
                        )
                      }
                    >
                      Username
                      {sortState === SortStateEnum.UNAME_ASC ? (
                        <FaSortUp className="inline" />
                      ) : sortState === SortStateEnum.UNAME_DSC ? (
                        <FaSortDown className="inline" />
                      ) : (
                        <FaSort className="inline" />
                      )}
                    </div>
                  </th>
                  <th>
                    {" "}
                    <div
                      className="flex items-center justify-center"
                      onClick={() =>
                        setSortState((curr) =>
                          curr === null
                            ? SortStateEnum.COUNTRY_DSC
                            : curr === SortStateEnum.COUNTRY_DSC
                            ? SortStateEnum.COUNTRY_ASC
                            : null
                        )
                      }
                    >
                      Country
                      {sortState === SortStateEnum.COUNTRY_ASC ? (
                        <FaSortUp className="inline" />
                      ) : sortState === SortStateEnum.COUNTRY_DSC ? (
                        <FaSortDown className="inline" />
                      ) : (
                        <FaSort className="inline" />
                      )}
                    </div>
                  </th>
                  <th>
                    {" "}
                    <div
                      className="flex items-center justify-center"
                      onClick={() =>
                        setSortState((curr) =>
                          curr === null
                            ? SortStateEnum.EMAIL_DSC
                            : curr === SortStateEnum.EMAIL_DSC
                            ? SortStateEnum.EMAIL_ASC
                            : null
                        )
                      }
                    >
                      Email
                      {sortState === SortStateEnum.EMAIL_ASC ? (
                        <FaSortUp className="inline" />
                      ) : sortState === SortStateEnum.EMAIL_DSC ? (
                        <FaSortDown className="inline" />
                      ) : (
                        <FaSort className="inline" />
                      )}
                    </div>
                  </th>
                  <th>Account Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {searchUsers(
                  sortedEmployees.slice(
                    currentPageRange[0],
                    currentPageRange[1]
                  ),
                  searchKey
                ).map((employee) => (
                  <tr key={employee.username}>
                    <td>
                      <div>{employee.photo}</div>
                    </td>
                    <td>{employee.name}</td>
                    <td>{employee.username}</td>
                    <td>{employee.country}</td>
                    <td>{employee.email}</td>
                    <td>{employee.accountType} Member</td>
                    <td>
                      <button onClick={() => handleDisplayEditModal(employee)}>
                        ✏️
                      </button>
                      <button>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full text-center">
          {currentPageRange[0] !== 0 && (
            <FaArrowLeft
              className="inline mx-2 cursor-pointer"
              onClick={() =>
                setCurrentPageRange((prev) => [
                  prev[0] - pageSize,
                  prev[1] - pageSize,
                ])
              }
            />
          )}
          Page {Math.floor(currentPageRange[0] / pageSize) + 1} out of{" "}
          {Math.floor(sortedEmployees.length / pageSize)}
          {!(currentPageRange[1] + pageSize > sortedEmployees.length) && (
            <FaArrowRight
              className="inline mx-2 cursor-pointer"
              onClick={() =>
                setCurrentPageRange((prev) => [
                  prev[0] + pageSize,
                  prev[1] + pageSize,
                ])
              }
            />
          )}
        </div>
      </main>
      {showModal && (
        <Modal
          header={
            modalState === ModalStateEnum.ADD ? "Add Employee" : "Edit Emloyee"
          }
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}
