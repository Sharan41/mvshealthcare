import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium' }) => {
  return (
    <div className={`geometric-loader loader-${size}`}>
      <div className="loader-shape shape-1"></div>
      <div className="loader-shape shape-2"></div>
      <div className="loader-shape shape-3"></div>
      <div className="loader-shape shape-4"></div>
    </div>
  );
};

export default LoadingSpinner;



