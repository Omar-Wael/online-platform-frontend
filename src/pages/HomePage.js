import React, { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard'; // Reusable component to display courses

const HomePage = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Fetch courses from API (assumed you have an API service)
        fetch('/api/courses')
            .then(response => response.json())
            .then(data => setCourses(data));
    }, []);

    return (
        <div>
            <h1>Available Courses</h1>
            <div className="courses-list">
                {courses.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
