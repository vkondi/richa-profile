// app/page.tsx
'use client';

import { useState } from 'react';
import { LoshuGrid } from '@/components/LoshuGrid';
import { GridExplanation } from '@/components/GridExplanation';

export default function Home() {
  const [dob, setDob] = useState<string>('');
  const [grid, setGrid] = useState<number[] | null>(null);
  const [numbers, setNumbers] = useState<number[] | null>(null);

  const calculateLoshuGrid = (dateString: string): { grid: number[], numbers: number[] } | null => {
    if (!dateString) return null;

    // Convert date string to numbers
    const dateDigits = dateString.split('-').join('').split('');
    
    // Calculate the numerology numbers from DOB
    const numerologyNumbers = dateDigits.map(digit => parseInt(digit, 10));
    
    // Calculate which positions have numbers
    const positions = Array(9).fill(0);
    
    numerologyNumbers.forEach(num => {
      // In Lo Shu Grid, 9 is placed at position 9, not 0
      const position = num === 0 ? 9 : num;
      positions[position - 1]++;
    });
    debugger;
    return { grid: positions, numbers: numerologyNumbers };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = calculateLoshuGrid(dob);
    if (result) {
      setGrid(result.grid);
      setNumbers(result.numbers);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Lo Shu Grid Numerology Calculator</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="dob" className="block font-medium mb-2">Enter your Date of Birth:</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Generate Lo Shu Grid
        </button>
      </form>

      {grid && numbers && (
        <div className="results">
          <h2 className="text-2xl font-semibold mb-4 text-center">Your Lo Shu Grid</h2>
          
          <div className="mb-6 p-4 bg-gray-50 rounded-md">
            <p className="mb-2"><strong>Date of Birth:</strong> {dob}</p>
            <p><strong>Numerology Numbers:</strong> {numbers.join(', ')}</p>
          </div>
          
          <LoshuGrid grid={grid} />
          <GridExplanation />
        </div>
      )}
    </div>
  );
}