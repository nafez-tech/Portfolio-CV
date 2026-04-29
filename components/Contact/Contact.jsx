import React, { useState } from 'react';
import { contactData } from './ContactData';
import { API_ROUTES } from '@/lib/API';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        subject: '',
    });

    const [submitStatus, setSubmitStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);

    const response = await fetch(API_ROUTES.POST_CONTACT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
    if (response.ok) {
        setSubmitStatus('success');
        setFormData({
        name: "",
        email: "",
        message: "",
        subject: '',
      })
      setLoading(false);
    } else {
        setSubmitStatus('error');
    }
};

    return (
        <div id="contact" className="section pb-0">
            <div className="container">
                <div className="row g-4 g-xl-5">
                    <div className="col-12 col-xl-4">
                        <span className="title-heading text-white-04">{contactData.mainData.title}</span>
                        <h1 className="display-3 fw-medium mb-0">{contactData.mainData.title2} <span className="text-gradient">{contactData.mainData.title2Span}</span></h1>
                    </div>
                    <div className="col-12 col-xl-8">
                        <div className="row g-4 g-lg-5">
                            <div className="col-12 col-md-6">
                                <h6 className="sm-heading">Email:</h6>
                                <h3 className="mb-0">{contactData.mainData.email}</h3>
                            </div>
                            <div className="col-12 col-md-6">
                                <h6 className="sm-heading">Call:</h6>
                                <h3 className="mb-0">{contactData.mainData.phone}</h3>
                            </div>
                        </div>
                        {/* Contact Form */}
                        <div className="contact-form mt-4 mt-lg-5 text-xl-end">
                            <form method="post" id="contactform" onSubmit={handleSubmit}>
                                <div className="row gx-3 gy-0">
                                    <div className="col-12 col-md-6">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <input type="email" id="email" name="email" placeholder="E-Mail" required 
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <input type="text" id="subject" name="subject" placeholder="Subject" required 
                                value={formData.subject}
                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                />
                                <textarea name="message" id="message" placeholder="Message"
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                ></textarea>
                                <button className="button button-dot" type="submit"
                                disabled={loading}
                                >
                                    <span data-text="Send Message">
                                        {loading ? 
                                        "Sending..." : "Send Message"}
                                    </span>
                                </button>
                            </form>
                            {/* Submit result */}
                            <div className="submit-result">
                                {submitStatus === 'success' && (
                                    <span id="success">Thank you! Your Message has been sent.</span>
                                )}
                                {submitStatus === 'error' && (
                                    <span id="error">Something went wrong. Please try again!</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
