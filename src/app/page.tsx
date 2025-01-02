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
import { Input } from "@/components/ui/input";
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
  //a
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
    <div className="flex items-start justify-start p-2 !pb-0 !pt-8 gap-2 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      {/* Select Type */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start gap-2">
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
            <div className="p-4 border rounded-lg bg-gray-100 w-full text-sm">
              <h3 className="font-semibold mb-2 text-md">
                Informacje o materiale
              </h3>
              <p>
                <strong>Nazwa:</strong> {selectedMaterial.board_name}
              </p>
              <p>
                <strong>Grubość:</strong> {selectedMaterial.thickness} mm
              </p>
              <p>
                <strong>Szerokość:</strong> {selectedMaterial.width} mm
              </p>
              <p>
                <strong>Wysokość:</strong> {selectedMaterial.height} mm
              </p>
              {selectedMaterial.quantity === 0 ? (
                <p className="text-red-500">Brak na stanie</p>
              ) : (
                <p>
                  <strong>Ilość:</strong> {selectedMaterial.quantity} sztuk
                </p>
              )}
            </div>
          )}
        </div>
        <div className="border-[1px] border-black p-2 flex flex-col gap-2">
          <span>Calculator info</span>
          <Input type="number" placeholder="Quantity" />
        </div>
      </div>
      <div className="bg-white-700 border-[1px] border-black rounded-xl min-h-2 h-full flex-grow aspect-[16/9]">
        <img
          src={
            selectedMaterial?.image_url ||
            "https://via.placeholder.com/640x360?text=Brak+zdjęcia"
          }
          alt={selectedMaterial?.board_name || "Brak nazwy"}
          className="object-cover w-full h-full rounded-xl"
        />
      </div>
    </div>
  );
}
