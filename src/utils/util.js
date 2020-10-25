export const uuid = () => {
  const id = Math.random().toString(16).slice(6)
  // console.log(id)
  return id
}
