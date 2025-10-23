import Sidebar from '../components/Sidebar';
import Header from '../components/Header';


const Dashboard = () => {

  const schoolName = localStorage.getItem('schoolName');

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 ml-60 p-6 flex justify-center items-start">
        <div className="w-full max-w-4xl">

          <h1 className="text-2xl font-bold mb-6 text-gray-800">Welcome to Dashboard</h1>
          <p>School: {schoolName}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;