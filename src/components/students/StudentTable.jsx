import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteStudent } from "../../redux/usersSlice";

const StudentTable = ({ setEditingStudent }) => {
  const students = useSelector(state => state.users.students);
  const dispatch = useDispatch();

  if (!students.length) return <p>No students available.</p>;

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "30px" }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Grade/Class</th>
          <th>Section</th>
          <th>Student ID</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map(s => (
          <tr key={s.id} style={{ borderBottom: "1px solid #ccc" }}>
            <td>{s.firstName} {s.lastName}</td>
            <td>{s.email}</td>
            <td>{s.phone}</td>
            <td>{s.grade}</td>
            <td>{s.section}</td>
            <td>{s.studentId}</td>
            <td>
              <button onClick={() => setEditingStudent(s)} style={{ marginRight: "5px" }}>Edit</button>
              <button onClick={() => dispatch(deleteStudent(s.id))}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
