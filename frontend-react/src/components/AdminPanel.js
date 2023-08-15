import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updateData, setUpdateData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://amaankhan.net/users.php"
      );
      const { users } = response.data;
      setUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (email) => {
    try {
      await axios.post("https://amaankhan.net/delete.php", { email });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setUpdateData({
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
    });
    setIsModalOpen(true);
  };

  const handleUpdateChange = (e) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
  };

  const updateUser = async () => {
    try {
      await axios.post("https://amaankhan.net/update.php", {
        email: selectedUser.email,
        firstName: updateData.firstName,
        lastName: updateData.lastName,
        phoneNumber: updateData.phoneNumber,
      });
      fetchUsers();
      setSelectedUser(null);
      setUpdateData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin Panel</h2>
      <div className="form-group d-flex flex-row justify-content-end align-items-center">
        <input
          type="search"
          className="form-control w-25 text-right"
          placeholder="Search by name, email, or phone number"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Profile Picture</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="6">
                <h1 className="text-center">No users available</h1>
              </td>
            </tr>
          ) : (
            filteredUsers.map((user) => (
              <tr key={user.email}>
                <td>
                  {user.profilePic && (
                    <img
                      src={`data:image/png;base64,${user.profilePic}`}
                      alt="Profile Picture"
                      className="img-thumbnail"
                      style={{ width: "110px", height: "120px" }}
                    />
                  )}
                </td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>
                  <button
                    className="btn btn-danger m-2"
                    onClick={() => deleteUser(user.email)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-secondary ml-2"
                    onClick={() => openUpdateModal(user)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Update User"
      >
        <h2>Update User</h2>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="form-control"
            value={updateData.firstName}
            onChange={handleUpdateChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="form-control"
            value={updateData.lastName}
            onChange={handleUpdateChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            className="form-control"
            value={updateData.phoneNumber}
            onChange={handleUpdateChange}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={updateUser}>
          Save Changes
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={closeModal}
        >
          Cancel
        </button>
      </Modal>
    </div>
  );
};

export default AdminPanel;
