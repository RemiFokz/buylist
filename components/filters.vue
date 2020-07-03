<template>
  <select @change="$emit('change', $event.target.value)">
    <option>price</option>
    <option>date</option>
  </select>
</template>
<script>
export default {
  data: () => ({
    selected: 'price'
  })
};
</script>