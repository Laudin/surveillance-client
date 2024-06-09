const ws = new WebSocket(
  "wss://surveillance-host.onrender.com/surveillance/client"
);

let data = [];

ws.addEventListener("open", () => {
  console.log("Connected");
});

ws.addEventListener("message", async (event) => {
  data.push(event.data);

  //   if (data.length == 0) {
  //     event.data.slice(0, 2);
  //   }
  //   let EOF = event.data.slice(-8);
  //   console.log(await EOF.text());
  //   if ((await EOF.text()) === "\\xff\\xd9") {
  //     const image = new Blob(data, { type: "image/jpeg" });
  //     console.log(btoa(await image.text()));

  //     document.getElementById("img").src = URL.createObjectURL(image);
  //   }

  //   console.log(
  //     (await new Blob(data, { type: "image/jpeg" }).text()).slice(0, -3)
  //   );
  if (
    (await new Blob(data, { type: "image/jpeg" }).text()).slice(-3) === "end"
  ) {
    console.log("data recieved");
    document.getElementById("img").src =
      "data:image/jpeg;base64," +
      (await new Blob(data, { type: "image/jpeg" }).text()).slice(0, -3);
    data = [];
  }
  //   console.log(await new Blob(data, { type: "image/jpeg" }).text());
});
