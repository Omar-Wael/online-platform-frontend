import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${id}`);
            setCourse(response.data);
        };
        fetchCourse();
    }, [id]);

    if (!course) return <p>Loading...</p>;

    return (
        <div className="course-detail">
            <h1>{course.title}</h1>
            <p>{course.description}</p>
            <h2>Lessons</h2>
            <ul>
                {course.lessons.map((lesson) => (
                    <li key={lesson.id}>{lesson.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default CourseDetail;
