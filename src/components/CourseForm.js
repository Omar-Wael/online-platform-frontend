import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CourseForm = ({ isEditMode = false }) => {
    const { id } = useParams(); // Get the course ID if in edit mode
    const navigate = useNavigate();

    const [course, setCourse] = useState({ title: '', description: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditMode && id) {
            // Fetch the course details if it's edit mode
            const fetchCourse = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setCourse(response.data);
                } catch (error) {
                    console.error('Error fetching course:', error);
                }
            };
            fetchCourse();
        }
    }, [isEditMode, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (isEditMode) {
                // Update existing course
                await axios.put(`${process.env.REACT_APP_API_URL}/courses/${id}`, course, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert('Course updated successfully');
            } else {
                // Create new course
                await axios.post(`${process.env.REACT_APP_API_URL}/courses/create`, course, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert('Course created successfully');
            }

            navigate('/dashboard'); // Redirect to course list after success
        } catch (error) {
            console.error('Error submitting course:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="course-form">
            <h2>{isEditMode ? 'Edit Course' : 'Create Course'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Course Title</label>
                    <input
                        type="text"
                        name="title"
                        value={course.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Course Description</label>
                    <textarea
                        name="description"
                        value={course.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : isEditMode ? 'Update Course' : 'Create Course'}
                </button>
            </form>
        </div>
    );
};

export default CourseForm;
