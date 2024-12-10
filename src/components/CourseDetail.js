import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const token = localStorage.getItem('token');
                const [courseResponse, profileResponse] = await Promise.all([
                    axios.get(`${process.env.REACT_APP_API_URL}/courses/${id}`, { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get(`${process.env.REACT_APP_API_URL}/user`, { headers: { Authorization: `Bearer ${token}` } }),
                ]);
                setCourse(courseResponse.data);
                setRole(profileResponse.data.role);
            } catch (error) {
                window.location.href = '/login';
            }
        };
        fetchCourse();
    }, [id]);

    const handleEnroll = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${process.env.REACT_APP_API_URL}/courses/${id}/enroll`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('You have successfully enrolled in this course!');
        } catch (error) {
            console.error('Error enrolling in course:', error);
        }
    };
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${process.env.REACT_APP_API_URL}/courses/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('You have successfully deleted this course!');
            window.location.href = '/';
        } catch (error) {
            console.error('Error deleting this course:', error);
        }
    };
    if (!course) return <p>Loading...</p>;

    return (
        <div className="course-detail">
            <h1>{course.title}</h1>{role === 'instructor' && <button onClick={handleDelete}>Delete</button  >}
            <p>{course.description}</p>
            <p><strong>Instructor:</strong> {course.instructor.name}</p>
            {role === 'student' && <button onClick={handleEnroll}>Enroll</button>}
            <h2>Lessons</h2>
            <ul>
                {course.lessons.map((lesson) => (
                    <li key={lesson.id}><Link to={`/courses/${id}/lessons/${lesson.id}`}>{lesson.title}</Link></li>
                ))}
            </ul>
        </div>
    );
};

export default CourseDetail;
