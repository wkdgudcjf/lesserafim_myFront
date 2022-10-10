export const handle = (success) => {
  return (res) => {
    success(res.data)
  }
}
