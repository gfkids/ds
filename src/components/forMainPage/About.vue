<template>
  <section class="about">
    <div class="about__container">
      <router-link to="/project/new"
                   tag="a"
                   >
        <button class="btn">{{$t('nav-create')}}</button>
      </router-link>
      <section class="about__row about__row--title">
        <h2>{{ $t('about') }}</h2>
      </section>
      <section class="about__row">
        <article class="about__row-desc"  v-html="$t('takePart')">
        </article>
        <div class="about__row-img about__row-img--1">
        </div>
        <div class="about__row-img about__row-img--2">
        </div>
        <article class="about__row-desc"  v-html="$t('outlay')">
        </article>
        <div class="about__row-img about__row-img--3">
        </div>
        <div class="about__row-img about__row-img--4">
        </div>
        <article class="about__row-desc" v-html="$t('final')">
        </article>
      </section>
    </div>
  </section>
</template>

<style lang="sass">
  @import "@/sass/_about.sass"
</style>
