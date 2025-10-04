// src/components/Courses.js
import React, { useEffect, useState } from 'react';
import { getCourses } from '../api';

const Courses = ({ studentJWT }) => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses(studentJWT);
        setCourses(data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch courses');
      }
    };

    fetchCourses();
  }, [studentJWT]);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Courses</h2>
      <ul>
        {courses.map((c) => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
