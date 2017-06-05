<template lang="pug">
  .drop-down-selector.d-flex.align-items-center
    template(v-if='value === null')
      .no-selected-avatar
      .input-container.d-flex
        input.text-primary(type='text', ref='input', v-model='searchModel', :placeholder='placeholder')
        .icon-container(@click='toggle')
          v-icon.text-secondary arrow_drop_down
        template(v-if='isOpen')
          autocomplete(:options='autocompleteOptions', @click-row='handleOnClickRow')
    template(v-else='')
      img.selectedImage(:src='optionSelected.imageUrl')
      .input-container.d-flex
        .selected-text.text-primary {{ optionSelected.name }}
        .icon-container(@click='clear')
          v-icon.text-secondary close
</template>

<script>
  import { isNull, find } from 'lodash';
  import Autocomplete from './Autocomplete.vue';

  export default {
    name: 'DropdownSelector',

    data: () => ({
      isOpen: false,
      searchModel: '',
    }),

    props: {
      value: {
        default: null,
      },

      placeholder: {
        type: String,
        default: 'Seleccionar',
      },

      options: {
        type: Array,
        default: () => [
          { name: 'Imaqtpie', imageUrl: 'https://pedronalbert.github.io/coloso-web/images/pros/imaqtpie.jpg', value: 0 },
          { name: 'Faker', imageUrl: 'https://pedronalbert.github.io/coloso-web/images/pros/faker.jpg', value: 1 },
        ],
      },
    },

    computed: {
      autocompleteOptions() {
        if (this.searchModel === '') {
          return this.options;
        }

        return this.options.filter(({ name }) => name.toLowerCase().includes(this.searchModel));
      },

      optionSelected() {
        return find(this.options, { value: this.value });
      },
    },

    methods: {
      toggle() {
        if (!this.isOpen) {
          this.$refs.input.focus();
        }

        this.isOpen = !this.isOpen;
      },

      clear() {
        this.searchModel = '';
        this.$emit('input', null);
      },

      handleOnClickRow(value) {
        this.$emit('input', value);
      },
    },

    watch: {
      searchModel(newVal) {
        if (newVal !== '') {
          this.isOpen = true;
        } else {
          this.isOpen = false;
        }
      },

      value(newVal) {
        if (!isNull(newVal)) {
          this.isOpen = false;
        }
      },
    },

    components: {
      Autocomplete,
    },
  };
</script>

<style lang="stylus" scoped>
  @require '../../assets/stylus/colors'

  .drop-down-selector
    avatarSize = 70px
    inputHeight = 36px
    bgColor = #EEEEEE
    autocompleteHeight = 400px
    autocompleteOffset = 4px

    position: relative
    width: 100%

    .selectedImage
      width: avatarSize
      height: avatarSize
      border-radius: 50%
      border: 3px solid colors.primary
      z-index: 1

    .no-selected-avatar
      width: avatarSize
      height: avatarSize
      background-color: bgColor
      border-radius: 50%
      z-index: 1

    .input-container
      margin-left: -12px
      font-size: 16px
      background-color: bgColor
      padding: 8px 12px 8px 26px
      flex: 1
      height: inputHeight
      position: relative
      border-radius: 4px

      input
        width: 100%
        border: none
        background-color: inherit
        color: red

        &:focus
          outline: none
          color: red

      .icon-container
        cursor: pointer
        margin-left: 12px

    .selected-text
      flex: 1

    .autocomplete
      background-color: white
      max-height: autocompleteHeight
      position: absolute
      top: inputHeight
      z-index: 100
      left: autocompleteOffset
      right: 0
</style>
