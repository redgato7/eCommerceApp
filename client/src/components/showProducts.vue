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