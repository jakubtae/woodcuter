export interface Material {
  board_type: string;
  board_name: string;
  thickness: number;
  width: number;
  height: number;
  quantity: number;
}

export const materials: Material[] = [
  {
    board_type: "Płyta Meblowa",
    board_name: "Biała Mat",
    thickness: 18,
    width: 2700,
    height: 2070,
    quantity: 10,
  },
  {
    board_type: "Płyta Meblowa",
    board_name: "Dąb Sonoma",
    thickness: 18,
    width: 2700,
    height: 2070,
    quantity: 15,
  },
  {
    board_type: "Płyta Meblowa",
    board_name: "Czarny połysk",
    thickness: 18,
    width: 2700,
    height: 2070,
    quantity: 8,
  },
  {
    board_type: "Płyta Meblowa",
    board_name: "Wenge",
    thickness: 18,
    width: 2700,
    height: 2070,
    quantity: 5,
  },
  {
    board_type: "Płyta Meblowa",
    board_name: "Biały połysk",
    thickness: 18,
    width: 2700,
    height: 2070,
    quantity: 20,
  },
  {
    board_type: "Płyta Meblowa",
    board_name: "Szary Mat",
    thickness: 18,
    width: 2700,
    height: 2070,
    quantity: 12,
  },
  {
    board_type: "Płyta Meblowa",
    board_name: "Dąb Classic",
    thickness: 18,
    width: 2700,
    height: 2070,
    quantity: 6,
  },
  {
    board_type: "Płyta Meblowa",
    board_name: "Orzech",
    thickness: 18,
    width: 2700,
    height: 2070,
    quantity: 10,
  },
  {
    board_type: "Płyta Meblowa",
    board_name: "Beton",
    thickness: 18,
    width: 2700,
    height: 2070,
    quantity: 5,
  },
  {
    board_type: "Płyta Meblowa",
    board_name: "Dąb Natura",
    thickness: 18,
    width: 2700,
    height: 2070,
    quantity: 7,
  },
  {
    board_type: "Płyta Meblowa",
    board_name: "Mahoń",
    thickness: 18,
    width: 2700,
    height: 2070,
    quantity: 8,
  },
  {
    board_type: "Płyta Meblowa",
    board_name: "Biały Lacobel",
    thickness: 6,
    width: 2700,
    height: 2070,
    quantity: 15,
  },
  {
    board_type: "Płyta Meblowa",
    board_name: "Bambu",
    thickness: 18,
    width: 2700,
    height: 2070,
    quantity: 10,
  },
  {
    board_type: "Płyta Meblowa",
    board_name: "Biały Akryl",
    thickness: 18,
    width: 2700,
    height: 2070,
    quantity: 20,
  },
  {
    board_type: "Płyta Meblowa",
    board_name: "Biel złamany",
    thickness: 18,
    width: 2700,
    height: 2070,
    quantity: 5,
  },
  {
    board_type: "Płyta Meblowa",
    board_name: "Laminat Czarny",
    thickness: 18,
    width: 2700,
    height: 2070,
    quantity: 12,
  },
  {
    board_type: "Płyta Meblowa",
    board_name: "Knotty Pine",
    thickness: 18,
    width: 2700,
    height: 2070,
    quantity: 6,
  },
  {
    board_type: "Płyta Meblowa",
    board_name: "Szary Beton",
    thickness: 18,
    width: 2700,
    height: 2070,
    quantity: 15,
  },
  {
    board_type: "Płyta Meblowa",
    board_name: "Sosna Naturalna",
    thickness: 18,
    width: 2700,
    height: 2070,
    quantity: 10,
  },
  {
    board_type: "Płyta Meblowa",
    board_name: "Ciemny Dąb",
    thickness: 18,
    width: 2700,
    height: 2070,
    quantity: 7,
  },
  {
    board_type: "Płyta OSB",
    board_name: "OSB 11mm",
    thickness: 11,
    width: 1250,
    height: 2500,
    quantity: 10,
  },
  {
    board_type: "Płyta OSB",
    board_name: "OSB 12mm",
    thickness: 12,
    width: 1250,
    height: 2500,
    quantity: 15,
  },
  {
    board_type: "Płyta OSB",
    board_name: "OSB 18mm",
    thickness: 18,
    width: 1250,
    height: 2500,
    quantity: 8,
  },
  {
    board_type: "Płyta OSB",
    board_name: "OSB 22mm",
    thickness: 22,
    width: 1250,
    height: 2500,
    quantity: 12,
  },
  {
    board_type: "Płyta HDF",
    board_name: "Czarny MAT",
    thickness: 3,
    width: 2700,
    height: 2070,
    quantity: 12,
  },
  {
    board_type: "Płyta HDF",
    board_name: "Biały MAT",
    thickness: 3,
    width: 2700,
    height: 2070,
    quantity: 12,
  },
  {
    board_type: "Płyta HDF",
    board_name: "Surwowy",
    thickness: 3,
    width: 2700,
    height: 2070,
    quantity: 12,
  },
  {
    board_type: "Płyta HDF",
    board_name: "Dąb",
    thickness: 3,
    width: 2700,
    height: 2070,
    quantity: 12,
  },
];

export interface MaterialGroupType {
  type: string;
  items: Material[];
}

export const groupedMaterials: MaterialGroupType[] = materials.reduce((acc: MaterialGroupType[], item: Material) => {
    // Check if the group already exists for the current 'type'
    const existingGroup = acc.find(group => group.type === item.board_type);

    if (existingGroup) {
      // If the group exists, push the item into the group
      existingGroup.items.push(item);
    } else {
      // If the group does not exist, create a new group with the current item
      acc.push({ type: item.board_type, items: [item] });
    }

    return acc;
  }, []); // Initi