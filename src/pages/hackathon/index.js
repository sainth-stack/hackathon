
import React, { useRef, useState } from 'react';
import './index.css';
import axios from 'axios';

import robo from '../../assets/images/robo.webp';
import circle from '../../assets/images/circle.png'

import { baseURL } from '../../const';
import Toast from '../../components/toast';
import { useNavigate } from 'react-router-dom';
import TeamSection from './components/teams';
import Repo from './components/repo';
import logo from '../../assets/images/image3.jpg'
import When from './components/when';
import Sponser from './components/sponsers';
const AgentHackathon = () => {
    const defaultdata = {
        firstName: '',
        lastName: '',
        email: '',
        github: '',
        country: '',
        linkedin: '',
        affiliation: '',
        agree: false,
    }
    const [form, setForm] = useState(defaultdata);
    const [toast, setToast] = useState({ message: '', type: '' });
    const navigate = useNavigate()
    const formRef = useRef(null); // Reference for the form section
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('first_name', form.firstName);
        formData.append('last_name', form.lastName);
        formData.append('email', form.email);
        formData.append('github_profile', form.github);
        formData.append('linkedin_profile', form.linkedin);
        formData.append('country', form.country);
        formData.append('affiliation_status', form.affiliation);
        formData.append('file_path', form.file);

        try {
            const response = await axios.post(`${baseURL}/submission/create/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Show success toast if the request is successful
            setToast({ message: 'Registration successfull!', type: 'success' });
            console.log('Response:', response.data);
            setForm(defaultdata)
        } catch (error) {
            // Show error toast if there is an issue with the request
            setToast({ message: 'Failed to create planner. Please try again.', type: 'error' });
            console.error('Error submitting form:', error);
        }
    };
    const scrollToForm = () => {
        formRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="hackathon-container">
            {/* Existing design code here... */}
            <div class="header">
                <div></div>
                {/* <button class="about-tensorops">In conjunction with DISAI</button> */}
                <img src={logo} alt='' width={150} height={50} />
            </div>

            <div class="main-content">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    <div className='title22 fontclass'>
                        <div class="fontclass p-0 m-0 headerText">AGENTIC AI</div>
                        <span class="highlight fontclass">HACKATHON</span>
                        <p class="date-location fontclass">December 7-8 | 2024 | Online</p>
                        <div class="button-group">
                            <button class="register-btn fontclass" onClick={() => scrollToForm()}>Register Now</button>
                            <button class="sponsor-btn fontclass" onClick={() => navigate('/sponsorship')}>Sponsor</button>
                        </div>
                    </div>

                </div>
                    <div className="robot-image" style={{ position: 'relative', width: '500px', height: '100%' }}>
                        <img
                            src={circle}
                            alt="Circle"
                            width="550"
                            style={{
                                position: 'absolute',
                                zIndex: 1,
                                top: -10,
                                left: 0
                            }}
                        />
                        <img
                            src={robo}
                            alt="Robot"
                            width="250"
                            style={{
                                position: 'absolute',
                                zIndex: 2,
                                marginTop: '80px',
                                marginLeft: '13rem',
                                transform: 'translate(-50%, -50%)'
                            }}
                        />
                    </div>

            </div>

            <div className="expectations fontclass">
                <h2 className='fontclass'>What to expect?</h2>
                <ul className='fontclass'>
                    <li>🤖 Build advanced AI agents tailored to innovative use cases of your choice</li>
                    <li>📚 Craft a detailed tutorial showcasing your AI creation process</li>
                    <li>👥 Join solo or as a team—choose what works best for you!</li>
                    <li>⏰ Flexible 12-hour schedule to suit your availability</li>
                    <li>🚀 Submit your project by creating a pull request to the popular GenAI-Agents repository</li>
                    <li>🏆 Win exciting prizes and gain industry recognition</li>
                    <li>🎓 Learn from experts through exclusive webinars and online workshops</li>
                    <li>💬 Engage with the community via our dedicated Discord server for networking and mentorship</li>
                </ul>

            </div>
            <When scrollToForm={scrollToForm} />

            <TeamSection />
            <Repo />
            <Sponser />
            <div className="form-container fontclass">
                <h2>Join Agentic AI Virtual Hackathon</h2>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <p className="form-note fontclass">
                        *Please note that submitting your registration does <strong>not</strong> guarantee a spot in the hackathon.
                        You will receive a confirmation email if your participation is approved.
                    </p>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="registration-form fontclass">
                    <div className="form-row fontclass">
                        <div className="form-group fontclass">
                            <label className='fontclass'>First name *</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Enter your first name"
                                value={form.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group fontclass">
                            <label className='fontclass'>Last name *</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Enter your last name"
                                value={form.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Email *</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>GitHub profile *</label>
                            <input
                                type="url"
                                name="github"
                                placeholder="GitHub profile URL"
                                value={form.github}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Country *</label>
                            <input
                                type="text"
                                name="country"
                                placeholder="Enter your country"
                                value={form.country}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>LinkedIn profile URL *</label>
                            <input
                                type="url"
                                name="linkedin"
                                placeholder="LinkedIn profile URL"
                                value={form.linkedin}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <label className='fontclass'>Affiliation or Current status *</label>
                        <input
                            type="text"
                            name="affiliation"
                            placeholder="e.g., Company Name, University, Independent Developer..."
                            value={form.affiliation}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group full-width" >
                        <label className="checkbox-container fontclass" style={{ display: 'flex', gap: '4px', width: '100%', marginTop: '20px', alignItems: 'center', justifyContent: 'center' }}>
                            <input
                                type="checkbox"
                                name="agree"
                                checked={form.agree}
                                onChange={handleChange}
                                required
                                style={{ width: '20px', marginBottom: '4px' }}
                            />
                            By registering for this event, you agree to the <a href="#terms">terms and conditions</a>
                        </label>
                    </div>

                    <button type="submit" className="submit-btn fontclass">Send</button>
                </form>
            </div>
            {toast.message && (
                <Toast
                    message={toast.message}
                    onClose={() => setToast({ message: '', type: '' })}
                    type={toast.type}
                />
            )}
        </div>
    );
}

export default AgentHackathon;
