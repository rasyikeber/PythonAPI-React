import { useState, useEffect } from 'react';

const APItest = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/api/recipe/hello')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setMessage(data.message); // Assuming your API returns an object with a `message` field
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }, []);

    return (
        <div className="flex items-center justify-center h-screen">
        <div className="bg-cyan-600 text-3xl font-bold">
            {message}
            <h1 className="text-center text-red-400">Hello Tailwindcss!</h1>
        </div>
        </div>
    );
};

export default APItest;
