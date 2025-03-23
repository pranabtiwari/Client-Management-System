import db from "../db.js";

export const getClients = async () => {
  const result = await db.query("SELECT * FROM clients_db");
  return result.rows;
};

export const createClients = async (clientData) => {
  const { name, email, job, rate, isactive } = clientData;

  try {
    const result = await db.query(
      "insert into clients_db (name, email, job ,rate ,isactive) values ($1, $2, $3, $4, $5) returning *",
      [name, email, job, rate, isactive]
    );
    return result.rows;
  } catch (error) {
    throw new Error("Failed to create client: " + error.message);
  }
};

export const updateClients = async (clientData, id) => {
  const { name, email, job, rate, isactive } = clientData;
  console.log("Updating client with ID:", id, "Data:", clientData);
  try {
    const result = await db.query(
      "UPDATE clients_db SET name=$1, email=$2, job=$3, rate=$4, isactive=$5 WHERE id=$6 RETURNING *",
      [name, email, job, rate, isactive, id]
    );
    console.log("Update result:", result.rows);
    return result.rows;
  } catch (error) {
    console.error("Update error:", error);
    throw new Error("Failed to update client: " + error.message);
  }
};

export const deleteClients = async (id) => {
  try {
    const result = await db.query(
      "DELETE FROM clients_db WHERE id=$1 RETURNING *",
      [id]
    );
    return result.rows; // Return the full result object
  } catch (error) {
    throw new Error("Failed to delete client: " + error.message);
  }
};


export const searchClientsByName = async (searchTerm) => {
  try {
    const result = await db.query(
      "SELECT * FROM clients_db WHERE name ILIKE $1 or email ILIKE $1 or job ILIKE $1",
      [`%${searchTerm}%`]
    );
    return result.rows;
  } catch (error) {
    throw new Error("Failed to search clients: " + error.message);
  }
};