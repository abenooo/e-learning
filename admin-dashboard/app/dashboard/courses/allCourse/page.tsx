'use client';

import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, FilePlus, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/auth';

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  status: string;
  duration_months: number;
  course_type: string;
  delivery_method: string;
}

const AllCoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'error' | 'success'>('error');
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const router = useRouter();

  const showAlert = (message: string, type: 'error' | 'success' = 'error') => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => setAlertMessage(null), 4000);
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://e-learning-mern-stack.onrender.com/api/courses', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok && data.success && Array.isArray(data.data)) {
          setCourses(data.data);
        } else {
          showAlert('Failed to load courses.');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        showAlert('An error occurred while fetching courses.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [router]);

  const handleDelete = async (courseId: string) => {
    const token = getToken();
    if (!token) {
      showAlert('Token missing. Please login again.');
      return;
    }

    setDeleting(courseId);

    try {
      const res = await fetch(`https://e-learning-mern-stack.onrender.com/api/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setCourses(prev => prev.filter(course => course._id !== courseId));
        showAlert('Course deleted successfully.', 'success');
      } else {
        const message = result.message || result.error || 'Unknown server error';
        showAlert(`Failed to delete the course. Reason: ${message}`);
      }
    } catch (err: any) {
      console.error('Delete error:', err);
      showAlert(`Could not delete the course. Reason: ${err.message}`);
    } finally {
      setDeleting(null);
    }
  };

  const handleEdit = async (courseId: string) => {
    const token = getToken();
    if (!token) {
      showAlert('Token missing. Please login again.');
      return;
    }

    try {
      const res = await fetch(`https://e-learning-mern-stack.onrender.com/api/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (res.ok && result.success && result.data) {
        localStorage.setItem('editCourse', JSON.stringify(result.data));
        router.push(`/dashboard/courses/edit/${courseId}`);
      } else {
        const message = result.message || result.error || 'Course not found';
        showAlert(`Failed to fetch course data. Reason: ${message}`);
      }
    } catch (err: any) {
      console.error('Edit fetch error:', err);
      showAlert(`Could not load course. Reason: ${err.message}`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">All Courses</h1>
        <button
          onClick={() => router.push('/dashboard/courses/createCourse')}
          className="bg-green-100 text-black-700 px-4 py-2 rounded flex items-center gap-2 hover:bg-green-200"
        >
          <FilePlus size={16} /> Create New Course
        </button>
      </div>

      {alertMessage && (
        <div className={`mb-4 p-3 rounded text-sm ${alertType === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {alertMessage}
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Loading courses...</p>
      ) : courses.length === 0 ? (
        <p className="text-gray-500">No courses available.</p>
      ) : (
        <div className="space-y-6">
          {courses.map((course) => (
            <div key={course._id} className="flex flex-col sm:flex-row items-start sm:items-center bg-white rounded-lg shadow p-6 hover:shadow-md transition">
              <div className="flex-1 w-full">
                <h2 className="text-xl font-semibold mb-1">{course.title}</h2>
                <p className="text-gray-600 text-sm mb-3">{course.description}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded">{course.price === 0 ? 'Free' : `Paid - $${course.price}`}</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">{course.duration_months} Months</span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded">{course.delivery_method}</span>
                  <div className="w-px h-5 bg-gray-300"></div>

                  <button className="flex items-center text-blue-600 hover:underline gap-1" onClick={() => handleEdit(course._id)}>
                    <Pencil size={14} /> Edit
                  </button>

                  <button
                    disabled={deleting === course._id}
                    onClick={() => {
                      setSelectedCourse(course);
                      setShowModal(true);
                    }}
                    className="flex items-center text-red-600 hover:underline gap-1 disabled:opacity-50"
                  >
                    <Trash2 size={14} />
                    {deleting === course._id ? 'Deleting...' : 'Delete'}
                  </button>

                  <span className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded gap-1">
                    <FileText size={14} /> {course.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {showModal && selectedCourse && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-red-500 text-xl">⚠️</span>
                <h2 className="text-lg font-semibold text-gray-800">Confirm Delete</h2>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">&times;</button>
            </div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete <strong>"{selectedCourse.title}"</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await handleDelete(selectedCourse._id);
                  setShowModal(false);
                }}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCoursesPage;
