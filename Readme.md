# Azure Three-Tier Web Application Architecture

## 📋 Project Overview

This project showcases a **production-grade three-tier web application** deployed on Microsoft Azure. The architecture demonstrates enterprise-level practices including high availability, auto-scaling, network security, and zero-trust principles.

The application is a simple product catalog system that retrieves data from Azure SQL Database through a Node.js API layer, displayed via an NGINX web frontend—all secured behind Azure Application Gateway.

---

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              INTERNET                                    │
│                           (End Users)                                    │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │ HTTPS/HTTP
                                 ▼
                    ┌────────────────────────────┐
                    │   Application Gateway       │
                    │   (Public Load Balancer)    │
                    │   - WAF Capable             │
                    │   - Health Probes           │
                    │   Public IP: x.x.x.x        │
                    └──────────────┬──────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │    VNet: 10.0.0.0/16        │
                    │                              │
          ┌─────────▼─────────────────────────────▼─────────┐
          │         WEB TIER (10.0.2.0/24)                   │
          │  ┌──────────────────┐  ┌──────────────────┐     │
          │  │   VMSS Web-0     │  │   VMSS Web-1     │     │
          │  │   NGINX          │  │   NGINX          │     │
          │  │   Ubuntu 22.04   │  │   Ubuntu 22.04   │     │
          │  └────────┬─────────┘  └─────────┬────────┘     │
          │           │                      │               │
          │           │   NSG: nsg-webtier   │               │
          │           │   - Allow from AppGW │               │
          │           │   - Allow Bastion    │               │
          └───────────┼──────────────────────┼───────────────┘
                      │                      │
                      └──────────┬───────────┘
                                 │ HTTP:3000
                                 ▼
          ┌────────────────────────────────────────────────┐
          │      APPLICATION TIER (10.0.3.0/24)            │
          │  ┌──────────────────┐  ┌──────────────────┐   │
          │  │   VMSS App-0     │  │   VMSS App-1     │   │
          │  │   Node.js API    │  │   Node.js API    │   │
          │  │   Express.js     │  │   Express.js     │   │
          │  └────────┬─────────┘  └─────────┬────────┘   │
          │           │                      │             │
          │    Internal Load Balancer (10.0.3.10)         │
          │           │   NSG: nsg-apptier   │             │
          │           │   - Allow from Web   │             │
          │           │   - Allow Bastion    │             │
          └───────────┼──────────────────────┼─────────────┘
                      │                      │
                      └──────────┬───────────┘
                                 │ SQL:1433
                                 ▼
          ┌────────────────────────────────────────────────┐
          │       DATABASE TIER (10.0.4.0/24)              │
          │                                                 │
          │     ┌─────────────────────────────────┐        │
          │     │   Private Endpoint              │        │
          │     │   IP: 10.0.4.x                  │        │
          │     └──────────────┬──────────────────┘        │
          │                    │                            │
          │     ┌──────────────▼──────────────────┐        │
          │     │   Azure SQL Database            │        │
          │     │   - sqldb-products              │        │
          │     │   - Private Link Enabled        │        │
          │     │   - No Public Access            │        │
          │     │   - Automated Backups           │        │
          │     └─────────────────────────────────┘        │
          │           NSG: nsg-database                     │
          │           - Allow from App Tier ONLY            │
          └─────────────────────────────────────────────────┘

          ┌─────────────────────────────────────────────────┐
          │      MANAGEMENT SUBNET (10.0.5.0/26)            │
          │     ┌─────────────────────────────────┐         │
          │     │   Azure Bastion                 │         │
          │     │   - Secure RDP/SSH Access       │         │
          │     │   - No Public IPs on VMs        │         │
          │     └─────────────────────────────────┘         │
          └─────────────────────────────────────────────────┘

