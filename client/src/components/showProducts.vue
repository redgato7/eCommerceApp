<template>

<v-content>

    <v-container fluid grid-list-md>

        <v-layout row wrap>

            <v-flex xs12 sm12 md9>

                <v-card class="card--flex-toolbar">

                    <v-toolbar color="#42A5F5" dark card prominent>

                        <v-toolbar-title class="toolbar-title" @click="reloadPage()">
                            eCommerce products for <strong>STAPLES</strong>
                        </v-toolbar-title>

                        <v-spacer>

                        </v-spacer>

                        <v-toolbar-items>

                            <v-text-field 
                            flat solo-inverted class="mt-2"
                            v-model="search"
                            clearable
                            append-icon="search"
                            single-line
                            hide-details
                            label="Search">
                            </v-text-field>
                
                        </v-toolbar-items>

                    </v-toolbar>

   
                    <v-data-table
                    :headers="headersOfProducts"
                    :items="products"
                    :search="search">

                        <template v-slot:items="props">

                            <td>
                                <img :src= "props.item.images.primary.large" />
                            </td>

                            <td class="text-xs-left">
                                {{ props.item.id }}
                            </td>

                            <td class="text-xs-left">
                                {{ props.item.general.name }}
                            </td>

                            <td class="text-xs-left">
                                <v-text-field
                                @keyup.enter="pushProduct(props.item)"
                                v-model="addproducts"
                                label="Type quantity here."
                                clearable
                                :rules="[rules.numbers]">
                                </v-text-field>

                                <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                <v-btn
                                v-on="on"
                                icon
                                color="primary"
                                dark
                                round>
                                    <font-awesome-icon class="icons2" icon="info" />
                                </v-btn>
                                </template>
                                <span>
                                More info
                                </span>
                                </v-tooltip>
                  
                                <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                <v-btn
                                icon
                                v-on="on"
                                color="primary"
                                dark
                                round>
                                    <font-awesome-icon class="icons2" icon="plus" />
                                </v-btn>
                                </template>
                                <span>
                                Add to cart
                                </span>
                                </v-tooltip>

                            </td>

                        </template>

                        <template v-slot:no-results>

                            <v-alert 
                            :value="true" 
                            color="error" 
                            icon="warning">
                            No results for: "{{ search }}".
                            </v-alert>

                        </template>

                        <template v-slot:no-data>

                            <v-alert 
                            :value="true" 
                            color="error" 
                            icon="warning">
                            Something is wrong with database, can't fetch records :/
                            </v-alert>

                        </template>

                    </v-data-table>

                </v-card>

            </v-flex>
    

            <v-flex xs12 sm12 md3>

                <v-card class="card--flex-toolbar">

                    <v-toolbar color="#42A5F5" dark card prominent>

                        <v-toolbar-title>
                        Shopping cart
                        </v-toolbar-title>

                        <v-spacer>

                        </v-spacer>

                        <v-toolbar-items>
                
                            <v-tooltip left>
                            <template v-slot:activator="{ on }">
                            <v-btn
                            v-on="on"
                            icon
                            color="primary"
                            dark>
                                <font-awesome-icon class="icons2" icon="trash-alt" />
                            </v-btn>
                            </template>
                            <span>
                            Delete products
                            </span>
                            </v-tooltip>

                            <v-tooltip right>
                            <template v-slot:activator="{ on }">
                            <v-btn
                            v-on="on"
                            icon
                            color="primary"
                            dark>
                                <font-awesome-icon class="icons2" icon="money-bill-alt" />
                            </v-btn>
                            </template>
                            <span>
                            Pay
                            </span>
                            </v-tooltip>
                
                        </v-toolbar-items>

                    </v-toolbar>

                    <v-data-table
                    :items="checkedProducts"
                    :headers="headersCart"
                    class="elevation-1"
                    no-data-text="Your shopping cart is empty.">

                        <template v-slot:items="props">

                            <td>
                            {{ props.item.id }}
                            </td>

                            <td>
                            {{ props.item.general.name }}
                            </td>

                        </template>
  
                    </v-data-table>

                </v-card>

            </v-flex>

        </v-layout>

    </v-container>

</v-content>

</template>
    
<script>
export default {
    data() {
        return {
            search: '',
            products: [],
            headersOfProducts:
            [
                {
                text: '',
                align: 'left',
                sortable: false,
                },
                {
                text: 'ID',
                value: 'id'
                },
                {
                text: 'Name',
                value: 'general.name'
                }
            ],
            rules:
            {
                numbers: value => 
                {
                const pattern = /^(\s*|\d+)$/
                return pattern.test(value) || 'Type only numbers.'
                }
            }
        }
    },
    created() {
        this.$http.get('http://localhost:3005/products').then(function(data){
            this.products = data.body
        })
    }
}

</script>

<style scoped>

</style>