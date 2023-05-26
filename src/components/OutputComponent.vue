<template>
  <div q-pa-md>
    <q-table
      class="my-sticky-header-table"
      title="Generated Output"
      :rows="output"
      :columns="outputColumns"
      row-key="cash"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="archive"
          label="Export to csv"
          no-caps
          @click="exportTable"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="input" :props="props">
            {{ props.row.input }}
          </q-td>
          <q-td key="milk" :props="props">
            {{ props.row.milk }}
          </q-td>
          <q-td key="dark" :props="props">
            {{ props.row.dark }}
          </q-td>
          <q-td key="white" :props="props">
            {{ props.row.white }}
          </q-td>
          <q-td key="sugar_free" :props="props">
            {{ props.row.sugar_free }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <div class="flex flex-center" style="margin-top: 10px">
      <q-btn unelevated rounded color="primary">
        <router-link to="/" style="color: white">Back to calculate page</router-link>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { api } from "boot/axios";
import { exportFile, useQuasar } from "quasar";
const $q = useQuasar();
function wrapCsvValue(val, formatFn, row) {
  let formatted = formatFn !== void 0
    ? formatFn(val, row)
    : val;

  formatted = formatted === void 0 || formatted === null
    ? ""
    : String(formatted);

  formatted = formatted.split("\"").join("\"\"");

  return `"${formatted}"`;
}

export default {
  name: "OutputComponent",
  components: {},
  computed: {
    ...mapGetters(["getInputData"])
  },
  data() {
    return {
      outputColumns: [
        { name: "input", align: "start", label: "Input", field: "input", sortable: true },
        { name: "milk", align: "center", label: "Milk", field: "milk", sortable: true },
        { name: "dark", align: "center", label: "dark", field: "dark", sortable: true },
        { name: "white", align: "center", label: "white", field: "white", sortable: true },
        { name: "sugar_free", align: "center", label: "Sugar Free", field: "sugar_free", sortable: true }
      ],
      input: [],
      output: []
    };
  },
  mounted() {
    for (let i of this.getInputData) {
      var body = {
        "cash": i.cash,
        "price": i.price,
        "wrapper_needed": i.wrapper_needed,
        "type": i.type
      };
      api.post("/", body).then((res) => {
        var temp = {
          "input": JSON.stringify(i),
          "milk": "milk " + res.data["milk"],
          "dark": "dark " + res.data["dark"],
          "white": "white " + res.data["white"],
          "sugar_free": "sugar free " + res.data["sugar_free"]
        };
        this.output.push(temp);
      });
      console.log(this.output);
    }
  },
  methods: {
    exportTable() {
      // naive encoding to csv format
      const content = [this.outputColumns.map(col => wrapCsvValue(col.label))].concat(
        this.output.map(row => this.outputColumns.map(col => wrapCsvValue(
          typeof col.field === "function"
            ? col.field(row)
            : row[col.field === void 0 ? col.name : col.field],
          col.format,
          row
        )).join(","))
      ).join("\r\n");

      const status = exportFile(
        "table-export.csv",
        content,
        "text/csv"
      );

      if (status !== true) {
        $q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning"
        });
      }
    }
  },
};
</script>

<style scoped>

</style>
