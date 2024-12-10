import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {
        const fetchEnrollments = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/enrollments`, { headers: { 'Authorization': `Bearer ${token}` } });
            setEnrollments(response.data);
        };
        fetchEnrollments();
    }, []);

    return (
        <div className="student-dashboard">
            <h1>Your Enrolled Courses</h1>
            <ul>
                {enrollments.map((enrollment) => (
                    <li key={enrollment.course.id}>
                        {enrollment.course.title} - Progress: {enrollment.progress}%.
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentDashboard;
