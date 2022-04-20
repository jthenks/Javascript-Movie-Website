// Code cited from: w3schools.com/howto/howto_js_countdown.asp

  const oneThousand = 1000;
  const sixty = 60;
  const twentyFour = 24;

  endDate = new Date("Mar 2, 2022 21:00:00").getTime();

  countdown(endDate);

  function countdown(endDate){
    // Get today's date and time
    let now = new Date().getTime();

    // Find the distance between now and the count down date
    let distance = endDate - now;

    // Time calculations for days, hours, minutes
    let days = Math.floor(distance / (oneThousand * sixty * sixty * twentyFour));
    let hours = Math.floor((distance % (oneThousand * sixty * sixty * twentyFour)) / (oneThousand * sixty * sixty));
    let minutes = Math.floor((distance % (oneThousand * sixty * sixty)) / (oneThousand * sixty));

    // Display the result in the comsole
    console.log("There is " + days + " day(s), " + hours + " hour(s), and " + minutes + " minute(s) left until I am free.");

    // If the count down is finished, update message in console
    if (distance < 0) {
      clearInterval(x);
      console.log("Countdown EXPIRED");
    }
  }
