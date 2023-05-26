<template>
  hello
</template>

<script>
import { mapGetters } from "vuex";
import { api } from "boot/axios";

export default {
  name: "OutputComponent",
  computed: {
    ...mapGetters(["getInputData"]),
  },
  mounted() {
    for (let i of this.getInputData) {
      var body = {
        "cash": i.cash,
        "price": i.price,
        "wrapper_needed": i.wrapper_needed,
        "type": i.type
      };
      api.post("/",body).then((res) => {
        console.log(res.data);
      });
    }
  },
  methods: []
};
</script>

<style scoped>

</style>
