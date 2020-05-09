import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectLines, selectLevel, selectScore } from '../redux/selectors';
import { setLines, setLevel, setScore } from '../redux/actions';

export const useGameStatus = (linesCleared) => {
  const dispatch = useDispatch();
  const score = useSelector(selectScore);
  const lines = useSelector(selectLines);
  const level = useSelector(selectLevel);

  const points = [40, 100, 300, 1200];

  const calcScore = useCallback(() => {
    if (linesCleared > 0) {
      dispatch(setScore(score + points[linesCleared - 1] * (level + 1)));
      dispatch(setLines(lines + linesCleared));
    }
  }, [level, points, linesCleared]);

  useEffect(() => {
    calcScore();
  }, [calcScore, linesCleared, score]);

  return [score, level, setLevel, lines];
};
