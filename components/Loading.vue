<template>
    <div class="loading">
        <span>
      
      </span>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.loading {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading span {
    display: block;
    width: 4.25em;
    height: 4.25em;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: #fff;
    animation: circle-loading 1200ms ease infinite;
}


@keyframes circle-loading {
    to {
      transform: rotateZ(360deg);
    }
  }

</style>