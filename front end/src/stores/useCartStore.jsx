import { create } from "zustand";
import { notification } from "antd";
import { CheckOutlined, ExclamationOutlined } from "@ant-design/icons";

const openAddNotification = (title) =>
  notification.open({
    message: "Product added to the Cart",
    description: title,
    placement: "bottomLeft",
    icon: <CheckOutlined style={{ color: "green" }} />,
  });

const openDeleteNotification = (title) =>
  notification.open({
    message: "Product removed from the Cart",
    description: title,
    placement: "bottomLeft",
    icon: <ExclamationOutlined style={{ color: "red" }} />,
  });

  const useCartStore = create((set) => {
    return {
      products: [],
      actions: {
        addProduct: (product) =>
          set((state) => {
            openAddNotification(product.title);
            return { products: state.products.concat(product) };
          }),
        removeProduct: (index) =>
          set((state) => ({
            products: state.products.filter(({ title }, currentIndex) => {
              if (currentIndex === index) {
                openDeleteNotification(title);
                return false; //filter cuando recibe False elimina de la matriz el objeto
              }
              return true; //no eliminara nada
            }),
          })),
        resetCart: () =>
          set(() => ({
            products: [],
          })),
      },
    };
  });
  

export { useCartStore };
