// src/components/subject/Subjects.jsx
import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import SubjectForm from "./SubjectForm";
import SubjectTable from "./SubjectTable";

const Subjects = ({ teachers, students, userRole, userId }) => {
  const [subjects, setSubjects] = useState([]);
  const [editingSubject, setEditingSubject] = useState(null);

  const fetchSubjects = async () => {
    const { data } = await apiClient.get("/subjects");
    if (userRole === "teacher") {
      setSubjects(data.filter(s => s.teacherIds.includes(userId)));
    } else if (userRole === "student") {
      setSubjects(data.filter(s => s.studentIds.includes(userId)));
    } else {
      setSubjects(data);
    }
  };

  const handleDelete = async (id) => {
    await apiClient.delete(`/subjects/${id}`);
    fetchSubjects();
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div>
      <h2>Subjects</h2>
      <SubjectForm
        subject={editingSubject}
        onSuccess={() => { setEditingSubject(null); fetchSubjects(); }}
        teachers={teachers}
        students={students}
      />
      <SubjectTable
        subjects={subjects}
        onEdit={setEditingSubject}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Subjects;
