"use client";
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { materials, Material } from "@/lib/materials";

interface Piece {
  width: number;
  height: number;
  x?: number;
  y?: number;
}

class Board {
  width: number;
  height: number;
  remainingSpaces: Piece[];
  pieces: Piece[];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.remainingSpaces = [{ x: 0, y: 0, width, height }];
    this.pieces = [];
  }

  placePiece(piece: Piece): boolean {
    for (let i = 0; i < this.remainingSpaces.length; i++) {
      const space = this.remainingSpaces[i];

      if (piece.width <= space.width && piece.height <= space.height) {
        piece.x = space.x;
        piece.y = space.y;
        this.pieces.push(piece);

        this.splitSpace(space, piece);
        return true;
      }
    }
    return false;
  }

  splitSpace(space: Piece, piece: Piece) {
    const newSpaces: Piece[] = [];

    if (space.width - piece.width > 0) {
      newSpaces.push({
        x: space.x! + piece.width,
        y: space.y!,
        width: space.width - piece.width,
        height: piece.height,
      });
    }

    if (space.height - piece.height > 0) {
      newSpaces.push({
        x: space.x!,
        y: space.y! + piece.height,
        width: space.width,
        height: space.height - piece.height,
      });
    }

    this.remainingSpaces.splice(
      this.remainingSpaces.indexOf(space),
      1,
      ...newSpaces
    );
  }

  draw(ctx: CanvasRenderingContext2D, scale: number) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeStyle = "#000";
    ctx.scale(scale, scale);
    ctx.strokeRect(0, 0, this.width, this.height);

    for (const piece of this.pieces) {
      const colorKey = `${piece.width}x${piece.height}`;
      ctx.fillStyle = getColor(colorKey);
      ctx.fillRect(piece.x!, piece.y!, piece.width, piece.height);
      ctx.strokeRect(piece.x!, piece.y!, piece.width, piece.height);

      ctx.font = `${12 / scale}px Arial`;
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(`${piece.width}`, piece.x! + piece.width / 2, piece.y! + 5);

      ctx.save();
      ctx.translate(piece.x! + 5, piece.y! + piece.height / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(`${piece.height}`, 0, 0);
      ctx.restore();
    }

    ctx.scale(1 / scale, 1 / scale);
  }
}

const colorMap: { [key: string]: string } = {};

function getColor(key: string): string {
  if (!colorMap[key]) {
    colorMap[key] = `hsl(${Math.random() * 360}, 70%, 80%)`;
  }
  return colorMap[key];
}

function parseInput(input: string): Piece[] {
  const pieces: Piece[] = [];
  const entries = input.split(";");
  for (const entry of entries) {
    const [width, height, quantity] = entry.split(",").map(Number);
    for (let i = 0; i < quantity; i++) {
      pieces.push({ width, height });
    }
  }
  return pieces;
}

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [boards, setBoards] = useState<Board[]>([]);
  const [currentBoardIndex, setCurrentBoardIndex] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(
    materials[0]
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const scale = 0.2;

  useEffect(() => {
    if (canvasRef.current && boards.length > 0) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        boards[currentBoardIndex].draw(ctx, scale);
      }
    }
  }, [boards, currentBoardIndex]);

  const generateLayouts = () => {
    const pieces = parseInput(inputValue);
    pieces.sort((a, b) => b.width * b.height - a.width * a.height);

    const newBoards: Board[] = [];
    let currentBoard = new Board(
      selectedMaterial.width,
      selectedMaterial.height
    );

    for (const piece of pieces) {
      if (!currentBoard.placePiece(piece)) {
        newBoards.push(currentBoard);
        currentBoard = new Board(
          selectedMaterial.width,
          selectedMaterial.height
        );
        currentBoard.placePiece(piece);
      }
    }

    newBoards.push(currentBoard);
    setBoards(newBoards);
    setCurrentBoardIndex(0);
  };

  const previousBoard = () => {
    if (currentBoardIndex > 0) {
      setCurrentBoardIndex(currentBoardIndex - 1);
    }
  };

  const nextBoard = () => {
    if (currentBoardIndex < boards.length - 1) {
      setCurrentBoardIndex(currentBoardIndex + 1);
    }
  };

  return (
    <div className="flex flex-row items-center justify-between p-4">
      <div className="flex flex-col gap-4">
        <h1>OSB Cutting Layout</h1>
        <p>
          Enter pieces as `width,height,quantity` (e.g., `400,500,3`) and
          separate multiple entries with a semicolon:
        </p>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="400,500,3;600,1200,2;800,2000,1"
        />
        <select
          value={selectedMaterial.board_name}
          onChange={(e) =>
            setSelectedMaterial(
              materials.find((m) => m.board_name === e.target.value)!
            )
          }
        >
          {materials.map((material) => (
            <option key={material.board_name} value={material.board_name}>
              {material.board_name}
            </option>
          ))}
        </select>
        <Button onClick={generateLayouts}>Generate Layouts</Button>
        <div>
          <Button onClick={previousBoard}>Previous Board</Button>
          <Button onClick={nextBoard}>Next Board</Button>
        </div>
      </div>
      <div className="flex flex-col gp-2">
        <p>{`Board ${currentBoardIndex + 1} of ${boards.length}`}</p>
        <div>
          <canvas ref={canvasRef} width="500" height="1000"></canvas>
        </div>
      </div>
    </div>
  );
}
