import products from './products.json';
import fs from "fs";

export default function handler(req, res){
  console.log("HANDLER", req)
  if (req.method === "POST"){
    console.log(req)
    try {
      console.log("body is ", req.body)
      const { name, price, image_url, description, filename, hash, payload_use, payload_max, volume_use, volume_max, launch } = req.body;
  
      // Create new product ID based on last product ID
      const maxID = products.reduce((max, product) => Math.max(max, product.id), 0);
      console.log("maxID Found")
      products.push({
        id: maxID + 1,
        name,
        price,
        image_url,
        description,
        payload_use,
        payload_max,
        volume_use,
        volume_max,
        launch,
        filename,
        hash,
      });
      console.log('PUSHED Product')
      fs.writeFileSync("./pages/api/products.json", JSON.stringify(products, null, 2));
      console.log('Wrote to file')
      res.status(200).send({ status: "ok" });
    } catch (error) {
      console.error(error);
      res.status(500).json({error: "error adding product"});
      return;
    }
  }
  else {
    res.status(405).send(`Method ${req.method} not allowed`);
  }
}