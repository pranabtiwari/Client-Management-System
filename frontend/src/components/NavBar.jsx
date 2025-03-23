export const NavBar = ({onOpen, onSearch}) => {

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };



  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">Client Management System</a>
      </div>
      <div className="navbar-end mr-5 ">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="">
        <a className="btn btn-primary whitespace-nowrap " onClick={onOpen}>Add Client</a>
      </div>
    </div>
  );
};
