import React, { useEffect, useRef, useState } from 'react';

const ModalForm = ({ isOpen, onClose, mode, onSubmit, clientData }) => {
  const [rate, setRate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [job, setJob] = useState('');
  const [status, setStatus] = useState(false); // Boolean for isactive

  // Populate form fields when modal opens
  useEffect(() => {
    if (isOpen && mode === 'edit' && clientData) {
      setName(clientData.name || '');
      setEmail(clientData.email || '');
      setJob(clientData.job || '');
      setRate(clientData.rate ? clientData.rate.toString() : '');
      setStatus(clientData.isactive || false);
    } else if (isOpen && mode === 'add') {
      // Reset fields for add mode
      setName('');
      setEmail('');
      setJob('');
      setRate('');
      setStatus(false);
    }
  }, [isOpen, mode, clientData]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value === 'Active');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const clientDataToSubmit = {
      name,
      email,
      job,
      rate: Number(rate), // Convert to number for backend
      isactive: status,   // Boolean value
    };
    onSubmit(clientDataToSubmit); // Pass data to App's handleSubmit
    onClose(); // Close modal
  };

  const modalRef = useRef(null);

  // Control modal visibility
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          {mode === 'edit' ? 'Edit Client' : 'Add Client'}
        </h3>

        <form onSubmit={handleSubmit} className="w-full mt-5">
          <div className="flex flex-col gap-3">
            <label className="input input-bordered flex items-center w-full gap-2">
              Name
              <input
                type="text"
                className="w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center w-full gap-2">
              Email
              <input
                type="text"
                className="w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center w-full gap-2">
              Job
              <input
                type="text"
                className="w-full"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </label>
            <div className="flex gap-2">
              <label className="input input-bordered flex items-center gap-2 w-full">
                Rate
                <input
                  type="number"
                  className="w-full"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
              </label>
              <select
                value={status ? 'Active' : 'Inactive'} // Reflect boolean as string
                onChange={handleStatusChange}
                className="select input-bordered"
              >
                <option value="Inactive">Inactive</option>
                <option value="Active">Active</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button type="button" className="btn mr-2" onClick={onClose}>
              Close
            </button>
            <button type="submit" className="btn btn-success">
              {mode === 'edit' ? 'Save Changes' : 'Add Client'}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ModalForm;