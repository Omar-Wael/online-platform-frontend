import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const InstructorDashboard = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/instructor/courses`, { headers: { 'Authorization': `Bearer ${token}` } });
            setCourses(response.data);
        };
        fetchCourses();
    }, []);
    return (
        <div className="instructor-dashboard">
            <h1>Welcome, Instructor!</h1>
            <p>Manage your courses and lessons here:</p>

            <div className="course-management">
                <h2>Course Management</h2>
                <ul>
                    <li>
                        <Link to="/instructor/courses/create">Create a New Course</Link>
                    </li>
                    <li>
                        <Link to="/instructor/courses">View Your Courses</Link>
                    </li>
                </ul>
            </div>

            <div className="lesson-management">
                <h2>Lesson Management</h2>
                <ul>
                    <li>
                        <Link to="/instructor/lessons/create">Create a New Lesson for Course</Link>
                    </li>
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
                </ul>
            </div>
        </div>
    );
};

export default InstructorDashboard;
