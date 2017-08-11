<template>
  <h2>{{count}} / {{max_count}}</h2>
</template>

<script>
export default {
  name: 'progress',
  data () {
    return {
       count: 0,
       max_count: 0,
    }
  }
}
</script>