📊 Sorting Algorithm Visualizer

A modern, interactive web application that visualizes how different sorting algorithms work in real-time. Built with React and Tailwind CSS, this tool helps demystify complex algorithms through engaging animations and color-coded state changes.

✨ Features

Real-time Visualization: Watch algorithms sort data step-by-step.

Multiple Algorithms: Currently supports Bubble Sort, Selection Sort, and Insertion Sort (with architecture ready for more).

Speed Control: Adjustable animation speed to carefully analyze each step or speed through the sorting process.

Dynamic Array Generation: Generate new random data sets with a single click.

Color-Coded States:

🟦 Default: Unsorted elements

🟥 Red: Elements currently being compared

🟨 Yellow: Elements being swapped

🟩 Green: Fully sorted elements

Responsive Design: Beautiful dark-mode UI that works seamlessly across devices.

🛠️ Tech Stack

Frontend Framework: React.js

Styling: Tailwind CSS

Icons: Lucide React

🚀 Getting Started

To run this project locally, follow these steps:

Prerequisites

Make sure you have Node.js and npm installed on your machine.

Installation

Clone the repository:

git clone https://github.com/yourusername/sorting-visualizer.git


Navigate into the directory:

cd sorting-visualizer


Install dependencies:

npm install


Start the development server:

npm run dev


🧠 How it Works

The visualizer uses React state to manage the array of numbers and an auxiliary array to track the "status" of each bar (default, comparing, swapping, sorted). The sorting algorithms are implemented as asynchronous functions that pause execution using JavaScript Promises (setTimeout), allowing React to re-render the UI at each step of the algorithm.

🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

📝 License

This project is MIT licensed.
