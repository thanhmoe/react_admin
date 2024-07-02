import React, { useState } from "react";
import { addProduct } from "../../services/product_services";
import "./product.css";

export default function ProductForm() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [categories, setCategories] = useState(["", ""]);
    const [image, setImage] = useState(null);
    const [imagePath, setImagePath] = useState("");
    const [formError, setFormError] = useState("");

    const handleCategoryChange = (index, value) => {
        const newCategories = [...categories];
        newCategories[index] = value;
        setCategories(newCategories);
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const submitForm = async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Perform additional custom validation if needed
        if (
            name.trim() === "" ||
            price === "" ||
            isNaN(parseFloat(price)) ||
            quantity < 0 ||
            categories.some((cat) => cat.trim() === "")
        ) {
            setFormError("Please fill in all fields correctly.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("quantity", quantity);
        categories.forEach((category, index) => {
            formData.append(`category_ids[${index}]`, category);
        });
        formData.append("image", image);

        try {
            const response = await addProduct(formData);
            setImagePath(response.imagePath);
            alert("Product added successfully!");
            // Reset form fields if needed
            setName("");
            setPrice("");
            setQuantity(0);
            setCategories(["", ""]);
            setImage(null);
        } catch (error) {
            console.error("Form submission failed:", error);
            alert("Form submission failed. Please try again.");
        }
    };

    return (
        <div className="add-product-container">
            <h2>Add product</h2>
            <form
                id="add-product-container"
                encType="multipart/form-data"
                onSubmit={submitForm}
            >
                <div>
                    <label htmlFor="name">Product Name:</label>
                    <input
                        type="text"
                        id="name"
                        className="input-field"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="text"
                        id="price"
                        className="input-field"
                        pattern="\d{1,6}(\.\d{0,2})?"
                        title="Enter a valid price with up to 6 digits and 2 decimal places"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        className="input-field"
                        min="0"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        required
                    />
                </div>
                <div id="categories">
                    <label htmlFor="categories">Categories:</label>
                    {categories.map((category, index) => (
                        <input
                            key={index}
                            type="text"
                            className="category-input"
                            value={category}
                            onChange={(e) => handleCategoryChange(index, e.target.value)}
                            required
                        />
                    ))}
                </div>
                <div>
                    <label htmlFor="image">Product Image:</label>
                    <input
                        type="file"
                        id="image"
                        className="file-input"
                        accept=".jpeg,.jpg,.png*"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                {formError && <p className="error-message">{formError}</p>}
                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>
            <div id="imagePreview">
                <p id="imagePathText">{imagePath && `Image Path: ${imagePath}`}</p>
                {imagePath && <img src={imagePath} alt="Uploaded" />}
            </div>
        </div>
    );
}
