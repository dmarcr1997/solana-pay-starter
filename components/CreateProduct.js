import React, { useState } from "react";
import { create } from "ipfs-http-client";
import styles from "../styles/CreateProduct.module.css";
import { Buffer } from 'buffer';

const projectId = process.env.IPFS_PROJECT_ID;
const projectKey = process.env.IPFS_API_SECRET;

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectKey).toString('base64');
const client = create({
  host: `ipfs.infura.io`,
  port: 5001,
  protocol: 'https',
  apiPath: '/api/v0',
  headers: {
    authorization: auth
  }
});


const CreateProduct = () => {

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image_url: "",
    description: "",
    payload_use: "",
    payload_max: "",
    volume_use: "",
    volume_max: "",
    launch: ""
  });
  const [file, setFile] = useState({});
  const [uploading, setUploading] = useState(false);

  async function onChange(e) {
    setUploading(true);
    const files = e.target.files;
    try {
      console.log(files[0]);
      const added = await client.add(files[0]);
      setFile({ filename: files[0].name, hash: added.path });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
    setUploading(false);
  }

  const createProduct = async () => {
    try {
      // Combine product data and file.name
      const product = { ...newProduct, ...file };
      console.log("Sending product to api", product);
      const response = await fetch("../api/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      if (response.status === 200) {
        alert("Product added!");
      }
      else {
        console.log(data)
        console.log(response)
        alert("Unable to add product: ", data.error);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.background_blur}>
      <div className={styles.create_product_container}>
        <div className={styles.create_product_form}>
          <header className={styles.header}>
            <h1>Create Product</h1>
          </header>

          <div className={styles.form_container}>
            <input
              type="file"
              className={styles.input}
              accept=".zip,.rar,.7zip"
              placeholder="Mission Image/Icon"
              onChange={onChange}
            />
            {file.name != null && <p className="file-name">{file.filename}</p>}
            <div className={styles.flex_row}>
              <input
                className={styles.input}
                type="text"
                placeholder="Product Name"
                onChange={(e) => {
                  setNewProduct({ ...newProduct, name: e.target.value });
                }}
              />
              <input
                className={styles.input}
                type="text"
                placeholder="0.01 USDC"
                onChange={(e) => {
                  setNewProduct({ ...newProduct, price: e.target.value });
                }}
              />
            </div>

            <div className={styles.flex_row}>
              <input
                className={styles.input}
                type="url"
                placeholder="Image URL ex: https://i.imgur.com/rVD8bjt.png"
                onChange={(e) => {
                  setNewProduct({ ...newProduct, image_url: e.target.value });
                }}
              />
            </div>
            <textarea
              className={styles.text_area}
              placeholder="Description here..."
              onChange={(e) => {
                setNewProduct({ ...newProduct, description: e.target.value });
              }}
            />
            <div className={styles.flex_row}>
              <input
                className={styles.input}
                type="number"
                placeholder="Payload Weight in Use..."
                onChange={(e) => {
                  setNewProduct({ ...newProduct, payload_use: e.target.value });
                }}
              />
              <input
                className={styles.input}
                type="number"
                placeholder="Payload Max Weight..."
                onChange={(e) => {
                  setNewProduct({ ...newProduct, payload_max: e.target.value });
                }}
              />
            </div>
            <div className={styles.flex_row}>
              <input
                className={styles.input}
                type="number"
                placeholder="Volume Use..."
                onChange={(e) => {
                  setNewProduct({ ...newProduct, volume_use: e.target.value });
                }}
              />
              <input
                className={styles.input}
                type="number"
                placeholder="Volume Max..."
                onChange={(e) => {
                  setNewProduct({ ...newProduct, volume_max: e.target.value });
                }}
              />
            </div>
            <div className={styles.flex_row}>
              <input
                className={styles.input}
                type="date"
                onChange={(e) => {
                  setNewProduct({ ...newProduct, launch: e.target.value });
                }}
              />
            </div>

            <button
              className={styles.button}
              onClick={() => {
                createProduct();
              }}
              disabled={uploading}
            >
              Create Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;