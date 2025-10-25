"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/components/UserProvider";
import { Alert } from "@/components/ui/Alert";
import PageContainer from "@/components/layout/PageContainer";

export default function AdminDashboard() {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else if (user.role !== "admin") {
      router.replace("/");
    }
  }, [user, router]);

  if (!user) return (
    <PageContainer>
      <div className="flex justify-center py-8">
        <Alert variant="info">Checking authentication...</Alert>
      </div>
    </PageContainer>
  );
  
  if (user.role !== "admin") return (
    <PageContainer>
      <div className="flex justify-center py-8">
        <Alert variant="error">Access denied. Admins only.</Alert>
      </div>
    </PageContainer>
  );

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Baby Shop Admin</h1>
          <p className="text-gray-600">Manage your baby products and orders</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <a 
            href="/admin/products" 
            className="group bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Product Management</h3>
                <p className="text-gray-600 mt-2">Manage baby products, inventory, and categories.</p>
              </div>
            </div>
          </a>

          <a 
            href="/admin/orders" 
            className="group bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">Order Management</h3>
                <p className="text-gray-600 mt-2">Process and track customer orders.</p>
              </div>
            </div>
          </a>

          <a 
            href="/admin/customers" 
            className="group bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">Customer Management</h3>
                <p className="text-gray-600 mt-2">View and manage customer accounts.</p>
              </div>
            </div>
        </a>

          <a 
            href="/admin/offers" 
            className="group bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">Offers & Discounts</h3>
                <p className="text-gray-600 mt-2">Create and manage promotional offers.</p>
              </div>
            </div>
        </a>

          <a 
            href="/admin/analytics" 
            className="group bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">Analytics</h3>
                <p className="text-gray-600 mt-2">View sales reports and insights.</p>
              </div>
            </div>
          </a>

          <a 
            href="/admin/settings" 
            className="group bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-600 transition-colors">Settings</h3>
                <p className="text-gray-600 mt-2">Configure store settings and preferences.</p>
              </div>
            </div>
          </a>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">156</div>
              <div className="text-sm text-gray-600">Total Products</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">23</div>
              <div className="text-sm text-gray-600">Orders Today</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">1,234</div>
              <div className="text-sm text-gray-600">Total Customers</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">₹45,678</div>
              <div className="text-sm text-gray-600">Revenue Today</div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
} 