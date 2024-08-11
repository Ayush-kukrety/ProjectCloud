'use client'
import { RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { format } from 'date-fns'
import { FaPlus, FaDraftingCompass, FaUser, FaEye, FaSignOutAlt, FaSpinner } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { studentLogout } from "@/lib/feature/auth/authSlice";
import Link from "next/link";
import Image from "next/image";

interface Project {
  aishe: string;
  created_at: string;
  description: string;
  id: number;
  markdown: string;
  owner: string;
  project_id: string;
  title: string;
  cover: string;
}

const Student = () => {
  const { name, aishe, degree, id } = useAppSelector((state: RootState) => state.auth.student.details);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [projectCount, setProjectCount] = useState<number | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const countResponse = await fetch(`/api/projects/count?id=${id}`);
      if (countResponse.ok) {
        const { count } = await countResponse.json();
        setProjectCount(count);
      }

      const projectsResponse = await fetch(`/api/projects?id=${id}&type=recent`);
      if (projectsResponse.ok) {
        const { projects } = await projectsResponse.json();
        setProjects(projects || []);
      } else if (projectsResponse.status == 400) {
        toast.error('Something went wrong');
      }
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  const handleLogout = async () => {
    try {
      toast.loading('Logging Out');
      const res = await fetch('/api/auth/logout', {
        method: 'POST'
      });
      toast.dismiss();
      if (res.ok) {
        router.replace('/');
        toast.success("Logged Out");
        dispatch(studentLogout());
      } else {
        toast.error('Error logging out');
      }
    } catch {
      toast.dismiss();
      toast.error("Server error\nTry again later");
    }
  };

  const LogoutConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Confirm Logout</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">Are you sure you want to log out?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setShowLogoutConfirmation(false)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setShowLogoutConfirmation(false);
              handleLogout();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <main className="p-6 md:p-10 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 text-gray-800 dark:text-gray-200">
      {showLogoutConfirmation && <LogoutConfirmationModal />}
      <section className="bg-white/70 dark:bg-gray-800/70 py-6 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
        <h1 className="text-center text-3xl font-bold text-indigo-700 dark:text-indigo-300">Profile</h1>
      </section>

      <section className="mt-8 bg-white/60 dark:bg-gray-800/60 p-8 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
        <div className="grid md:grid-cols-3 gap-8 md:gap-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2 text-indigo-600 dark:text-indigo-400">{name}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">{aishe}</p>
            <p className="text-lg text-gray-600 dark:text-gray-400">{degree}</p>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-3 text-indigo-600 dark:text-indigo-400">Projects Uploaded</h2>
            {isLoading ? (
              <FaSpinner className="animate-spin text-5xl text-indigo-700 dark:text-indigo-300 mx-auto" />
            ) : (
              <p className="text-5xl font-semibold text-indigo-700 dark:text-indigo-300">
                {projectCount !== null ? projectCount : 'N/A'}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href='/profile/add' className="btn bg-indigo-500 hover:bg-indigo-600 text-white transition-colors duration-300"><FaPlus className="mr-2" /> New Project</Link>
            <Link href='/profile/drafts' className="btn bg-gray-500 hover:bg-gray-600 text-white transition-colors duration-300"><FaDraftingCompass className="mr-2" /> Drafts</Link>
            <Link href='/profile/account' className="btn bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300"><FaUser className="mr-2" /> Account</Link>
            <button
              onClick={() => setShowLogoutConfirmation(true)}
              className="btn bg-red-500 hover:bg-red-600 text-white transition-colors duration-300"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white/60 dark:bg-gray-800/60 p-8 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left text-indigo-700 dark:text-indigo-300">My Projects</h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-4xl text-indigo-600 dark:text-indigo-400" />
          </div>
        ) : (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {projects.map(({ project_id, id, title, created_at, cover }) => (
                <article
                  key={id}
                  onClick={() => router.push(`/projects/${project_id}`)}
                  className="bg-white/70 dark:bg-gray-700/70 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                >
                  <div className='h-48 overflow-hidden'>
                    <Image
                      className="object-cover h-full w-full transition-transform duration-300 hover:scale-110"
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/projects/${cover}`}
                      alt={title}
                      height={300} width={600}
                    />
                  </div>
                  <div className='p-6'>
                    <h3 className="text-xl font-semibold mb-2 text-indigo-600 dark:text-indigo-400">{title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Electronics</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{format(new Date(created_at), 'dd MMM yyyy')}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 flex items-center">
                      <FaEye className="mr-2" /> 22 Views
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-8">
              <Link href='/profile/projects' className="btn bg-indigo-500 hover:bg-indigo-600 text-white transition-colors duration-300 w-full">View All Projects</Link>
            </div>
          </>
        )}
      </section>

      <p className="text-center text-2xl mt-12 font-semibold text-indigo-700 dark:text-indigo-300">More Features Coming Soon...</p>
    </main>
  )
}

export default Student