import { create } from "zustand";

const useEditStore = create((set) => {
  return {
    product: {
      id: null, 
      price: null,
      category: "",
      description: "",
      title: "",
      image: "",
    },
    actions: {
      productToEdit: (productData) =>
        set((state) => ({
          product: { ...state.product, ...productData }, 
        })),
    },
  };
});

export default useEditStore;
