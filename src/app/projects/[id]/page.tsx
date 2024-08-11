import React from "react";
import ReactMarkdown from 'react-markdown';
import { IoDocumentAttachOutline } from "react-icons/io5";
import NoProjectFound from "./no-project-found";
import Image from "next/image";

interface Project {
    aishe: string;
    created_at: string;
    description: string;
    id: number;
    markdown: string;
    owner: string;
    author: string;
    project_id: string;
    title: string;
    cover: string;
    images: string[];
    documents: string[];
}

interface Props {
    params: { id: string }
}

const fetchProject = async (id: string) => {
    try {
        // Determine the base URL
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

        // Construct the full URL
        const url = new URL(`/api/projects/get-project`, baseUrl);
        url.searchParams.append('id', id);

        const response = await fetch(url.toString());

        if (response.ok) {
            const { data } = await response.json();
            return data;
        }else{
            throw new Error('Network response was not ok');
        }

    } catch (error) {
        console.error('Error fetching project:', error);
    }
};

const ProjectHeader: React.FC<{ project: Project }> = ({ project }) => (
    <section className='bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8'>
        <div className='flex flex-col md:flex-row items-center mb-6'>
            <div className='md:w-2/3 text-center md:text-left mb-4 md:mb-0'>
                <h1 className='text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100'>{project.title}</h1>
                <p className='text-xl text-gray-600 dark:text-gray-300 mt-4'>{project.description}</p>
            </div>
            <div className='md:w-1/3 ml-0 md:ml-8'>
                <Image
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/projects/${project.cover}`}
                    className='object-cover rounded-sm shadow-md'
                    alt="Project cover"
                />
            </div>
        </div>
        <div className='text-center md:text-left border-t border-gray-200 dark:border-gray-700 pt-4'>
            <h2 className='text-2xl font-medium text-gray-700 dark:text-gray-200'>Project Owner</h2>
            <p className='text-lg text-gray-600 dark:text-gray-300'>{project.author}</p>
            <a href={`mailto:${project.owner}`} className='inline-block mt-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300'>
                Contact <i className="fa-solid fa-xs fa-arrow-up-right-from-square ml-1"></i>
            </a>
        </div>
    </section>
);

const Gallery: React.FC<{ images: string[] }> = ({ images }) => (
    <section className='mb-8'>
        <h2 className='text-center text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100'>Gallery</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {images.map((image, i) => (
                <div key={i} className='rounded-lg shadow-md'>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/projects/${image}`}
                        className='w-full object-cover rounded-sm'
                        alt={`Gallery ${i + 1}`}
                    />
                </div>
            ))}
        </div>
    </section>
);

const Synopsis: React.FC<{ markdown: string }> = ({ markdown }) => (
    <section className='mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8'>
        <h2 className='text-center text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100'>Synopsis</h2>
        <div className="markdown-body px-4 prose dark:prose-invert max-w-none">
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
    </section>
);

const Documents: React.FC<{ documents: string[] }> = ({ documents }) => (
    <section>
        <h2 className="text-center text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Related Documents</h2>
        <div className='flex flex-wrap justify-center gap-4'>
            {documents.map((document, i) => (
                <a
                    key={i}
                    className='p-4 h-20 w-full max-w-xs bg-white dark:bg-gray-800 shadow-sm rounded-lg flex items-center justify-center'
                    href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/projects/${document}`}
                    download
                >
                    <IoDocumentAttachOutline size={25} className="text-gray-600 dark:text-gray-400" />
                    <p className="ms-2 text-gray-800 dark:text-gray-200 font-medium">Document {i + 1}</p>
                </a>
            ))}
        </div>
    </section>
);

const Project = async ({ params }: Props) => {
    try {

        const project = await fetchProject(params.id);
        return (
            <div className='py-8 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200'>
                <div className="px-5 md:px-8 lg:px-10 mx-auto">
                    <ProjectHeader project={project} />
                    <Gallery images={project.images} />
                    <Synopsis markdown={project.markdown} />
                    <Documents documents={project.documents} />
                </div>
            </div>
        );

    } catch (error) {
        return <NoProjectFound />;
    }
};

export default Project;
