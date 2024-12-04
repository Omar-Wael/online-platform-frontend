import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
    return (
        <div className="course-card">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <Link to={`/courses/${course.id}`}>View Details</Link>
        </div>
    );
};

export default CourseCard;
