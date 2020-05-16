import { useEffect, useCallback, useState } from 'react';

export const useGameStatus = (linesCleared) => {
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(0);

  const points = [40, 100, 300, 1200];

  const calcScore = useCallback(() => {
    if (linesCleared > 0) {
      setScore(score + points[linesCleared - 1] * (level + 1));
      setLines(lines + linesCleared);
    }
  }, [level, points, linesCleared]);

  useEffect(() => {
    calcScore();
  }, [calcScore, linesCleared, score]);

  return [score, lines, level, setLevel];
};
