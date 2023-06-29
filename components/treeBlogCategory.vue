<template>
    <li class="float-left w-100">
        <div class="mb-1 p-1 d-flex align-items-center justify-content-between" :class="[selectedId == item.id ? 'bg-success':'']">
            <button type="button" class="btn btn-sm p-0 d-flex" @click="$emit('selectCategoryMenu', item)">
                <b-form-checkbox
                    :id="`checkbox-select-menu${item.id}`"
                    v-model="item.isSelect"
                    :name="`checkbox-select-menu${item.id}`"
                    value="1"
                    unchecked-value="0"
                    @change="$emit('selectCategory', item)"
                    v-if="isCheckbox"
                >
                </b-form-checkbox>
                <b-form-radio
                    :id="`radio-select-menu${item.id}`"
                    v-model="item.isSelect"
                    :name="`radio-select-menu`"
                    value="1"
                    unchecked-value="0"
                    @change="$emit('selectCategory', item)"
                    v-if="isRadio"
                >
                </b-form-radio>
                {{ item.category_name }}
            </button>
            <div class="d-flex align-items-center">
                <span class="btn px-2 py-0" v-if="isFolder" @click="toggle">
                    <b-icon-chevron-up variant="dark" font-scale="0.9" v-if="isOpen"></b-icon-chevron-up>
                    <b-icon-chevron-down variant="dark" font-scale="0.9" v-else></b-icon-chevron-down>
                </span>
                <span class="px-2" v-if="isAddButton">
                    <button type="button" class="btn btn-outline-primary btn-sm py-0 px-1" @click="$emit('addSubCategory', item.id)">
                        <small>
                            + Alt Menü
                        </small>
                    </button>
                </span>
            </div>
        </div>
        <ul class="float-left w-100 list-unstyled pl-2 border-secondary border-left my-1" v-show="isOpen" v-if="isFolder">
            <TreeBlogCategory class="item" v-for="(child, index) in item.children" :key="index" :item="child" @selectCategory="selectCategory" @addSubCategory="addSubCategory" @selectCategoryMenu="selectCategoryMenu" :isCheckbox="isCheckbox" :isRadio="isRadio" :isAddButton="isAddButton" :selectedId="selectedId"></TreeBlogCategory>
        </ul>
    </li>
</template>
<script>
export default {
    name: 'TreeBlogCategory',
    props: ['item','isCheckbox','isRadio','isAddButton','selectedId'],
    data: function() {
        return {
            isOpen: false
        };
    },
    computed: {
        isFolder: function() {
            return this.item.children && this.item.children.length;
        }
    },
    methods: {
        selectCategory(data){
            this.$emit('selectCategory', data);
        },
        addSubCategory(data) {
            this.$emit('addSubCategory', data);
        },
        selectCategoryMenu(data){
            this.$emit('selectCategoryMenu', data);
        },
        toggle: function() {
            if (this.isFolder) {
                this.isOpen = !this.isOpen;
            }
        }
    }
}
</script>

<style>

</style>
