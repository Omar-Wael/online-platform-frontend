import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CourseList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/courses`, { headers: { 'Authorization': `Bearer ${token}` } });
                setCourses(response.data);

            } catch (error) {
                window.location.href = '/login';

            }
        };
        fetchCourses();
    }, []);

    return (
        <div className="course-list">
            <h1>Available Courses</h1>
            <ul>
                {courses.map((course) => (
                    <li key={course.id}>
                        <Link to={`/courses/${course.id}`}>{course.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseList;
