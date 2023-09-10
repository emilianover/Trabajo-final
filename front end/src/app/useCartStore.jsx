import { create } from "zustand";
import { notification } from "antd";
import { CheckOutlined, ExclamationOutlined } from "@ant-design/icons"

const openAddNotification = (title) =>
  notification.open({
    message: "El elemento fue agregado con exito",
    description: title,
    placement: "topRight",
    icon: <ExclamationOutlined style={{ color: "red" }} />,
  });

const useCartStore = create((set) => {
  return {
    products: [],
    addProduct: (product) =>
      set((state) => {
        openAddNotification(product.title)
        return { products: state.products.concat(product) };
      }),
  };
});

export { useCartStore };