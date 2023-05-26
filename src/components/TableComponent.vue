<template>
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 300px; margin-bottom: 26px;">
      <q-file accept=".csv,.xl" color="purple-12" v-model="model" label="Select CSV File" @input="onFileChange">
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
        <template v-slot:label>
          {{ model ? model.name : "Select CSV File" }}
        </template>
      </q-file>
    </div>
    <q-table
      class="my-sticky-header-table"
      title="Selected CSV File"
      :rows="rows"
      :columns="columns"
      row-key="cash"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="cash" :props="props">
            {{ props.row.cash }}
          </q-td>
          <q-td key="price" :props="props">
            {{ props.row.price }}
          </q-td>
          <q-td key="wrapper_needed" :props="props">
            {{ props.row.wrapper_needed }}
          </q-td>
          <q-td key="type" :props="props">
            {{ props.row.type }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <div class="flex flex-center" style="margin-top: 10px">
      <q-btn unelevated rounded color="primary">
        <router-link to="/output">Go to Home</router-link>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapMutations } from "vuex";

export default {
  name: "TableComponent",
  data() {
    return {
      filter: ref(""),
      columns: [
        { name: "cash", align: "center", label: "Cash", field: "cash", sortable: true },
        { name: "price", align: "center", label: "Price", field: "price", sortable: true },
        { name: "wrapper_needed", align: "center", label: "Wrapper Needed", field: "wrapper_needed", sortable: true },
        { name: "type", align: "center", label: "Type", field: "type", sortable: true }
      ],
      rows: [],
      model: null,
      header: []
    };
  },
  methods: {
    ...mapMutations(['setInputData']),
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createInput(files[0]);
    },
    createInput(file) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.processResult(reader.result);
      };
      reader.readAsText(file);
    },
    processResult(content) {
      this.fileinput = content;
      let input = this.fileinput.split("\n");
      input = input.slice(1);
      input = input.filter(x => x.split(",").length === 4);
      for (let data of input) {
        data = data.replace("\r", "").split(",");
        this.rows.push({
          cash: data[0],
          price: data[1],
          wrapper_needed: data[2],
          type: data[3]
        });
      }
      this.setInputData(this.rows);
    }
  }
};
</script>

<style scoped>

</style>
