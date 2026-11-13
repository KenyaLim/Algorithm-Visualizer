import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Settings2, BarChart2 } from 'lucide-react';

const ARRAY_SIZE = 40;
const MIN_VAL = 10;
const MAX_VAL = 300;

// Color states for the bars
const COLORS = {
  DEFAULT: '#3b82f6', // blue-500
  COMPARE: '#ef4444', // red-500
  SWAP: '#eab308',    // yellow-500
  SORTED: '#22c55e',  // green-500
};

export default function AlgorithmVisualizer() {
  const [array, setArray] = useState([]);
  const [barColors, setBarColors] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(50); // Delay in ms
  const [algorithm, setAlgorithm] = useState('bubble');

  // Generate a random array on initial load
  useEffect(() => {
    generateNewArray();
  }, []);

  const generateNewArray = () => {
    if (isSorting) return;
    const newArr = [];
    const newColors = [];
    for (let i = 0; i < ARRAY_SIZE; i++) {
      newArr.push(Math.floor(Math.random() * (MAX_VAL - MIN_VAL + 1) + MIN_VAL));
      newColors.push(COLORS.DEFAULT);
    }
    setArray(newArr);
    setBarColors(newColors);
  };

  // Helper function to pause execution for animation
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // --- ALGORITHMS ---

  const bubbleSort = async () => {
    let arr = [...array];
    let colors = [...barColors];

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        // Highlight elements being compared
        colors[j] = COLORS.COMPARE;
        colors[j + 1] = COLORS.COMPARE;
        setBarColors([...colors]);
        await sleep(100 - speed);

        if (arr[j] > arr[j + 1]) {
          // Highlight swap
          colors[j] = COLORS.SWAP;
          colors[j + 1] = COLORS.SWAP;
          setBarColors([...colors]);
          await sleep(100 - speed);

          // Swap
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
        }

        // Reset colors to default
        colors[j] = COLORS.DEFAULT;
        colors[j + 1] = COLORS.DEFAULT;
      }
      // Mark the last element of this iteration as sorted
      colors[arr.length - 1 - i] = COLORS.SORTED;
      setBarColors([...colors]);
    }
    // Mark the very first element as sorted at the end
    colors[0] = COLORS.SORTED;
    setBarColors([...colors]);
  };

  const selectionSort = async () => {
    let arr = [...array];
    let colors = [...barColors];

    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      colors[minIdx] = COLORS.COMPARE;
      setBarColors([...colors]);

      for (let j = i + 1; j < arr.length; j++) {
        colors[j] = COLORS.COMPARE;
        setBarColors([...colors]);
        await sleep(100 - speed);

        if (arr[j] < arr[minIdx]) {
          colors[minIdx] = COLORS.DEFAULT; // Reset previous min
          minIdx = j;
          colors[minIdx] = COLORS.SWAP; // Mark new min
        } else {
          colors[j] = COLORS.DEFAULT;
        }
        setBarColors([...colors]);
      }

      if (minIdx !== i) {
        let temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
        setArray([...arr]);
      }

      colors[minIdx] = COLORS.DEFAULT;
      colors[i] = COLORS.SORTED;
      setBarColors([...colors]);
    }
  };

  const insertionSort = async () => {
    let arr = [...array];
    let colors = [...barColors];

    colors[0] = COLORS.SORTED;
    setBarColors([...colors]);

    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;

      colors[i] = COLORS.COMPARE;
      setBarColors([...colors]);
      await sleep(100 - speed);

      while (j >= 0 && arr[j] > key) {
        colors[j] = COLORS.COMPARE;
        colors[j + 1] = COLORS.SWAP;
        setBarColors([...colors]);
        await sleep(100 - speed);

        arr[j + 1] = arr[j];
        setArray([...arr]);

        colors[j] = COLORS.SORTED;
        colors[j + 1] = COLORS.SORTED;
        j = j - 1;
      }
      arr[j + 1] = key;
      setArray([...arr]);
      
      for(let k = 0; k <= i; k++) colors[k] = COLORS.SORTED;
      setBarColors([...colors]);
    }
  };

  // --- CONTROLLER ---

  const handleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);

    // Reset colors before starting
    setBarColors(new Array(ARRAY_SIZE).fill(COLORS.DEFAULT));

    if (algorithm === 'bubble') await bubbleSort();
    if (algorithm === 'selection') await selectionSort();
    if (algorithm === 'insertion') await insertionSort();

    setIsSorting(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30">
      
      {/* Header & Controls */}
      <header className="bg-slate-900 border-b border-slate-800 p-6 shadow-xl">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <BarChart2 className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                AlgoVis.
              </h1>
              <p className="text-xs text-slate-400 font-medium tracking-wider uppercase mt-1">Sorting Visualizer</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 bg-slate-950/50 p-2 rounded-2xl border border-slate-800/50">
            <select 
              className="bg-slate-800 border-none outline-none text-sm font-medium py-2.5 px-4 rounded-xl cursor-pointer hover:bg-slate-700 transition-colors disabled:opacity-50"
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              disabled={isSorting}
            >
              <option value="bubble">Bubble Sort</option>
              <option value="selection">Selection Sort</option>
              <option value="insertion">Insertion Sort</option>
            </select>

            <div className="h-8 w-px bg-slate-800 hidden sm:block"></div>

            <div className="flex items-center gap-3 px-4">
              <Settings2 className="w-4 h-4 text-slate-400" />
              <input
                type="range"
                min="10"
                max="99"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
                disabled={isSorting}
                className="w-24 accent-blue-500 cursor-pointer"
                title="Animation Speed"
              />
            </div>

            <div className="h-8 w-px bg-slate-800 hidden sm:block"></div>

            <button
              onClick={generateNewArray}
              disabled={isSorting}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
              <RotateCcw className="w-4 h-4" />
              Generate
            </button>
            
            <button
              onClick={handleSort}
              disabled={isSorting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all transform active:scale-95 disabled:opacity-50 disabled:active:scale-100 shadow-lg shadow-blue-500/20"
            >
              <Play className="w-4 h-4" fill="currentColor" />
              {isSorting ? 'Sorting...' : 'Start Sort'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Visualization Area */}
      <main className="max-w-6xl mx-auto p-8 mt-8">
        
        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mb-12 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <div className="w-3 h-3 rounded-sm bg-blue-500"></div> Unsorted
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <div className="w-3 h-3 rounded-sm bg-red-500"></div> Comparing
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <div className="w-3 h-3 rounded-sm bg-yellow-500"></div> Swapping
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <div className="w-3 h-3 rounded-sm bg-green-500"></div> Sorted
          </div>
        </div>

        {/* Bars Container */}
        <div className="h-[400px] w-full flex items-end justify-center gap-[2px] sm:gap-1 bg-slate-900/50 p-6 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-sm">
          {array.map((value, idx) => (
            <div
              key={idx}
              className="w-full rounded-t-sm transition-all duration-75 ease-in-out relative group"
              style={{
                height: `${(value / MAX_VAL) * 100}%`,
                backgroundColor: barColors[idx]
              }}
            >
              {/* Tooltip on hover */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                {value}
              </div>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
}
