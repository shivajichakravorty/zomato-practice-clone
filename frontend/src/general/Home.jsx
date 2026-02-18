import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Better food for more people</h1>
          <p className="hero-description">
            For over a decade, we've enabled our customers to discover new tastes, delivered right to their doorstep
          </p>
        </div>

        {/* Decorative Food Images */}
        <div className="food-image-1">🍔</div>
        <div className="food-image-2">🍕</div>
        <div className="food-image-3">🥟</div>
        <div className="food-image-4">🍅</div>
      </div>

      {/* Statistics Section */}
      <div className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-number">3,00,000+</div>
            <div className="stat-label">restaurants</div>
            <div className="stat-icon">🏪</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">800+</div>
            <div className="stat-label">cities</div>
            <div className="stat-icon">📍</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">3 billion+</div>
            <div className="stat-label">orders delivered</div>
            <div className="stat-icon">📋</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">Millions</div>
            <div className="stat-label">happy customers</div>
            <div className="stat-icon">😊</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <h2 className="cta-title">Get Started Today</h2>
        <p className="cta-description">Choose how you want to experience Zomato</p>
        <div className="cta-buttons">
          <button className="cta-button customer" onClick={() => navigate("/user/login")}>
            <span className="cta-icon">👤</span>
            <div>
              <div className="cta-button-title">Order Food</div>
              <div className="cta-button-desc">Browse restaurants & order</div>
            </div>
          </button>
          <button className="cta-button partner" onClick={() => navigate("/foodpartner/login")}>
            <span className="cta-icon">🏪</span>
            <div>
              <div className="cta-button-title">Partner With Us</div>
              <div className="cta-button-desc">Grow your restaurant</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
