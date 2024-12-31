"use client";
import { useState } from "react";
import {
  groupedMaterials,
  Material,
  MaterialGroupType,
  materials,
} from "@/lib/materials";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function Home() {
  // State to store the selected type and board_name
  const [selectedType, setSelectedType] = useState<string>(
    groupedMaterials[0].type
  );
  const [selectedBoardName, setSelectedBoardName] = useState<string>(
    groupedMaterials[0].items[0].board_name
  );

  // Handle type change
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value;
    setSelectedType(newType);

    // Automatically select the first board name for the new type
    const firstBoardName = groupedMaterials.find(
      (group) => group.type === newType
    )?.items[0]?.board_name;

    setSelectedBoardName(firstBoardName || ""); // Set to first board name or empty string if none
  };

  // Handle board_name change
  const handleBoardNameChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedBoardName(event.target.value);
  };

  // Find the selected material based on type and board_name
  const selectedMaterial =
    selectedType &&
    selectedBoardName &&
    groupedMaterials
      .find((group) => group.type === selectedType)
      ?.items.find((item: Material) => item.board_name === selectedBoardName);

  return (
    <div className="flex flex-col items-start justify-items-center min-h-screen p-8 pb-20 gap-2 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Select Type */}
      <div className="bg-violet-300">
        <div>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Wybierz rodzaj :" />
            </SelectTrigger>
            <SelectContent>
              {groupedMaterials.map((group: MaterialGroupType, index) => (
                <SelectItem key={index} value={group.type}>
                  {group.type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Select Board Name based on Type */}
        {selectedType && (
          <Select
            value={selectedBoardName}
            onValueChange={setSelectedBoardName}
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Wybierz płytę :" />
            </SelectTrigger>
            <SelectContent>
              {groupedMaterials
                .find((group) => group.type === selectedType)
                ?.items.map((item: Material, index) => (
                  <SelectItem key={index} value={item.board_name}>
                    {item.board_name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        )}
        {/* Display selected values */}
        {/* Display details of the selected material */}
        {selectedMaterial && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-100 w-full">
            <h3>Material Details</h3>
            <p>
              <strong>Board Name:</strong> {selectedMaterial.board_name}
            </p>
            <p>
              <strong>Thickness:</strong> {selectedMaterial.thickness} mm
            </p>
            <p>
              <strong>Width:</strong> {selectedMaterial.width} mm
            </p>
            <p>
              <strong>Height:</strong> {selectedMaterial.height} mm
            </p>
            <p>
              <strong>Quantity:</strong> {selectedMaterial.quantity}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
