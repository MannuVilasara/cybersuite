"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = [
  "All",
  "Security Tools",
  "AI Models",
  "Integrations",
  "Templates",
  "Extensions",
];

const marketplaceItems = [
  {
    id: 1,
    name: "Advanced SQL Injection Detector",
    category: "Security Tools",
    description:
      "Enhanced SQL injection detection with machine learning capabilities",
    price: "$49/month",
    rating: 4.8,
    reviews: 127,
    publisher: "SecureCode Labs",
    icon: "🛡️",
    featured: true,
  },
  {
    id: 2,
    name: "XSS Prevention AI Model",
    category: "AI Models",
    description:
      "Pre-trained model for detecting and preventing XSS vulnerabilities",
    price: "$99/month",
    rating: 4.9,
    reviews: 89,
    publisher: "AI Security",
    icon: "🤖",
    featured: true,
  },
  {
    id: 3,
    name: "Jira Security Integration",
    category: "Integrations",
    description: "Seamlessly sync security findings with Jira issues",
    price: "Free",
    rating: 4.6,
    reviews: 256,
    publisher: "CyberSec",
    icon: "🔗",
    featured: false,
  },
  {
    id: 4,
    name: "OWASP Compliance Template",
    category: "Templates",
    description: "Pre-configured security scanning rules based on OWASP Top 10",
    price: "$29/month",
    rating: 4.7,
    reviews: 178,
    publisher: "OWASP Community",
    icon: "📋",
    featured: false,
  },
  {
    id: 5,
    name: "VS Code Security Extension",
    category: "Extensions",
    description: "Real-time security scanning directly in your IDE",
    price: "Free",
    rating: 4.5,
    reviews: 412,
    publisher: "CyberSec",
    icon: "🔌",
    featured: false,
  },
  {
    id: 6,
    name: "Kubernetes Security Scanner",
    category: "Security Tools",
    description: "Scan your K8s configurations for security misconfigurations",
    price: "$79/month",
    rating: 4.8,
    reviews: 94,
    publisher: "K8s Security",
    icon: "☸️",
    featured: true,
  },
];

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = marketplaceItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Header */}
      <section className="bg-linear-to-br from-purple-600 to-purple-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Security Marketplace
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            Discover and install powerful security tools, AI models, and
            integrations to enhance your development workflow.
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <Input
              type="text"
              placeholder="Search for tools, models, integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 text-lg bg-white/10 border-white/20 text-white placeholder:text-purple-200"
            />
          </div>
        </div>
      </section>

      {/* Coming Soon Banner */}
      <section className="py-8 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-4">
            <span className="text-2xl">🚧</span>
            <p className="text-purple-900 font-medium">
              Marketplace is coming soon! We&apos;re working hard to bring you
              the best security tools and integrations.
            </p>
            <span className="text-2xl">🚧</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      {selectedCategory === "All" && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Featured Items
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {marketplaceItems
                .filter((item) => item.featured)
                .map((item) => (
                  <Card
                    key={item.id}
                    className="p-6 bg-white border-purple-200 border-2 hover:shadow-xl transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-3xl">{item.icon}</span>
                      </div>
                      <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-xs font-medium">
                        Featured
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {item.name}
                    </h3>

                    <p className="text-sm text-gray-600 mb-4">
                      by {item.publisher}
                    </p>

                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex items-center mb-4">
                      <span className="text-yellow-500 mr-2">★★★★★</span>
                      <span className="text-sm text-gray-600">
                        {item.rating} ({item.reviews} reviews)
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-purple-600">
                        {item.price}
                      </span>
                      <Button
                        className="bg-purple-600 hover:bg-purple-700"
                        disabled
                      >
                        Coming Soon
                      </Button>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* All Items */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {selectedCategory === "All" ? "All Items" : selectedCategory}
          </h2>

          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No items found matching your criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="p-6 bg-white border-gray-200 hover:shadow-lg transition-all"
                >
                  <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-3xl">{item.icon}</span>
                  </div>

                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium mb-3">
                    {item.category}
                  </span>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4">
                    by {item.publisher}
                  </p>

                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center mb-4">
                    <span className="text-yellow-500 mr-2">★★★★★</span>
                    <span className="text-sm text-gray-600">
                      {item.rating} ({item.reviews})
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple-600">
                      {item.price}
                    </span>
                    <Button
                      className="bg-purple-600 hover:bg-purple-700"
                      disabled
                    >
                      Coming Soon
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Get Notified When Marketplace Launches
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Be the first to know when new tools and integrations become
            available
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
            />
            <Button className="bg-purple-600 hover:bg-purple-700">
              Notify Me
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
