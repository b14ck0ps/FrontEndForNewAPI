'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { NewsItem } from '../Types';
import { Category } from '../Types';

export default function AddNews() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [cid, setCid] = useState(0);
    const [categories, setCategories] = useState<Category[]>([]);

    const [error, setError] = useState<string>('');


    const router = useRouter();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get<Category[]>('http://localhost:15465/api/category/');
                setCategories(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();
    }, []);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };

    const handleCidChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCid(Number(event.target.value));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await axios.post<NewsItem>('http://localhost:15465/api/news/', {
                Title: title,
                Description: description,
                Cid: cid,
                Date: date,
            });

            if (response.status === 200) {
                router.push('/');
            } else {
                setError('Error submitting news. Please try again.');
            }
        } catch (error) {
            console.error(error);
            setError('Error submitting news. Please try again.');
        }
    };


    return (
        <div className="p-4">
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                {error && <p className="text-center text-red-500 ">{error}</p>}
                <div className="mb-4">
                    <label htmlFor="title" className="block mb-2 font-bold text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={handleTitleChange}
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2 font-bold text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="date" className="block mb-2 font-bold text-gray-700">
                        Date
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={date}
                        onChange={handleDateChange}
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="cid" className="block mb-2 font-bold text-gray-700">
                        Category
                    </label>
                    <select
                        id="cid"
                        name="cid"
                        value={cid}
                        onChange={handleCidChange}
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    >
                        {categories.map((category) => (
                            <option key={category.Id} value={category.Id}>
                                {category.Name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                    Submit
                </button>
            </form>
        </div>
    );

}

