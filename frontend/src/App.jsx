import React, { useState } from 'react';
import { NavBar } from './components/NavBar';
import { TableList } from './components/TableList';
import ModalForm from './components/ModalForm';
import axios from 'axios';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalForm, setModalForm] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [clientData, setClientData] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // Added to trigger table refresh

  // Modified to accept client data for editing
  const handleModal = (mode, client = null) => {
    setModalForm(mode);
    setClientData(client); // Set client data for edit mode
    setIsOpen(true);
  };

  // Enhanced to handle both add and edit, with table refresh
  const handleSubmit = async (newClientData) => {
    if (modalForm === 'add') {
      try {
        const response = await axios.post('http://localhost:3000/api/clients', newClientData);
        console.log('Add Response:', response.data);
        setRefreshKey((prev) => prev + 1); // Trigger TableList to refetch data
      } catch (error) {
        console.error('Add Error:', error);
      }
    } else if (modalForm === 'edit' && clientData) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/clients/${clientData.id}`,
          newClientData
        );
        console.log('Edit Response:', response.data);
        setRefreshKey((prev) => prev + 1); // Trigger TableList to refetch data
      } catch (error) {
        console.error('Edit Error:', error);
      }
    }
    setIsOpen(false); // Close modal after submission
  };

  return (
    <div>
      <NavBar onOpen={() => handleModal('add')} onSearch={setSearchTerm} />
      <TableList handleOpen={handleModal} searchTerm={searchTerm} refreshKey={refreshKey} />
      <ModalForm
        isOpen={isOpen}
        onSubmit={handleSubmit}
        onClose={() => setIsOpen(false)}
        mode={modalForm}
        clientData={clientData}
      />
    </div>
  );
};

export default App;