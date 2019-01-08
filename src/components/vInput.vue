<template>
  <div class="v-input">
    <input
      @input="$emit('input', $event.target.value)"
      :value="value"
      class="v-input__control"
      :type="type"
      :placeholder="placeholder"
    >
  </div>
</template>

<script>
export default {
  name: "vInput",
  props: {
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: ""
    },
    value: String
  }
};
</script>

<style>
.v-input__control {
  border: 2px solid #ddd;
  height: 33px;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  width: 100%;
}
.v-input__control:focus {
  border: 2px solid #2f7cd7;
}
</style>
