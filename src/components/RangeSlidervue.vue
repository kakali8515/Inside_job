<template>
  <div id="slider" class="slider-styled"></div>
</template>

<script>
import { toRefs, ref, onMounted, watch } from "vue";
import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";
export default {
  setup(props, { emit }) {
    onMounted(() => {
      var slider = document.getElementById("slider");

      var formatForSlider = {
        from: function (formattedValue) {
          return Number(formattedValue);
        },
        to: function (numericValue) {
          return Math.round(numericValue);
        },
      };

      noUiSlider.create(slider, {
        start: [1],
        connect: 'lower',
        range: {
          min: [1,2],
          max: 5,
        },
        behaviour: "smooth-steps",
        // tooltips: true,
        // Show a scale with the slider
        pips: {
          mode: "values",
          values: [],
          format: formatForSlider,
          density: 30,
        },
        format: formatForSlider,
      });

      slider.noUiSlider.on("update", function (values) {
        emit("rangeValue", values);
      });

      slider.noUiSlider.on("end", function (values) {
        emit("list");
      });
    });
  },
};
</script>
<style>
#slider .noUi-connect {
    background: #c0392b;
}

#slider .noUi-handle {
    height: 25px;
    width: 25px;
    border-radius: 50%;
}
</style>