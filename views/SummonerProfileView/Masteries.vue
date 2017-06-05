<template lang="pug">
  div
    .d-flex.align-items-center
      b.pb-4 {{ $t('page') }}
      v-select.pageSelector(v-model="optionSelected", :items="selectItems")
    .d-flex.justify-content-center.mt-2
      mastery-page(v-if="pageSelected" :masteries='pageSelected.masteries')
</template>

<script>
  import { find, findIndex } from 'lodash';
  import { MasteryPage } from '../../components';

  export default {
    name: 'Masteries',

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
      MasteryPage,
    },
  };
</script>

<style lang="stylus" scoped>
  .pageSelector
    width: 12em
    padding-left: 1.5em
</style>
