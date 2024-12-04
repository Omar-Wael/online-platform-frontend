import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InstructorDashboard = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/instructor/courses`);
            setCourses(response.data);
        };
        fetchCourses();
    }, []);

    return (
        <div className="instructor-dashboard">
            <h1>Your Courses</h1>
            <ul>
                {courses.map((course) => (
                    <li key={course.id}>
                        {course.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InstructorDashboard;
