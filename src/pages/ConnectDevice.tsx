
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const ConnectDevice = () => {
  const [serverAddress, setServerAddress] = useState<string>("192.168.1.104");
  const [serverPort, setServerPort] = useState<string>("3000");
  const [connecting, setConnecting] = useState<boolean>(false);
  
  const handleConnect = () => {
    setConnecting(true);
    
    // Simulate connection attempt
    setTimeout(() => {
      setConnecting(false);
      toast.success("Device connection attempted", {
        description: "Backend files need to be configured for actual connection.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 py-6">
        <div className="container mx-auto px-4 max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Connect Device</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Server Connection</CardTitle>
              <CardDescription>
                Connect to your smart bin IoT backend server
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Server Address</label>
                  <Input
                    type="text"
                    placeholder="192.168.1.104"
                    value={serverAddress}
                    onChange={(e) => setServerAddress(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Port</label>
                  <Input
                    type="text"
                    placeholder="3000"
                    value={serverPort}
                    onChange={(e) => setServerPort(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={handleConnect}
                disabled={connecting}
              >
                {connecting ? "Connecting..." : "Connect"}
              </Button>
            </CardFooter>
          </Card>
          
          <div className="mt-8 bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-2">Connection Instructions</h2>
            <p className="text-sm text-gray-500 mb-4">
              To connect to your backend server:
            </p>
            <ol className="list-decimal list-inside text-sm text-gray-500 space-y-2">
              <li>Ensure your backend server is running</li>
              <li>Enter the server IP address (e.g., 192.168.1.104)</li>
              <li>Enter the port number (default: 3000)</li>
              <li>Click "Connect" to establish connection</li>
            </ol>
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

export default ConnectDevice;
