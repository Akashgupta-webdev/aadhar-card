import { supabase } from "./supabaseClient";

export async function uploadAadhaarImage(file, userId) {
  const fileName = `${userId}/${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("public-aadhar-images")
    .upload(fileName, file);

  if (error) {
    console.error("Upload error:", error);
    return null;
  }

  // Generate public or signed URL
  const { data: urlData } = supabase.storage
    .from("public-aadhar-images")
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}
