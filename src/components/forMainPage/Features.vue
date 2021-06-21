<template>
  <section class="features">
    <div>
      <h2 class="features__title">{{ $t('title') }}</h2>
    </div>
        <!-- <picture>
      <source media="(max-width: 480px)" srcset="./../../img/webp/bench3.webp 1x, ./../../img/webp/bench.webp 2x " type="image/webp">
      <source media="(max-width: 480px)" srcset="./../../img/bench3.jpg 1x, ./../../img/bench.jpg 2x" type="image/jpg">
      <source media="(min-width: 480px)" srcset="./../../img/webp/bench.webp">
      <img src="./../../img/bench.jpg" alt="bench">
    </picture>
    <div>
      <p>Фотографии на сайте взяты из фотоархива Ильи Варламова: <a href="https://varlamov.ru/">varlamov.ru</a></p>
    </div> -->
  </section>
</template>

<style lang="sass">
.features
  display: flex
  @include container($col-12, $col-12, $col-10, $max-width: 900px)
  background: #fff url('./../../img/park.jpg') no-repeat 90% center
  background-size: 35% auto
  height: 300px
  margin-top: 50px
  @include mobile
    background: #fff url('./../../img/park.jpg') no-repeat center bottom
    background-size: 80%
    margin-top: 50px
    height: 370px
// .features a
//   text-align: center
//   color: white
//   text-decoration: underline
//   cursor: pointer
.features div
  max-width: $col-6
  text-align: center
  display: flex
  margin: auto auto auto 0
  @include mobile
    margin: 0 auto auto
    max-width: $col-12

.features h2
  text-transform: inherit
  @include mobile
    padding: 0
    font-size: $font-size-h4
  // font-size: 0.8*$font-size-h6
  // margin-bottom: 0
</style>
