"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const services = [
  {
    id: "vulnerability-scan",
    icon: "🔍",
    title: "Vulnerability Scanner",
    description:
      "AI-powered code scanning that identifies security vulnerabilities across your entire codebase in real-time.",
    features: [
      "Multi-language support (JavaScript, Python, Java, Go, etc.)",
      "OWASP Top 10 coverage",
      "Custom rule configuration",
      "Integration with CI/CD pipelines",
    ],
    pricing: "Free",
    status: "Available",
  },
  {
    id: "auto-fix",
    icon: "⚡",
    title: "Automated Fix Generator",
    description:
      "Generate production-ready security fixes with AI. Review, customize, and deploy with confidence.",
    features: [
      "Context-aware code fixes",
      "Test case generation",
      "Diff visualization",
      "Multi-fix suggestions",
    ],
    pricing: "Pro",
    status: "Available",
  },
  {
    id: "pr-automation",
    icon: "🚀",
    title: "PR Automation",
    description:
      "Automatically create pull requests with security fixes, complete with documentation and explanations.",
    features: [
      "Automated PR creation",
      "Detailed commit messages",
      "Code review assistance",
      "Merge conflict resolution",
    ],
    pricing: "Pro",
    status: "Available",
  },
  {
    id: "monitoring",
    icon: "📊",
    title: "Real-time Monitoring",
    description:
      "Continuous security monitoring with instant alerts for new vulnerabilities and potential threats.",
    features: [
      "24/7 automated scanning",
      "Slack/Email notifications",
      "Custom alert rules",
      "Security dashboard",
    ],
    pricing: "Enterprise",
    status: "Available",
  },
  {
    id: "vault",
    icon: "🔐",
    title: "Secure Vault",
    description:
      "Enterprise-grade encrypted storage for API keys, credentials, and sensitive configuration data.",
    features: [
      "AES-256 encryption",
      "Role-based access control",
      "Audit logging",
      "Secret rotation",
    ],
    pricing: "Pro",
    status: "Available",
  },
  {
    id: "audit-logs",
    icon: "📝",
    title: "Audit & Compliance",
    description:
      "Complete audit trail of all security events, actions, and changes for compliance requirements.",
    features: [
      "Comprehensive event logging",
      "Export to SIEM tools",
      "Compliance reports (SOC 2, ISO 27001)",
      "Custom retention policies",
    ],
    pricing: "Enterprise",
    status: "Available",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Header */}
      <section className="bg-linear-to-br from-purple-600 to-purple-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Our Services</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Comprehensive security tools and services to protect your
            applications and accelerate secure development.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card
                key={service.id}
                className="p-8 bg-white border-gray-200 hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-3xl">{service.icon}</span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      service.pricing === "Free"
                        ? "bg-green-100 text-green-700"
                        : service.pricing === "Pro"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {service.pricing}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/login?tab=register">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Get Started
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Seamless Integrations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with your existing tools and workflows
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "GitHub",
              "GitLab",
              "Bitbucket",
              "Jenkins",
              "CircleCI",
              "Slack",
              "Jira",
              "VS Code",
            ].map((tool) => (
              <div
                key={tool}
                className="bg-white p-6 rounded-lg border border-gray-200 flex items-center justify-center text-gray-700 font-medium hover:shadow-md transition-shadow"
              >
                {tool}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start protecting your code today with our comprehensive security
            platform
          </p>
          <Link href="/login?tab=register">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6"
            >
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
