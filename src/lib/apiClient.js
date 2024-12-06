// Get all employees
export async function getEmployees() {
  const res = await fetch("/api/employees", {
    method: "GET",
  });
  if (!res.ok) throw new Error("Failed to fetch employees");
  return res.json();
}

// Create a new employee
export async function createEmployee(formData) {
  const res = await fetch("/api/employees", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to create employee");
  }
  return res.json();
}

// Update an existing employee by ID
export async function updateEmployee(id, formData) {
  const res = await fetch(`/api/employees/${id}`, {
    method: "PUT",
    body: formData,
    // Do NOT set 'Content-Type' header when sending FormData
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to update employee");
  }
  return res.json();
}

// Delete an employee by ID
export async function deleteEmployee(id) {
  const res = await fetch(`/api/employees/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to delete employee");
  }
  return res.json();
}
