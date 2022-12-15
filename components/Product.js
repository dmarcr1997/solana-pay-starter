import React from "react";
import styles from "../styles/Product.module.css";
import IPFSDownload from './IpfsDownload';

export default function Product({ product }) {
  const { id, name, price, description, image_url, payload_use, payload_max, launch, volume_use, volume_max } = product;

  return (
    <div className={styles.product_container}>
      <div >
        <img className={styles.product_image}src={image_url} alt={name} />
      </div>

      <div className={styles.product_details}>
        <div className={styles.product_text}>
          <div className={styles.product_title}>{name}</div>
          <div className={styles.product_description}>{description}</div>
          <div className={styles.product_description}>LAUNCH: {launch}</div>
          <div className={styles.product_description}>WEIGHT: {payload_use} kg / {payload_max} kg</div>
          <div className={styles.product_description}>VOLUME: {volume_use} ㎥ / {volume_max} ㎥</div>
        </div>
        <div className={styles.product_action}>
          <div className={styles.product_price}>{price} USDC/kg</div>  
          {/* I'm hardcoding these for now, we'll fetch the hash from the API later*/}
          <IPFSDownload filename="Mission.png" hash="QmZbNY3DjLpaPGrerUDpKtZkUb22QXjVit3r3857RHh2f6" cta="Download Mission Spec"/>
        </div>
      </div>
    </div>
  );
}