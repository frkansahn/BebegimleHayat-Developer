<template>
    <li class="float-left w-100">
        <div class="mb-1 p-1 d-flex align-items-center justify-content-between">
            <NuxtLink :to="item.url" type="button" class="btn btn-sm p-0 d-flex">
                {{ item.title }}
            </NuxtLink>
            <div class="d-flex align-items-center">
                <span class="btn px-2 py-0" v-if="isFolder" @click="toggle">
                    <b-icon-chevron-up variant="dark" font-scale="0.9" v-if="isOpen"></b-icon-chevron-up>
                    <b-icon-chevron-down variant="dark" font-scale="0.9" v-else></b-icon-chevron-down>
                </span>
            </div>
        </div>
        <div v-if="isFolder">
            <Transition name="slide">
                <ul class="float-left w-100 list-unstyled pl-2 border-light border-left my-1" v-show="isOpen">
                    <TreeCategory class="item" v-for="(child, index) in item.children" :key="index" :item="child">
                    </TreeCategory>
                </ul>
            </Transition>
        </div>
    </li>
</template>
<script>
export default {
    name: 'FilterTreeCategory',
    props: ['item'],
    data: function () {
        return {
            isOpen: false
        };
    },
    computed: {
        isFolder: function () {
            return this.item.children && this.item.children.length;
        }
    },
    methods: {
        toggle: function () {
            if (this.isFolder) {
                this.isOpen = !this.isOpen;
            }
        }
    }
}
</script>

<style>
    .slide-enter-active {
        -moz-transition-duration: 0.3s;
        -webkit-transition-duration: 0.3s;
        -o-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -moz-transition-timing-function: ease-in;
        -webkit-transition-timing-function: ease-in;
        -o-transition-timing-function: ease-in;
        transition-timing-function: ease-in;
    }

    .slide-leave-active {
        -moz-transition-duration: 0.3s;
        -webkit-transition-duration: 0.3s;
        -o-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    }

    .slide-enter-to,
    .slide-leave {
        max-height: 100px;
        overflow: hidden;
    }

    .slide-enter,
    .slide-leave-to {
        overflow: hidden;
        max-height: 0;
    }
</style>
