'use client';
import { useEffect, useState } from 'react';
import { Category, NewsItem } from '../../Types'
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Props = {
    params: {
        newsId: string;
    }
};

const NewsItemEditForm = ({ params }: Props) => {

    const router = useRouter();

    const [newsItem, setNewsItem] = useState<NewsItem>();

    const [categories, setCategories] = useState<Category[]>([]);

    const [error, setError] = useState("");
    useEffect(() => {
        const fetchNews = async () => {
            const response = await axios.get(`http://localhost:15465/api/news/${params.newsId}`);
            setNewsItem(response.data);
        };
        const fetchCategories = async () => {
            try {
                const response = await axios.get<Category[]>('http://localhost:15465/api/category/');
                setCategories(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCategories();
        fetchNews();
    }, []);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedNewsItem = { ...newsItem, Title: event.target.value };
        setNewsItem(updatedNewsItem);
    };


    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const updatedNewsItem = { ...newsItem, Description: event.target.value };
        setNewsItem(updatedNewsItem);
    };
    const handleCidChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const updatedNewsItem = { ...newsItem, Cid: Number(event.target.value) };
        setNewsItem(updatedNewsItem);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            console.log(newsItem);
            const response = await axios.patch<NewsItem>('http://localhost:15465/api/news/update', {
                Id: params.newsId,
                Title: newsItem?.Title,
                Description: newsItem?.Description,
                Cid: newsItem?.Cid,
                Date: newsItem?.Date,
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
        <div>
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
                            value={newsItem?.Title || ''}
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
                            value={newsItem?.Description || ''}
                            onChange={handleDescriptionChange}
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
                            value={newsItem?.Cid || ''}
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
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewsItemEditForm;
