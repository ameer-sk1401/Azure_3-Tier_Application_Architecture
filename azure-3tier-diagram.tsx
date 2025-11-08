import React from 'react';
import { Globe, Shield, Database, Server, MonitorDot, Lock, Zap, Cloud } from 'lucide-react';

const AzureArchitectureDiagram = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-blue-50 p-8 overflow-auto">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Azure Three-Tier Web Application Architecture
          </h1>
          <p className="text-lg text-gray-600">High Availability | Auto-Scaling | Secure</p>
        </div>

        {/* Main Architecture Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          
          {/* Internet Layer */}
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-lg shadow-lg flex items-center gap-3">
              <Globe size={32} />
              <div>
                <div className="font-bold text-xl">Internet</div>
                <div className="text-sm opacity-90">End Users</div>
              </div>
            </div>
          </div>

          {/* Arrow Down */}
          <div className="flex justify-center mb-8">
            <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-purple-500"></div>
          </div>

          {/* Application Gateway */}
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white px-8 py-6 rounded-xl shadow-xl w-96">
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Shield size={32} />
                </div>
                <div>
                  <div className="font-bold text-xl">Application Gateway</div>
                  <div className="text-sm opacity-90">appgw-threetier</div>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-sm">
                <div>• Public IP: x.x.x.x</div>
                <div>• Layer 7 Load Balancer</div>
                <div>• Health Probes Enabled</div>
                <div>• WAF Ready</div>
              </div>
            </div>
          </div>

          {/* VNet Container */}
          <div className="border-4 border-blue-300 rounded-2xl p-6 bg-blue-50/30 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Cloud className="text-blue-600" size={28} />
              <span className="font-bold text-xl text-blue-800">Virtual Network: vnet-threetier (10.0.0.0/16)</span>
            </div>

            {/* Arrow */}
            <div className="flex justify-center mb-6">
              <div className="w-1 h-8 bg-purple-400"></div>
            </div>

            {/* Web Tier */}
            <div className="bg-gradient-to-br from-green-100 to-green-50 border-2 border-green-400 rounded-xl p-6 mb-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                  <Server size={24} />
                  WEB TIER
                </div>
                <span className="text-green-700 font-semibold">Subnet: 10.0.2.0/24</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Web VM 1 */}
                <div className="bg-white border-2 border-green-500 rounded-lg p-4 shadow-md">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-green-500 text-white p-2 rounded">
                      <Server size={20} />
                    </div>
                    <div className="font-bold text-green-800">VMSS Web-0</div>
                  </div>
                  <div className="text-sm text-gray-700">
                    <div>• NGINX Web Server</div>
                    <div>• Ubuntu 22.04</div>
                    <div>• Port 80/443</div>
                  </div>
                </div>

                {/* Web VM 2 */}
                <div className="bg-white border-2 border-green-500 rounded-lg p-4 shadow-md">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-green-500 text-white p-2 rounded">
                      <Server size={20} />
                    </div>
                    <div className="font-bold text-green-800">VMSS Web-1</div>
                  </div>
                  <div className="text-sm text-gray-700">
                    <div>• NGINX Web Server</div>
                    <div>• Ubuntu 22.04</div>
                    <div>• Port 80/443</div>
                  </div>
                </div>
              </div>

              <div className="bg-green-200 border border-green-400 rounded-lg p-3 flex items-center gap-2">
                <Shield className="text-green-700" size={20} />
                <div className="text-sm text-green-800">
                  <span className="font-bold">NSG: nsg-webtier</span> - Allow from AppGW, Bastion only
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center mb-6">
              <div className="flex flex-col items-center">
                <div className="w-1 h-8 bg-green-400"></div>
                <div className="bg-gray-600 text-white px-3 py-1 rounded text-sm">HTTP:3000</div>
                <div className="w-1 h-8 bg-orange-400"></div>
              </div>
            </div>

            {/* App Tier */}
            <div className="bg-gradient-to-br from-orange-100 to-orange-50 border-2 border-orange-400 rounded-xl p-6 mb-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                  <Zap size={24} />
                  APPLICATION TIER
                </div>
                <span className="text-orange-700 font-semibold">Subnet: 10.0.3.0/24</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* App VM 1 */}
                <div className="bg-white border-2 border-orange-500 rounded-lg p-4 shadow-md">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-orange-500 text-white p-2 rounded">
                      <Zap size={20} />
                    </div>
                    <div className="font-bold text-orange-800">VMSS App-0</div>
                  </div>
                  <div className="text-sm text-gray-700">
                    <div>• Node.js API</div>
                    <div>• Express.js</div>
                    <div>• Port 3000</div>
                  </div>
                </div>

                {/* App VM 2 */}
                <div className="bg-white border-2 border-orange-500 rounded-lg p-4 shadow-md">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-orange-500 text-white p-2 rounded">
                      <Zap size={20} />
                    </div>
                    <div className="font-bold text-orange-800">VMSS App-1</div>
                  </div>
                  <div className="text-sm text-gray-700">
                    <div>• Node.js API</div>
                    <div>• Express.js</div>
                    <div>• Port 3000</div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-200 border border-orange-400 rounded-lg p-3 mb-3">
                <div className="flex items-center gap-2 text-sm text-orange-800">
                  <MonitorDot className="text-orange-700" size={20} />
                  <span className="font-bold">Internal Load Balancer:</span> 10.0.3.10
                </div>
              </div>

              <div className="bg-orange-200 border border-orange-400 rounded-lg p-3 flex items-center gap-2">
                <Shield className="text-orange-700" size={20} />
                <div className="text-sm text-orange-800">
                  <span className="font-bold">NSG: nsg-apptier</span> - Allow from Web Tier only
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center mb-6">
              <div className="flex flex-col items-center">
                <div className="w-1 h-8 bg-orange-400"></div>
                <div className="bg-gray-600 text-white px-3 py-1 rounded text-sm">SQL:1433</div>
                <div className="w-1 h-8 bg-red-400"></div>
              </div>
            </div>

            {/* Database Tier */}
            <div className="bg-gradient-to-br from-red-100 to-red-50 border-2 border-red-400 rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                  <Database size={24} />
                  DATABASE TIER
                </div>
                <span className="text-red-700 font-semibold">Subnet: 10.0.4.0/24</span>
              </div>

              <div className="bg-white border-2 border-red-500 rounded-lg p-6 shadow-md mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-red-500 text-white p-3 rounded-lg">
                    <Lock size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-red-800">Private Endpoint</div>
                    <div className="text-sm text-gray-600">IP: 10.0.4.x</div>
                  </div>
                </div>
                
                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Database className="text-red-600" size={24} />
                    <div className="font-bold text-red-800">Azure SQL Database</div>
                  </div>
                  <div className="text-sm text-gray-700">
                    <div>• Database: sqldb-products</div>
                    <div>• Private Link Enabled</div>
                    <div>• No Public Access</div>
                    <div>• Automated Backups</div>
                    <div>• TDE Enabled</div>
                  </div>
                </div>
              </div>

              <div className="bg-red-200 border border-red-400 rounded-lg p-3 flex items-center gap-2">
                <Shield className="text-red-700" size={20} />
                <div className="text-sm text-red-800">
                  <span className="font-bold">NSG: nsg-database</span> - Allow from App Tier ONLY
                </div>
              </div>
            </div>
          </div>

          {/* Management/Bastion Section */}
          <div className="bg-gradient-to-br from-indigo-100 to-indigo-50 border-2 border-indigo-400 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-500 text-white p-3 rounded-lg">
                  <Lock size={28} />
                </div>
                <div>
                  <div className="font-bold text-xl text-indigo-800">Azure Bastion</div>
                  <div className="text-sm text-indigo-600">Management Subnet: 10.0.5.0/26</div>
                </div>
              </div>
              <div className="bg-white border-2 border-indigo-500 rounded-lg p-4 shadow-md">
                <div className="text-sm text-gray-700">
                  <div>• Secure RDP/SSH Access</div>
                  <div>• No Public IPs on VMs</div>
                  <div>• Zero Trust Access</div>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-8 bg-gray-50 rounded-xl p-6 border-2 border-gray-300">
            <div className="font-bold text-lg text-gray-800 mb-4">Legend & Key Features</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm">Web Tier</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="text-sm">App Tier</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm">Database Tier</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-blue-600" />
                <span className="text-sm">Security (NSG)</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-yellow-600" />
                <span className="text-sm">Auto-Scaling</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock size={16} className="text-purple-600" />
                <span className="text-sm">Private Access</span>
              </div>
              <div className="flex items-center gap-2">
                <MonitorDot size={16} className="text-green-600" />
                <span className="text-sm">Load Balancer</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-blue-600" />
                <span className="text-sm">Public Access</span>
              </div>
            </div>
          </div>

          {/* Key Features Box */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-400 rounded-lg p-4">
              <div className="font-bold text-green-800 mb-2 flex items-center gap-2">
                <Shield size={20} />
                Security
              </div>
              <div className="text-sm text-gray-700">
                <div>✓ NSG per subnet</div>
                <div>✓ Private endpoints</div>
                <div>✓ Zero public IPs</div>
                <div>✓ Bastion access</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-400 rounded-lg p-4">
              <div className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                <Zap size={20} />
                Scalability
              </div>
              <div className="text-sm text-gray-700">
                <div>✓ Auto-scaling VMSS</div>
                <div>✓ Load balancing</div>
                <div>✓ Health probes</div>
                <div>✓ 2-5 instances</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-400 rounded-lg p-4">
              <div className="font-bold text-purple-800 mb-2 flex items-center gap-2">
                <MonitorDot size={20} />
                Monitoring
              </div>
              <div className="text-sm text-gray-700">
                <div>✓ Azure Monitor</div>
                <div>✓ NSG Flow Logs</div>
                <div>✓ Health checks</div>
                <div>✓ Cost alerts</div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p className="font-semibold">Azure Three-Tier Architecture | Production-Grade | High Availability</p>
          <p className="text-sm">Built with: Azure VMSS • Application Gateway • Azure SQL • Private Link • NSGs • Bastion</p>
        </div>
      </div>
    </div>
  );
};

export default AzureArchitectureDiagram;