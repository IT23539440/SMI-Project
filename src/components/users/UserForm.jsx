import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, updateUser } from "../../redux/usersSlice";

const UserForm = ({ editingUser, setEditingUser }) => {
  const dispatch = useDispatch();
  const userRole = localStorage.getItem("userRole") || "student";
  const isAdmin = userRole === "admin" || userRole === "owner";

  const [formData, setFormData] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    if (editingUser) setFormData(editingUser);
  }, [editingUser]);

  if (!isAdmin) return <p>You do not have permission to manage users.</p>;

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (editingUser) {
      dispatch(updateUser(formData));
      setEditingUser(null);
    } else {
      dispatch(addUser({ ...formData, id: Date.now() }));
    }
    setFormData({ name: "", email: "", role: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        name="role"
        placeholder="Role"
        value={formData.role}
        onChange={handleChange}
        required
      />
      <button type="submit">{editingUser ? "Update User" : "Add Userr"}</button>
      {editingUser && <button onClick={() => setEditingUser(null)}>Cancel</button>}
    </form>
  );
};

export default UserForm;
