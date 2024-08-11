'use client'

import DropZone from "@/components/dropzone";
import { useState, FormEvent, ChangeEvent } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { v4 as uuidv4 } from 'uuid';
import toast from "react-hot-toast";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { FaSave, FaUpload } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface ProjectData {
  title: string;
  description: string;
  markdown: string;
}

export default function AddProject() {
  const { aishe, id, name } = useSelector((state: RootState) => state.auth.student.details);
  const router = useRouter();

  const [data, setData] = useState<ProjectData>({
    title: '',
    description: '',
    markdown: ''
  }); 

  const [cover, setCover] = useState<File[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!data.title) {
      toast.error("Title is required");
      return;
    }
    if (!data.description) {
      toast.error("Description is required");
      return;
    }
    if (!data.markdown) {
      toast.error("Synopsis is required");
      return;
    }
    if (cover.length === 0) {
      toast.error("Cover is required");
      return;
    }

    const projectId = uuidv4();

    try {
      const formData = new FormData();
      formData.append('projectId', projectId);
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('markdown', data.markdown);
      formData.append('owner', id);
      formData.append('author', name);
      formData.append('aishe', aishe);
      formData.append('cover', cover[0]);

      images.forEach((image, index) => {
        formData.append(`image${index}`, image);
      });

      files.forEach((file, index) => {
        formData.append(`document${index}`, file);
      });

      toast.loading('Submitting Project')

      const response = await fetch('/api/projects/add', {
        method: 'POST',
        body: formData,
      });

      toast.dismiss();
      if (response.ok) {
        toast.success("Project submitted successfully!");
        router.push('/profile/projects');
      }else{
        toast.error('Submition Failed')
      }

    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred while submitting the project");
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
        <h1 className="text-center text-3xl font-bold">Add Project</h1>
      </section>

      <section className='mt-8 bg-white/20 dark:bg-gray-800/20 p-6 rounded-lg shadow-lg backdrop-blur-sm'>
        <form onSubmit={handleSubmit} encType='multipart/form-data' className="space-y-8">
          <div>
            <h2 className="text-center text-2xl font-bold mb-6">Basic Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-xl font-medium mb-2" htmlFor="title">Project Title<span className="text-red-500">*</span></label>
                  <input
                    className="bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-md text-black dark:text-white w-full h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="title"
                    name="title"
                    value={data.title}
                    onChange={handleInputChange}
                    type="text" />
                </div>
                <div>
                  <label className="block text-xl font-medium mb-2" htmlFor="description">Description<span className="text-red-500">*</span> (300 Characters)</label>
                  <textarea
                    className="bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-md text-black dark:text-white w-full h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="description"
                    name='description'
                    value={data.description}
                    onChange={handleInputChange}
                    rows={5} />
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
            </div>
          </div>

          <div>
            <label className="block text-xl font-medium mb-2" htmlFor="markdown">Synopsis<span className="text-red-500">*</span> (Markdown Content)</label>
            <textarea
              className="bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-md text-black dark:text-white w-full h-10 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="markdown"
              name='markdown'
              value={data.markdown}
              onChange={handleInputChange}
              rows={30} />
          </div>

          <div>
            <h3 className='text-center text-2xl font-bold mb-4'>Project Images (Maximum 6)</h3>
            <DropZone
              className="cursor-pointer h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex justify-center items-center hover:border-blue-500 transition-colors"
              group={true}
              maxFiles={6}
              filetype="img"
              files={images}
              setFiles={setImages}
            />
          </div>

          <div>
            <h3 className="text-center text-2xl font-bold mb-4">Related Files<span className="text-red-500">*</span> (Maximum 2)</h3>
            <DropZone
              className="cursor-pointer h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex justify-center items-center hover:border-blue-500 transition-colors"
              group={true}
              maxFiles={2}
              filetype="doc"
              files={files}
              setFiles={setFiles}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <button type="submit" className="btn btn-primary">
              <FaUpload className="mr-2" /> Submit Project
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
