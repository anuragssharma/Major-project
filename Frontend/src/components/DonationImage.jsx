import React, { useState } from 'react';
import { extractDonationImage } from '../utils/imageHelper';

export default function DonationImage({ item, className = 'w-16 h-16' }) {
  const [hasError, setHasError] = useState(false);

  const imageUrl = extractDonationImage(item);
  const deviceType = item?.deviceDetails?.deviceType || item?.title || 'E-Waste';
  const label = deviceType.trim().slice(0, 3).toUpperCase();

  if (!imageUrl || hasError) {
    return (
      <div
        className={`${className} rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-bold text-xs flex items-center justify-center flex-shrink-0 select-none shadow-inner`}
      >
        {label}
      </div>
    );
  }

  return (
    <div className={`${className} rounded-xl bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0 flex items-center justify-center`}>
      <img
        src={imageUrl}
        alt={deviceType}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={() => setHasError(true)}
      />
    </div>
  );
}