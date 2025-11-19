import CartItem from "./CartItem";

export default function CartList({
  cart,
  formatPrice,
  increaseQty,
  decreaseQty,
  removeItem,
  navigate,
}) {
  return (
    <section className="space-y-6 lg:col-span-2">
      {cart.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          formatPrice={formatPrice}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
          removeItem={removeItem}
          navigate={navigate}
        />
      ))}
    </section>
  );
}