Legend:
━━━━━  Data Flow
┌────┐  Azure Resource
[NSG]   Network Security Group
```

---

## 🎯 Key Features

### Security

- ✅ **Network Micro-Segmentation**: Each tier isolated with dedicated NSGs
- ✅ **Private Database Access**: Azure SQL accessible only via Private Endpoint
- ✅ **Zero Trust Access**: No public IPs on application VMs
- ✅ **Secure Management**: Azure Bastion for administrative access
- ✅ **Layer 7 Protection**: Application Gateway as the only public entry point

### High Availability

- ✅ **Virtual Machine Scale Sets**: Auto-healing and distribution across availability zones
- ✅ **Load Balancing**: Application Gateway (Layer 7) + Internal Load Balancer (Layer 4)
- ✅ **Health Probes**: Automatic detection and removal of unhealthy instances
- ✅ **Database Redundancy**: Azure SQL with automated backups and geo-replication capability

### Scalability

- ✅ **Auto-Scaling**: CPU-based scaling rules (2-5 instances per tier)
- ✅ **Horizontal Scaling**: VMSS automatically adds/removes instances
- ✅ **Elastic Database**: Azure SQL scales compute independently

### Monitoring & Operations

- ✅ **Azure Monitor**: Comprehensive metrics and logging
- ✅ **NSG Flow Logs**: Network traffic analysis and troubleshooting
- ✅ **Application Insights**: Performance monitoring (optional)
- ✅ **Budget Alerts**: Cost management and optimization

---

## 🛠️ Technology Stack

| Layer             | Technology                 | Purpose                            |
| ----------------- | -------------------------- | ---------------------------------- |
| **Frontend**      | NGINX                      | Web server serving HTML/CSS/JS     |
| **Application**   | Node.js + Express          | RESTful API for business logic     |
| **Database**      | Azure SQL Database         | Relational data storage            |
| **Load Balancer** | Azure Application Gateway  | Layer 7 load balancing & WAF       |
| **Compute**       | Virtual Machine Scale Sets | Auto-scaling VM instances          |
| **Networking**    | Azure Virtual Network      | Network isolation and segmentation |
| **Security**      | Network Security Groups    | Firewall rules per subnet          |
| **Access**        | Azure Bastion              | Secure VM management               |
| **Monitoring**    | Azure Monitor              | Metrics, logs, and alerts          |

---

## 📐 Network Architecture

### Address Space Planning

```
Virtual Network: vnet-threetier (10.0.0.0/16)
├── AppGatewaySubnet     : 10.0.1.0/24  (254 hosts)
├── WebTierSubnet        : 10.0.2.0/24  (254 hosts)
├── AppTierSubnet        : 10.0.3.0/24  (254 hosts)
├── DatabaseSubnet       : 10.0.4.0/24  (254 hosts)
└── AzureBastionSubnet   : 10.0.5.0/26  (62 hosts)
```

### Network Security Rules

**Web Tier NSG Rules:**

- ✅ Inbound: Allow HTTP/HTTPS from Application Gateway (10.0.1.0/24)
- ✅ Inbound: Allow SSH from Bastion (10.0.5.0/26)
- ✅ Outbound: Allow to App Tier port 3000 (10.0.3.0/24)
- ❌ Deny all other inbound traffic

**App Tier NSG Rules:**

- ✅ Inbound: Allow port 3000 from Web Tier (10.0.2.0/24)
- ✅ Inbound: Allow SSH from Bastion (10.0.5.0/26)
- ✅ Outbound: Allow SQL port 1433 to Database (10.0.4.0/24)
- ❌ Deny all other inbound traffic

**Database NSG Rules:**

- ✅ Inbound: Allow SQL port 1433 from App Tier ONLY (10.0.3.0/24)
- ❌ Deny all other inbound traffic

---

## 🚀 How I Built This

### Phase 1: Planning & Design (Day 1)

1. Researched three-tier architecture patterns and Azure best practices
2. Designed network topology with proper subnet segmentation
3. Planned security controls and access requirements
4. Created resource naming convention and tagging strategy

### Phase 2: Foundation Setup (Day 1-2)

1. **Created Resource Group**: `rg-threetier-app`
2. **Provisioned Virtual Network**:
   - Address space: 10.0.0.0/16
   - Created 5 subnets for different purposes
3. **Configured Network Security Groups**:
   - Created NSG for each tier with specific rules
   - Associated NSGs with corresponding subnets
   - Tested connectivity between tiers

### Phase 3: Database Tier (Day 2)

1. **Deployed Azure SQL Server**:
   - Disabled public network access
   - Configured SQL authentication
2. **Created SQL Database**: `sqldb-products`
3. **Implemented Private Endpoint**:
   - Created private endpoint in DatabaseSubnet
   - Configured Private DNS zone integration
   - Verified private connectivity (10.0.4.x)
4. **Populated Database**:
   - Created Products table
   - Inserted sample data for testing

### Phase 4: Application Tier (Day 3)

1. **Deployed VMSS for App Tier**:
   - Ubuntu 22.04 LTS base image
   - 2 instances minimum, 5 maximum
   - Auto-scaling based on CPU (70% threshold)
2. **Installed Node.js Stack**:
   - Node.js 18.x runtime
   - Express.js framework
   - Tedious (SQL Server driver)
3. **Developed REST API**:
   - `/health` endpoint for health checks
   - `/api/products` endpoint to fetch database records
   - Error handling and connection pooling
4. **Configured Internal Load Balancer**:
   - Private IP: 10.0.3.10
   - Health probe on /health endpoint
   - Backend pool with VMSS instances

### Phase 5: Web Tier (Day 3-4)

1. **Deployed VMSS for Web Tier**:
   - Ubuntu 22.04 LTS
   - 2-4 instances with auto-scaling
2. **Installed & Configured NGINX**:
   - Static HTML/CSS/JavaScript frontend
   - Reverse proxy to App Tier (10.0.3.10:3000)
   - Health check endpoint at /health
3. **Built Frontend Application**:
   - Responsive product catalog interface
   - JavaScript fetch API to call backend
   - Real-time product display from database

### Phase 6: Application Gateway (Day 4)

1. **Deployed Application Gateway**:
   - Standard_v2 SKU
   - 2 instances for high availability
   - Created public IP address
2. **Configured Backend Pool**:
   - Added Web Tier VMSS as target
   - Configured HTTP settings (port 80)
3. **Set Up Routing Rules**:
   - Listener on port 80
   - Path-based routing to backend
   - Health probes configured

### Phase 7: Management & Security (Day 5)

1. **Deployed Azure Bastion**:
   - Created in dedicated subnet
   - Enabled secure VM access without public IPs
2. **Implemented Security Controls**:
   - Reviewed and hardened NSG rules
   - Verified private endpoint connectivity
   - Tested security boundaries
3. **Enabled Monitoring**:
   - Configured NSG Flow Logs
   - Set up Azure Monitor diagnostics
   - Created custom monitoring dashboard
   - Configured budget alerts

### Phase 8: Testing & Validation (Day 5-6)

1. **Functional Testing**:
   - End-to-end data flow verification
   - API response time testing
   - Database query performance
2. **Security Testing**:
   - Attempted direct database access (blocked ✅)
   - Verified NSG rules are enforced
   - Tested Bastion-only VM access
3. **High Availability Testing**:
   - Simulated VM failures
   - Verified auto-healing
   - Tested load distribution
4. **Auto-Scaling Testing**:
   - Generated load with curl scripts
   - Observed scale-out behavior
   - Verified scale-in after load reduction

---

## 🔧 Configuration Details

### Auto-Scaling Configuration

**Web Tier VMSS:**

```yaml
Minimum Instances: 2
Maximum Instances: 4
Scale Out Rule:
  - Metric: Percentage CPU
  - Threshold: > 70%
  - Duration: 5 minutes
  - Action: Increase count by 1
