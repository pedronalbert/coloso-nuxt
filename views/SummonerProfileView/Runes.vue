<template lang="pug">
  div
    .d-flex.align-items-center
      b.pb-4 {{ $t('page') }}
      v-select.pageSelector(v-model="optionSelected", :items="selectItems")
    .d-flex.justify-content-center.mt-2
      circular-rune-page.hidden-md-down(v-if="pageSelected" :runes='pageSelected.runes')
      rune-page.hidden-lg-up(v-if="pageSelected" :runes='pageSelected.runes')
</template>

<script>
  import { find, findIndex } from 'lodash';
  import { CircularRunePage, RunePage } from '../../components';

  export default {
    name: 'Runes',

    props: ['pages'],

    data() {
      return {
        optionSelected: null,
      };
    },

    mounted() {
      this.selectActivePage();
    },

    computed: {
      pageSelected() {
        return find(this.pages, { name: this.optionSelected && this.optionSelected.text });
      },

      selectItems() {
        return this.pages.map(page => ({ text: page.name }));
      },
    },

    methods: {
      selectActivePage() {
        if (this.selectItems.length > 0) {
          const idx = findIndex(this.pages, { current: true });

          if (idx >= 0) {
            this.optionSelected = this.selectItems[idx];
          } else {
            this.optionSelected = this.selectItems[0];
          }
        }
      },
    },

    components: {
      CircularRunePage,
      RunePage,
    },
  };
</script>

<style lang="stylus" scoped>
  .pageSelector
    width: 12em
    padding-left: 1.5em
</style>
