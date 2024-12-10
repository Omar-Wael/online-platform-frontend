import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const LessonDetail = () => {
    const { courseId, lessonId } = useParams();
    const [lesson, setLesson] = useState(null);

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${courseId}/lessons/${lessonId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setLesson(response.data);
            } catch (error) {
                console.error('Error fetching lesson:', error);
                // window.location.href = '/login';
            }
        };
        fetchLesson();
    }, [courseId, lessonId]);

    if (!lesson) return <p>Loading...</p>;

    return (
        <div className="lesson-detail">
            <h1>{lesson.title}</h1> <Link to={`/instructor/courses/${courseId}/lessons/${lessonId}/edit`}>Edit</Link>
            <p>{lesson.content}</p>
            <video controls>
                <source src={lesson.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <h2>Supporting Materials</h2>
            <a href='#'>Download PDF</a>
        </div>
    );
};

export default LessonDetail;
