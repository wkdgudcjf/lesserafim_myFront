export const pictures = Array.from(Array(20).keys()).map((i) => {
  return {
    picId: i,
    url: "/res/" + i + ".png",
  };
});
