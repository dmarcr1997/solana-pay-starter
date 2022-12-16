import React, { useMemo, useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

import "@solana/wallet-adapter-react-ui/styles.css";

import "../styles/globals.css";
import "../styles/App.css";

const App = ({ Component, pageProps }) => {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );
  
  // const options = {
  //   detectRetina: false,
  //   fpsLimit: 60,
  //   interactivity: {
  //     detectsOn: "canvas",
  //     events: {
  //       onHover: {
  //         enable: true,
  //         mode: "bubble"
  //       },
  //       resize: true
  //     },
  //     modes: {
  //       bubble: {
  //         distance: 40,
  //         duration: 2,
  //         opacity: 8,
  //         size: 20,
  //         speed: 3
  //       }
  //     }
  //   },
  //   particles: {
  //     color: {
  //       value: "#00ee00",
  //       animation: {
  //         enable: true,
  //         speed: 20,
  //         sync: true
  //       }
  //     },
  //     lineLinked: {
  //       blink: false,
  //       color: "random",
  //       consent: false,
  //       distance: 30,
  //       enable: true,
  //       opacity: 0.3,
  //       width: 2
  //     },
  //     move: {
  //       attract: {
  //         enable: false,
  //         rotate: {
  //           x: 600,
  //           y: 1200
  //         }
  //       },
  //       bounce: false,
  //       direction: "none",
  //       enable: true,
  //       outMode: "bounce",
  //       random: true,
  //       speed: 0.5,
  //       straight: false
  //     },
  //     number: {
  //       density: {
  //         enable: false,
  //         area: 4000
  //       },
  //       limit: 0,
  //       value: 500
  //     },
  //     opacity: {
  //       animation: {
  //         enable: true,
  //         minimumValue: 0.05,
  //         speed: 2,
  //         sync: false
  //       },
  //       random: false,
  //       value: 1
  //     },
  //     shape: {
  //       type: "circle"
  //     },
  //     size: {
  //       animation: {
  //         enable: false,
  //         minimumValue: 0.75,
  //         speed: 40,
  //         sync: false
  //       },
  //       random: true,
  //       value: 2
  //     }
  //   },
  //   polygon: {
  //     draw: {
  //       enable: true,
  //       lineColor: "rgba(255,255,255,0.2)",
  //       lineWidth: 1
  //     },
  //     move: {
  //       radius: 10
  //     },
  //     inlineArrangement: "equidistant",
  //     scale: 0.5,
  //     type: "inline",
  //     url: "https://particles.js.org/images/smalldeer.svg"
  //   }
  // };
  // const particlesInit = useCallback(async engine => {
  //       console.log(engine);
  //       await loadFull(engine);
  //   }, []);
  // const particlesLoaded = useCallback(async container => {
  //       await console.log(container);
  //   }, []);
  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <Component {...pageProps} />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
};
 // b4 wallet<Particles init={particlesInit} loaded={particlesLoaded} options={options} />
export default App;
