'use client'
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getProducts, getCategories, getProductsByCategory } from '../services/productsService';
import Button from './button'; // Import the Button component

const ProductList = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const { data: productsData, error: productsError, isLoading: productsLoading } = useQuery(
        ['products', selectedCategory],
        () => (selectedCategory ? getProductsByCategory(selectedCategory) : getProducts())
    );

    const { data: categoriesData, error: categoriesError, isLoading: categoriesLoading } = useQuery('categories', getCategories);

    const filteredProducts = productsData?.data.filter((product: any) =>
        selectedCategory ? product.category === selectedCategory : true
    );

    if (productsLoading || categoriesLoading) return <div>Loading...</div>;
    if (productsError || categoriesError) return <div>Error fetching data</div>;

    return (
        <section className="container mx-auto px-6 md:px-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Button
                        variant={selectedCategory === null ? "solid" : "outline"}
                        size="md"
                        onClick={() => setSelectedCategory(null)}
                    >
                        all
                    </Button>
                    {categoriesData?.data.map((category: string) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? "solid" : "outline"}
                            size="md"
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                    {selectedCategory ? categoriesData?.data.find((c: any) => c.id === selectedCategory)?.name : "All Products"}
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product: any) => (
                    <a
                        key={product.id}
                        href="#"
                        className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                        <img
                            src={product.image} // Assuming product has an 'image' property
                            alt={product.title} // Assuming product has a 'title' property
                            width={300}
                            height={300}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-medium">{product.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 line-clamp-2">{product.description}</p>
                            <p className="font-medium">${product.price.toFixed(2)}</p>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default ProductList;

