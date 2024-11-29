import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const BingoGame = () => {
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  
  const bingoWords = [
    "First phrase", "Second phrase", "Third phrase", "Fourth phrase", "Fifth phrase",
    "Sixth phrase", "Seventh phrase", "Eighth phrase", "Ninth phrase", "Tenth phrase",
    "11th phrase", "12th phrase", "13th phrase", "14th phrase", "15th phrase",
    "16th phrase", "17th phrase", "18th phrase", "19th phrase", "20th phrase",
    "21st phrase", "22nd phrase", "23rd phrase", "24th phrase", "25th phrase"
  ];

  useEffect(() => {
    const savedSelections = localStorage.getItem('bingoSelections');
    if (savedSelections) {
      setSelectedIndexes(JSON.parse(savedSelections));
    }
  }, []);

  const toggleCell = (index) => {
    const newSelectedIndexes = selectedIndexes.includes(index)
      ? selectedIndexes.filter(i => i !== index)
      : [...selectedIndexes, index];
    
    setSelectedIndexes(newSelectedIndexes);
    localStorage.setItem('bingoSelections', JSON.stringify(newSelectedIndexes));
  };

  const resetGame = () => {
    setSelectedIndexes([]);
    localStorage.setItem('bingoSelections', JSON.stringify([]));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">SNG BINGO</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-center mb-4">
            <Button onClick={resetGame} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset Board
            </Button>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {bingoWords.map((word, i) => (
              <div
                key={i}
                onClick={() => toggleCell(i)}
                style={{ 
                  backgroundColor: selectedIndexes.includes(i) ? '#30FF00' : 'transparent',
                  transition: 'background-color 0.2s'
                }}
                className="aspect-square border rounded p-2 text-center flex items-center justify-center text-sm cursor-pointer hover:bg-gray-100"
              >
                {word}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BingoGame;
