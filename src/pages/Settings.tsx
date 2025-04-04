
import Header from "@/components/Header";

const Settings = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Settings</h1>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-4">Device Configuration</h2>
            <p className="text-gray-500 mb-4">
              Configure your device settings here. Connect your backend to save settings.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Device ID</label>
                <input 
                  type="text" 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  placeholder="Enter device ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input 
                  type="text" 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  placeholder="Enter device location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Reporting Interval (minutes)</label>
                <input 
                  type="number" 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  placeholder="Enter reporting interval"
                  min="1"
                  max="60"
                />
              </div>
              <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
                Save Settings
              </button>
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

export default Settings;
