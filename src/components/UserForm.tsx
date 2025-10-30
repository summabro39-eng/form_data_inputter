import React, { useState } from 'react';
import { db, collection, addDoc } from '../firebase';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error when user types
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const submissionData = {
        ...formData,
        timestamp: new Date().toISOString()
      };
      
      const docRef = await addDoc(collection(db, 'submissions'), submissionData);
      console.log('Document written with ID: ', docRef.id);
      
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      alert('Form submitted successfully! Data saved to Firestore.');
    } catch (error: any) {
      console.error('Error submitting form: ', error);
      
      // Provide more specific error messages
      let errorMessage = 'Error submitting form. Please try again.';
      if (error.code === 'permission-denied') {
        errorMessage = 'Permission denied. Please check your Firestore security rules.';
      } else if (error.code === 'unavailable') {
        errorMessage = 'Firestore is unavailable. Please check your internet connection.';
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }
      
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="error-message" style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#ffe6e6', borderRadius: '4px' }}>
            {error}
          </div>
        )}
        {success && (
          <div className="success-message" style={{ color: 'green', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#e6ffe6', borderRadius: '4px' }}>
            Form submitted successfully! Data saved to Firestore.
          </div>
        )}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;