import * as clientService from "../services/clientServices.js";

export const getClients = async (req, res) => {
  try {
    const clients = await clientService.getClients();
    res.status(200).json(clients);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const createClients = async (req, res) => {
  try {
    const newClient = await clientService.createClients(req.body);
    res.status(201).json(newClient[0]); // Return the first (and only) inserted row
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const updateClients = async (req, res) => {
  try {
    const updatedClient = await clientService.updateClients(
      req.body,
      req.params.id
    );
    if (updatedClient.length === 0) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json(updatedClient[0]); // Return the updated row
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const deleteClients = async (req, res) => {
  try {
    const result = await clientService.deleteClients(req.params.id);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};


export const searchClientsByName = async (req, res) => {
  try {
    const searchTerm = req.query.q; 
    const result = await clientService.searchClientsByName(searchTerm);
    if (result.length === 0) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};