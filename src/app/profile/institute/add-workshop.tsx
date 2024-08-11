'use client'

import React, { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from 'next/navigation';
import { useSelector } from "react-redux";
import { BiArrowBack } from 'react-icons/bi';
import { FaUpload, FaSave, FaLink } from "react-icons/fa";
import toast from "react-hot-toast";
import DropZone from "@/components/dropzone";
import { v4 as uuidv4 } from 'uuid';
import { RootState } from "@/lib/store";

interface WorkshopData {
  title: string;
  description: string;
  link: string;
}

interface FileWithPreview extends File {
  preview?: string;
}

export default function AddWorkshop() {
  const router = useRouter();
  const { name, aishe } = useSelector((state: RootState) => state.auth.institute.details);

  const [data, setData] = useState<WorkshopData>({
    title: '',
    description: '',
    link: ''
  });

  const [cover, setCover] = useState<FileWithPreview[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const workshopId = uuidv4();

    if (!data.title) {
      toast.error("Title is required");
      return;
    }
    if (!data.description) {
      toast.error("Description is required");
      return;
    }
    if (cover.length === 0) {
      toast.error("Cover image is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('workshop_id', workshopId);
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('link', data.link);
      formData.append('author', name);
      formData.append('aishe', aishe);
      formData.append('cover', cover[0]);

      toast.loading('Uploading Workshop')
      const response = await fetch('/api/workshops/add', {
        method: 'POST',
        body: formData,
      });

      toast.dismiss()
      if (response.ok) {
        toast.success("Workshop uploaded successfully!");
        router.push('/profile/workshops');
      } else {
        toast.error('Failed to upload workshop');
      }

    } catch (error) {
      console.error(error);
      toast.error("An error occurred while submitting the workshop");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <main className="p-5 md:p-10 min-h-screen bg-gradient-to-b from-lightTheme-secondary to-lightTheme-primary text-lightTheme-text dark:from-darkTheme-secondary dark:to-darkTheme-primary dark:text-darkTheme-text">
      <section className="bg-white/30 dark:bg-gray-800/30 py-4 rounded-lg shadow-md backdrop-blur-sm relative">
        <button
          className='absolute left-4 top-1/2 transform -translate-y-1/2'
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <BiArrowBack size={25} className='hover:scale-110 transition-all' />
        </button>
        <h1 className="text-center text-3xl font-bold">Add Workshop</h1>
      </section>

      <section className='mt-8 bg-white/20 dark:bg-gray-800/20 p-6 rounded-lg shadow-lg backdrop-blur-sm'>
        <form onSubmit={handleSubmit} encType='multipart/form-data' className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label className="block text-xl font-medium mb-2" htmlFor="title">Workshop Title<span className="text-red-500">*</span></label>
                <input
                  className="bg-white/50 dark:bg-gray-700/50 rounded-md text-black dark:text-white w-full h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="title"
                  name="title"
                  value={data.title}
                  onChange={handleInputChange}
                  type="text" />
              </div>
              <div>
                <label className="block text-xl font-medium mb-2" htmlFor="description">Description<span className="text-red-500">*</span> (100 Words)</label>
                <textarea
                  className="bg-white/50 dark:bg-gray-700/50 text-black dark:text-white w-full rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="description"
                  name='description'
                  value={data.description}
                  onChange={handleInputChange}
                  rows={10} />
              </div>
            </div>
            <div>
              <h3 className='text-center text-2xl font-bold mb-4'>Cover Image<span className="text-red-500">*</span></h3>
              <DropZone
                className="cursor-pointer h-40 w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex justify-center items-center hover:border-blue-500 transition-colors"
                group={false}
                maxFiles={1}
                filetype="img"
                files={cover}
                setFiles={setCover}
              />
            </div>
            <div>
              <label className="block text-xl font-medium mb-2" htmlFor="link">Workshop Link<span className="text-red-500">*</span></label>
              <div className="relative">
                <FaLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="bg-white/50 dark:bg-gray-700/50 rounded-md text-black dark:text-white w-full h-10 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="link"
                  name="link"
                  value={data.link}
                  onChange={handleInputChange}
                  type="url"
                  placeholder="https://example.com" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <button type="submit" className="btn btn-primary">
              <FaUpload className="mr-2" /> Submit Workshop
            </button>
            <button type="button" className="btn btn-secondary">
              <FaSave className="mr-2" /> Save as Draft
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}