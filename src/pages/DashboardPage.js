import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import StudentDashboard from '../components/StudentDashboard';
import InstructorDashboard from '../components/InstructorDashboard';

const DashboardPage = () => {
    const { user } = useContext(AuthContext);
    if (!user) {
        return <div>Loading...</div>; // You can replace this with a loading spinner
    }

    return (
        <>
            {user.role === 'instructor' ? (
                <InstructorDashboard />
            ) : (
                <StudentDashboard />
            )}
        </>
    );
};

export default DashboardPage;
