<template>
  <button class="v-btn" :class="classes" @click="click">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "vBtn",
  props: {
    color: {
      type: String,
      default: "default",
      validator(value) {
        return [
          "default",
          "default-dark",
          "primary",
          "primary-dark",
          "warn",
          "danger"
        ].includes(value);
      }
    },
    size: {
      type: String,
      default: "normal",
      validator(value) {
        return ["small", "normal", "large"].includes(value);
      }
    },
    to: {
      type: [Object, String],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    border: Boolean
  },
  computed: {
    classes() {
      const classes = [this.color, this.size];

      if (this.disabled) {
        classes.push("disabled");
      }

      if (this.border) {
        classes.push("border");
      }

      return classes.map(c => `v-btn--${c}`);
    }
  },
  methods: {
    click(event) {
      if (!this.disabled) {
        this.$emit("click", event);
        if (this.to) {
          this.$router.push(this.to);
        }
      }
    }
  }
};
</script>

<style scoped>
.v-btn {
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 35px;
  font-weight: lighter;
  border: none;
}

.v-btn:not(.v-btn--disabled):hover {
  filter: brightness(105%);
}

.v-btn > * {
  margin: 0 5px;
}

.v-btn--default {
  color: #2f7cd7;
  background: white;
}

.v-btn--default:not(.v-btn--disabled):hover {
  filter: brightness(98%);
}

.v-btn--primary {
  color: white;
  background: #2f7cd7;
}

.v-btn--default-dark {
  background: white;
  color: #004a7c;
}

.v-btn--primary-dark {
  background: #285b7e;
  color: white;
}

.v-btn--warn {
  background: #ea4b40;
  color: white;
}

.v-btn--disabled {
  opacity: 0.5;
  cursor: default;
}

.v-btn--danger {
}

.v-btn--small {
  font-size: 12px;
  height: 28px;
  padding: 4px 10px;
  min-width: 66px;
}

.v-btn--normal {
}

.v-btn--lg {
}
.v-btn--border {
  border: 1px solid #dddddd;
}
</style>
