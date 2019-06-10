<template>

<v-content>

    <v-container fluid grid-list-md>

        <v-layout row wrap>

            <!-- Products -->
            <v-flex xs12 sm12 md12 lg9>

                <v-card>

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
                                <img class="img-main" :src= "props.item.images.primary.large" />
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
                                :rules="[rules.numbers]"
                                maxlength="2">
                                </v-text-field>

                                <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                <v-btn
                                v-on="on"
                                @click.stop="dialogProducts = true"
                                @click="getTheSelectedOne(props.item); getTheButton(props.item)"
                                icon
                                color="primary"
                                dark
                                round>
                                    <font-awesome-icon icon="info" />
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
                                @click="pushProduct(props.item)"
                                color="primary"
                                dark
                                round>
                                    <font-awesome-icon icon="plus" />
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

            <!-- Dialog with info about the product -->
            <v-dialog
            v-model="dialogProducts"
            width="500">
    
                <v-card class="form">

                    <v-card-title
                    class="form-title"
                    primary-title>
                    More about the product
                    </v-card-title>

                    <v-card-text>
                        <div id="informations">Hi, I'm empty. Check database.</div>
                    </v-card-text>

                    <v-divider>

                    </v-divider>

                    <v-card-actions>
          
                        <v-text-field
                        v-model="addproducts"
                        label="Type quantity here."
                        clearable
                        :rules="[rules.numbers]"
                        maxlength="2">
                        </v-text-field>

                        <v-tooltip top>
                        <template v-slot:activator="{ on }">
                        <v-btn
                        v-on="on"
                        @click="addFromTheButton()"
                        icon
                        color="primary"
                        dark
                        round>
                            <font-awesome-icon icon="plus" />
                        </v-btn>
                        </template>
                        <span>
                        Add
                        </span>
                        </v-tooltip>
                  
                        <v-tooltip top>
                        <template v-slot:activator="{ on }"><v-btn
                        v-on="on"
                        icon
                        color="primary"
                        dark
                        round
                        @click="dialogProducts = false">
                            <font-awesome-icon icon="times" />
                        </v-btn>
                        </template>
                        <span>
                        Close
                        </span>
                        </v-tooltip>

                    </v-card-actions>

                </v-card>

            </v-dialog>

            <!-- Dialog with the payment methods -->
            <v-dialog
            v-model="dialogCart"
            width="500">
      
                <v-card class="form">

                    <v-card-title
                    class="form-title"
                    primary-title>
                    Payment
                    </v-card-title>

                    <v-card-text>
                    There will be payment methods implemented.
                    </v-card-text>

                    <v-divider>

                    </v-divider>

                    <v-card-actions>

                        <v-spacer>

                        </v-spacer>

                        <v-tooltip top>
                        <template v-slot:activator="{ on }"><v-btn
                        v-on="on"
                        icon
                        color="primary"
                        dark
                        round
                        @click="dialogCart = false">
                          <font-awesome-icon icon="times" />
                        </v-btn>
                        </template>
                        <span>
                        Close
                        </span>
                        </v-tooltip>
                    
                    </v-card-actions>

                </v-card>

            </v-dialog>
    
            <!-- Shopping Cart -->
            <v-flex xs12 sm12 md12 lg3>

                <v-card>

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
                            @click="clearCart()"
                            icon
                            color="primary"
                            dark>
                                <font-awesome-icon icon="trash-alt" />
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
                            @click="dialogCart = true"
                            icon
                            color="primary"
                            dark>
                                <font-awesome-icon icon="money-bill-alt" />
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
            search: "",
            dialogProducts: false,
            dialogCart: false,
            products: [],
            checkedProducts: [],
            moreProducts: [],
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
            headersCart:
            [
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
    methods: {
        pushProduct(product) {
            for (let i = 0 ; i < this.addproducts ; i++) {
                this.checkedProducts.push(product);
            }
            let parsed = JSON.stringify(this.checkedProducts);
            localStorage.setItem('checkedProducts', parsed);
            this.addproducts='';
        },
        clearCart() {
          this.checkedProducts = [];
          let parsed = JSON.stringify(this.checkedProducts);
          localStorage.setItem('checkedProducts', parsed);
        },
        reloadPage() {
            window.location.reload();
        },
        getTheSelectedOne (product) {
            /* eslint-disable */
            document.getElementById("informations").innerHTML = 
            `<h3>${product.id}, ${product.general.name}</br>
            ${product.brand.name}</h3></br>
            ${product.general.description}</br>
            <img src=\"${product.images.primary.large}"\ max-width=\"300px\" height=\"300px\"></br>`;
            /* eslint-disable */
        },
        getTheButton (product) {
            this.moreProducts = product;
        },
        addFromTheButton() {
            this.pushProduct (this.moreProducts);
        }
    },
    created() {
        this.$http.get('http://localhost:3005/products').then(function(data){
            this.products = data.body;
        })
    },
    mounted() {
        if  (localStorage.getItem('checkedProducts')) {
            this.checkedProducts = JSON.parse(localStorage.getItem('checkedProducts'));
        }
    }
}

</script>

<style scoped>

</style>