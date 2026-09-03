import React, { useState, useEffect } from "react";
import { DollarSign, Package, ShoppingBag, TrendingUp, AlertTriangle } from "lucide-react";

export default function Dashboard() {
  const [productCount, setProductCount] = useState(0);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    // Load dynamic product data from LocalStorage
    const savedProducts = localStorage.getItem("admin_products");
    if (savedProducts) {
      const parsed = JSON.parse(savedProducts);
      setProductCount(parsed.length);
      setLowStockProducts(parsed.filter((p) => p.stock < 10));
    } else {
      setProductCount(3);
    }
  }, []);

  const stats = [
    { title: "Total Revenue", value: "$4,250.00", icon: DollarSign, change: "+12.5%", isPositive: true },
    { title: "Total Orders", value: "24", icon: ShoppingBag, change: "+8.2%", isPositive: true },
    { title: "Active Products", value: productCount, icon: Package, change: "Live Sync", isPositive: true },
    { title: "Conversion Rate", value: "3.2%", icon: TrendingUp, change: "-0.4%", isPositive: false },
  ];

  const recentOrders = [
    { id: "ORD-1001", customer: "John Doe", total: "$299.98", status: "Delivered" },
    { id: "ORD-1002", customer: "Jane Smith", total: "$79.99", status: "Processing" },
    { id: "ORD-1003", customer: "Alex Johnson", total: "$199.99", status: "Pending" },
  ];

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>Dashboard Overview</h1>
        <p style={{ color: "#666", margin: "4px 0 0 0" }}>Welcome back! Here is what's happening with your store today.</p>
      </div>

      {/* Metric Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span style={{ fontSize: "14px", color: "#6b7280", fontWeight: "500" }}>{stat.title}</span>
                <div style={{ padding: "8px", borderRadius: "8px", backgroundColor: "#eff6ff", color: "#2563eb" }}>
                  <Icon size={20} />
                </div>
              </div>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#111827" }}>{stat.value}</div>
              <span style={{ fontSize: "12px", color: stat.isPositive ? "#16a34a" : "#dc2626", fontWeight: "600", marginTop: "4px", display: "block" }}>
                {stat.change} vs last month
              </span>
            </div>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "24px" }}>
        {/* Recent Orders List */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "16px", margin: "0 0 16px 0" }}>Recent Orders</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e5e7eb", color: "#6b7280" }}>
                <th style={{ paddingBottom: "10px" }}>Order ID</th>
                <th style={{ paddingBottom: "10px" }}>Customer</th>
                <th style={{ paddingBottom: "10px" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "12px 0", fontWeight: "600", color: "#2563eb" }}>{order.id}</td>
                  <td style={{ padding: "12px 0", color: "#374151" }}>{order.customer}</td>
                  <td style={{ padding: "12px 0", fontWeight: "500" }}>{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Low Stock Alerts */}
        <div style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <AlertTriangle size={20} style={{ color: "#d97706" }} />
            <h3 style={{ fontSize: "16px", fontWeight: "bold", margin: 0 }}>Low Stock Alerts</h3>
          </div>
          {lowStockProducts.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {lowStockProducts.map((prod) => (
                <div key={prod.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", backgroundColor: "#fffbeb", borderRadius: "6px", border: "1px solid #fef3c7" }}>
                  <div>
                    <div style={{ fontWeight: "600", fontSize: "14px" }}>{prod.name}</div>
                    <div style={{ fontSize: "12px", color: "#92400e" }}>Category: {prod.category}</div>
                  </div>
                  <span style={{ fontSize: "12px", fontWeight: "bold", color: "#dc2626", backgroundColor: "#fee2e2", padding: "4px 8px", borderRadius: "4px" }}>
                    {prod.stock} left
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>All items have sufficient stock levels.</p>
          )}
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
};