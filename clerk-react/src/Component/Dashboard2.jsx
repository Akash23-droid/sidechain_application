import React from 'react';
import { SignOutButton } from '@clerk/clerk-react';
import { useLocation } from 'react-router-dom';



function Dashboard2() {
    const location = useLocation();
    const { skills } = location.state || { skills: [] };
    console.log("skills : ", skills);
    return (
        <div>
            <h1>Welcome to your dashboard!</h1>
            <h3>Your Skills:</h3>
            {skills.length > 0 ? (
                <ul>
                    {skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
            ) : (
                <p>No skills found. Please upload your resume.</p>
            )}
            <SignOutButton signOutCallback={() => window.location.href = '/'}>
                <button>Sign Out</button>
            </SignOutButton>
        </div>
    )
}

export default Dashboard2
