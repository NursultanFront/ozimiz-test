<template>
  <button :type="props.type" class="button" :class="`button_${props.variant}`" :disabled="disabled">
    <slot />
  </button>
</template>
<script setup lang="ts">
interface IProps {
  type?: HTMLButtonElement['type']
  disabled?: boolean
  variant?: 'primary' | 'danger'
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'button',
  disabled: false,
  variant: 'primary'
})
</script>
<style lang="scss">
.button {
  border: 0;
  padding: 13.5px 32px;
  transition-property: background-color, color, opacity;
  transition-duration: 0.25s;
  transition-timing-function: ease-in-out;
  font-size: 18px;
  border-radius: 4px;
  font-weight: 800;
  cursor: pointer;
}

.button_primary {
  color: #fff;
  background-color: #4b4848;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    background-color: #0f0c0c;
  }

  &:disabled {
    background-color: #6e6e6e;
  }
}

.button_danger {
  color: white;
  background-color: rgb(219, 45, 45);
  font-weight: 600;

  &:hover {
    background-color: rgb(227, 8, 8);
  }

  &:active {
    background-color: rgb(227, 8, 8);
  }

  &:disabled {
    background-color: rgb(230, 97, 97);
  }
}
</style>
