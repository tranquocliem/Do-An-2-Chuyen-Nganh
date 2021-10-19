import RecruimentService from "../Services/RecruimentService";
export const uploadImage = async (images) => {
  let formData = new FormData();
  for (const item of images) {
    formData.append("file", item);
  }

  const config = {
    header: { "content-type": "multipart/form-data" },
  };

  const res = await RecruimentService.ImageUpload(formData, config);
  return res.url;
};