Scale In Rule:
  - Metric: Percentage CPU
  - Threshold: < 30%
  - Duration: 5 minutes
  - Action: Decrease count by 1
```

**App Tier VMSS:**

```yaml
Minimum Instances: 2
Maximum Instances: 5
Scale Out Rule:
  - Metric: Percentage CPU
  - Threshold: > 70%
  - Duration: 5 minutes
  - Action: Increase count by 1
Scale In Rule:
  - Metric: Percentage CPU
  - Threshold: < 30%
  - Duration: 5 minutes
  - Action: Decrease count by 1
```

### Health Probe Configuration

**Application Gateway Health Probe:**

```yaml
Protocol: HTTP
Host: 127.0.0.1
Path: /health
Interval: 30 seconds
Timeout: 30 seconds
Unhealthy Threshold: 3 consecutive failures
```

**Load Balancer Health Probe:**

```yaml
Protocol: HTTP
Port: 3000
Path: /health
Interval: 5 seconds
Unhealthy Threshold: 2 consecutive failures
```

---

## 📈 Performance Metrics

Based on testing with moderate load:

| Metric                              | Value          |
| ----------------------------------- | -------------- |
| **Average Response Time**           | < 200ms        |
| **Database Query Time**             | < 50ms         |
| **Application Gateway Throughput**  | Up to 125 Mbps |
| **VMSS Scale-Out Time**             | 3-5 minutes    |
| **VMSS Scale-In Time**              | 5-7 minutes    |
| **Backend Health Check Interval**   | 30 seconds     |
| **Zero Downtime During VM Failure** | ✅ Verified    |
| **Concurrent Users Supported**      | 100+ (tested)  |

---

## 🔐 Security Implementation

### Defense in Depth Strategy

**Layer 1 - Perimeter (Application Gateway)**

- Only public-facing component
- DDoS protection (Azure-provided)
- WAF-ready (can be enabled)

**Layer 2 - Network (NSGs)**

- Micro-segmentation per tier
- Least privilege access
- Explicit deny rules

**Layer 3 - Compute (VMSS)**

- No public IPs
- Managed identities (can be added)
- Regular OS updates

**Layer 4 - Data (Azure SQL)**

- Private endpoint only
- TDE (Transparent Data Encryption) enabled
- Automated backups
- Audit logging available

**Layer 5 - Application (Code)**

- Parameterized SQL queries
- Input validation
- Error handling

---

## 🎯 Challenges & Solutions

### Challenge 1: Database Connectivity from App Tier

**Problem**: Initial connection attempts to SQL database were timing out.

**Solution**:

- Verified Private Endpoint was correctly provisioned
- Used `nslookup` to confirm DNS resolution to private IP (10.0.4.x)
- Updated NSG rules to allow App Tier to Database on port 1433
- Added proper connection string with `encrypt=true` option

### Challenge 2: Application Gateway Backend Health

**Problem**: Backend pool showing unhealthy status after initial deployment.

**Solution**:

- Implemented `/health` endpoint on NGINX
- Configured health probe with correct path
- Adjusted timeout and interval settings
- Verified NSG allows traffic from AppGatewaySubnet to Web Tier

### Challenge 3: Auto-Scaling Not Triggering

**Problem**: VMSS not scaling out under load.

**Solution**:

- Verified Azure Monitor metrics were being collected
- Adjusted CPU threshold from 80% to 70%
- Reduced duration from 10 minutes to 5 minutes
- Generated sustained load (not just spikes)

### Challenge 4: Cost Management

**Problem**: Resources running 24/7 resulted in high costs.

**Solution**:

- Scaled VMSS to minimum instances during off-hours
- Deleted Application Gateway when not actively testing
- Used Basic SQL tier instead of Standard
- Implemented budget alerts at 80% threshold

---

## 📚 Lessons Learned

1. **Plan Network Design First**: Proper subnet sizing and IP planning prevents future issues
2. **NSG Rules Are Crucial**: Test connectivity at each layer during implementation
3. **Private Endpoints Need DNS**: Ensure Private DNS zones are configured correctly
4. **Health Probes Are Essential**: Application Gateway and Load Balancer rely on these
5. **Auto-Scaling Takes Time**: Don't expect instant results; plan for 5-10 minute delays
6. **Bastion Saves Money**: Eliminates need for public IPs and Jump Box VMs
7. **Monitor Costs Daily**: Azure costs can escalate quickly without oversight
8. **Document Everything**: Configuration details are easy to forget

---

## 🚀 Future Enhancements

### Planned Improvements

**Phase 1: Enhanced Security**

- [ ] Implement Azure Key Vault for secrets management
- [ ] Add Azure AD authentication
- [ ] Enable Application Gateway WAF
- [ ] Configure Azure Firewall for egress filtering
- [ ] Implement Just-In-Time (JIT) VM access

**Phase 2: Performance Optimization**

- [ ] Add Azure Redis Cache between App and Database tiers
- [ ] Implement CDN for static content delivery
- [ ] Enable Application Gateway connection draining
- [ ] Configure SQL Database query performance insights

**Phase 3: DevOps & Automation**

- [ ] Create Azure Resource Manager (ARM) templates
- [ ] Implement CI/CD pipeline with Azure DevOps
- [ ] Add infrastructure as code with Terraform
- [ ] Automate testing with Azure Load Testing

**Phase 4: High Availability & DR**

- [ ] Configure geo-replication for SQL Database
- [ ] Deploy to multiple Azure regions
- [ ] Implement Azure Front Door for global load balancing
- [ ] Set up automated disaster recovery procedures

**Phase 5: Containerization**

- [ ] Containerize application with Docker
- [ ] Deploy to Azure Kubernetes Service (AKS)
- [ ] Implement service mesh with Istio

---

## 🧪 Testing Instructions

### Prerequisites

- Azure subscription with appropriate permissions
- Azure CLI installed (optional, for testing)
- Web browser

### End-to-End Test

1. **Access the Application**:

   ```
   http://<application-gateway-public-ip>
   ```

2. **Test Product Loading**:

   - Click "Load Products" button
   - Verify products display from database
   - Check browser console for API calls

3. **Test High Availability**:

   ```bash
   # Generate load
   for i in {1..100}; do
     curl http://<app-gateway-ip>
   done
   ```

4. **Test Auto-Scaling**:

   - Generate sustained CPU load
   - Monitor VMSS instances in Azure Portal
   - Observe scale-out behavior

5. **Test Security**:
   - Attempt to access App Tier directly (should fail)
   - Verify database is not publicly accessible
   - Confirm Bastion is only way to access VMs

---

## 💰 Cost Optimization Tips

### For Production

- Use Reserved Instances for predictable workloads (up to 72% savings)
- Implement auto-shutdown for non-production environments
- Use Azure Hybrid Benefit if you have Windows licenses
- Configure Log Analytics retention policies

### For Development/Testing

- Delete Application Gateway when not in use ($130/month savings)
- Delete Azure Bastion when not needed ($140/month savings)
- Scale VMSS to 0 instances during off-hours
- Use B-series burstable VMs for dev workloads
- Set budget alerts to avoid surprises

### Current Optimized Cost (Testing)

- Application Gateway: Deleted when not testing
- Bastion: Deleted when not testing
- VMSS: Scaled to minimum (1-2 instances)
- SQL Database: Basic tier
- **Daily Cost: ~$3-5** (vs. $12-15 with all services running)

---

## 🤝 Contributing

This is a personal learning project, but suggestions are welcome!

If you'd like to suggest improvements:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request with detailed description

---

## 📝 License

This project is created for educational purposes as part of my Azure learning journey.

Feel free to use this as a reference for your own learning!

---

## 👨‍💻 Author

**Your Name**

- Learning Azure step-by-step
- Currently focused on: Networking, Security, and Architecture
- Previous projects: Azure Entra ID, RBAC, VNet implementations

---

## 🙏 Acknowledgments

- Microsoft Azure Documentation
- Azure Architecture Center
- Azure Community forums
- Various online tutorials and courses

---

## 📞 Contact

For questions or discussions about this project:

- LinkedIn: [Your LinkedIn]
- GitHub: [Your GitHub]
- Email: [Your Email]

---

## ⭐ Project Status

**Status**: ✅ Complete and Fully Functional

**Last Updated**: [Current Date]

**Next Steps**: Planning containerization with AKS

---

**⚡ Quick Start Guide**: See `/docs/quick-start.md`

**🔥 Live Demo**: [Application Gateway Public IP] (Available during testing periods)

---

_This project demonstrates real-world Azure cloud architecture skills applicable to enterprise environments._
