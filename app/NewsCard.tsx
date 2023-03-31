'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { NewsItem } from "./Types"

const NewsCard = () => {
    const [news, setNews] = useState<NewsItem[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            const response = await axios.get("http://localhost:15465/api/news");
            setNews(response.data);
        };
        fetchNews();
    }, []);

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {news.map((item) => (
                    <div key={item.Id} className="bg-white rounded-lg shadow-lg">
                        <img
                            src="https://via.placeholder.com/600x200"
                            alt={item.Title}
                            className="rounded-t-lg"
                        />
                        <div className="p-4">
                            <h2 className="mb-2 text-lg font-bold">{item.Title}</h2>
                            <p className="text-gray-600">{item.Description}</p>
                            <p className="mt-2 text-sm text-gray-500">{item.Date}</p>
                            <div className="mt-4">
                                <span className="inline-block px-3 py-1 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
                                    {item.Category?.Name}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsCard;
