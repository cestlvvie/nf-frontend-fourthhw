'use client'
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createProduct } from '../services/productsService';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const CreateProduct = () => {
    const [product, setProduct] = useState({
        title: '',
        price: '',
        description: '',
        category: '',
    });
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const queryClient = useQueryClient();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const filesArray = Array.from(e.target.files);
            setImageFiles(filesArray);
        }
    };

    const mutation = useMutation(createProduct, {
        onSuccess: () => {
            queryClient.invalidateQueries('products');
            setProduct({
                title: '',
                price: '',
                description: '',
                category: '',
            });
            setImageFiles([]);
            toast.success('Product created successfully!');
        },
        onError: (error) => {
            toast.error('Error creating product');
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (Object.values(product).some((value) => !value.trim())) {
            toast.error('Please fill in all the input fields');
            return;
        }

        try {
            let imageUrls: string[] = [];
            for (const file of imageFiles) {
                const formData = new FormData();
                formData.append('file', file);
                const response = await axios.post('https://api.escuelajs.co/api/v1/files/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                imageUrls.push(response.data.location);
            }
    
            await mutation.mutateAsync({ ...product, images: imageUrls });
            
            // Reset the input value after successfully creating the product
            const imageInput = document.getElementById('image') as HTMLInputElement;
            if (imageInput) {
                imageInput.value = '';
            }
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };
    


    return (
       <div className="flex-1 flex justify-center flex-col">
        <div className="container ml-4 px-6 py-4 md:px-8">
            <h1 className="text-2xl md:text-3xl font-bold mt-8 mb-4">Create Product</h1>
            <form onSubmit={handleSubmit} className="max-w-lg">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        id="price"
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        rows={4}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <input
                        id="category"
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Images
                    </label>
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        multiple // Allow multiple files selection
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-black text-white rounded-full my-4 py-4 px-6 hover:bg-white hover:text-black"
                >
                    Create Product
                </button>
            </form>
            <ToastContainer position="top-right"/>
        </div>
        </div>
    );
};

export default CreateProduct;

