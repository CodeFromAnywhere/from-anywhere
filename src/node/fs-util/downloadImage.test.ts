import { downloadImage } from "./downloadImage.js";
const test = async () => {
  const result = await downloadImage(
    "https://www.klarna.com/assets/sites/5/2020/04/27143923/klarna-K-150x150.jpg",
    import.meta.dir,
    "logo",
  );
  console.log({ result });

  // console.log(
  //   await downloadFile(
  //     "https://www.klarna.com/assets/sites/5/2020/04/27143923/klarna-K-150x150.jpg",
  //     path.join(import.meta.dir, "..", "logo2.jpg")
  //   )
  // );
};

test();
