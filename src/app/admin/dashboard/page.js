"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";

export default function Dashboard() {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const { theme } = useTheme();

  const bgGradient =
    theme === "dark"
      ? "bg-gradient-to-b from-purple-900 via-gray-900 to-black"
      : "bg-gradient-radial from-pink-400 via-orange-300 to-orange-400";

  useEffect(() => {
    fetchInvitations();
  }, []);

  const fetchInvitations = async () => {
    try {
      const token = Cookies.get("access_token");

      if (!token) {
        router.push("/admin");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/invitations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          Cookies.remove("access_token");
          router.push("/admin");
          return;
        }
        throw new Error("Failed to fetch invitations");
      }

      const data = await response.json();
      setInvitations(data.data.invitations);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const refreshToken = Cookies.get("refresh_token");

      if (!token) {
        router.push("/admin");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/authentications`,
        {
          method: "DELETE",
          body: JSON.stringify({ refreshToken }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Cookies.remove("access_token");
      router.push("/admin");
    } catch (err) {
      setError(err.message);
      Cookies.remove("access_token");
      router.push("/admin");
    }
  };

  if (loading) {
    return (
      <main
        className={`min-h-screen ${bgGradient} transition-colors duration-500 relative`}
      >
        {/* Background Pattern */}
        <div
          className="hidden md:block"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "url('/pichture/bg-vampirina.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.2,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
        <div className="relative z-10 min-h-screen p-4">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse">
              <div className="h-16 bg-gray-800/90 rounded-lg mb-8"></div>
              <div className="bg-gray-800/90 backdrop-blur-sm rounded-lg p-8 web-corner">
                <div className="space-y-4">
                  <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      className={`min-h-screen ${bgGradient} transition-colors duration-500 relative`}
    >
      {/* Background Pattern */}
      <div
        className="hidden md:block"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('/pichture/bg-vampirina.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.2,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div className="relative z-10">
        <nav className="bg-gray-800/90 backdrop-blur-sm shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-yellow-200">
                  Admin Dashboard
                </h1>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {error ? (
            <div className="bg-red-500/10 border-l-4 border-red-400 p-4 mb-4 rounded-r-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl p-6 web-corner">
              <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border border-gray-700 rounded-lg">
                      <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700/50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-yellow-200 uppercase tracking-wider"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-yellow-200 uppercase tracking-wider"
                            >
                              Content
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-yellow-200 uppercase tracking-wider"
                            >
                              Message
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                          {invitations.map((invitation, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                {invitation.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                {invitation.content}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                {invitation.message}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Logout Button */}
        <div className="fixed bottom-8 right-8 z-20">
          <button
            onClick={handleLogout}
            className="w-12 h-12 flex items-center justify-center bg-red-500 hover:bg-red-600 hover:scale-110 hover:rotate-12 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out hover:shadow-red-500/50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
