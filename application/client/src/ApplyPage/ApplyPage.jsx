/**************************************************************
* Author(s): Kenneth Wen, Bryan Lee
* Last Updated: 11/19/2024
*
* File:: ApplyPage.jsx
*
* Description:: This file handles the apply page for users to 
*               apply for tutor listings. Name and SFSU email 
*               are prefilled from user's backend information.
*               Users can upload images, pdfs, and videos.
*
**************************************************************/

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import loadingIcon from '../icons/LoadingIcon.svg';
import { MdMail, MdPerson } from 'react-icons/md';

import BASE_URL from '../utils/config';

const ApplyPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [title, setTitle] = useState('');
    const [salesPitch, setSalesPitch] = useState('');
    const [description, setDescription] = useState('');
    const [subjectId, setSubjectId] = useState('');
    const [pricing, setPricing] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const [loading, setLoading] = useState(false);

    const handleImageUpload = (e) => {
        const image = e.target.files[0];
        if (!image) {
            return;
        }

        const maxSize = 5 * 1024 * 1024; // 5 MB max size
        const allowedExtensions = ['svg', 'png', 'jpg', 'jpeg'];

        const extension = image.name.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(extension)) {
            alert("Invalid file type. Please upload an SVG, PNG, JPG, or JPGF.");
            setSelectedImage(null);
            return;
        }

        if (image && image.size > maxSize) {
            alert("Image size exceeds 5MB. Please upload a smaller image.");
            setSelectedImage(null);
        } else {
            setSelectedImage(image);
        }
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        const maxSize = 10 * 1024 * 1024; // 10 MB max size

        const allowedExtensions = ['pdf'];

        const extension = file.name.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(extension)) {
            alert("Invalid file type. Please upload an PDF only.");
            setSelectedImage(null);
            return;
        }

        if (file && file.size > maxSize) {
            alert("File size exceeds 10MB. Please upload a smaller file.");
            setSelectedFile(null);
        } else {
            setSelectedFile(file);
        }
    }

    const handleVideoUpload = (e) => {
        const video = e.target.files[0];
        if (!video) {
            return;
        }

        const maxSize = 250 * 1024 * 1024; // 250 MB max siz
        const allowedExtensions = ['mp4', 'mov', 'webm'];

        const extension = video.name.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(extension)) {
            alert("Invalid file type. Please upload an MP4, MOV, or WEBM.");
            setSelectedImage(null);
            return;
        }

        if (video && video.size > maxSize) {
            alert("File size exceeds 10MB. Please upload a smaller file.");
            setSelectedVideo(null);
        } else {
            setSelectedVideo(video);
        }
    }

    // Handle form submission for tutor application
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Trigger lazy registeration
        if (!user) {
            // Save form data to local storage
            const formState = {
                title,
                salesPitch,
                description,
                subjectId,
                pricing,
                // Only saves the name of the file. This will be use in alerting the user to reupload.
                selectedImage: selectedImage ? selectedImage.name : null,
                selectedFile: selectedFile ? selectedFile.name : null,
                selectedVideo: selectedVideo ? selectedVideo.name : null,
            };
            localStorage.setItem("formData", JSON.stringify(formState));
    
            window.scroll({ top: 0 });
            navigate("/login");
            return;
        }

        setLoading(true);

        if (!selectedImage || !title || !salesPitch || !description || !subjectId || !pricing) {
            alert("Please fill out all required fields.");
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('salesPitch', salesPitch);
        formData.append('description', description);
        formData.append('subjectId', subjectId);
        formData.append('pricing', pricing);
        formData.append('image', selectedImage);
        formData.append('attached_file', selectedFile);
        formData.append('attached_video', selectedVideo);

        try {
            await axios.put(`${BASE_URL}/api/apply`, formData, {
                headers: {
                    'Authorization': localStorage.getItem("authToken"),
                    'Content-Type': 'multipart/form-data',
                }
            });
            setLoading(false);
            navigate("/dashboard", { state: { successAlert: true } });
        } catch (error) {
            setLoading(false);
            console.error("Error uploading listing:", error);
            alert("There was an error submitting your application. Please try again.");
        }
    };

    // Load search bar drop down subjects
    const [subjectList, setSubjectList] = useState([]);
    const fetchSubjects = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/subject`);
            setSubjectList(response.data);
        } catch (error) {
            console.error("Error fetching subjects:", error);
        }
    }

    // Render subject drop down on mount
    useEffect(() => {
        fetchSubjects();
    }, []);

    // Repopulate data on re-entry from lazy registeration
    useEffect(() => {
        const savedFormData = localStorage.getItem("formData");
        if (savedFormData) {
            const parsedData = JSON.parse(savedFormData);
    
            setTitle(parsedData.title || "");
            setSalesPitch(parsedData.salesPitch || "");
            setDescription(parsedData.description || "");
            setSubjectId(parsedData.subjectId || "");
            setPricing(parsedData.pricing || "");
    
            // Note: Files like selectedImage, selectedFile, and selectedVideo need to be re-uploaded
            if (parsedData.selectedImage || parsedData.selectedFile || parsedData.selectedVideo) {
                alert(`Please re-upload your image or attached files/videos.`);
            }
        }
    
        // Clear local storage after repopulating
        localStorage.removeItem("formData");
    }, []);    

    return (
        <div
            className="top-0 flex items-center justify-center sm:min-h-screen bg-gray-100 bg-fixed relative"
            style={{
                backgroundImage: "url('/SFSU-img-4.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
        >
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black opacity-30 z-10 pointer-events-none"></div>
            
            {/* Form Container */}
            <form action="#" onSubmit={handleSubmit}
                className="sm:max-w-lg lg:max-h-fit relative z-20 mx-auto p-6 bg-white sm:rounded-lg shadow overflow-y-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Apply As Tutor Form</h2>

                {/* Loading icon */}
                {loading &&
                    <div className="flex items-center justify-center my-16">
                        <img src={loadingIcon} className="w-20 h-20" alt="Loading..." />
                    </div>
                }

                <div className={`${loading ? "hidden" : "flex"} flex-col gap-4 mb-4`}>

                    {/* Name Input Field*/}
                    <div>
                        <label htmlFor="name-icon" className="block mb-2 text-sm font-semibold text-gray-900">Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none -ml-1">
                                <MdPerson className="ml-0 mr-2 text-gray-500" size={25} />
                            </div>
                            <input
                                type="text"
                                name="name"
                                id="name-icon"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full pl-10 p-2.5"
                                placeholder="Sign in/Register to apply as a tutor"
                                value={user?.name || ""}
                                disabled
                            />
                        </div>
                    </div>

                    {/* Email Input Field*/}
                    <div>
                        <label htmlFor="email-address-icon" className="block mb-2 text-sm font-semibold text-gray-900">SFSU Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <MdMail className="-ml-1 mr-2 text-gray-500" size={22} />
                            </div>
                            <input
                                type="text"
                                name="email"
                                id="email-address-icon"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full pl-10 p-2.5"
                                placeholder="Sign in/Register to apply as a tutor"
                                value={user?.email || ""}
                                disabled
                            />
                        </div>
                    </div>

                    {/* Price Input Field*/}
                    <div>
                        <label htmlFor="price" className="block mb-2 text-sm font-semibold text-gray-900">Price $/hr <label className="text-red-600">*</label></label>
                        <div className="relative">
                            <svg
                                className="w-5 h-5 text-gray-500 absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"
                                />
                            </svg>
                        <input type="number" value={pricing || ""} onChange={(e) => setPricing(e.target.value)} min="1" step="1" name="price" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full pl-10 p-2.5" placeholder="Enter price per hour" required />
                    </div>
                </div>

                    {/* Subject Dropdown Field*/}
                    <div>
                        <label htmlFor="category" className="block mb-2 text-sm font-semibold text-gray-900">Which Subject Are You Tutoring? <label className="text-red-600">*</label></label>
                        <select id="category" value={subjectId || ""} onChange={(e) => setSubjectId(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required>
                            <option value="">---</option>

                            {subjectList.map((subjectItem) => (
                                <option key={subjectItem.id} value={subjectItem.id}>
                                    {subjectItem.name}
                                </option>
                            ))}

                        </select>
                    </div>

                    {/* Title Input Field*/}
                    <div className="sm:col-span-1">
                        <label htmlFor="title" className="block mb-2 text-sm font-semibold text-gray-900">Creative title for listing <label className="text-red-600">*</label></label>
                        <textarea id="title" rows="3" maxLength={100} value={title || ""} onChange={(e) => setTitle(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-600 focus:border-primary-600 " placeholder="Create a creative short title here! (100 characters max)" required></textarea>
                    </div>

                    {/* Pitch Input Field*/}
                    <div className="sm:col-span-2">
                        <label htmlFor="description" className="block mb-2 text-sm font-semibold text-gray-900">Short pitch for listing <label className="text-red-600">*</label></label>
                        <textarea id="description" rows="5" maxLength={300} value={salesPitch || ""} onChange={(e) => setSalesPitch(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-600 focus:border-primary-600 " placeholder="Advertise yourself here! (300 characters max)" required></textarea>
                    </div>

                    {/* Tutor bio Input Field*/}
                    <div className="sm:col-span-3">
                        <label htmlFor="description" className="block mb-2 text-sm font-semibold text-gray-900">About Me <label className="text-red-600">*</label></label>
                        <textarea id="description" rows="8" value={description || ""} onChange={(e) => setDescription(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-600 focus:border-primary-600 " placeholder="Write your tutor bio here" required></textarea>
                    </div>
                </div>

                {/* Upload Image */}
                <div className={`${loading ? "hidden" : "flex"} w-full py-1`}>
                    <label className="block mb-1 text-sm font-semibold text-gray-900">
                        Upload Tutor Listing Picture: <span className="text-red-600">*</span>&emsp;&emsp; <u>{selectedImage ? selectedImage.name : 'No file selected'}</u>
                    </label>
                </div>
                <div className={`${loading ? "hidden" : "flex"} items-center justify-center w-full py-2 pb-6`}>
                    <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-32  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 relative"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none">
                            <svg
                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG, or JPGF (MAX. 5MB)</p>
                        </div>
                        <input
                            type="file"
                            id="dropzone-file"
                            className="absolute opacity-0 cursor-pointer"
                            style={{ width: '100%', height: '100%', top: 0, left: 0 }}
                            accept=".svg,.png,.jpg, .jpgf"
                            onChange={handleImageUpload}
                            required
                        />
                    </label>
                </div>

                {/* Upload Resume/CV*/}
                <div className={`${loading ? "hidden" : "flex"} w-full py-1`}>
                    <label className="block mb-1 text-sm font-semibold text-gray-900">
                        Upload Resume/CV (optional):&emsp;&emsp; <u>{selectedFile ? selectedFile.name : 'No file selected'}</u>
                    </label>
                </div>
                <div className={`${loading ? "hidden" : "flex"} items-center justify-center w-full py-2 pb-6`}>
                    <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-32  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 relative"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none">
                            <svg
                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">PDF ONLY (MAX. 10MB)</p>
                        </div>
                        <input
                            type="file"
                            id="dropzone-file"
                            className="absolute opacity-0 cursor-pointer"
                            style={{ width: '100%', height: '100%', top: 0, left: 0 }}
                            accept=".pdf"
                            onChange={handleFileUpload}
                        />
                    </label>
                </div>

                {/* Upload Video*/}
                <div className={`${loading ? "hidden" : "flex"} w-full py-1`}>
                    <label className="block mb-1 text-sm font-semibold text-gray-900">
                        Upload Video (optional):&emsp;&emsp; <u>{selectedVideo ? selectedVideo.name : 'No file selected'}</u>
                    </label>
                </div>
                <div className={`${loading ? "hidden" : "flex"} items-center justify-center w-full py-2 pb-6`}>
                    <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-32  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 relative"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none">
                            <svg
                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">MP4, MOV, or WebM (MAX. 250MB)</p>
                        </div>
                        <input
                            type="file"
                            id="dropzone-file"
                            className="absolute opacity-0 cursor-pointer"
                            style={{ width: '100%', height: '100%', top: 0, left: 0 }}
                            accept=".mp4,.mov,.webm"
                            onChange={handleVideoUpload}
                        />
                    </label>
                </div>

                <div className="text-sm pt-4 pb-2">
                    <p>Listing may take up to 24 to 48 hours to be approved by an admin before going public.</p>
                </div>
                <button type="submit" className={`${loading ? "hidden" : "flex"} text-white inline-flex items-center bg-[#231161] hover:bg-[#1f0e55] focus:ring-[#552988] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-4`}>
                    Submit Form
                </button>
                <button type="cancel"onClick={() => navigate("/search")} className={`${loading ? "hidden" : "flex"} text-white inline-flex items-center bg-red-600 hover:bg-red-800 focus:ring-red-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5`}>
                    Cancel
                </button>
            </form>
        </div>
    )
}

export default ApplyPage;