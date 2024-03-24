interface DFood {
  _id: string;
  name: string;
  image_url: string;
  price: number;
  category: string;
  description: string;
  is_displayed: boolean;
  nutritional_value: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
}

interface DCart {
  _id: string;
  order: [
    {
      food: {
        _id: string;
        name: string;
        price: number;
      };
      quantity: number;
    },
  ];
  phone_number: string;
  delivery_address: string;
  is_resolved: boolean;
}
