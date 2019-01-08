<template>
  <div class="v-btn" :class="classes" @click="click">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "vBtn",
  props: {
    color: {
      type: String,
      default: "default",
      validator(value) {
        return ["default", "primary", "warn", "danger"].includes(value);
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
    }
  },
  computed: {
    classes() {
      const classes = [this.color, this.size].map(c => `v-btn--${c}`);

      return classes;
    }
  },
  methods: {
    click(event) {
      this.$emit("click", event);
      if (this.to) {
        this.$router.push(this.to);
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
}

.v-btn:hover {
  filter: brightness(105%);
}

.v-btn > * {
  margin: 0 5px;
}

.v-btn--default {
  color: #2f7cd7;
  background: white;
}

.v-btn--default:hover {
  filter: brightness(98%);
}

.v-btn--primary {
  color: white;
  background: #2f7cd7;
}

.v-btn--warn {
  background: #ed8c00;
}

.v-btn--danger {
}

.v-btn--small {
}

.v-btn--normal {
}

.v-btn--lg {
}
</style>
