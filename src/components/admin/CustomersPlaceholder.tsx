
import React from "react";
import { Users, Lock, Settings, UserCheck } from "lucide-react";

const CustomersPlaceholder = () => {
  return (
    <div className="bg-white rounded-lg shadow p-8">
      <div className="mb-6 text-center">
        <Users className="h-16 w-16 mx-auto text-gray-400" />
        <h3 className="text-xl font-medium text-gray-800 mt-4 mb-2">Customer Management</h3>
        <p className="text-gray-600 mb-4">
          This section is under development. Customer management functionality is coming soon.
        </p>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-lg font-medium text-gray-800 mb-4">Admin Privileges</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <Lock className="h-5 w-5 text-fashion-black mr-3 mt-0.5" />
            <div>
              <h5 className="font-medium text-gray-800">Access Control</h5>
              <p className="text-sm text-gray-600">Manage user roles and permissions across the platform</p>
            </div>
          </div>
          
          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <UserCheck className="h-5 w-5 text-fashion-black mr-3 mt-0.5" />
            <div>
              <h5 className="font-medium text-gray-800">User Verification</h5>
              <p className="text-sm text-gray-600">Verify customer accounts and manage identity verification</p>
            </div>
          </div>
          
          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <Settings className="h-5 w-5 text-fashion-black mr-3 mt-0.5" />
            <div>
              <h5 className="font-medium text-gray-800">Platform Settings</h5>
              <p className="text-sm text-gray-600">Configure global settings for the entire platform</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersPlaceholder;
