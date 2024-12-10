import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const LessonForm = ({ isEditMode = false }) => {
    const { courseId, lessonId } = useParams(); // Get course and lesson IDs (only for editing)
    const navigate = useNavigate();

    const [lesson, setLesson] = useState({ title: '', content: '', videoUrl: '', materials: [] });
    const [courses, setCourses] = useState([]); // To hold the list of courses
    const [selectedCourse, setSelectedCourse] = useState(courseId || ''); // Selected course ID
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/instructor/courses`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCourses(response.data);
                if (courseId && !selectedCourse) {
                    setSelectedCourse(courseId); // Set selected course if editing a lesson
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, [courseId, selectedCourse]);

    useEffect(() => {
        if (isEditMode && lessonId && selectedCourse) {
            // Fetch lesson details if in edit mode
            const fetchLesson = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${selectedCourse}/lessons/${lessonId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setLesson(response.data);
                } catch (error) {
                    console.error('Error fetching lesson:', error);
                }
            };
            fetchLesson();
        }
    }, [isEditMode, lessonId, selectedCourse]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLesson((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        const materialsArray = Array.from(files).map(file => ({ name: file.name, url: URL.createObjectURL(file) }));
        setLesson((prev) => ({ ...prev, materials: materialsArray }));
    };

    const handleCourseChange = (e) => {
        setSelectedCourse(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const lessonData = { ...lesson };

            if (isEditMode) {
                // Update existing lesson
                await axios.put(`${process.env.REACT_APP_API_URL}/courses/${selectedCourse}/lessons/${lessonId}`, lessonData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert('Lesson updated successfully');
            } else {
                // Create new lesson
                await axios.post(`${process.env.REACT_APP_API_URL}/courses/${selectedCourse}/lessons`, lessonData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert('Lesson created successfully');
            }

            navigate(`/courses/${selectedCourse}`); // Redirect to course page after success
        } catch (error) {
            console.error('Error submitting lesson:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="lesson-form">
            <h2>{isEditMode ? 'Edit Lesson' : 'Create Lesson'}</h2>
            <form onSubmit={handleSubmit}>
                {/* Course selection for new lesson */}
                {!isEditMode && (
                    <div>
                        <label>Select Course</label>
                        <select name="course" value={selectedCourse} onChange={handleCourseChange} required>
                            <option value="">Select a course</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.title}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div>
                    <label>Lesson Title</label>
                    <input
                        type="text"
                        name="title"
                        value={lesson.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Lesson Content</label>
                    <textarea
                        name="content"
                        value={lesson.content}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Video URL</label>
                    <input
                        type="url"
                        name="videoUrl"
                        value={lesson.videoUrl}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Supporting Materials</label>
                    <input
                        type="file"
                        name="materials"
                        multiple
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : isEditMode ? 'Update Lesson' : 'Create Lesson'}
                </button>
            </form>
        </div>
    );
};

export default LessonForm;
