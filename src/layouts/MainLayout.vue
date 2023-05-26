<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Radowan Solution
        </q-toolbar-title>
        <div>{{ today }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
  },
  setup () {
    const leftDrawerOpen = ref(false)
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return {
      today: (new Date()).toLocaleDateString("en-us",options),
    }
  }
})
</script>
