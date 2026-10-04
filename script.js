let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Load products from Spring Boot backend
fetch("http://localhost:8082/api/products")

    .then(response => {

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        return response.json();
    })

    .then(products => {

        const container =
            document.getElementById("productsContainer");

        container.innerHTML = "";


        if (products.length === 0) {

            container.innerHTML = `
                <div class="col-12 text-center">

                    <h4>No products available</h4>

                    <p class="text-muted">
                        Please check again later.
                    </p>

                </div>
            `;

            return;
        }


        products.forEach(product => {

            container.innerHTML += `

                <div class="col-lg-4 col-md-6">

                    <div class="product-card">

                        <div class="product-icon">
                            🛍️
                        </div>

                        <div class="product-name">
                            ${product.name}
                        </div>

                        <div class="product-price">
                            ₹${product.price}
                        </div>

                        <div class="product-stock">
                            Available: ${product.quantity}
                        </div>

                        <button
                            class="btn btn-primary buy-btn"
                            onclick='addToCart(${JSON.stringify(product)})'>

                            Add to Cart

                        </button>

                    </div>

                </div>

            `;
        });

    })

    .catch(error => {

        console.error("Error:", error);

        const container =
            document.getElementById("productsContainer");

        container.innerHTML = `

            <div class="col-12 text-center">

                <div class="alert alert-danger">

                    Unable to load products.
                    Please make sure the backend is running.

                </div>

            </div>

        `;
    });


// Add complete product to cart
function addToCart(product) {

    cart.push(product);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    document.getElementById("cartCount").textContent =
        cart.length;

    alert("Product added to cart! 🛒");

    console.log("Cart:", cart);
}


// Update cart count when page loads
document.getElementById("cartCount").textContent =
    cart.length;