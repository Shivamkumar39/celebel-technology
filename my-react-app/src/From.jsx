import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialState = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  showPassword: false,
  phoneCode: '',
  phoneNumber: '',
  country: '',
  city: '',
  pan: '',
  aadhar: '',
};

const citiesByCountry = {
  India: ['Delhi', 'Mumbai', 'Bangalore'],
  USA: ['New York', 'Los Angeles', 'Chicago'],
};

function Form() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Simple validation
const validate = () => {
  const newErrors = {};

  if (!form.firstName) newErrors.firstName = 'First name is required.';
  if (!form.lastName) newErrors.lastName = 'Last name is required.';
  if (!form.username) newErrors.username = 'Username is required.';
  if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid email is required.';
  if (!form.password || form.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
  if (!form.phoneCode) newErrors.phoneCode = 'Country code is required.';
  if (!form.phoneNumber || !/^\d{10}$/.test(form.phoneNumber)) newErrors.phoneNumber = 'Valid 10-digit number is required.';
  if (!form.country) newErrors.country = 'Country is required.';
  if (!form.city) newErrors.city = 'City is required.';

  // PAN validation: accept 10 or 11 digit/alphanumeric without strict pattern
  if (!form.pan || !/^[A-Za-z0-9]{10,11}$/.test(form.pan)) newErrors.pan = 'PAN should be 10-11 alphanumeric characters.';

  // Aadhar validation: remove spaces, check if 12 digits only
  const aadharDigits = form.aadhar.replace(/\s+/g, '');
  if (!aadharDigits || !/^\d{12}$/.test(aadharDigits)) newErrors.aadhar = 'Aadhar must be exactly 12 digits.';

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/success', { state: form });
    }
  };

  // Disable submit button if any required field is empty
const isFormValid = () => {
  const aadharDigits = form.aadhar.replace(/\s+/g, '');
  return (
    form.firstName &&
    form.lastName &&
    form.username &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.password && // non-empty password of any length (or keep length check)
    form.phoneCode &&
    /^\d{10}$/.test(form.phoneNumber) &&
    form.country &&
    form.city &&
    /^[A-Za-z0-9]{10,11}$/.test(form.pan) &&
    /^\d{12}$/.test(aadharDigits)
  );
};


  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Registration Form</h2>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">

        {['firstName', 'lastName', 'username'].map((field) => (
          <div key={field}>
            <label className="block font-medium mb-1 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
          </div>
        ))}

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Password</label>
          <input
            type={form.showPassword ? 'text' : 'password'}
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label className="flex items-center mt-1 text-sm">
            <input
              type="checkbox"
              checked={form.showPassword}
              onChange={() => setForm({ ...form, showPassword: !form.showPassword })}
              className="mr-2"
            />
            Show Password
          </label>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Phone Number</label>
          <div className="flex gap-2">
            <input
              name="phoneCode"
              placeholder="+91"
              value={form.phoneCode}
              onChange={handleChange}
              className="w-20 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="phoneNumber"
              placeholder="9876543210"
              value={form.phoneNumber}
              onChange={handleChange}
              className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {(errors.phoneCode || errors.phoneNumber) && (
            <p className="text-red-500 text-sm">{errors.phoneCode || errors.phoneNumber}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Country</label>
          <select
            name="country"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value, city: '' })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select</option>
            {Object.keys(citiesByCountry).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">City</label>
          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select</option>
            {(citiesByCountry[form.country] || []).map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">PAN No.</label>
          <input
            name="pan"
            value={form.pan}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.pan && <p className="text-red-500 text-sm">{errors.pan}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Aadhar No.</label>
          <input
            name="aadhar"
            value={form.aadhar}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.aadhar && <p className="text-red-500 text-sm">{errors.aadhar}</p>}
        </div>

        <button
          type="submit"
          disabled={!isFormValid()}
          className={`w-full py-2 px-4 rounded text-white ${
            isFormValid() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
