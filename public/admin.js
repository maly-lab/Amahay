async function form_submited() {
    const message = document.getElementById("message");
    const form = document.getElementById("productForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // prevents the default form submission behavior
        const body = {
            name: document.getElementById("name").value,
            category: document.getElementById("category").value,
            price: parseFloat(document.getElementById("price").value),
            stock: parseInt(document.getElementById("stock").value),
            img: document.getElementById("img").value
        };
        try {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            if (response.ok) {
                message.textContent = "Product added successfully!";
            } else {
                message.textContent = "Error adding product.";
            }
        } catch (error) {
            console.error("Error:", error);
            message.textContent = "Error adding product.";
        }
    });
}

form_submited();