// main.js

document.addEventListener("DOMContentLoaded", () => {
  const orderForm = document.getElementById("orderForm");

  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Form fields
    const customerName = document.getElementById("name").value;
    const customerPhone = document.getElementById("phone").value;
    const selectedProduct = document.getElementById("product").value;
    const productQty = document.getElementById("quantity").value;
    const customerAddress = document.getElementById("address").value;

    // Basic validation
    if (!customerName || !selectedProduct || !productQty || !customerAddress) {
      alert("❌ Please fill all required fields.");
      return;
    }

    // POST request to backend
    fetch("http://localhost:5000/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: customerName,
        phone: customerPhone,
        product: selectedProduct,
        quantity: productQty,
        address: customerAddress,
      }),
    })
      .then((res) => res.text())
      .then((data) => {
        alert(data); // Backend se success/failure message
        orderForm.reset(); // Clear form after submit
      })
      .catch((err) => {
        console.error(err);
        alert("❌ Failed to place order. Please try again.");
      });
  });
});
