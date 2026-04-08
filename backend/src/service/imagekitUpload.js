const { IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL, IMAGEKIT_PUBLIC_KEY } = require("../config/env");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
      publicKey: IMAGEKIT_PUBLIC_KEY,
      privateKey: IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: IMAGEKIT_URL,
});

const upload = async (file) => {
      const fileForUpload = await toFile(file.buffer, file.originalname);

      const result = await imagekit.files.upload({
            file: fileForUpload,
            fileName: file.originalname,
            folder: "/songs",
      });

      return result;
};

module.exports = upload;
// const

// const url = client.helper.buildSrc({
//       urlEndpoint: "https://ik.imagekit.io/your_imagekit_id",
//       src: "/path/to/image.jpg",
// });
// Result: https://ik.imagekit.io/your_imagekit_id/path/to/image.jpg
