for (let index = 25; index > 0; index--) {
  let slider = document.createElement("div");
  let width = "320px";
  slider.classList.add("slider");
  slider.classList.add("animate");
  slider.classList.add("slider" + index);
  slider.style.width = "80px";
  let game = document.querySelector(".game__sliders");
  game.append(slider);
}

const MAX_THREE = ["14", "6", "2"];

let game_scores = document.querySelector(".game__scores");
// for (i in MAX_THREE) {
//   let score = document.createElement("h3");
//   score.innerHTML = MAX_THREE[i];
//   game_scores.appendChild(score);
// }

const StopSliding = (sliderindex) => {
  if (sliderindex < 26) {
    let width = 320;
    let thisSlider = document.querySelector(".slider" + sliderindex);
    let belowSlider = null;
    let aboveSlider = document.querySelector(
      ".slider" + parseInt(sliderindex + 1)
    );
    if (sliderindex == 1) {
      belowSlider = thisSlider;
    } else {
      belowSlider = document.querySelector(
        ".slider" + parseInt(sliderindex - 1)
      );
    }

    let left = window.getComputedStyle(thisSlider).getPropertyValue("left");
    thisSlider.classList.remove("animate");
    let belowSliderWidth = belowSlider.style.width;
    let belowSliderLeft = belowSlider.style.left;
    aboveSlider.style.visibility = "visible";
    thisSlider.style.left = left;
    //!WHEN SLIDER COMES FROM RIGHT
    if (left > belowSliderLeft) {
      let range = Math.abs(
        left.slice(0, left.length - 2) -
          belowSliderLeft.slice(0, belowSliderLeft.length - 2)
      );
      //?IF YOU DONT PUT THE SLIDER ON TOP OF THE BOTTOM SLIDER
      if (
        range > belowSliderWidth.slice(0, belowSliderWidth.length - 2) &&
        sliderindex != 1
      ) {
        alert("You lose");
        window.location.reload();
      } else {
        if (sliderindex != 1) {
          //?MAKING THE NEW WIDTH OF THE SLIDER
          thisSlider.style.width =
            belowSliderWidth.slice(0, belowSliderWidth.length - 2) -
            range +
            "px";
          width =
            width +
            80 -
            thisSlider.style.width.slice(0, thisSlider.style.width.length - 2);
          console.log(thisSlider);
        }
        document.documentElement.style.setProperty("--width", width + "px");
      }
    }

    //!WHEN SLIDER COMES FROM LEFT
    else if (left < belowSliderLeft) {
      let range = Math.abs(
        belowSliderLeft.slice(0, belowSliderLeft.length - 2) -
          left.slice(0, left.length - 2)
      );
      //?IF YOU DONT PUT THE SLIDER ON TOP OF THE BOTTOM SLIDER
      if (
        range >
          parseInt(belowSliderWidth.slice(0, belowSliderWidth.length - 2)) &&
        sliderindex != 1
      ) {
        alert("You lose");
        for (i in MAX_THREE) {
          console.log(i);
        }
        window.location.reload();
      } else {
        //?ALIGNING SLIDERS FROM LEFT
        thisSlider.style.left = belowSlider.style.left;
        //?MAKING THE NEW WIDTH OF THE SLIDER
        thisSlider.style.width =
          parseInt(belowSliderWidth.slice(0, belowSliderWidth.length - 2)) -
          range +
          "px";

        width =
          width +
          80 -
          thisSlider.style.width.slice(0, thisSlider.style.width.length - 2);
        console.log(thisSlider);
        if (sliderindex != 1) {
          document.documentElement.style.setProperty("--width", width + "px");
        }
      }
      thisSlider.style.left = belowSlider.style.left;
    }

    aboveSlider.style.width = thisSlider.style.width;

    let button = document.querySelector(".game__btn");
    button.setAttribute(
      "onclick",
      "StopSliding(" + parseInt(sliderindex + 1) + ")"
    );
    document.querySelector(".game__score").innerHTML = sliderindex;
  }
};
document.addEventListener("keydown", (event) => {
  if (event.key == " ") {
    document.querySelector(".game__btn").click();
  }
});
