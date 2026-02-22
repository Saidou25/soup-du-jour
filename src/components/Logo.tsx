import { useState, useEffect } from "react";
import "./Logo.css";

export default function Logo() {
  const letterArray = ["h", "e", "f", "s", "'", " ", "s"];
  const letterArray1 = ["i", "v", "e", "s"];
  const letterArray2 = ["i", "m", "p", "l", "y", "f", "i", "e", "d"];

  const [start, setStart] = useState(false);
  const [start1, setStart1] = useState(false);
  const [start2, setStart2] = useState(false);

  // States to store visible letters for each array
  const [visibleLetters, setVisibleLetters] = useState<string[]>([]);
  const [visibleLetters1, setVisibleLetters1] = useState<string[]>([]);
  const [visibleLetters2, setVisibleLetters2] = useState<string[]>([]);

  // Indices for tracking which letter to reveal
  const [index, setIndex] = useState(0);
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);

  // Revealing letters for the first array
  useEffect(() => {
    if (!start) {
      return;
    }
    if (index < letterArray.length) {
      const timeout = setTimeout(() => {
        setVisibleLetters((prevLetters) => [
          ...prevLetters,
          letterArray[index],
        ]);
        setIndex((prevIndex) => prevIndex + 1);
      }, 100);

      return () => clearTimeout(timeout);
    } else {
      // After the first sequence is complete, set start1 to true to begin the next sequence
      setStart1(true);
    }
  }, [index, start]);

  // Revealing letters for the second array
  useEffect(() => {
    if (start1 && index1 < letterArray1.length) {
      const timeout1 = setTimeout(() => {
        setVisibleLetters1((prevLetters1) => [
          ...prevLetters1,
          letterArray1[index1],
        ]);
        setIndex1((prevIndex1) => prevIndex1 + 1);
      }, 100);

      return () => clearTimeout(timeout1);
    } else if (index1 === letterArray1.length) {
      // After the second sequence is complete, set start2 to true to begin the third sequence
      setStart2(true);
    }
  }, [index1, start1]);

  // Revealing letters for the third array
  useEffect(() => {
    if (start2 && index2 < letterArray2.length) {
      const timeout2 = setTimeout(() => {
        setVisibleLetters2((prevLetters2) => [
          ...prevLetters2,
          letterArray2[index2],
        ]);
        setIndex2((prevIndex2) => prevIndex2 + 1);
      }, 100);

      return () => clearTimeout(timeout2);
    }
  }, [index2, start2]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setStart(true); // Start the first sequence after 2 seconds
    }, 2000); // 2-second delay

    return () => clearTimeout(timeoutId); // Clean up timeout when component unmounts
  }, []);

  return (
    <div className="cls-container elevated-card">
      <div className="cls">
        <span className="first-letter">C</span>
        {start &&
          visibleLetters.map((letter, index) => (
            <span key={index} className="visible">
              {letter === " " ? <span className="space"></span> : letter}
            </span>
          ))}
        <span className="first-letter"> L</span>
        {start1 &&
          visibleLetters1.map((letter1, index1) => (
            <span key={index1} className="visible">
              {letter1 === " " ? <span className="space"></span> : letter1}
            </span>
          ))}
        <span className="first-letter"> S</span>
        {start2 &&
          visibleLetters2.map((letter2, index2) => (
            <span key={index2} className="visible">
              {letter2 === " " ? <span className="space"></span> : letter2}
            </span>
          ))}
      </div>
    </div>
  );
}
