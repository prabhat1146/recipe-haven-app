import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SettingsPage = () => {
    const [userSettings, setUserSettings] = useState({
        username: '',
        email: '',
        notifications: false,
        privacy: 'public',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch user settings from an API
        const fetchSettings = async () => {
            try {
                const response = await axios.get('/api/user/settings');
                setUserSettings(response.data);
            } catch (err) {
                setError('Failed to load settings');
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUserSettings({
            ...userSettings,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        try {
            await axios.put('/api/user/settings', userSettings);
            alert('Settings saved successfully!');
        } catch (err) {
            setError('Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p>Loading settings...</p>;
    // if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="ml-10 max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={userSettings.username}
                        onChange={handleInputChange}
                        className="w-full border rounded p-2 mt-1"
                    />
                </div>
                <div>
                    <label className="block font-semibold">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={userSettings.email}
                        onChange={handleInputChange}
                        className="w-full border rounded p-2 mt-1"
                    />
                </div>
                <div>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="notifications"
                            checked={userSettings.notifications}
                            onChange={handleInputChange}
                            className="mr-2"
                        />
                        Enable Notifications
                    </label>
                </div>
                <div>
                    <label className="block font-semibold">Privacy Settings</label>
                    <select
                        name="privacy"
                        value={userSettings.privacy}
                        onChange={handleInputChange}
                        className="w-full border rounded p-2 mt-1"
                    >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="friends">Friends Only</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
                    disabled={saving}
                >
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default SettingsPage;
