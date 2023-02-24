import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { MailIcon } from "@heroicons/react/solid";

export default function Dashboard() {
  const { user, avatar } = useSelector((state) => state.user);

  return (
    <>
      <div className="min-h-full">

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow bg-teal-700 pt-5 pb-4 overflow-y-auto">
            <div className="px-4">
              <Link to="/" className="font-normal text-xl  text-teal-200">
                Mesob Recipe
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:pl-64 flex flex-col flex-1">
          <div className="relative z-10 flex-shrink-0 flex items-center bg-white border-b border-gray-200 lg:border-none">
            <div className="flex items-center py-4 px-4 sm:px-6 lg:px-8">
              <img
                className="h-16 w-16 rounded-full block"
                src={
                  avatar && avatar.avatar
                    ? avatar.avatar
                    : "https://res.cloudinary.com/dmtc1wlgq/image/upload/v1641911896/media/avatar/default_zrdbiq.png"
                }
                alt=""
              />
              <div>
                <div className="flex items-center">
                  <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                    Welcome back, {user && user.username}
                  </h1>
                </div>
                <dl className="flex flex-col ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                  <dt className="sr-only">Email</dt>
                  <dd className="flex items-center text-sm text-gray-500 font-medium sm:mr-6">
                    <MailIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    {user && user.email}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <main className="flex-1 pb-8">
            {/* Page header */}
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
