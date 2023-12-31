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
const filterButton = document.getElementById("sendDataButton"); // Replace with the ID of your filter button

filterButton.addEventListener("click", async () => {
  const dataToSend = "where course=BCA";
  try {
    const response = await fetch("/filter-data", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: dataToSend,
    });

    if (response.ok) {
      const filteredData = await response.json();
      console.log("Filtered data:", filteredData);
    } else {
      console.error("Failed to fetch filtered data:", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
