<template lang="pug">
  .TooltipCard.animated.fadeIn(ref='tooltip')
    slot
</template>

<script>
  export default {
    name: 'TooltipCard',

    mounted() {
      this.isMounted = false;
      this.$nextTick(() => {
        this.tooltipElement = this.$el;
        this.parentNode = this.tooltipElement.parentNode;
        this.parentNode.addEventListener('mouseover', this.handleOnMouseover);
        this.parentNode.addEventListener('mouseout', this.handleOnMouseout);
        this.parentNode.removeChild(this.tooltipElement);
        this.parentNode.style.cursor = 'pointer';
      });
    },

    beforeDestroy() {
      if (this.isMounted) {
        this.removeTooltip();
      }
    },

    methods: {
      handleOnMouseover() {
        this.mountedTooltip = document.body.appendChild(this.tooltipElement);
        this.isMounted = true;

        const parent = this.parentNode;
        const tooltip = this.mountedTooltip;

        const bodyRect = document.body.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();

        let tooltipActualLeft = parentRect.left;

        // Center position
        const top = ((bodyRect.top * -1) + parentRect.top) - tooltipRect.height;
        let leftToStyle = (parentRect.left - (tooltipRect.width / 2)) +
          (parentRect.width / 2);

        tooltipActualLeft = leftToStyle;

        // Avoid outside

        if (bodyRect.left > tooltipActualLeft) {
          leftToStyle += (bodyRect.left - tooltipActualLeft) + 8;
        }

        if (bodyRect.right < tooltipActualLeft + tooltipRect.width) {
          leftToStyle -= ((tooltipActualLeft + tooltipRect.width) - bodyRect.right) + 8;
        }

        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${leftToStyle}px`;
      },

      removeTooltip() {
        this.isMounted = false;
        document.body.removeChild(this.mountedTooltip);
      },

      handleOnMouseout() {
        this.removeTooltip();
      },
    },
  };
</script>

<style lang="scss">
  .TooltipCard {
    background-color: white;
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 15em;
    height: auto;
    padding: 1em;
    z-index: 500;
    box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px rgba(0,0,0,.14), 0 1px 10px rgba(0,0,0,.12);
    animation-duration: .3s;

    &>* {
      font-size: 0.8em;
    }
  }
</style>
