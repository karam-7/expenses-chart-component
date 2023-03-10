// Get the canvas element
const canvas = document.querySelector('.chart');

// Fetch the data from JSON file
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Extract the days and amounts from data
    const days = data.map(item => item.day);
    const amounts = data.map(item => item.amount);

    // Find the index of the current day
    const today = new Date().toLocaleString('en-us', { weekday: 'short' }).toLowerCase();
    const currentDayIndex = days.findIndex(day => day === today);

    // Set the colors of the bars
    const barColors = amounts.map((amount, index) => {
      if (index === currentDayIndex) {
        return 'hsl(186, 34%, 60%)'; // Current day color
      }
      return 'hsl(10, 79%, 65%)'; // Other days color
    });

    // Create the chart using Chart.js library
    const chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: days,
        datasets: [{
          data: amounts,
          backgroundColor: barColors,
          barThickness: 45 // Width of each bar
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          display: false
        }
      }
    });
  })
  .catch(error => console.error(error));
