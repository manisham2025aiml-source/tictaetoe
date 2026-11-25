
import { useState } from "react";

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [draws, setDraws] = useState(0);
  const [finished, setFinished] = useState(false);

  const patterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  const winningLine = patterns.find(([a, b, c]) =>
    board[a] && board[a] === board[b] && board[a] === board[c]
  );

  const winner = winningLine ? board[winningLine[0]] : null;
  const isDraw = !winner && board.every(Boolean);

  function play(index) {
    if (board[index] || finished) return;

    const next = [...board];
    next[index] = turn;
    setBoard(next);

    const win = patterns.find(([a, b, c]) =>
      next[a] && next[a] === next[b] && next[a] === next[c]
    );

    if (win) {
      setScores(prev => ({
        ...prev,
        [turn]: prev[turn] + 1,
      }));
      setFinished(true);
    } else if (next.every(Boolean)) {
      setDraws(prev => prev + 1);
      setFinished(true);
    } else {
      setTurn(turn === "X" ? "O" : "X");
    }
  }

  function restart() {
    setBoard(Array(9).fill(""));
    setTurn("X");
    setFinished(false);
  }

  function resetAll() {
    restart();
    setScores({ X: 0, O: 0 });
    setDraws(0);
  }

  return (
    <main className="min-h-screen bg-[#090e1f] text-white flex items-center justify-center p-5">
      <div className="w-full max-w-md">

        <header className="text-center mb-8">
          <p className="text-cyan-400 tracking-[5px] font-bold text-sm mb-3">
            THE CLASSIC GAME
          </p>
          <h1 className="text-5xl font-black">
            TIC <span className="text-cyan-400">TAC</span> TOE
          </h1>
          <p className="text-gray-400 mt-3">
            Think smart. Play hard. Win big!
          </p>
        </header>

        <section className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-[#171f38] border border-cyan-400/40 rounded-2xl p-4 text-center">
            <p className="text-cyan-400 text-2xl font-bold">X</p>
            <p className="text-3xl font-bold">{scores.X}</p>
            <p className="text-gray-400 text-xs">PLAYER X</p>
          </div>

          <div className="bg-[#171f38] border border-gray-600 rounded-2xl p-4 text-center">
            <p className="text-yellow-400 font-bold">DRAWS</p>
            <p className="text-3xl font-bold">{draws}</p>
            <p className="text-gray-400 text-xs">TIED GAMES</p>
          </div>

          <div className="bg-[#171f38] border border-pink-400/40 rounded-2xl p-4 text-center">
            <p className="text-pink-400 text-2xl font-bold">O</p>
            <p className="text-3xl font-bold">{scores.O}</p>
            <p className="text-gray-400 text-xs">PLAYER O</p>
          </div>
        </section>

        <div className="bg-[#171f38] rounded-xl p-4 text-center mb-5 border border-gray-700">
          {winner ? (
            <p className="text-green-400 font-bold text-xl">
              🎉 Player {winner} Wins!
            </p>
          ) : isDraw ? (
            <p className="text-yellow-400 font-bold text-xl">
              🤝 It's a Draw!
            </p>
          ) : (
            <p className="font-semibold text-lg">
              Player <span className={turn === "X" ? "text-cyan-400" : "text-pink-400"}>{turn}</span>'s Turn
            </p>
          )}
        </div>

        <section className="grid grid-cols-3 gap-3">
          {board.map((cell, index) => {
            const isWinning = winningLine?.includes(index);

            return (
              <button
                key={index}
                onClick={() => play(index)}
                disabled={Boolean(cell) || finished}
                className={`aspect-square rounded-2xl text-6xl font-black border-2 transition-all duration-200
                  ${isWinning
                    ? "bg-green-500/20 border-green-400"
                    : "bg-[#171f38] border-[#293653] hover:border-cyan-400"
                  }
                  ${cell === "X" ? "text-cyan-400" : "text-pink-400"}
                  ${!cell && !finished ? "hover:bg-[#253453] hover:scale-105" : ""}
                `}
              >
                {cell}
              </button>
            );
          })}
        </section>

        <div className="flex gap-3 mt-7">
          <button
            onClick={restart}
            className="flex-1 bg-cyan-400 hover:bg-cyan-300 text-[#090e1f] font-bold py-4 rounded-xl transition"
          >
            ↻ Restart
          </button>

          <button
            onClick={resetAll}
            className="flex-1 bg-[#293653] hover:bg-[#405075] font-bold py-4 rounded-xl transition"
          >
            Reset Scores
          </button>
        </div>

        <p className="text-center text-gray-500 text-xs mt-8">
          Made with React & Tailwind CSS
        </p>

      </div>
    </main>
  );
}
