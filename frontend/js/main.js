document.addEventListener("DOMContentLoaded", function () {
    const orderForm = document.getElementById("orderForm");

    if (orderForm) {
        orderForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const phone = document.getElementById("phone").value;
            const product = document.getElementById("product").value;
            const quantity = document.getElementById("quantity").value;

            // Owner ka WhatsApp number yaha daalna (country code ke sath)
            const ownerNumber = "91XXXXXXXXXX";  // Example: 91 = India code

            // Message text
            const message = `New Order Received!\n\nName: ${name}\nPhone: ${phone}\nProduct: ${product}\nQuantity: ${quantity}`;

            // WhatsApp link generate karo
            const whatsappURL = `https://wa.me/918126615784?text=${encodeURIComponent(message)}`;

            // WhatsApp open karo
            window.open(whatsappURL, "_blank");
        });
    }
});
