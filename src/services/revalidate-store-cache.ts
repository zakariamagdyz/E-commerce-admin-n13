const revalidateURL = `${process.env.NEXT_PUBLIC_FRONTEND_STORE_URL}/api/revalidate?path=/&secret=${process.env.NEXT_PUBLIC_REVALIDATE_SECRET_TOKEN}`
export const revalidateStoreCache = async () => {
  const res = await fetch(revalidateURL, {
    method: 'POST',
  })
  const jsonRes = await res.json()
  if (!res.ok) {
    throw new Error(jsonRes.message)
  }
  return jsonRes
}
