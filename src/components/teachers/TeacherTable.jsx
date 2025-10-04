import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTeacher } from "../../redux/usersSlice";

const TeacherTable = ({ setEditingTeacher }) => {
  const teachers = useSelector((state) => state.users.teachers);
  const dispatch = useDispatch();

  if (teachers.length === 0) return <p>No teachers available.</p>;

  return (
    <table border="1" style={{ width: "100%", marginBottom: "30px", borderCollapse: "collapse" }}>
      <thead style={{ backgroundColor: "#1976d2", color: "#fff" }}>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Department</th>
          <th>Teacher ID</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {teachers.map((t) => (
          <tr key={t.id}>
            <td>{t.firstName}</td>
            <td>{t.lastName}</td>
            <td>{t.email}</td>
            <td>{t.phone}</td>
            <td>{t.department}</td>
            <td>{t.teacherId}</td>
            <td>
              <button onClick={() => setEditingTeacher(t)} style={{ marginRight: "5px" }}>Edit</button>
              <button onClick={() => dispatch(deleteTeacher(t.id))}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TeacherTable;
