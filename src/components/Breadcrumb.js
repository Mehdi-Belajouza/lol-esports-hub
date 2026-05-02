import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

const Breadcrumb = ({ crumbs }) => {
  return (
    <nav className="flex items-center text-sm text-text-secondary mb-6">
      {crumbs.map((crumb, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <FaChevronRight className="mx-2 text-text-muted" />}
          {crumb.link ? (
            <Link to={crumb.link} className="hover:text-text-primary transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-text-primary font-semibold">{crumb.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;