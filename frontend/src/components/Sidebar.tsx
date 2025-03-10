import React from 'react';
import './Sidebar.css';
import { Grid, Lock, Mail, CreditCard, Grid as Apps, LogOut } from 'react-feather';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="user-profile">
        <div className="avatar">
          {/* User avatar will be set via CSS background-image */}
        </div>
        <div className="user-info">
          <h3>Amir</h3>
          <p>
            <a href="https://github.com/codacy20">link to GitHub</a>
          </p>
        </div>
      </div>

      <ul className="menu-items">
        <li>
          <span className="icon"><Grid size={18} /></span>
          <span>General</span>
        </li>
        <li>
          <span className="icon"><Lock size={18} /></span>
          <span>Password</span>
        </li>
        <li>
          <span className="icon"><Mail size={18} /></span>
          <span>Invitations</span>
        </li>
        <li className="active">
          <span className="icon"><CreditCard size={18} /></span>
          <span>Billing</span>
        </li>
        <li>
          <span className="icon"><Apps size={18} /></span>
          <span>Apps</span>
        </li>
      </ul>

      <div className="logout">
        <span className="icon"><LogOut size={18} /></span>
        <span>Log out</span>
      </div>
    </div>
  );
};

export default Sidebar; 