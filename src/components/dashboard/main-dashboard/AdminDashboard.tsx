const AdminDashboard = ({ allUser }: { allUser: any }) => {
  console.log("all user", allUser.data.data);
  return (
    <div>
      {" "}
      <div className="flex min-h-screen bg-gray-50">
        {/* Main Content */}
        <main className="flex-1 p-6">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold text-center">
              Admin Dashboard{" "}
            </h1>
          </header>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-white rounded shadow">
              <p className="text-sm text-gray-500">Users</p>
              <p className="mt-1 text-xl font-bold">1,234</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <p className="text-sm text-gray-500">Orders</p>
              <p className="mt-1 text-xl font-bold">567</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <p className="text-sm text-gray-500">Revenue</p>
              <p className="mt-1 text-xl font-bold">$12,345</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <p className="text-sm text-gray-500">Signups</p>
              <p className="mt-1 text-xl font-bold">89</p>
            </div>
          </div>

          {/* Placeholder for content */}
          <div className="p-6 bg-white rounded shadow text-center text-gray-500">
            Main content goes here.
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
