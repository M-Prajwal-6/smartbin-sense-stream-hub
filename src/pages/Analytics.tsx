
import Header from "@/components/Header";

const Analytics = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Analytics</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">Overview</h2>
              <p className="text-gray-500">
                Analytics overview page will display comprehensive data visualization
                for your smart bin sensors. Connect your backend to populate this data.
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            Smart Dustbin Monitoring System © 2025
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Analytics;
