"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const MobileComingSoon = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you can add email subscription logic
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <div className="mobile-coming-soon">
      <div className="mobile-coming-soon-container">
        {/* Logo */}
        <div className="mobile-logo">
          <Image
            src="/images/TextCrafterLogo.png"
            alt="TextCrafter"
            width={200}
            height={80}
            className="img-fluid"
            priority
          />
        </div>

        {/* Main Content */}
        <div className="mobile-content">
          <div className="mobile-icon">
            <div className="icon-container">
              <i className="fas fa-mobile-alt"></i>
            </div>
          </div>
          
          <h1 className="mobile-title">
            Coming Soon to Mobile
          </h1>
          
          <p className="mobile-description">
            We&apos;re working hard to bring you an amazing mobile experience. 
            Our mobile app is currently under development and will be available soon!
          </p>

          <div className="mobile-features">
            <div className="feature-item">
              <i className="fas fa-check-circle"></i>
              <span>Optimized Mobile Experience</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-check-circle"></i>
              <span>All AI Text Tools</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-check-circle"></i>
              <span>Fast & Responsive Design</span>
            </div>
          </div>

          {/* Email Subscription */}
          <div className="mobile-subscribe">
            <h3>Get Notified When We Launch</h3>
            <form onSubmit={handleSubscribe} className="subscribe-form">
              <div className="input-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="email-input"
                />
                <button type="submit" className="subscribe-btn">
                  <i className="fas fa-bell"></i>
                  Notify Me
                </button>
              </div>
            </form>
            
            {isSubscribed && (
              <div className="success-message">
                <i className="fas fa-check-circle"></i>
                Thank you! We&apos;ll notify you when we launch.
              </div>
            )}
          </div>

          {/* Desktop Access */}
          <div className="desktop-access">
            <p>Want to use TextCrafter now?</p>
            <Link href="/" className="desktop-btn">
              <i className="fas fa-desktop"></i>
              Continue to Desktop Version
            </Link>
          </div>

          {/* Social Links */}
          <div className="mobile-social">
            <p>Follow us for updates:</p>
            <div className="social-links">
              <a href="https://github.com/mohammeddl" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
              <a href="www.linkedin.com/in/daali-mohammed-85736b271" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mobile-footer">
          <p>&copy; 2024 TextCrafter. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default MobileComingSoon;