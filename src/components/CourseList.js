import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CourseList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/courses`);
            setCourses(response.data);
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
