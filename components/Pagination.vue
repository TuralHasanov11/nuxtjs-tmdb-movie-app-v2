<template>
    <nav>
        <ul class="pagination justify-content-center text-light">
            <template v-if="parseInt(page)-1 > 0">
                <li class="page-item mx-1">
                    <NuxtLink class="button button-light" :to="{name:pageName, query:{page:1}}">İlk</NuxtLink>
                </li>
                <li class="page-item mx-1">
                    <NuxtLink class="button button-light" :to="{name:pageName, query:{page:parseInt(page) - 1}}">&lt;&lt;</NuxtLink>
                </li>
            </template>

            <li v-for="i in totalPages" :key="i" class="page-item">
                <NuxtLink v-if="i===parseInt(page)" class="button mx-1" :class="{'button-active':i===parseInt(page), 'button-light':i!==parseInt(page)}" :to="{name:pageName, query:{page:parseInt(page)}}">{{i}}</NuxtLink>
                <NuxtLink v-else-if="i > parseInt(page)-3 && i < parseInt(page)+3" class="button mx-1" :class="{'button-active':i===parseInt(page), 'button-light':i!==parseInt(page)}" :to="{name:pageName, query:{page:i}}">{{i}}</NuxtLink>
            </li>
            
            <template v-if="parseInt(page) < totalPages ">
                <li class="page-item mx-1">
                    <NuxtLink class="button button-light" :to="{name:pageName, query:{page:parseInt(page) + 1}}">>></NuxtLink>
                </li>
                <li class="page-item mx-1">
                    <NuxtLink class="button button-light" :to="{name:pageName, query:{page:totalPages}}">Sonuncu</NuxtLink>
                </li>
            </template>
        </ul>
    </nav>

</template>

<script>
export default {
    name:'Pagination',
    props:{
        page:{
            default:1
        },
        totalPages:{
            type:Number,
            default: 1
        },
        pageName:{
            type:String,
            default:() => ''
        }
    }
}
</script>

<style>

</style>