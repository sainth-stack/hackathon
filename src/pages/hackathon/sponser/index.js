import React, { useState } from 'react';
import axios from 'axios';
import './index.css';
import hand from '../../../assets/images/hand.webp';
import { baseURL } from '../../../const';
import Toast from '../../../components/toast';

const Sponsership = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        companyName: '',
        sponsorship: '',
    });

    const [toast, setToast] = useState(null); // For displaying success/error messages

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('first_name', form.firstName);
        formData.append('last_name', form.lastName);
        formData.append('email', form.email);
        formData.append('company_name', form.companyName);
        formData.append('sponsorship_level', form.sponsorship);

        try {
            const response = await axios.post(`${baseURL}/partner/create/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setToast({ message: 'Sponsorship registration successful!', type: 'success' });
            setForm({
                firstName: '',
                lastName: '',
                email: '',
                companyName: '',
                sponsorship: '',
            });
        } catch (error) {
            setToast({ message: 'Failed to register. Please try again.', type: 'error' });
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="sponsership-container">
            <div className="sponsership-header">
                <h1>BECOME A HACKATHON PARTNER</h1>
            </div>

            <div className="sponsership-cards">
                <div className="card platinum">
                    <h2>Platinum</h2>
                    <ul>
                        <li>Large Logo on All Pages</li>
                        <li>Featured in All Email Communications</li>
                        <li>Opportunity to Provide Prizes During Final Event</li>
                        <li>Hosting 1 Workshop/Webinar during the event</li>
                        <li>Customized Challenge or Problem Statement</li>
                        <li>Access to Participant Data (Winners Only, Opt-in)</li>
                        <li>Option to be a Judge</li>
                        <li>3 Maximum sponsors in the category</li>
                    </ul>
                </div>

                <div className="card gold">
                    <h2>Gold</h2>
                    <ul>
                        <li>Medium Logo on Homepage</li>
                        <li>Featured in 3 Email Updates</li>
                        <li>Opportunity to Provide Prizes During Final Event</li>
                        <li>Hosting 1 Workshop/Webinar during the event</li>
                        <li>Option to be a Judge</li>
                        <li>3 Maximum sponsors in the category</li>
                    </ul>
                </div>

                <div className="card silver">
                    <h2>Silver</h2>
                    <ul>
                        <li>Small Logo in Sponsors Page</li>
                        <li>Mention in 1 Email Update</li>
                        <li>Maximum sponsors in the category</li>
                    </ul>
                </div>
            </div>

            <div className="sponsership-form">
                <h2>INTERESTED IN BECOMING A HACKATHON PARTNER?</h2>
                <form onSubmit={handleSubmit} className="formform">
                    <div className="form-row">
                        <input
                            type="text"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            placeholder="First name *"
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            placeholder="Last name *"
                            required
                        />
                    </div>
                    <div className="form-row">
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email *"
                            required
                        />
                        <input
                            type="text"
                            name="companyName"
                            value={form.companyName}
                            onChange={handleChange}
                            placeholder="Company name *"
                            required
                        />
                    </div>
                    <div className="form-row sponsorship-options">
                        <label className="labellabel">
                            <input
                                type="radio"
                                name="sponsorship"
                                value="Platinum"
                                checked={form.sponsorship === 'Platinum'}
                                onChange={handleChange}
                                required
                                className="input"
                                style={{ width: '20px', height: '20px' }}
                            />
                            Platinum
                        </label>
                        <label className="labellabel">
                            <input
                                type="radio"
                                name="sponsorship"
                                value="Gold"
                                checked={form.sponsorship === 'Gold'}
                                onChange={handleChange}
                                className="input"
                                style={{ width: '20px', height: '20px' }}
                            />
                            Gold
                        </label>
                        <label className="labellabel">
                            <input
                                type="radio"
                                name="sponsorship"
                                value="Silver"
                                checked={form.sponsorship === 'Silver'}
                                onChange={handleChange}
                                className="input"
                                style={{ width: '20px', height: '20px' }}
                            />
                            Silver
                        </label>
                    </div>

                    <button type="submit" className="buttonbutton">
                        Submit
                    </button>
                </form>

                {toast && (
                    <div className={`toast ${toast.type}`}>
                        {toast.message}
                    </div>
                )}
            </div>
            {toast?.message && (
                <Toast
                    message={toast?.message}
                    onClose={() => setToast({ message: '', type: '' })}
                    type={toast.type}
                />
            )}
        </div>
    );
};

export default Sponsership;
