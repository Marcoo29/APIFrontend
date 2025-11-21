import React from "react";
import CartItem from "./CartItem";

export default function CartList({
  cart,
  formatPrice,
  increaseQty,
  decreaseQty,
  removeItem,
  onNavigate
}) {
  return (
    <>
      {cart.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          formatPrice={formatPrice}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
          removeItem={removeItem}
          onNavigate={onNavigate}
        />
      ))}
    </>
  );
}
