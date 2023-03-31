'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { NewsItem } from "./Types";
import Link from "next/link";

const NewsCard = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const fetchNews = async () => {
            const response = await axios.get("http://localhost:15465/api/news");
            setNews(response.data.reverse());
            setTotalPages(Math.ceil(response.data.length / 6));
        };
        fetchNews();
    }, []);

    const startIndex = (currentPage - 1) * 6;
    const endIndex = startIndex + 6;
    const currentNews = news.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {currentNews.map((item) => (
                    <div key={item.Id} className="bg-white rounded-lg shadow-lg">
                        <Link href={`/news/${item.Id}`}>
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
                        </Link>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        className={`mx-2 px-4 py-2 font-medium rounded-full ${currentPage === page ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-700"
                            }`}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default NewsCard;

