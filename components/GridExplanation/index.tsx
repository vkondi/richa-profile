// app/components/GridExplanation.tsx
import React from 'react';

export const GridExplanation: React.FC = () => {
  const explanations = [
    { position: 1, meaning: 'Represents career and ambition' },
    { position: 2, meaning: 'Represents relationships and partnerships' },
    { position: 3, meaning: 'Represents creativity and self-expression' },
    { position: 4, meaning: 'Represents stability and foundation' },
    { position: 5, meaning: 'Represents change and adaptability' },
    { position: 6, meaning: 'Represents responsibility and nurturing' },
    { position: 7, meaning: 'Represents spirituality and inner wisdom' },
    { position: 8, meaning: 'Represents material success and power' },
    { position: 9, meaning: 'Represents completion and humanitarian concerns' }
  ];

  return (
    <div className="max-w-lg mx-auto">
      <h3 className="text-xl font-medium mb-3">Grid Interpretation:</h3>
      <ul className="space-y-2 pl-5 list-disc">
        {explanations.map((item) => (
          <li key={item.position}>
            <strong>Position {item.position}:</strong> {item.meaning}
          </li>
        ))}
      </ul>
    </div>
  );
};