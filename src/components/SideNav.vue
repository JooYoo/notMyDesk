<template>
  <div class="container">
    <slot />
  </div>
</template>
  
<script>
export default {};
</script>
  
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 92px;
  border: 4px solid darkgray;
}
</style>