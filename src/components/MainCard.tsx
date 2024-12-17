"use client";
//coded by Varun on 17-12-2024
import React, { useEffect, useState, useRef } from "react";

interface Car {
    id: string;
    modelName: string;
    bodyType: string;
    modelType: string;
    imageUrl: string;
}

export const MainCard: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [filteredCars, setFilteredCars] = useState<Car[]>([]);
    const [filter, setFilter] = useState<string>("all");
    const [currentIndex, setCurrentIndex] = useState<number>(0); 
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const btnLearn = "Learn >"; // for button name only
    const btnShop = "Shop >"; //for button name only

    useEffect(() => {
        fetch("/api/cars.json")
            .then((response) => response.json())
            .then((data) => {
                setCars(data);
                setFilteredCars(data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFilter = event.target.value;
        setFilter(selectedFilter);

        if (selectedFilter === "all") {
            setFilteredCars(cars);
        } else {
            setFilteredCars(cars.filter((car) => car.bodyType === selectedFilter));
        }
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    // Handle mobile carousel dot change
    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className="container">
            <div className="filter">
                <label htmlFor="bodyType">Filter by Body Type: </label>
                <select id="bodyType" value={filter} onChange={handleFilterChange}>
                    <option value="all">All</option>
                    <option value="suv">SUV</option>
                    <option value="estate">Estate</option>
                    <option value="sedan">Sedan</option>
                </select>
            </div>

            <div className="carousel-container">
                <div className="carousel" ref={scrollContainerRef}>
                    {filteredCars.map((car, index) => (
                        <div key={car.id} className="car-card">
                            <div className="car-details">
                                <p className="body-type">{car.bodyType}</p>
                                {filteredCars.length > 1 && (
                                    <div className="model-info">
                                        <h3 className="model-name">{car.modelName}</h3>
                                        <span className="model-type">{car.modelType}</span>
                                    </div>
                                )}
                            </div>
                            <img src={car.imageUrl} alt={car.modelName} className="car-image" />
                            <div className="car-links">
                                <a href={`https://www.volvocars.com/`} target="_blank" className="link left-link">{btnLearn}</a>
                                <a href={`https://www.volvocars.com/`} className="link right-link" target="_blank">{btnShop}</a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile carousel dots */}
                {filteredCars.length > 1 && (
                    <div className="carousel-dots">
                        {filteredCars.map((_, index) => (
                            <div
                                key={index}
                                className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
                                onClick={() => handleDotClick(index)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Arrow container */}
            <div className="arrow-container">
                <button className="scroll-button left" onClick={scrollLeft}></button>
                <button className="scroll-button right" onClick={scrollRight}></button>
            </div>
        </div>
    );
};
