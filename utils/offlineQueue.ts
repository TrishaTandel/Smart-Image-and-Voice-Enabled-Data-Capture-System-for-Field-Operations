export const saveOffline = (data:any) => {
  const old = JSON.parse(localStorage.getItem("queue") || "[]");
  old.push(data);
  localStorage.setItem("queue", JSON.stringify(old));
};
