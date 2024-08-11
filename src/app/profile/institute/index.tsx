import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { instituteLogout } from "@/lib/feature/auth/authSlice";
import Link from "next/link";
import Image from "next/image";

type Project = {
  title: string;
  author: string;
  created_at: string;
  project_id: string;
};
type Workshop = {
  title: string;
  description: string;
  cover: string;
  id: string;
  link: string;
}

const Institute = () => {


  const { name, aishe } = useSelector((state: RootState) => state.auth.institute.details);
  const [reqList, setReqList] = useState<Project[]>([]);
  const [workshopList, setWorkshopList] = useState<Workshop[]>([]);
  const [input, setInput] = useState('');
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [workshopsLoading, setWorkshopsLoading] = useState(true);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);


  const [workshopCount, setWorkshopCount] = useState<number>(0);
  const [projectCount, setProjectCount] = useState<number>(0);

  const [countsLoading, setCountsLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {

      const projectResponse = await fetch(`/api/projects/count?aishe=${aishe}`);
      if (projectResponse.ok) {
        const { count } = await projectResponse.json();
        setProjectCount(count as number);
      }
      const workshopResponse = await fetch(`/api/workshops/count?aishe=${aishe}`);
      if (workshopResponse.ok) {
        const { count } = await workshopResponse.json();
        setWorkshopCount(count as number);
      }
      setCountsLoading(false);
    };
    fetchCounts();
  }, [aishe]); // Dependency array includes aishe


  const verifyProject = async (id: string) => {
    toast.loading("Initiating Request")
    const response = await fetch(`/api/projects/verify?id=${id}`)
    toast.dismiss();
    if (response.ok) {
      toast.success("Verification Success`")
    } else {
      toast.error("Something Went Wrong")
      const { error } = await response.json();
      console.error(error)
    }
    getdata();
  }


  const getdata = async () => {
    setProjectsLoading(true);

    const response = await fetch(`/api/projects?aishe=${aishe}&verified=false`);

    if (response.ok) {
      const { data } = await response.json();

      setReqList(data)
      setProjectsLoading(false);
    } else {
      toast.error("something went wrong");
      const { error } = await response.json();
      console.error(error)
    }
  }

  const getWorkshops = async () => {
    setWorkshopsLoading(true);

    const response = await fetch(`/api/workshops?aishe=${aishe}&type=recent`);

    if (response.ok) {
      const { workshops } = await response.json();
      setWorkshopList(workshops);
      setWorkshopsLoading(false);
    } else {
      toast.error("Something went wrong")
      return;
    }
  }
  useEffect(() => {
    getdata();
    getWorkshops();
  },[])

  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    toast.loading('Logging Out');
    const response = await fetch('/api/auth/logout', {
      method: 'POST'
    });
    toast.dismiss();

    if (response.ok) {
      router.replace('/');
      toast.success("Logged Out");
      dispatch(instituteLogout());
      return;
    } else {
      const { error } = await response.json();
      console.error(error)
      toast.error("Error signing out");

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
    <main className="min-h-screen p-6 bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      {showLogoutConfirmation && <LogoutConfirmationModal />}

      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold text-center mb-4">Profile</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-center">
            <p className="text-4xl font-bold mb-2">{name}</p>
            <p className="text-xl">{aishe}</p>
          </div>
          <div className="flex flex-col gap-3 items-center justify-center">
            <Link
              href="/profile/add"
              className="btn w-full md:w-40 bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300"
            >
              New Workshop
            </Link>
            <Link
              href="/profile/dashboard"
              className="btn w-full md:w-40 bg-yellow-500 hover:bg-yellow-600 text-white transition-colors duration-300"
            >
              Dashboard
            </Link>
            <button
              onClick={() => setShowLogoutConfirmation(true)}
              className="btn w-full md:w-40 bg-red-500 hover:bg-red-600 text-white transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600 dark:text-blue-400">Statistics</h2>
        {countsLoading ? (
          <div className="flex justify-center items-center h-24">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full"
            />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center">
              <p className="text-lg font-semibold mb-2">Projects</p>
              <p className="text-3xl font-bold">{projectCount}</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold mb-2">Workshops</p>
              <p className="text-3xl font-bold">{workshopCount}</p>
            </div>
          </div>
        )}
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600 dark:text-blue-400">Project Verification Requests</h2>
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600"
            placeholder="Search projects"
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3">Author</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                projectsLoading
                  ? <tr className="">
                    <td
                      className="bg-slate-50 border-b dark:bg-gray-800 dark:border-gray-700"
                      colSpan={4}>
                      <div className="flex justify-center py-3" role="status">
                        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div></td>
                  </tr>
                  : reqList.length == 0
                    ? <tr>
                      <td
                        className="bg-slate-50 border-b dark:bg-gray-800 dark:border-gray-700"
                        colSpan={4}>
                        <div className="text-xl font-medium my-3 text-center text-blue-600 dark:text-blue-400"> No Pending Requests</div>
                      </td>
                    </tr>
                    : input.trim().length === 0
                      ? reqList.map((project, i) => (
                        <tr key={i} className="bg-slate-50 border-b dark:bg-gray-800 dark:border-gray-700">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {project.author}
                          </th>
                          <td className="px-6 py-4">
                            {project.title}
                          </td>
                          <td className="px-6 py-4">
                            {format(new Date(project.created_at), 'dd MMM yyyy')}
                          </td>
                          <td className="px-6 py-4 flex justify-center gap-3">
                            <button
                              onClick={() => verifyProject(project.project_id)}
                              className="font-medium text-green-600 hover:text-blue-500"
                            >Verify
                            </button>
                          </td>
                        </tr>
                      ))
                      : reqList.filter((project) => project.author.toLocaleLowerCase().includes(input.toLowerCase()) || project.title.toString().toLowerCase().includes(input.toLowerCase())).map((project, i) => (
                        <tr key={i} className="bg-slate-50 border-b dark:bg-gray-800 dark:border-gray-700">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {project.author}
                          </th>
                          <td className="px-6 py-4">
                            {project.title}
                          </td>
                          <td className="px-6 py-4">
                            {format(new Date(project.created_at), 'dd MMM yyyy')}
                          </td>
                          <td className="px-6 py-4 flex justify-center gap-3">
                            <button
                              onClick={() => verifyProject(project.project_id)}
                              className="font-medium text-green-600 hover:text-blue-500"
                            >Verify
                            </button>
                          </td>
                        </tr>
                      ))
              }
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600 dark:text-blue-400">Recent Workshops</h2>
        <div>
          {
            workshopsLoading
              ? <div className="flex justify-center py-3" role="status">
                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
              : <div>
                {
                  workshopList.length === 0
                    ? <div className="text-center text-lg font-medium">No recent workshops</div>
                    : <div>
                      <div className="grid md:grid-cols-5 gap-3">
                        {workshopList.map((workshop) => (
                          <motion.article
                            key={workshop.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            whileHover={{ scale: 1.03 }}
                            className=' border-2 border-gray-300 dark:border-gray-600 p-4 rounded-lg shadow-md'
                          >
                            <Link href={workshop.link} target="_blank">
                              <div className="md:order-2">
                                <Image height={500} width={500} className=" object-cover rounded-lg" src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/workshops/${workshop.cover}`} alt="Workshop" />
                              </div>
                              <div className="md:order-1">
                                <div className="card-body">
                                  <h5 className="text-2xl font-semibold mb-2">{workshop.title}</h5>
                                </div>
                              </div>
                            </Link>

                          </motion.article>
                        ))}
                      </div>
                      <div className="mt-8">
                        <Link href='/profile/workshops' className="btn bg-indigo-500 hover:bg-indigo-600 text-white transition-colors duration-300 w-full">View All</Link>
                      </div>
                    </div>
                }


              </div>
          }
        </div>
      </section>
    </main>
  );
}

export default Institute