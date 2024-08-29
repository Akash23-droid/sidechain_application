import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SignOutButton } from '@clerk/clerk-react';
import axios from 'axios';



const Dashboard = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [resume, setResume] = useState(null);
    const [githubLink, setGithubLink] = useState('');
    // const [skills, setSkills] = useState({});

    const navigate = useNavigate();
    console.log("navigate : ", navigate);


    const handleFileChange = (event) => {
        if (event.target.files) {
            setResume(event.target.files[0]);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Here you would typically send the data to your server
        console.log({ name, email, resume, githubLink });
        const formData = new FormData();
        formData.append('resume', resume);
        try {
            const response = await axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // setSkills(response.data.skills);
            console.log("response.data.skills : ", response.data.skills);
            const skills = response.data.skills;
            console.log("skills : ", skills);
            // navigate('/dashboard');
            navigate('/dashboard2', { state: { skills } });
        } catch (error) {
            console.error('Error uploading resume:', error);
        }
        // Redirect to the dashboard after form submission
        // navigate('/dashboard2');
    };


    return (
        <div>
            <SignOutButton signOutCallback={() => window.location.href = '/'}>
                <button>Sign Out</button>
            </SignOutButton>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Resume:</label>
                    <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                </div>
                <div>
                    <label>github Profile</label>
                    <input
                        // type="url"
                        type="text"
                        value={githubLink}
                        onChange={(e) => setGithubLink(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" style={{ border: '2px solid red', borderRadius: '5px' }}>Continue</button>
            </form>
        </div>
    )
};

export default Dashboard;
