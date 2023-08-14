//**********************FOR DB Connection**********************
const connectButton = document.getElementById("connectButton");
connectButton.addEventListener("click", async () => {
  try {
    document.querySelector("#insertAnyResponseContainer").style.display =
      "block"; //for display daat container

    const response = await fetch("/connect");
    const data = await response.json();
    console.log(data);
    data.forEach((e) => {
      document.querySelector("#insertAnyResponse").innerHTML += `
      <tr>
          <td>${e.course}</td>
          <td>${e.session}</td>
          <td>${e.numberofstudent}</td>
          <td>${e.boys}</td>
          <td>${e.girls}</td>
      </tr>
      <!-- Add more rows as needed -->
 `;
      // document.querySelector("#insertAnyResponse").innerHTML += e.course;

      //************For Table Creation and Insertion in Database ************
    });
  } catch (error) {
    console.error("Error:", error);
  }
});

//**********************FOR Slider**********************
document.querySelectorAll(".SliderImageItem").forEach((e, indexN) => {
  e.style.left = `${indexN * 100}%`;
});

let counter = 0;
const sliderSliding = () => {
  document.querySelectorAll(".SliderImageItem").forEach((e, indexN) => {
    e.style.transform = `translateX(-${counter * 100}%)`;
  });
  counter++;
  if (counter === 3) {
    counter = 0;
  }
};
setInterval(sliderSliding, 3000);

//**********************SEND DATA**********************
//********************************************
const sendDataButton = document.getElementById("sendDataButton");

sendDataButton.addEventListener("click", async () => {
  const dataToSend = "where course=BCA"; // The text data you want to send

  try {
    const response = await fetch("/send-data", {
      method: "POST", // Use the POST method to send data
      headers: {
        "Content-Type": "text/plain", // Set the content type to plain text
      },
      body: dataToSend, // Send the text data in the request body
    });

    if (response.ok) {
      const data = response.json();
      console.log("Data sent successfully!: ", data);
    } else {
      console.error("Failed to send data:", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
