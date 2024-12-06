// Get all employees
export async function getEmployees() {
  const res = await fetch('/api/employees', {
    method: 'GET',
  });
  if (!res.ok) throw new Error('Failed to fetch employees');
  return res.json();
}

// Get a single employee by ID
export async function getEmployee(id) {
  const res = await fetch(`/api/employees/${id}`, {
    method: 'GET',
  });
  if (!res.ok) throw new Error('Failed to fetch employee');
  return res.json();
}

// Create a new employee
// formData should include keys: photo (File), name, username, country, email, accountType
export async function createEmployee(formData) {
  const res = await fetch('/api/employees', {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to create employee');
  }
  return res.json();
}
