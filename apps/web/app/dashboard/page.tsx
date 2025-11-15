"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "scans" | "fixes">(
    "overview"
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600">Here&apos;s your security overview</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-white border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">🔍</span>
              <span className="text-xs text-green-600 font-medium">+12%</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">247</div>
            <div className="text-sm text-gray-600">Scans Completed</div>
          </Card>

          <Card className="p-6 bg-white border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">⚠️</span>
              <span className="text-xs text-red-600 font-medium">-8%</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">23</div>
            <div className="text-sm text-gray-600">Active Vulnerabilities</div>
          </Card>

          <Card className="p-6 bg-white border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">✅</span>
              <span className="text-xs text-green-600 font-medium">+34%</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">156</div>
            <div className="text-sm text-gray-600">Fixes Applied</div>
          </Card>

          <Card className="p-6 bg-white border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">🚀</span>
              <span className="text-xs text-purple-600 font-medium">+18%</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">42</div>
            <div className="text-sm text-gray-600">PRs Created</div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-4 px-2 font-medium transition-colors border-b-2 ${
              activeTab === "overview"
                ? "border-purple-600 text-purple-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("scans")}
            className={`pb-4 px-2 font-medium transition-colors border-b-2 ${
              activeTab === "scans"
                ? "border-purple-600 text-purple-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Recent Scans
          </button>
          <button
            onClick={() => setActiveTab("fixes")}
            className={`pb-4 px-2 font-medium transition-colors border-b-2 ${
              activeTab === "fixes"
                ? "border-purple-600 text-purple-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Pending Fixes
          </button>
        </div>

        {/* Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-white border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: "🔍",
                    text: "Scan completed on main repository",
                    time: "2 hours ago",
                  },
                  {
                    icon: "⚡",
                    text: "3 fixes generated for SQL injection",
                    time: "5 hours ago",
                  },
                  {
                    icon: "🚀",
                    text: "PR #42 merged successfully",
                    time: "1 day ago",
                  },
                  {
                    icon: "✅",
                    text: "XSS vulnerability fixed",
                    time: "2 days ago",
                  },
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-start">
                    <span className="text-2xl mr-3">{activity.icon}</span>
                    <div className="flex-1">
                      <p className="text-gray-900">{activity.text}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-white border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Vulnerability Breakdown
              </h3>
              <div className="space-y-4">
                {[
                  { type: "SQL Injection", count: 8, color: "bg-red-500" },
                  { type: "XSS", count: 6, color: "bg-orange-500" },
                  { type: "CSRF", count: 5, color: "bg-yellow-500" },
                  { type: "Auth Issues", count: 4, color: "bg-purple-500" },
                ].map((vuln, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-900 font-medium">
                        {vuln.type}
                      </span>
                      <span className="text-gray-600">{vuln.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${vuln.color} h-2 rounded-full`}
                        style={{ width: `${(vuln.count / 23) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === "scans" && (
          <Card className="p-6 bg-white border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Recent Scans
            </h3>
            <div className="space-y-4">
              <p className="text-gray-600">
                Coming soon - Scan history and details
              </p>
            </div>
          </Card>
        )}

        {activeTab === "fixes" && (
          <Card className="p-6 bg-white border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Pending Fixes
            </h3>
            <div className="space-y-4">
              <p className="text-gray-600">
                Coming soon - Review and apply fixes
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
