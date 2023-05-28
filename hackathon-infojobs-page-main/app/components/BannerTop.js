import Image from "next/image";

const BannerTop = () => {
    return (
      <div className="w-full px-4 mt-7  h-400 w-screen">
        <Image alt="banner top" width={926} height={124} src={"/banner.png"} />
      </div>
    );
  };
  
  export default BannerTop;