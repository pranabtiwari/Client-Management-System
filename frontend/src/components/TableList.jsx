import axios from "axios";
import { useEffect, useState } from "react";


export const TableList = ({ handleOpen, searchTerm }) => {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/clients");
        setTableData(response.data);
        setError(null); // Clear error on success
      } catch (error) {
        setError(error.message); // Store error message
      }
    };

    fetchTableData();
  }, []);


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/clients/${id}`);
      setTableData(tableData.filter((client) => client.id !== id));
    } catch (error) {
      setError('Failed to delete client: ' + error.message);
    }
  };


  const filterData = tableData.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.job.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  if (tableData.length === 0 && !error) {
    return <div className="text-center">Loading...</div>;
  }

    






  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 container mx-auto mt-4">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Job</th>
            <th>Rate</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filterData.map((client, index) => (
            <tr key={client.id || index} className="hover:bg-base-300">
              <th>{index + 1}</th>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.job}</td>
              <td>{client.rate}</td>
              <td>
                <button
                  className={`btn rounded-full w-20 ${client.isactive ? "btn-primary" : "btn-secondary"}`}
                >
                  {client.isactive ? "Active" : "Inactive"}
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleOpen("edit", client)} // Pass client data if needed
                  className="btn btn-secondary mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(client.id)} // Add delete handler
                  className="btn btn-accent"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
